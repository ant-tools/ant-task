package js.tools.ant.task;

import java.io.File;
import java.io.IOException;

import js.server.client.AppsManager;
import js.tools.ant.util.Utils;
import js.tools.commons.rmi.FilesOutputStream;
import js.tools.commons.rmi.HttpRmi;
import js.tools.commons.rmi.StreamHandler;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

public class PublishWidgets extends Task
{
  private static final String AGENT_NAME = "server";

  private String hostName;
  private String agent = AGENT_NAME;
  private boolean secure;

  /**
   * Local source directory from where files are uploaded.
   */
  private File sourceDir;

  public void setHost(String hostName)
  {
    this.hostName = hostName;
  }

  public void setAgent(String agent)
  {
    this.agent = agent;
  }

  public void setSecure(boolean secure)
  {
    this.secure = secure;
  }

  /**
   * Set local source directory.
   * 
   * @param sourceDir local source directory.
   * @see #sourceDir
   */
  public void setSource(String sourceDir)
  {
    this.sourceDir = new File(sourceDir);
  }

  @Override
  public void execute() throws BuildException
  {
    if(hostName == null) {
      Utils.badArgument(this, "Host name is missing. Please set <host> attribute.");
    }

    String webContextURL = Utils.URL(secure, hostName, agent);
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
    rmi.setExceptions(IOException.class);

    rmi.invoke("publishWidgets", new StreamHandler<FilesOutputStream>(FilesOutputStream.class)
    {
      @Override
      protected void handle(FilesOutputStream files) throws IOException
      {
        files.addFiles(sourceDir);
      }
    });
  }
}
