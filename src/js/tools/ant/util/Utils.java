package js.tools.ant.util;

import js.tools.commons.util.Files;
import js.tools.commons.util.Strings;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

public final class Utils
{
  public static String URL(boolean secure, String host, String context)
  {
    return URL(secure, host, 0, context);
  }

  public static String URL(boolean secure, String host, int port, String context)
  {
    StringBuilder url = new StringBuilder();

    url.append(secure ? "https" : "http");
    url.append("://");
    url.append(host);
    if(port != 0) {
      url.append(':');
      url.append(port);
    }
    url.append('/');

    url.append(context);
    if(context.charAt(context.length() - 1) != '/') {
      url.append('/');
    }

    return url.toString();
  }

  private static final String API_DOC_BASE_URL = "http://api.js-lib.com/js-ant/";

  public static void badArgument(Task task, String message) throws BuildException
  {
    String className = task.getClass().getName();

    StringBuilder sb = new StringBuilder(className);
    sb.append(": ");
    sb.append(message);
    sb.append(" See ");
    sb.append(Strings.concat(API_DOC_BASE_URL, Files.dot2urlpath(className), ".html"));
    throw new BuildException(sb.toString());
  }

  private Utils()
  {
  }
}
