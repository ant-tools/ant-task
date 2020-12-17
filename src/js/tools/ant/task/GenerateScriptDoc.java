package js.tools.ant.task;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import js.tools.ant.util.Utils;
import js.tools.commons.util.Strings;
import js.tools.script.doc.Main;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

/**
 * Generate j(s)-lib Script API documentation. This task is a thin wrapper for <a
 * href="http://api.js-lib.com/script-doc/index.html" target="_blank">Script Documentation Generator</a>; its purpose is
 * to integrate script API generation into project building process. Current implementation requires four attributes and
 * a single nested element, see parameters description below.
 * <table border="1" style="border-collapse:collapse;">
 * <tr>
 * <td>Parameter
 * <td>Description
 * <td>Required
 * <tr>
 * <td><b>sourcepath</b>
 * <td>The source files directory. It should be an existing directory.
 * <td>Yes
 * <tr>
 * <td><b>destdir</b>
 * <td>The directory where API files are generated. Is relative to project root and should be an existing directory.
 * <td>Yes
 * <tr>
 * <td><b>excludes</b>
 * <td>Comma separated list of packages to be excluded from API generation.
 * <td>No
 * <tr>
 * <td><b>windowtitle</b>
 * <td>The title of API pages as visible into browser tab/caption.
 * <td>No
 * <tr>
 * <td><b>link</b>
 * <td>This is in fact a nested element with a single attribute <code>href</code> - the URL of linked API.
 * <td>No
 * </table>
 * 
 * <p>
 * Below is a sample usage for script API generation. It is combined with {@link Sync} task to also update API public
 * repository. First task generate <em>widgets</em> API into <em>build/api</em> directory and the second upload API
 * files on public server <em>api.js-lib.com</em>.
 * 
 * <pre>
 *  &lt;target name="generate apidoc"&gt;
 *      &lt;js.generateScriptDoc sourcepath="widget" destdir="build/api" windowtitle="Widgets Library"&gt;
 *          &lt;link href="http://api.bbnet.ro/window/" /&gt;
 *          &lt;link href="http://api.bbnet.ro/client/" /&gt;
 *      &lt;/js.generateScriptDoc&gt;
 *      &lt;js.sync source="build/api" host="api.js-lib.com" target="api.js-lib.com/widget" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * 
 * @author Iulian Rotaru
 * @since 1.0
 */
public class GenerateScriptDoc extends Task
{
  private File sourcePath;
  private File destinationDir;
  private String excludes;
  private String windowTitle;
  private Vector<Link> links = new Vector<Link>();

  public void setSourcePath(String sourcePath)
  {
    this.sourcePath = new File(sourcePath);
  }

  /**
   * Comma separated list of sources to exclude from documentation generation process.
   * 
   * @param excludes
   */
  public void setExcludes(String excludes)
  {
    this.excludes = excludes.replaceAll("\\s*,\\s*", ",");
  }

  public void setDestDir(String destinationDir)
  {
    this.destinationDir = new File(destinationDir);
  }

  public void setWindowTitle(String windowTitle)
  {
    this.windowTitle = windowTitle;
  }

  public Link createLink()
  {
    Link link = new Link();
    links.add(link);
    return link;
  }

  @Override
  public void execute() throws BuildException
  {
    Main.main(args());
  }

  private String[] args()
  {
    if(sourcePath == null) {
      Utils.badArgument(this, "Source path is missing. Please set <sourcepath> attribute.");
    }
    if(!sourcePath.exists()) {
      Utils.badArgument(this, "Source path file does not exist. Please fix <sourcepath> attribute.");
    }
    if(!sourcePath.isDirectory()) {
      Utils.badArgument(this, "Source path is not a directory. Please fix <sourcepath> attribute.");
    }

    if(destinationDir == null) {
      Utils.badArgument(this, "Destination directory is missing. Please set <destdir> attribute.");
    }
    if(!destinationDir.exists()) {
      if(!destinationDir.getParentFile().exists()) {
        Utils.badArgument(this, "The parent of destination directory does not exist. Please fix <destdir> attribute.");
      }
      if(!destinationDir.mkdirs()) {
        Utils.badArgument(this, "Cannot create destination directory. Please check <destdir> attribute.");
      }
    }
    else if(!destinationDir.isDirectory()) {
      Utils.badArgument(this, "Destination directory is an ordinary file. Please fix <destdir> attribute.");
    }

    List<String> args = new ArrayList<String>();
    args.add("-private");
    args.add("-author");
    args.add("-version");
    args.add("-notimestamp");

    args.add("-sourcepath");
    args.add(sourcePath.getPath());

    args.add("-d");
    args.add(destinationDir.getPath());

    if(excludes != null) {
      args.add("-excludes");
      args.addAll(Strings.split(excludes, ','));
    }

    args.add("-tag");
    args.add("assert:cm:Assert:");

    args.add("-tag");
    args.add("note:cfm:Note:");

    if(windowTitle != null) {
      args.add("-windowtitle");
      args.add(windowTitle);
    }

    for(Link link : links) {
      args.add("-link");
      args.add(link.getHref());
    }

    return args.toArray(new String[args.size()]);
  }

  /**
   * Script API documentation nested element used for external references.
   * 
   * @author Iulian Rotaru
   * @since 1.0
   */
  public static class Link
  {
    String href;

    String getHref()
    {
      return href;
    }

    public void setHref(String href)
    {
      this.href = href;
    }
  }
}
