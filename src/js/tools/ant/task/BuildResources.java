package js.tools.ant.task;

import java.io.File;

import js.wood.Builder;
import js.wood.NamingStrategy;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

/**
 * Build web application <em>static resources</em> from WOOD project files. This task scan WOOD project files and create
 * standard web pages; see <a href="http://api.js-lib.com/wood/index.html" target="_blank">WOOD API Specification</a>.
 * From this class perspective <em>static resources</em> are files created at build time and not changed for entire
 * application life time, that is, not generated per HTTP request. Current implementation supports next attributes:
 * <table border="1" style="border-collapse:collapse;">
 * <tr>
 * <td>Attribute
 * <td>Description
 * <td>Required
 * <tr>
 * <td><b>site</b>
 * <td>Target context directory relative to project directory. Is the directory where <em>static resource</em> are to be
 * created. Default to <code>build/site</code>.
 * <td>No
 * <tr>
 * <td><b>buildNumber</b>
 * <td>Optional build number managed by <code>buildnumber</code> Ant built-in task. If present,
 * <code>BuildResources</code> uses build number to suffix resource files, especially useful when need to overwrite HTTP
 * caching.
 * <td>No
 * <tr>
 * <td><b>verbose</b>
 * <td>Display debug information, default to false.
 * <td>No
 * </table>
 * 
 * <p>
 * Standard usage of this task is as follow:
 * 
 * <pre>
 *  &lt;taskdef name="js.BuildResources" className="js.tools.ant.task.BuildResources" /&gt;
 *  . . .
 *  &lt;target name="build-resources"&gt;
 *      &lt;buildnumber /&gt;
 *      &lt;js.BuildResources site="build/site" buildNumber="${build.number}" verbose="yes" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * 
 * @author Iulian Rotaru
 */
public class BuildResources extends Task
{
  private static final String DEFAULT_SITE_DIR = "build/site";
  private static final NamingStrategy DEFAULT_NAMING_STRATEGY = NamingStrategy.XMLNS;

  private String siteDir;
  private int buildNumber;
  private NamingStrategy namingStrategy;
  @SuppressWarnings("unused")
  private boolean verbose;

  public void setSite(String siteDir)
  {
    this.siteDir = siteDir;
  }

  public void setBuildNumber(int buildNumber)
  {
    this.buildNumber = buildNumber;
  }

  public void setNaming(String naming)
  {
    try {
      this.namingStrategy = NamingStrategy.valueOf(naming);
    }
    catch(Exception unused) {}
  }

  public void setVerbose(boolean verbose)
  {
    this.verbose = verbose;
  }

  @Override
  public void execute() throws BuildException
  {
    if(siteDir == null) {
      siteDir = DEFAULT_SITE_DIR;
    }
    if(namingStrategy == null) {
      namingStrategy = DEFAULT_NAMING_STRATEGY;
    }
    try {
      Builder builder = new Builder(getProject().getBaseDir().getAbsolutePath());
      builder.setBuildNumber(buildNumber);
      builder.setSiteDir(new File(siteDir));
      builder.setNamingStrategy(namingStrategy);
      builder.build();
    }
    catch(Exception e) {
      throw new BuildException(e);
    }
  }
}
