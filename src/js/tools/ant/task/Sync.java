package js.tools.ant.task;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Task;

import js.server.client.AppsManager;
import js.tools.ant.util.Utils;
import js.tools.commons.rmi.FilesIterator;
import js.tools.commons.rmi.FilesOutputStream;
import js.tools.commons.rmi.HttpRmi;
import js.tools.commons.rmi.StreamHandler;
import js.tools.commons.util.Files;
import js.tools.commons.util.GType;

/**
 * Synchronize local source directory with a target directory from a remote repository. This task uses services provided
 * by remote server manager, see js.admin.AppsManager class from j(s)-lib Manager. In order to access remote server one
 * needs to know server host name, the name of the web context where management agent is deployed and whether connection
 * is secure or not. <code>Sync</code> task supports six attributes, listed below.
 * <p>
 * Synchronization occurs from a local source directory to a remote target directory. By default target directory is the
 * web document root associated with configured host, see <code>host</code> attribute. This is possible only if web
 * server configuration follows convention to name virtual hosts using the domain name. On a virtual host is possible to
 * deploy multiple context, see <code>context</code> attribute.
 * <table border="1" style="border-collapse:collapse;" summary="">
 * <tr>
 * <td>Attribute
 * <td>Description
 * <td>Required
 * <tr>
 * <td><b>source</b>
 * <td>Source directory containing files to be synchronized on server target directory. If is not absolute it should be
 * relative to Ant builder project path.
 * <td>Yes
 * <tr>
 * <td><b>host</b>
 * <td>Host name for the server where synchronization target resides.
 * <td>Yes
 * <tr>
 * <td><b>agent</b>
 * <td>The name of the web context where j(s)-lib management agent is deployed. Default to <code>server</code>.
 * <td>No
 * <tr>
 * <td><b>context</b>
 * <td>The context directory located on host document root where synchronization is performed. This allows a domain to
 * have multiple contexts deployed.
 * <td>No
 * <tr>
 * <td><b>secure</b>
 * <td>Flag indicating that server connection is secure, that is, uses HTTPS protocol. Default to not secure HTTP.
 * <td>No
 * <tr>
 * <td><b>full</b>
 * <td>Flag indicating all files should be uploaded, no matter was changed or not. Default to false. This option is for
 * final production deployment; incremental synchronization uses message digest to determine if file is changed and
 * there is a very slight chance of collision, that is, two different files may have the same hash, resulting in files
 * failing to update. Please note that if <code>full</code> is active files not existing into uploaded archive are
 * <b>removed</b> from target directory.
 * <td>No
 * <tr>
 * <td><b>includes</b>
 * <td>Extension for files to be included into synchronization process.</td>
 * <td>No</td>
 * <tr>
 * <td><b>excludes</b>
 * <td>Extension for files to be excluded into synchronization process.</td>
 * <td>No</td>
 * </table>
 * 
 * <p>
 * Here is a sample code using all attributes. It will upload only changed files from source directory to remote server.
 * Synchronization target directory has the form <em>/apache-doc-root/service.bbnet.ro/site/</em>.
 * 
 * <pre>
 *  &lt;target name="sync-site"&gt;
 *      &lt;js.sync source="build/site" host="services.bbnet.ro" agent="server" context="site" secure="yes" full="no" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * <p>
 * The simplest usage pattern is to supply only mandatory attributes. In example below target directory has the form
 * <em>/apache-doc-root/service.bbnet.ro/</em>.
 * 
 * <pre>
 *  &lt;target name="sync-server-api"&gt;
 *      &lt;js.sync source="build/api/server" host="services.bbnet.ro" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * 
 * Synchronization process occurs in two steps:
 * <ol>
 * <li>client and server agree on dirty files list,
 * <li>client send dirty files and server updates the target directory.
 * </ol>
 * <p>
 * Client - running this task, creates a list of all files from source directory and compute message digest for every
 * one. Source directory hierarchy is traversed in depth-first order. Once files list created it is sent to server which
 * compare it with its own files hierarchy. Server sent back a dirty files list. Finally, client creates a ZIP archive
 * with all dirty files and upload it to server; server knows to extract files from archive and copy to the right
 * location.
 * 
 * @author Iulian Rotaru
 * @version final
 */
public class Sync extends Task
{
  /** Default management agent web context. */
  private static final String AGENT_NAME = "server";

  /** The host name of the server where synchronization target directory resides. */
  private String hostName;

  /** Management agent web context deployed on <code>host</code>, default to {@link #AGENT_NAME}. */
  private String agent = AGENT_NAME;

  /** Local source directory from where files are uploaded. */
  private File sourceDir;

  /** Synchronization target directory used internally, not initialized from Ant attribute. */
  private String targetDir;

  /** If secure flag is true uses secure HTTP, default to false. */
  private boolean secure;

  /**
   * Full synchronization will copy all source files, no matter changed or not. This option is for final production
   * deployment; incremental synchronization uses message digest to determine if file is changed and there is a very
   * slight chance of collision, that is, two different files may have the same hash, resulting in files failing to
   * update.
   */
  private boolean full;

  /**
   * Optional, potential harmful flag, to force removing of all stale files from target directory. If
   * <code>removeStaleFiles</code> flag is true, all descendant files from target directory that are not present into
   * source directory are permanently removed. Depending on usage pattern, this may be potentially harmful for which
   * reason removing stale files is optional and default to false.
   */
  private boolean removeStaleFiles;

