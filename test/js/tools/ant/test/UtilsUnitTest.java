package js.tools.ant.test;

import js.tools.ant.task.Deploy;
import js.tools.ant.util.Utils;
import junit.framework.TestCase;

import org.apache.tools.ant.BuildException;

public class UtilsUnitTest extends TestCase
{
  public void testBadArgument()
  {
    Deploy deploy = new Deploy();
    try {
      Utils.badArgument(deploy, "Source path is missing. Please set <sourcepath> attribute.");
    }
    catch(BuildException e) {
      assertEquals("js.tools.ant.task.GenerateScriptDoc: Source path is missing. Please set <sourcepath> attribute. See http://api.js-lib.com/js-ant/js/tools/ant/task/GenerateScriptDoc.html", e.getMessage());
      return;
    }
    fail("Bad argument method from utils should rise build exception.");
  }
}
