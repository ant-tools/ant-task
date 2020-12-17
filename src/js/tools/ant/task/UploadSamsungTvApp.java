package js.tools.ant.task;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import js.server.client.AppsManager;
import js.tools.ant.util.Log;
import js.tools.ant.util.Utils;
import js.tools.commons.rmi.HttpRmi;
import js.tools.commons.rmi.StreamHandler;
import js.tools.commons.util.Files;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Task;

/**
 * Deploy application archive to remote server. This task uses services provided by remote server manager, see
 * js.admin.AppsManager class from j(s)-lib Manager. In order to access remote server one needs to know server host
 * name, the name of the web context where management application is deployed and whether connection is secure or not.
 * <code>Deploy</code> task supports four attributes, listed below.
 * <table border="1" style="border-collapse:collapse;">
 * <tr>
 * <td>Attribute
 * <td>Description
 * <td>Required
 * <tr>
 * <td><b>host</b>
 * <td>Host name for the server where war archive is to be deployed.
 * <td>Yes
 * <tr>
 * <td><b>agent</b>
 * <td>The name of the web context where j(s)-lib management agent is deployed. Default to <code>server</code>.
 * <td>No
 * <tr>
 * <td><b>file</b>
 * <td>The war archive file, as defined in the context of Ant builder running this task.
 * <td>Yes
 * <tr>
 * <td><b>secure</b>
 * <td>Flag indicating that server connection is secure, that is, uses HTTPS protocol. Default to not secure HTTP.
 * <td>No
 * </table>
 * 
 * <p>
 * Here is a sample code using all attributes:
 * 
 * <pre>
 *  &lt;target name="production-deploy"&gt;
 *      &lt;js.deploy host="services.bbnet.ro" agent="server" file="${WAR}" secure="yes" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * 
 * @author Iulian Rotaru
 * @since 1.0
 */
public class UploadSamsungTvApp extends Task
{
  private static final String AGENT_NAME = "server";

  private String hostName;
  private String fileName;

  public void setHost(String hostName)
  {
    this.hostName = hostName;
  }

  public void setFile(String fileName)
  {
    this.fileName = fileName;
  }

  private Log log;

  @Override
  public void execute() throws BuildException
  {
    Project project = getProject();
    log = new Log(project, getClass());

    if(hostName == null) {
      Utils.badArgument(this, "Host name is missing. Please set <host> attribute.");
    }
    if(fileName == null) {
      Utils.badArgument(this, "File name is missing. Please set <file> attribute.");
    }

    String webContextURL = Utils.URL(false, hostName, AGENT_NAME);
    try {
      execute(webContextURL);
    }
    catch(Exception e) {
      throw new BuildException(e);
    }
  }

  private void execute(String webContextURL) throws Exception
  {
    HttpRmi rmi = new HttpRmi(webContextURL, AppsManager.class);
    rmi.setReturnType(boolean.class);
    rmi.setExceptions(IOException.class);

    final File archiveFile = new File(getProject().getBaseDir(), fileName);
    boolean success = rmi.invoke("uploadSamsungTvApp", archiveFile.getName(), new StreamHandler<OutputStream>(OutputStream.class)
    {
      @Override
      protected void handle(OutputStream outputStream) throws IOException
      {
        Files.copy(archiveFile, outputStream);
      }
    });

    if(success) {
      log.debug("Deployment of Samsung TV application |%s| complete.", fileName);
    }
    else {
      log.error("Fail to deploy |%s| Samsung TV application.", fileName);
    }
  }
}
