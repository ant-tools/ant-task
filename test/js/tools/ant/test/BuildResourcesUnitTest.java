package js.tools.ant.test;

import java.io.File;

import js.tools.ant.task.BuildResources;
import junit.framework.TestCase;

import org.apache.tools.ant.Project;

public class BuildResourcesUnitTest extends TestCase
{
  public void testExecuteAntTask()
  {
    Project project = new Project();
    project.setBaseDir(new File("fixture/build-resources"));

    BuildResources resourcesBuildTask = new BuildResources();
    resourcesBuildTask.setProject(project);
    resourcesBuildTask.setSite("site");
    resourcesBuildTask.setVerbose(true);

    resourcesBuildTask.execute();
  }
}
