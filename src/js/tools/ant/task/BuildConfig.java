package js.tools.ant.task;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.Stack;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import js.tools.ant.util.Log;
import js.tools.commons.util.Files;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Task;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.DefaultHandler;

/**
 * Build application configuration.
 * <table border="1" style="border-collapse:collapse;">
 * <tr>
 * <td>Attribute
 * <td>Description
 * <td>Required
 * <tr>
 * <td><b>config</b>
 * <td>Optional configuration directory, default to <code>config</code>.
 * <td>No
 * <tr>
 * <td><b>variant</b>
 * <td>Build variant is the sub-directory where specific build configuration are stored.
 * <td>Yes
 * <tr>
 * <td><b>build</b>
 * <td>Optional build directory where configuration files are generated, default to <code>build</code>.
 * <td>No
 * </table>
 * 
 * <p>
 * Standard usage of this task is as follow:
 * 
 * <pre>
 *  &lt;taskdef name="js.BuildConfig" className="js.tools.ant.task.BuildConfig" /&gt;
 *  . . .
 *  &lt;target name="build-local-config"&gt;
 *      &lt;js.BuildConfig variant="local" /&gt;
 *  &lt;/target&gt;
 * </pre>
 * 
 * @author Iulian Rotaru
 * @version draft
 */
public class BuildConfig extends Task
{
  /** XML parser feature for schema validation. */
  private static final String FEAT_SCHEMA_VALIDATION = "http://apache.org/xml/features/validation/schema";

  private static final String DEF_CONFIG_PATH = "config";
  private static final String DEF_BUILD_PATH = "build";
  private static final String APP_DESCRIPTOR_XML = "app-descriptor.xml";
  private static final String APP_XML = "app.xml";
  private static final String WEB_XML = "web.xml";
  private static final String CONTEXT_XML = "context.xml";

  private String configPath = DEF_CONFIG_PATH;
  private String variant;
  private String context;
  private String buildPath = DEF_BUILD_PATH;

  private Log log;

  public void setConfig(String configPath)
  {
    this.configPath = configPath;
  }

  public void setVariant(String variant)
  {
    this.variant = variant;
  }

  public void setContext(String context)
  {
    this.context = context;
  }

  public void setBuild(String buildPath)
  {
    this.buildPath = buildPath;
  }

  @Override
  public void execute() throws BuildException
  {
    Project project = getProject();
    log = new Log(project, Deploy.class);
    File configDir = new File(project.getBaseDir(), configPath);
    File variantDir = new File(configDir, variant);
    File buildDir = new File(project.getBaseDir(), buildPath);
    buildDir.mkdirs();

    try {
      File contextFile = new File(variantDir, CONTEXT_XML);
      if(contextFile.exists()) {
        if(context == null) {
          context = project.getName();
        }
        Files.copy(contextFile, new File(buildDir, context + ".xml"));
      }

      Files.copy(new File(variantDir, WEB_XML), new File(buildDir, WEB_XML));
      log.debug("Create deployment descriptor.");

      Document document = createDocument();
      Loader loader = new Loader(document, variantDir);
      loadXML(new FileInputStream(new File(configDir, APP_DESCRIPTOR_XML)), loader);
      serializeDocument(document, new File(buildDir, APP_XML));
      log.debug("Create application descriptor.");
    }
    catch(Exception e) {
      throw new BuildException(e);
    }
  }

  private static Document createDocument() throws Exception
  {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    dbf.setIgnoringComments(true);
    dbf.setIgnoringElementContentWhitespace(true);
    dbf.setCoalescing(true);
    dbf.setFeature(FEAT_SCHEMA_VALIDATION, false);
    dbf.setValidating(false);
    dbf.setNamespaceAware(false);

    DocumentBuilder builder = dbf.newDocumentBuilder();
    Document document = builder.newDocument();
    document.appendChild(document.createElement("app-descriptor"));
    return document;
  }

  private static void serializeDocument(Document document, File targetFile) throws Exception
  {
    TransformerFactory tf = TransformerFactory.newInstance();
    Transformer transformer = tf.newTransformer();

    transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
    transformer.setOutputProperty(OutputKeys.METHOD, "xml");
    transformer.setOutputProperty(OutputKeys.INDENT, "yes");
    transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
    transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

    transformer.transform(new DOMSource(document), new StreamResult(new FileWriter(targetFile)));
  }

  private static void loadXML(InputStream stream, Loader loader) throws Exception
  {
    SAXParserFactory factory = SAXParserFactory.newInstance();
    SAXParser parser = factory.newSAXParser();
    XMLReader reader = parser.getXMLReader();
    reader.setContentHandler(loader);
    reader.parse(new InputSource(stream));
  }

  private static class Loader extends DefaultHandler
  {
    private final Document document;

    /** Directory where include files are stored. */
    private final File includeDir;

    private final Stack<Element> parentsStack;

    private int level;

    public Loader(Document document, File includeDir)
    {
      super();
      this.document = document;
      this.includeDir = includeDir;
      this.parentsStack = new Stack<>();
      this.parentsStack.push(document.getDocumentElement());
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException
    {
      if(level == 0) {
        ++level;
        return;
      }

      if(level == 1 && "include".equals(qName)) {
        try {
          level = 0;
          loadXML(new FileInputStream(new File(includeDir, attributes.getValue("file"))), this);
        }
        catch(Exception e) {
          throw new SAXException(e);
        }
        finally {
          level = 1;
        }
      }
      else {
        Element element = document.createElement(qName);
        for(int i = 0; i < attributes.getLength(); ++i) {
          final String attributeName = attributes.getQName(i);
          element.setAttribute(attributeName, attributes.getValue(attributeName));
        }

        Element parent = parentsStack.peek();
        parent.appendChild(element);
        parentsStack.push(element);
      }

      ++level;
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException
    {
      --level;
      if(level > 0) {
        parentsStack.pop();
      }
    }
  }
}
