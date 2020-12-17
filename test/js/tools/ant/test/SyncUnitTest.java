package js.tools.ant.test;

import js.tools.ant.task.Sync;
import junit.framework.TestCase;

public class SyncUnitTest extends TestCase
{

  @Override
  protected void setUp() throws Exception
  {
    super.setUp();
  }

  public void testSingleNotExistingFile()
  {
    Sync sync = new Sync();
    sync.setHost("localhost");
    sync.setSource("fixture/sync/single.zip");
    sync.setTarget("js-lib.com/libraries");
    sync.execute();
  }
}