  private String includes;

  private String excludes;

  /**
   * Set local source directory.
   * 
   * @param sourceDir local source directory.
   * @see #sourceDir
   */
  public void setSource(String sourceDir)
  {
    this.sourceDir = new File(sourceDir);
  }

  /**
   * Set target directory.
   * 
   * @param targetDir target directory.
   * @see #targetDir
   */
  public void setTarget(String targetDir)
  {
    this.targetDir = targetDir;
  }

  /**
   * Set the host name of the server where synchronization target directory resides.
   * 
   * @param hostName remote host name.
   * @see #hostName
   */
  public void setHost(String hostName)
  {
    this.hostName = hostName;
  }

  /**
   * Set web context of applications management agent.
   * 
   * @param agent web context of management agent.
   * @see #agent
   */
  public void setAgent(String agent)
  {
    this.agent = agent;
  }

  /**
   * Set secure flag to <code>true</code> in order to use HTTPS.
   * 
   * @param secure secure flag.
   * @see #secure
   */
  public void setSecure(boolean secure)
  {
    this.secure = secure;
  }

  /**
   * Set full archive options.
   * 
   * @param full full archive.
   * @see #full
   */
  public void setFull(boolean full)
  {
    this.full = full;
  }

  /**
   * Set remove stale files flag, potential harmful, see {@link #removeStaleFiles}.
   * 
   * @param removeStaleFiles flag true to remove stale files.
   * @see #removeStaleFiles
   */
  public void setRemoveStaleFiles(boolean removeStaleFiles)
  {
    this.removeStaleFiles = removeStaleFiles;
  }

  /**
   * Set extension for files to include.
   * 
   * @param includes extension for files to include.
   * @see #includes
   */
  public void setIncludes(String includes)
  {
    this.includes = includes;
  }

  /**
   * Set extension for files to exclude.
   * 
   * @param excludes extension for files to exclude.
   * @see #excludes
   */
  public void setExcludes(String excludes)
  {
    this.excludes = excludes;
  }

  /**
   * Implements Apache task executor.
   */
  @Override
  public void execute() throws BuildException
  {
    try {
      preprocessAttributes();
      String webContextURL = Utils.URL(secure, hostName, agent);
      execute(webContextURL);
    }
    catch(Exception e) {
      e.printStackTrace();
      throw new BuildException(e);
    }
  }

  /**
   * Initialize this task internal state and check attributes integrity.
   */
  private void preprocessAttributes()
  {
    Project project = getProject();
    // project can be null only on tests
    File projectDir = project != null ? project.getBaseDir() : new File(".");

    if(hostName == null) {
      Utils.badArgument(this, "Host name is missing. Please set <host> attribute.");
    }

    if(sourceDir == null) {
      Utils.badArgument(this, "Source directory is mandatory. Please set <source> attribute.");
    }
    if(!sourceDir.isAbsolute()) {
      sourceDir = new File(projectDir, sourceDir.getPath());
    }
    if(!sourceDir.exists()) {
      Utils.badArgument(this, "Source directory does not exist. Please fix <source> attribute.");
    }
    if(!sourceDir.isDirectory()) {
      Utils.badArgument(this, "Source directory is in fact a file. Please fix <source> attribute.");
    }

    if(targetDir == null) {
      targetDir = hostName;
    }
  }

  /**
   * Perform the actual synchronization between local source directory and remote target directory.
   * 
   * @param webContextURL the URL of application manager class.
   * @throws IOException if HTTP-RMI request fails for some reason.
   */
  private void execute(String webContextURL) throws Exception
  {
    // process incremental synchronization
    if(!full) {
      SortedMap<String, byte[]> sourceFiles = new TreeMap<String, byte[]>();
      for(String file : FilesIterator.getRelativeNamesIterator(sourceDir)) {
        if(excludes != null && file.endsWith(excludes)) {
          continue;
        }
        if(includes != null && !file.endsWith(includes)) {
          continue;
        }
        sourceFiles.put(Files.path2unix(file), Files.getFileDigest(new File(sourceDir, file)));
      }

      HttpRmi rmi = new HttpRmi(webContextURL, AppsManager.class);
      rmi.setReturnType(new GType(List.class, String.class));
      rmi.setExceptions(IOException.class);

      final List<String> dirtyFiles = rmi.invoke("getDirtyFiles", targetDir, sourceFiles, removeStaleFiles);
      if(dirtyFiles.isEmpty()) {
        return;
      }

      rmi = new HttpRmi(webContextURL, AppsManager.class);
      rmi.setExceptions(IOException.class);

      rmi.invoke("synchronize", targetDir, new StreamHandler<FilesOutputStream>(FilesOutputStream.class)
      {
        @Override
        protected void handle(FilesOutputStream files) throws IOException
        {
          files.addFiles(sourceDir, dirtyFiles);
        }
      });
    }

    // process full synchronization
    else {
      HttpRmi rmi = new HttpRmi(webContextURL, AppsManager.class);
      rmi.setExceptions(IOException.class);

      rmi.invoke("synchronize", targetDir, new StreamHandler<FilesOutputStream>(FilesOutputStream.class)
      {
        @Override
        protected void handle(FilesOutputStream files) throws IOException
        {
          files.addFiles(sourceDir);
        }
      });
    }
  }
}
