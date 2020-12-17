package js.tools.ant.task;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import js.tools.ant.util.Utils;
import js.tools.commons.util.Strings;
import js.tools.script.pack.Main;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

/**
 * Pack j(s)-lib Script code base into single file script archive considering classes dependencies.
 * <table border="1" style="border-collapse:collapse;">
 * <tr>
 * <td>Attribute
 * <td>Description
 * <td>Required
 * <tr>
 * <td><b>sourcepath</b>
 * <td>Source files directory.
 * <td>Yes
 * <tr>
 * <td><b>filename</b>
 * <td>Resulting archive name.
 * <td>Yes
 * <tr>
 * <td><b>omnideps</b>
 * <td>Comma separated list of packages included into archive without being required by dependencies.
 * <td>No
 * <tr>
 * <td><b>excludes</b>
 * <td>Comma separated list of packages not include into archive.
 * <td>No
 * <tr>
 * <td><b>debug</b>
 * <td>Keep debug statements like <code>$assert</code> and <code>$log</code> into generated archive. Default to false.
 * <td>No
 * <tr>
 * <td><b>nice</b>
 * <td>Generated archive file is nicely formatted. Default to false.
 * <td>No
 * <tr>
 * <td><b>verbose</b>
 * <td>Print debug information about packing process. Default to false.
 * <td>No
 * </table>
 * 
 * <p>
 * 
 * <pre>
 *  &lt;target name="production-pack"&gt;
 *      &lt;js.packScriptArchive sourcepath="${SRC}" filename="${CLIENT-JS}" omnideps="legacy,bootstrap" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * 
 * @author Iulian Rotaru
 * @since 1.0
 */
public class PackScriptArchive extends Task
{
  private File sourcePath;
  private File fileName;
  private String omnideps;
  private String excludes;
  private boolean debug;
  private boolean nice;
  private boolean removeApiDoc;
  private boolean removeAssertions;
  private boolean verbose;

  public void setSourcePath(String sourcePath)
  {
    this.sourcePath = new File(sourcePath);
  }

  public void setFileName(String fileName)
  {
    this.fileName = new File(fileName);
  }

  public void setExcludes(String excludes)
  {
    this.excludes = excludes.replaceAll("\\s*,\\s*", ",");
  }

  public void setOmnideps(String omnideps)
  {
    this.omnideps = omnideps.replaceAll("\\s*,\\s*", ",");
  }

  public void setDebug(boolean debug)
  {
    this.debug = debug;
  }

  public void setNice(boolean nice)
  {
    this.nice = nice;
  }

  public void setRemoveApiDoc(boolean removeApiDoc)
  {
    this.removeApiDoc = removeApiDoc;
  }

  public void setRemoveAssertions(boolean removeAssertions)
  {
    this.removeAssertions = removeAssertions;
  }

  public void setVerbose(boolean verbose)
  {
    this.verbose = verbose;
  }

  @Override
  public void execute() throws BuildException
  {
    if(sourcePath == null) {
      Utils.badArgument(this, "Source path is missing. Please set <sourcepath> attribute.");
    }
    if(!sourcePath.exists()) {
      Utils.badArgument(this, "Source directory does not exist. Please fix <sourcepath> attribute.");
    }
    if(!sourcePath.isDirectory()) {
      Utils.badArgument(this, "Source directory is an ordinary file. Please fix <sourcepath> attribute.");
    }

    if(fileName == null) {
      Utils.badArgument(this, "Archive file name is missing. Please set <filename> attribute.");
    }
    if(fileName.getParent() == null || !fileName.getParentFile().isDirectory()) {
      Utils.badArgument(this, "Archive file location is not an existing directory. Please fix <filename> attribute.");
    }

    List<String> args = new ArrayList<String>();
    if(debug) {
      args.add("-debug");
    }
    if(nice) {
      args.add("-nice");
    }
    if(removeApiDoc) {
      args.add("-remove-apidoc");
    }
    if(removeAssertions) {
      args.add("-remove-assertions");
    }
    if(verbose) {
      args.add("-verbose");
    }

    args.add("-sourcepath");
    args.add(sourcePath.getPath());

    args.add("-f");
    args.add(fileName.getPath());

    if(excludes != null) {
      args.add("-excludes");
      args.addAll(Strings.split(excludes, ','));
    }

    if(omnideps != null) {
      args.add("-omnideps");
      args.addAll(Strings.split(omnideps, ','));
    }

    Main.main(args.toArray(new String[args.size()]));
  }
}
