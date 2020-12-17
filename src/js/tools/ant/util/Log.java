package js.tools.ant.util;

import org.apache.tools.ant.Project;

public class Log
{
  private Project project;
  private String className;

  public Log(Project project, Class<?> loggedClass)
  {
    this.project = project;
    this.className = loggedClass.getCanonicalName();
  }

  public void info(String message, Object... args)
  {
    log(Project.MSG_INFO, message, args);
  }

  public void warning(String message, Object... args)
  {
    log(Project.MSG_WARN, message, args);
  }

  public void debug(String message, Object... args)
  {
    log(Project.MSG_DEBUG, message, args);
  }

  public void error(String message, Object... args)
  {
    log(Project.MSG_ERR, message, args);
  }

  public void fatal(String message, Object... args)
  {
    log(Project.MSG_VERBOSE, message, args);
  }

  private void log(int level, String message, Object... args)
  {
    StringBuilder sb = new StringBuilder(this.className);
    sb.append(": ");
    sb.append(String.format(message, args));
    if(this.project == null) {
      // project can be null on debugging
      System.out.println(sb.toString());
    }
    else {
      this.project.log(sb.toString(), level);
    }
  }
}
