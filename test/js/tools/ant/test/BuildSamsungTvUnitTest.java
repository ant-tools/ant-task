package js.tools.ant.test;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.Charset;
import java.util.zip.ZipOutputStream;

import js.tools.ant.task.BuildSamsungTvApp;
import js.tools.ant.util.Log;
import js.tools.commons.util.Classes;
import junit.framework.TestCase;

public class BuildSamsungTvUnitTest extends TestCase
{
  public void testAddFileToArchive() throws Throwable
  {
    BuildSamsungTvApp task = new BuildSamsungTvApp();
    Classes.setFieldValue(task, "log", new Log(null, BuildSamsungTvApp.class));
    task.setContext("fixture/build-samsung-tv/context");
    File contextDir = new File((String)Classes.getFieldValue(task, "contextPath"));
    File archiveFile = new File("fixture/build-samsung-tv/archive.zip");
    assertFalse(archiveFile.exists());

    ZipOutputStream archive = new ZipOutputStream(new FileOutputStream(archiveFile), Charset.forName("UTF-8"));
    Classes.invoke(task, "addFileToArchive", contextDir, contextDir, archive);
    archive.close();

    assertTrue(archiveFile.exists());
    archiveFile.delete();
  }

  public void testExecute() throws Throwable
  {
    BuildSamsungTvApp task = new BuildSamsungTvApp();
    task.setApp("hello-world");
    task.setDir("fixture/build-samsung-tv");
    task.setContext("fixture/build-samsung-tv/context");
    task.setConfig("fixture/build-samsung-tv");

    Classes.invoke(task, "execute");
  }
}
