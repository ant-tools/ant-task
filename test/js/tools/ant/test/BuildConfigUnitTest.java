package js.tools.ant.test;

import java.io.File;

import js.tools.ant.task.BuildConfig;

import org.apache.tools.ant.Project;
import org.junit.Test;

public class BuildConfigUnitTest
{
  @Test
  public void execute()
  {
    Project project = new Project();
    project.setBaseDir(new File("fixture/build-config"));

    BuildConfig task = new BuildConfig();
    task.setProject(project);
    task.setConfig("config");
    task.setVariant("local");
    task.setBuild("build");

    task.execute();
  }
}
