package js.tools.ant.test;

import js.tools.ant.task.GenerateScriptDoc;
import js.tools.commons.util.Classes;
import junit.framework.TestCase;

public class GenerateScriptDocUnitTest extends TestCase
{
  public void testSetExcludes() throws Exception
  {
    GenerateScriptDoc task = new GenerateScriptDoc();
    assertNull(Classes.getFieldValue(task, "excludes"));

    for(String excludes : new String[]
    {
        "bootstrap,legacy", "bootstrap, legacy", "bootstrap ,legacy", "bootstrap  ,  legacy"
    }) {
      task.setExcludes(excludes);
      assertEquals("bootstrap,legacy", Classes.getFieldValue(task, "excludes"));
    }
  }

  public void testArgs() throws Throwable
  {
    GenerateScriptDoc task = new GenerateScriptDoc();
    task.setSourcePath("src");
    task.setDestDir("build/api");
    task.setExcludes("bootstrap,legacy");
    task.setWindowTitle("j(s)-lib Client");

    GenerateScriptDoc.Link link = task.createLink();
    link.setHref("http://api.bbnet.ro/window/");
    link = task.createLink();
    link.setHref("http://api.bbnet.ro/client/");

    String[] args = Classes.invoke(task, "args");
    assertNotNull(args);
    assertEquals(20, args.length);
    assertEquals("-private", args[0]);
    assertEquals("-author", args[1]);
    assertEquals("-version", args[2]);
    assertEquals("-sourcepath", args[3]);
    assertEquals("src", args[4]);
    assertEquals("-d", args[5]);
    assertEquals("build/api", args[6]);
    assertEquals("-excludes", args[7]);
    assertEquals("bootstrap", args[8]);
    assertEquals("legacy", args[9]);
    assertEquals("-tag", args[10]);
    assertEquals("assert:cm:Assert:", args[11]);
    assertEquals("-tag", args[12]);
    assertEquals("note:cfm:Note:", args[13]);
    assertEquals("-windowtitle", args[14]);
    assertEquals("j(s)-lib Client", args[15]);
    assertEquals("-link", args[16]);
    assertEquals("http://api.bbnet.ro/window/", args[17]);
    assertEquals("-link", args[18]);
    assertEquals("http://api.bbnet.ro/client/", args[19]);
  }

  public void testNullSourcePath() throws Exception
  {
    GenerateScriptDoc task = new GenerateScriptDoc();
    task.setDestDir("build/api");
    try {
      Classes.invoke(task, "args");
    }
    catch(Throwable e) {
      assertEquals("js.tools.ant.task.GenerateScriptDoc: Source path is missing. Please set <sourcepath> attribute. See http://api.js-lib.com/js-ant/js/tools/ant/task/GenerateScriptDoc.html", e.getMessage());
      return;
    }
    fail("Executing GenerateScriptDoc task without <sourcepath> attribute should rise BuildException.");
  }

  public void testNullDestDir()
  {
    GenerateScriptDoc task = new GenerateScriptDoc();
    task.setSourcePath("src");
    try {
      Classes.invoke(task, "args");
    }
    catch(Throwable e) {
      assertEquals("js.tools.ant.task.GenerateScriptDoc: Destination directory is missing. Please set <destdir> attribute. See http://api.js-lib.com/js-ant/js/tools/ant/task/GenerateScriptDoc.html", e.getMessage());
      return;
    }
    fail("Executing GenerateScriptDoc task without <destdir> attribute should rise BuildException.");
  }
}
