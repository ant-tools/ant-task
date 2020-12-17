__js_debug__ = true;
if (!Function.prototype.bind) 
{
  Function.prototype.bind = function(thisArg) {
  var _this = this, slice = Array.prototype.slice, args = slice.call(arguments, 1);
  return function() {
  return _this.apply(thisArg, args.concat(slice.call(arguments)));
};
};
}
;
if (!Array.prototype.indexOf) 
{
  Array.prototype.indexOf = function(searchItem, fromIndex) {
  var len = this.length;
  if (len === 0) 
  {
    return -1;
  }
  var from = (typeof fromIndex !== 'undefined') ? fromIndex : 0;
  if (from >= len) 
  {
    return -1;
  }
  if (from < 0) 
  {
    from = len - Math.abs(from);
    if (from < 0) 
    {
      from = 0;
    }
  }
  for (var i = from; i < this.length; ++i) 
    {
      if (this[i] === searchItem) 
      {
        return i;
      }
    }
  return -1;
};
}
;
if (!Array.prototype.lastIndexOf) 
{
  Array.prototype.lastIndexOf = function(searchItem, fromIndex) {
  var len = this.length;
  if (len === 0) 
  {
    return -1;
  }
  var from = (typeof fromIndex !== 'undefined') ? fromIndex : len;
  if (from >= 0) 
  {
    from = Math.min(from, len - 1);
  } else {
    from = len - Math.abs(from);
  }
  for (var i = from; i >= 0; --i) 
    {
      if (this[i] === searchItem) 
      {
        return i;
      }
    }
  return -1;
};
}
;
if (!Array.prototype.forEach) 
{
  Array.prototype.forEach = function forEach(callback, thisArg) {
  var T = undefined, k;
  if (this == null) 
  {
    throw new TypeError("this is null or not defined");
  }
  var O = Object(this);
  var len = O.length >>> 0;
  if ({}.toString.call(callback) !== "[object Function]") 
  {
    throw new TypeError(callback + " is not a function");
  }
  if (thisArg) 
  {
    T = thisArg;
  }
  k = 0;
  while (k < len) 
    {
      var kValue;
      if (Object.prototype.hasOwnProperty.call(O, k)) 
      {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
};
}
;
if (!Array.prototype.filter) 
{
  Array.prototype.filter = function(fun, thisp) {
  if (this == null) 
  throw new TypeError();
  var t = Object(this);
  var len = t.length >>> 0;
  if (typeof fun != "function") 
  throw new TypeError();
  var res = [];
  var thisp = arguments[1];
  for (var i = 0; i < len; i++) 
    {
      if (i in t) 
      {
        var val = t[i];
        if (fun.call(thisp, val, i, t)) 
        res.push(val);
      }
    }
  return res;
};
}
;
if (!Array.prototype.map) 
{
  Array.prototype.map = function(callback, thisArg) {
  var T, A, k;
  if (this == null) 
  {
    throw new TypeError(" this is null or not defined");
  }
  var O = Object(this);
  var len = O.length >>> 0;
  if (typeof callback !== "function") 
  {
    throw new TypeError(callback + " is not a function");
  }
  if (thisArg) 
  {
    T = thisArg;
  }
  A = new Array(len);
  k = 0;
  while (k < len) 
    {
      var kValue, mappedValue;
      if (k in O) 
      {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
  return A;
};
}
;
(function() {
  if (typeof js === "undefined") 
  {
    js = {};
  }
  if (typeof js.lang === "undefined") 
  {
    js.lang = {};
  }
})();
js.lang.Operator = {_CLASS_NAME_REX: /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*(\.[A-Z][a-zA-Z0-9_]*)+$/, _PACKAGE_NAME_REX: /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/, $assert: function(expression, method, message) {
  if (Boolean(expression)) 
  {
    return;
  }
  switch (arguments.length) {
    case 1:
      var caller = arguments.callee.caller.toString();
      if (caller.length > 200) 
      {
        caller = caller.substr(0, 197) + "...";
      }
      message = "Assertion fails on:\r\n-------------------\r\n" + caller;
      break;
    case 2:
      message = "Assertion fails on " + method;
      break;
    case 3:
      message = method + ": " + message;
      break;
    default:
      var args = [message];
      for (var i = 3; i < arguments.length; ++i) 
        {
          args.push(arguments[i]);
        }
      message = method + ": " + $format.apply(this, args);
  }
  throw new js.lang.AssertException(message);
}, $static: function(code, sync) {
  if (sync === true) 
  {
    try {
      code();
    }    catch (er) {
  js.ua.System.error("Static initialization fails. %s", er);
}
  } else {
    js.lang.Operator.$static._initializers.push(code);
  }
}, $preload: function(selectors) {
  if (typeof selectors === "function") 
  {
    selectors = "[data-class='" + selectors.prototype.toString() + "']";
  }
  js.lang.Operator.$preload._selectors.push(selectors);
}, $package: function(name) {
  var names, scope, i, j;
  if (!name || !js.lang.Operator._PACKAGE_NAME_REX.test(name)) 
  {
    js.ua.System.error("Invalid package name |%s|.", name);
    return;
  }
  names = name.split(".");
  for (i = 0; i < names.length; i++) 
    {
      scope = window;
      for (j = 0; j <= i; j++) 
        {
          if (typeof scope[names[j]] === "undefined") 
          {
            scope[names[j]] = {__package__: names.slice(0, j + 1).join(".")};
          }
          scope = scope[names[j]];
        }
    }
}, $declare: function(className, staticDeclaration) {
  var names, name, scope, packageName, i;
  if (!className || !js.lang.Operator._CLASS_NAME_REX.test(className)) 
  {
    js.ua.System.error("Invalid class name |%s|.", className);
    return;
  }
  if (typeof staticDeclaration === "undefined") 
  {
    staticDeclaration = true;
  }
  names = className.split(".");
  for (i = 0; i < names.length; i++) 
    {
      if (names[i].charAt(0) === names[i].charAt(0).toUpperCase()) 
      {
        break;
      }
      scope = window;
      for (j = 0; j <= i; j++) 
        {
          if (typeof scope[names[j]] === "undefined") 
          {
            scope[names[j]] = {__package__: names.slice(0, j + 1).join(".")};
          }
          scope = scope[names[j]];
        }
    }
  for (; i < names.length; i++) 
    {
      name = names[i];
      if (typeof scope[name] === "undefined") 
      {
        if (staticDeclaration) 
        {
          scope[name] = {};
        } else {
          scope[name] = function() {
};
        }
      }
      scope = scope[name];
    }
}, $include: function(className) {
  if (!className || !js.lang.Operator._CLASS_NAME_REX.test(className)) 
  {
    js.ua.System.error("Invalid class name |%s|.", className);
  }
}, $extends: function(subClass, superClass) {
  if (typeof subClass === "undefined") 
  {
    js.ua.System.error("Trying to extend undefined subclass.");
    return;
  }
  if (typeof subClass !== "function") 
  {
    js.ua.System.error("Trying to extend invalid subclass %s.", subClass);
    return;
  }
  if (typeof superClass === "undefined") 
  {
    js.ua.System.error("Undefined superclass when trying to extend %s.", subClass);
    return;
  }
  if (typeof superClass !== "function") 
  {
    js.ua.System.error("Invalid superclass %s when trying to extend %s.", superClass, subClass);
    return;
  }
  var subClassPrototype = subClass.prototype;
  function F() {
  }
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  for (var p in subClassPrototype) 
    {
      subClass.prototype[p] = subClassPrototype[p];
    }
  if (navigator.userAgent.indexOf("MSIE") !== -1) 
  {
    if (subClassPrototype.hasOwnProperty("toString")) 
    {
      subClass.prototype.toString = subClassPrototype.toString;
    }
    if (subClassPrototype.hasOwnProperty("valueOf")) 
    {
      subClass.prototype.valueOf = subClassPrototype.valueOf;
    }
  }
  subClass.prototype.constructor = subClass;
  subClass.prototype.__ctor__ = subClass;
  subClass.__super__ = superClass;
  if (typeof superClass.$extends === "function") 
  {
    superClass.$extends.call(superClass, subClass);
  }
  function getArguments(args) {
    if (args.length === 1 && typeof args[0] !== "undefined" && typeof args[0] !== "string" && typeof args[0].length !== "undefined" && typeof args[0].push === "undefined") 
    {
      return args[0];
    }
    return args;
  }
  subClass.prototype.$super = function() {
  var caller, methodName, args, ctor, method, value;
  caller = arguments.callee.caller;
  if (typeof caller.__super__ === "function") 
  {
    caller.__super__.apply(this, getArguments(arguments));
    return;
  }
  methodName = arguments[0];
  args = getArguments($args(arguments, 1));
  if (this.hasOwnProperty(methodName)) 
  {
    ctor = this.__ctor__;
  } else {
    for (ctor = this.__ctor__; ctor; ctor = ctor.__super__) 
      {
        if (ctor.prototype.hasOwnProperty(methodName) && ctor.prototype[methodName] === caller) 
        {
          break;
        }
      }
  }
  if (!(ctor && ctor.__super__)) 
  {
    js.ua.System.error("Super method |%s| does not override a subclass method.", methodName);
    return;
  }
  method = ctor.__super__.prototype[methodName];
  if (typeof method === "undefined") 
  {
    js.ua.System.error("Super method |%s| not found.", methodName);
    return;
  }
  if (typeof method !== "function") 
  {
    js.ua.System.error("Super method |%s| is not a function.", methodName);
    return;
  }
  method.__super_call__ = true;
  value = method.apply(this, args);
  method.__super_call__ = false;
  return value;
};
}, $implements: function(subClass, superInterface) {
  for (var methodName in superInterface) 
    {
      if (typeof subClass.prototype[methodName] === "undefined") 
      {
        js.ua.System.error("Missing method |%s| implementation from class |%s|.", methodName, subClass);
      }
    }
}, $mixin: function(targetClass, mixin) {
  if (typeof targetClass !== "function") 
  {
    js.ua.System.error("Mixin target is not a class.");
    return;
  }
  if (typeof mixin !== "object") 
  {
    js.ua.System.error("Mixin source is not an object.");
    return;
  }
  var target = targetClass.prototype;
  for (var p in mixin) 
    {
      if (mixin.hasOwnProperty(p) && typeof target[p] === "undefined") 
      {
        target[p] = mixin[p];
      }
    }
}, $args: function(args, startIdx) {
  if (typeof args === "undefined" || args === null || typeof args.callee !== "function") 
  {
    js.ua.System.error("Invalid function call arguments: undefined, null or callee function missing.");
    return;
  }
  if (typeof startIdx === "undefined") 
  {
    startIdx = 0;
  }
  var a = [];
  for (var i = startIdx; i < args.length; i++) 
    {
      a.push(args[i]);
    }
  return a;
}, $legacy: function(expression, legacyCode) {
  if (!expression) 
  {
    return;
  }
  try {
    legacyCode();
  }  catch (er) {
  js.ua.System.error("Legacy code execution fail. %s", er);
}
}, _FORMAT_PATTERN: /%%|%(?:(\d+)\$)?([-])?(\d+)?(?:\.(\d+))?([sSdeEoxX])/g, $format: function(format) {
  if (typeof format === "undefined") 
  {
    return "undefined";
  }
  if (format === null) 
  {
    return "null";
  }
  if (typeof format.callee === "function") 
  {
    var args = [];
    var startIdx = arguments.length > 1 ? arguments[1] : 0;
    var endIdx = arguments.length > 2 ? arguments[2] : arguments[0].length;
    for (var i = startIdx; i < endIdx; i++) 
      {
        args.push(arguments[0][i]);
      }
    return arguments.callee.apply(this, args);
  }
  if (typeof format !== "string" && !(format instanceof String)) 
  {
    return format.toString();
  }
  function string(value, flag, width, precision) {
    if (typeof value === "undefined") 
    {
      return "undefined";
    }
    if (value === null) 
    {
      return "null";
    }
    if (typeof value !== "string" && !(value instanceof String)) 
    {
      if (typeof value === "function") 
      {
        if (typeof value.prototype !== "undefined" && typeof value.prototype.toString === "function") 
        {
          value = value.prototype.toString();
        } else {
          value = "unknown";
        }
      } else if (value instanceof Array) 
      {
        value = "Array[" + value.length + "]";
      } else if (value instanceof Error && typeof value.message !== "undefined") 
      {
        value = value.message;
      } else {
        value = typeof value.toString === "function" ? value.toString() : "unknown";
      }
    }
    if (typeof width !== "undefined") 
    {
      var i = value.length;
      if (flag === "-") 
      {
        for (; i < width; ++i) 
          {
            value = " " + value;
          }
      } else {
        for (; i < width; ++i) 
          {
            value = value + " ";
          }
      }
    }
    if (typeof precision !== "undefined") 
    {
      value = value.substr(0, precision);
    }
    return value;
  }
  function STRING(value, flag, width, precision) {
    if (value === null) 
    {
      return "null";
    }
    return string(value, flag, width, precision).toUpperCase();
  }
  function integer(value, flag, width, precision, radix, noround) {
    if (value === null) 
    {
      return "0";
    }
    if (typeof value !== "number" && !(value instanceof Number)) 
    {
      js.ua.System.print("Expected number but get " + typeof value + " when trying to format integer value.");
      value = Number(value);
    }
    if (!noround) 
    {
      value = Math.round(value);
    }
    var s = value.toString(radix ? radix : 10);
    for (var i = s.length; i < width; ++i) 
      {
        s = "0" + s;
      }
    return s;
  }
  function real(value, flag, width, precision) {
    return integer(value, flag, width, precision, 10, true);
  }
  function octal(value, flag, width, precision) {
    return integer(value, flag, width, precision, 8);
  }
  function hexadecimal(value, flag, width, precision) {
    return integer(value, flag, width, precision, 16);
  }
  function HEXADECIMAL(value, flag, width, precision) {
    return hexadecimal(value, flag, width, precision).toUpperCase();
  }
  var handlers = {s: string, S: STRING, d: integer, e: real, E: real, o: octal, x: hexadecimal, X: HEXADECIMAL};
  var args = [];
  for (var i = 1; i < arguments.length; i++) 
    {
      args.push(arguments[i]);
    }
  var ordinaryIndex = 0;
  js.lang.Operator._FORMAT_PATTERN.lastIndex = 0;
  return format.replace(js.lang.Operator._FORMAT_PATTERN, function(match, index, flag, width, precision, conversion, offset, format) {
  if (match === "%%") 
  {
    return "%";
  }
  if (navigator.userAgent.indexOf("Gecko") !== -1) 
  {
    if (index === "") 
    {
      index = undefined;
    }
    if (flag === "") 
    {
      flag = undefined;
    }
    if (width === "") 
    {
      width = undefined;
    }
    if (precision === "") 
    {
      precision = undefined;
    }
  }
  index = typeof index !== "undefined" ? Number(index) - 1 : ordinaryIndex++;
  if (typeof width !== "undefined") 
  {
    width = Number(width);
  }
  if (typeof precision !== "undefined") 
  {
    precision = Number(precision);
  }
  var handler = handlers[conversion];
  if (typeof handler === "undefined") 
  {
    js.ua.System.print("No handler for conversion of <" + conversion + ">. Use string handler.");
    handler = handlers.s;
  }
  var value = args[index];
  if (typeof value === "undefined") 
  {
    value = null;
  }
  return handler(value, flag, width, precision);
});
}, $trace: function(sourceName, message) {
  $log("TRACE", sourceName, arguments.length > 2 ? $format(arguments, 1) : message);
}, $debug: function(sourceName, message) {
  $log("DEBUG", sourceName, arguments.length > 2 ? $format(arguments, 1) : message);
}, $info: function(sourceName, message) {
  $log("INFO", sourceName, arguments.length > 2 ? $format(arguments, 1) : message);
}, $warn: function(sourceName, message) {
  $log("WARN", sourceName, arguments.length > 2 ? $format(arguments, 1) : message);
}, $error: function(sourceName, message) {
  $log("ERROR", sourceName, arguments.length > 2 ? $format(arguments, 1) : message);
}, $fatal: function(sourceName, message) {
  $log("FATAL", sourceName, arguments.length > 2 ? $format(arguments, 1) : message);
}, _timestamp: new Date().getTime(), $log: function(level, sourceName, message) {
  if (typeof console === "undefined") 
  {
    return;
  }
  var t = new Date().getTime() - js.lang.Operator._timestamp;
  var text = t + " " + level + " " + sourceName;
  if (message instanceof Error) 
  {
    message = typeof message.message !== "undefined" ? message.message : message.toString();
  }
  if (typeof message !== "undefined") 
  {
    text += (' ' + message);
  }
  console.log(text);
}, toString: function() {
  return "js.lang.Operator";
}};
(function() {
  var i;
  var snippet = "js.lang.Operator.$level.disable = function() {" + "\t$level = js.lang.Operator.$level.NOP;" + "};" + "js.lang.Operator.$level.NOP = function() {" + "};" + "(js.lang.Operator.$level.NOP.enable = js.lang.Operator.$level.enable = function() {" + "\t$level = js.lang.Operator.$level;" + "})();";
  var levels = ["assert", "trace", "debug", "info", "warn", "error", "fatal"];
  for (i = 0; i < levels.length; ++i) 
    {
      eval(snippet.replace(/level/g, levels[i]));
    }
  js.lang.Operator.$static._initializers = [];
  js.lang.Operator.$static.execute = function() {
  var staticBlocks = js.lang.Operator.$static._initializers;
  for (i = 0; i < staticBlocks.length; ++i) 
    {
      try {
        staticBlocks[i]();
      }      catch (er) {
  js.ua.System.error("Static block initialization fails. %s", er);
}
    }
};
  js.lang.Operator.$preload._selectors = [];
  js.lang.Operator.$preload.execute = function() {
  var selectors = js.lang.Operator.$preload._selectors, it;
  for (i = 0; i < selectors.length; i++) 
    {
      it = WinMain.doc.findByCss(selectors[i]).it();
      while (it.hasNext()) 
        {
          it.next();
        }
    }
};
})();
$static = js.lang.Operator.$static;
$preload = js.lang.Operator.$preload;
$package = js.lang.Operator.$package;
$declare = js.lang.Operator.$declare;
$include = js.lang.Operator.$include;
$extends = js.lang.Operator.$extends;
$implements = js.lang.Operator.$implements;
$mixin = js.lang.Operator.$mixin;
$args = js.lang.Operator.$args;
$format = js.lang.Operator.$format;
$legacy = js.lang.Operator.$legacy;
$log = js.lang.Operator.$log;
$package("js.ua");
js.ua.System = {_ERROR_MESSAGE: 'Temporary failure. Please refresh the page.', print: function(message) {
  if (typeof console !== 'undefined') 
  {
    console.log(message.replace(/<br \/>/g, " "));
  }
}, error: function(er) {
  js.ua.System.print(js.ua.System._getErrorMessage(arguments));
  js.ua.System.alert(this._ERROR_MESSAGE);
}, alert: function(message) {
  $assert(message, 'js.ua.System#alert', 'Message is undefined, null or empty.');
  this._enlistDialog('alert', arguments);
}, toast: function(message) {
  $assert(message, 'js.ua.System#toast', 'Message is undefined, null or empty.');
  this._enlistDialog('toast', arguments);
}, prompt: function(message, callback, scope) {
  $assert(message, 'js.ua.System#prompt', 'Message is undefined, null or empty.');
  $assert(js.lang.Types.isFunction(callback), 'js.ua.System#prompt', 'Callback argument is not a function.');
  $assert(scope === undefined || js.lang.Types.isObject(scope), 'js.ua.System#prompt', 'Scope argument is not an object.');
  this._enlistDialog('prompt', arguments);
}, confirm: function(message, callback, scope) {
  $assert(message, 'js.ua.System#confirm', 'Message is undefined, null or empty.');
  $assert(js.lang.Types.isFunction(callback), 'js.ua.System#confirm', 'Callback argument is not a function.');
  $assert(scope === undefined || js.lang.Types.isObject(scope), 'js.ua.System#confirm', 'Scope argument is not an object.');
  this._enlistDialog('confirm', arguments);
}, _dialogsQueue: [], _dialogTimestamp: new Date(), _dialogsFlush: false, _enlistDialog: function(dialogName, args) {
  if (this._dialogsQueue === null) 
  {
    return;
  }
  var now = new Date();
  if (this._dialogsQueue.length > 1 && now.getTime() - this._dialogTimestamp.getTime() < 10000) 
  {
    this._dialogsFlush = true;
  }
  this._dialogTimestamp = now;
  this._dialogsQueue.push(arguments);
  if (this._dialogsQueue.length === 1) 
  {
    this._openDialog();
  }
}, _openDialog: function() {
  var dialogMeta = this._dialogsQueue[0];
  var dialog = this._getDialog(dialogMeta[0]);
  dialog.setOnCloseListener(this._onDialogClose, this);
  if (this._dialogsFlush) 
  {
    dialog.enablePreventCheckbox();
  }
  dialog.open.apply(dialog, dialogMeta[1]);
}, _onDialogClose: function(prevent) {
  if (prevent) 
  {
    this._dialogsQueue = null;
    return;
  }
  this._dialogsQueue.shift();
  if (this._dialogsQueue.length > 0) 
  {
    js.util.Timeout(100, this._openDialog, this);
  }
}, _getDialog: function(dialogName) {
  if (typeof WinMain === 'undefined' || WinMain.doc === null) 
  {
    return js.ua.System.FallBackAlert;
  }
  return js.ua.DialogsFactory.getDialog(dialogName);
}, _getErrorMessage: function(args) {
  if (args[0] instanceof Error) 
  {
    var er = args[0];
    var s = er.name;
    if (er.message) 
    {
      s += ('<br />' + er.message);
    }
    return s;
  }
  return $format(args);
}};
js.ua.System.FallBackAlert = {open: function(message) {
  message = message.replace(/<br \/>/g, "\n");
  alert(message);
  if (typeof console !== 'undefined') 
  {
    console.log(message);
  }
}, setOnCloseListener: function() {
}, enablePreventCheckbox: function() {
}};
(function() {
  if (typeof __js_debug__ !== 'undefined') 
  {
    js.ua.System.error = function(er) {
  var s = js.ua.System._getErrorMessage(arguments);
  js.ua.System.print(s);
  js.ua.System.alert(s);
};
  }
})();
$package("js.ua");
js.ua.Engine = {GECKO: false, PRESTO: false, TRIDENT: false, WEBKIT: false, MOBILE_WEBKIT: false, cssClass: null};
$static(function() {
  if (navigator.userAgent.indexOf("MSIE") !== -1) 
  {
    js.ua.Engine.TRIDENT = true;
    js.ua.Engine.cssClass = "trident";
  } else if (navigator.userAgent.indexOf("WebKit") !== -1) 
  {
    if (navigator.userAgent.indexOf("Mobile") !== -1 || navigator.userAgent.indexOf("Android") !== -1) 
    {
      js.ua.Engine.MOBILE_WEBKIT = true;
      js.ua.Engine.cssClass = "mobile-webkit";
    } else {
      js.ua.Engine.WEBKIT = true;
      js.ua.Engine.cssClass = "webkit";
    }
  } else if (navigator.userAgent.indexOf("Gecko") !== -1) 
  {
    js.ua.Engine.GECKO = true;
    js.ua.Engine.cssClass = "gecko";
  } else if (navigator.userAgent.indexOf("Presto") !== -1) 
  {
    js.ua.Engine.PRESTO = true;
    js.ua.Engine.cssClass = "presto";
  }
}, true);
$package("js.lang");
js.lang.Types = {isArray: function(value) {
  return (typeof value === "object" && value instanceof Array) || (typeof value !== "undefined" && value !== null && typeof value.callee === "function");
}, isObject: function(value) {
  return value !== null && (typeof value === "object" || typeof value === "function");
}, isFunction: function(value) {
  return typeof value === "function";
}, isString: function(value) {
  return typeof value === "string" || value instanceof String;
}, isNumber: function(value) {
  return typeof value === "number" || value instanceof Number;
}, isBoolean: function(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}, isPrimitive: function(value) {
  return this.isString(value) || this.isNumber(value) || this.isBoolean(value) || this.isDate(value);
}, isDate: function(value) {
  return value instanceof Date;
}, isElement: function(value) {
  if (!value) 
  {
    return false;
  }
  if (typeof value !== "function") 
  {
    value = value.__ctor__;
    if (typeof value === "undefined") 
    {
      return false;
    }
  }
  if (value === js.dom.Element) 
  {
    return true;
  }
  if (arguments.callee.call(this, value.__super__)) 
  {
    return true;
  }
  return false;
}, isNodeList: function(value) {
  return value && typeof value.length === "number" && typeof value.item === "function" && typeof value.nodeName === "undefined";
}, isStrictObject: function(value) {
  if (this.isArray(value)) 
  {
    return false;
  }
  if (this.isFunction(value)) 
  {
    return false;
  }
  if (this.isBoolean(value)) 
  {
    return false;
  }
  if (this.isNumber(value)) 
  {
    return false;
  }
  if (this.isString(value)) 
  {
    return false;
  }
  return this.isObject(value);
}, _TYPE_NAME_PATTERN: /\[object\s+(\w+)\]/, getTypeName: function(value) {
  if (value === null) 
  {
    return "Null";
  }
  if (typeof value === "undefined") 
  {
    return "Undefined";
  }
  var typeName = Object.prototype.toString.call(value);
  var type = this._TYPE_NAME_PATTERN.exec(typeName);
  if (type !== null) 
  {
    return type[1];
  }
  $debug("js.lang.Types#getTypeName", "Invalid type name |%s|. Return 'Unknown'.", typeName);
  return "Unknown";
}, toString: function() {
  return "js.lang.Types";
}};
$legacy(js.ua.Engine.TRIDENT, function() {
  js.lang.Types.isNodeList = function(value) {
  return value && typeof value.length === "number" && typeof value.item !== "undefined" && typeof value.nodeName === "undefined";
};
});
$package("js.net");
$include("js.lang.Types");
js.net.URL = function() {
  $assert(js.lang.Types.isString(arguments[0]), "js.net.URL#URL", "URL is not a string.");
  if (!(this instanceof js.net.URL)) 
  {
    var url = js.net.URL.normalize(arguments[0]);
    if (arguments.length > 1) 
    {
      url += js.net.URL.formatQuery(arguments[1]);
    }
    $assert((function() {
  var rex = js.net.URL.prototype._FULL_URL_REX;
  rex.lastIndex = 0;
  var m = rex.exec(url);
  return m !== null && m.length === 7;
})(), "js.net.URL#URL", "Malformed URL value: [%s]", url);
    return url;
  }
  if (arguments.length === 1) 
  {
    this._FULL_URL_REX.lastIndex = 0;
    var m = this._FULL_URL_REX.exec(arguments[0]);
    $assert(m !== null && m.length === 7, "js.net.URL#URL", "Malformed URL value |%s|", arguments[0]);
    this._init(m);
    this.parameters = this.query ? js.net.URL.parseQuery(this.query) : {};
    this.value = arguments[0];
    return;
  }
  if (arguments.length === 2) 
  {
    $assert(js.lang.Types.isObject(arguments[1]), "js.net.URL#URL", "Parameters is not an object.");
    this.parameters = arguments[1];
    var query = js.net.URL.formatQuery(this.parameters);
    this.value = arguments[0] + query;
    this._SHORT_URL_REX.lastIndex = 0;
    var m = this._SHORT_URL_REX.exec(arguments[0]);
    $assert(m !== null && m.length === 5, "js.net.URL#URL", "Malformed URL value |%s|", arguments[0]);
    m[5] = query.substr(1);
    this._init(m);
  }
};
js.net.URL.getHost = function(url) {
  $assert(url, "js.net.URL#getHost", "URL is undefined, null or empty.");
  if (url) 
  {
    var startIndex = url.indexOf("://");
    if (startIndex !== -1) 
    {
      if (url.substring(0, startIndex).toLowerCase() === "file") 
      {
        return "";
      }
      startIndex += 3;
      var endIndex = url.indexOf("/", startIndex);
      if (endIndex === -1) 
      {
        endIndex = url.length;
      }
      return url.substring(startIndex, endIndex);
    }
  }
  return null;
};
js.net.URL.parseQuery = function(query) {
  $assert(query, "js.net.URL#parseQuery", "Query is undefined, null or empty.");
  if (query) 
  {
    var parameters = {};
    var a = query.split("&");
    for (var i = 0, kv; i < a.length; i++) 
      {
        kv = a[i].split("=");
        parameters[kv[0]] = kv[1];
      }
    return parameters;
  }
  return null;
};
js.net.URL.formatQuery = function(parameters) {
  $assert(parameters, "js.net.URL#formatQuery", "Parameters hash is undefined or null.");
  var a = [], v;
  if (parameters) 
  {
    for (var p in parameters) 
      {
        v = parameters[p];
        if (v === true) 
        {
          v = 1;
        } else if (v === false) 
        {
          v = 0;
        }
        a.push(p + "=" + v);
      }
  }
  return a.length ? ("?" + a.join("&")) : "";
};
js.net.URL.normalize = function(url) {
  var rex = js.net.URL.prototype._SCHEMA_REX;
  rex.lastIndex = 0;
  if (rex.test(url)) 
  {
    return url;
  }
  var ref = WinMain.url;
  if (url.charAt(0) === "/") 
  {
    return $format("%s://%s:%d/%s", ref.protocol, ref.host, ref.port, url);
  }
  return ref.value.substring(0, ref.value.lastIndexOf("/") + 1) + url;
};
js.net.URL.prototype = {_FULL_URL_REX: /^(http|https|ftp|file):\/\/([^:\/]+)?(?::([0-9]{1,5}))?(?:(?:\/?)|(?:\/([^\/?#][^?#]*)))?(?:\?([^?#]+))?(?:#(.+)?)?$/gi, _SHORT_URL_REX: /^(http|https|ftp|file):\/\/([^:\/]+)(?::([0-9]{1,5}))?(?:(?:\/?)|(?:\/([^\/?#][^?#]*)))?$/gi, _SCHEMA_REX: /^[^:]+:\/\/.+$/gi, _init: function(matches) {
  this.protocol = matches[1] ? matches[1] : null;
  this.host = matches[2] ? matches[2] : null;
  this.port = Number(matches[3]) || 80;
  this.path = matches[4] ? matches[4] : null;
  this.query = matches[5] ? matches[5] : null;
  this.ref = matches[6] ? matches[6] : null;
}, isCrossDomain: function(url) {
  if (!url) 
  {
    return true;
  }
  url = new js.net.URL(js.net.URL.normalize(url));
  if (this.protocol !== url.protocol) 
  {
    return true;
  }
  if (this.host !== url.host) 
  {
    return true;
  }
  if (this.port !== url.port) 
  {
    return true;
  }
  return false;
}, toString: function() {
  return "js.net.URL";
}};
$extends(js.net.URL, Object);
$package("js.event");
js.event.CustomEvents = function(parent) {
  if (typeof parent !== "undefined") 
  {
    parent._customEvents = this;
  }
  this._events = {};
};
js.event.CustomEvents.prototype = {register: function() {
  $assert(arguments, "js.event.CustomEvents#register", "Missing arguments.");
  for (var i = 0, type; i < arguments.length; ++i) 
    {
      type = arguments[i];
      $assert(!(type in this._events), "js.event.CustomEvents#register", "Event type already registered.");
      if (!(type in this._events)) 
      {
        this._events[type] = [];
      }
    }
}, unregister: function() {
  $assert(arguments, "js.event.CustomEvents#unregister", "Missing arguments.");
  for (var i = 0, type; i < arguments.length; ++i) 
    {
      type = arguments[i];
      if (!(type in this._events)) 
      {
        $assert(false, "js.event.CustomEvents#unregister", "Event type is not registered.");
        continue;
      }
      delete this._events[type];
    }
}, addListener: function(type, listener, scope) {
  $assert(type in this._events, "js.event.CustomEvents#addListener", "Invalid event type.");
  $assert(listener, "js.event.CustomEvents#addListener", "Listener is undefined or null.");
  $assert(js.lang.Types.isFunction(listener), "js.event.CustomEvents#addListener", "Listener is not a function.");
  $assert(js.lang.Types.isObject(scope), "js.event.CustomEvents#addListener", "Scope is not an object.");
  var handlers = this._events[type];
  if (handlers) 
  {
    handlers.push({type: type, listener: listener, scope: scope});
  }
}, removeListener: function(type, listener) {
  $assert(type in this._events, "js.event.CustomEvents#removeListener", "Type %s is not defined.", type);
  $assert(js.lang.Types.isFunction(listener), "js.event.CustomEvents#removeListener", "Listener is not a function.");
  var handlers = this._events[type];
  if (handlers) 
  {
    js.util.Arrays.removeAll(handlers, function(handler) {
  $assert(!handler.running, "js.event.CustomEvents#removeListener", "Attempt to remove running listener for %s event.", handler.type);
  return !handler.running && handler.listener === listener;
});
  }
  return this;
}, removeAllListeners: function(type) {
  $assert(type in this._events, "js.event.CustomEvents#removeAllListeners", "Type %s is not defined.", type);
  $assert(this.hasListener(type), "js.event.CustomEvents#removeAllListeners", "Type %s has no listeners.", type);
  var handlers = this._events[type];
  if (handlers) 
  {
    js.util.Arrays.removeAll(handlers, function(handler) {
  $assert(!handler.running, "js.event.CustomEvents#removeAllListener", "Attempt to remove running listener for %s event.", handler.type);
  return !handler.running;
});
  }
  return this;
}, hasType: function(type) {
  return type in this._events;
}, hasListener: function(type) {
  $assert(type in this._events, "js.dom.CustomEvents#hasListener", "Invalid event type.");
  var handlers = this._events[type];
  return handlers !== null ? handlers.length !== 0 : false;
}, fire: function(type) {
  $assert(type, "js.dom.CustomEvents#fire", "Invalid event type.");
  var handlers = this._events[type];
  $assert(handlers !== null, "js.dom.CustomEvents#fire", "Trying to fire not registered event: %s.", type);
  if (handlers === null) 
  {
    return;
  }
  var results = [];
  var it = new js.lang.Uniterator(handlers), h;
  while (it.hasNext()) 
    {
      h = it.next();
      try {
        h.running = true;
        results.push(h.listener.apply(h.scope, $args(arguments, 1)));
        h.running = false;
      }      catch (er) {
  js.ua.System.error(er);
}
    }
  return results;
}, toString: function() {
  return "js.event.CustomEvents";
}, finalize: function() {
  $trace("js.event.CustomEvents#finalize");
  for (var key in this._events) 
    {
      if (js.lang.Types.isFunction(this._events[key].finalize)) 
      {
        this._events[key].finalize();
      }
    }
  delete this._events;
}};
$extends(js.event.CustomEvents, Object);
$package("js.ua");
$include("js.net.URL");
$include("js.event.CustomEvents");
js.ua.Window = function(nativeWindow, properties) {
  $assert(this instanceof js.ua.Window, "js.ua.Window#Window", "Invoked as function.");
  $assert(typeof nativeWindow !== "undefined" && nativeWindow !== null, "js.ua.Window#Window", "Native window is undefined or null.");
  if (typeof properties === "undefined") 
  {
    properties = {};
  }
  this._id = "js-window#" + js.ua.Window._index++;
  this._window = nativeWindow;
  this._parent = properties.parent || null;
  $assert(this._parent === null || this._parent instanceof js.ua.Window, "js.ua.Window#Window", "Parent is not of proper type.");
  this.url = null;
  if (properties.crossDomain) 
  {
    this.url = new js.net.URL(properties.url);
  }
  this.doc = null;
  this.page = null;
  this._dependentChildWindows = null;
  this._state = js.ua.Window.State.CREATED;
  $debug("js.ua.Window#Window", "Window %s has been created.", this._id);
  if (properties.crossDomain) 
  {
    $debug("js.ua.Window#Window", "Cross domain child window: parent domain |%s| different from child |%s|.", this._parent.url.host, this.url.host);
    return;
  }
  this._events = new js.event.CustomEvents();
  this._events.register("pre-dom-ready", "dom-ready", "load", "pre-unload", "unload", "orientation-change");
  this._addEventListener("DOMContentLoaded", this._domContentLoadedHandler, this);
  this._addEventListener("load", this._loadHandler, this);
  this._addEventListener("beforeunload", this._beforeUnloadHandler, this);
  this._addEventListener("unload", this._unloadHandler, this);
  if (typeof this._window.onorientationchange !== "undefined") 
  {
    this._addEventListener("orientationchange", this._orientationChangeHandler, this);
  }
};
js.ua.Window._index = 0;
js.ua.Window.prototype = {_DESTROY_CONFIRM: "Please confirm you want to leave the page.", open: function(url, parameters, features) {
  if (parameters) 
  {
    url += js.net.URL.formatQuery(parameters);
  }
  var name, value;
  if (typeof features === "undefined") 
  {
    features = {};
  }
  var defaults = js.ua.Window.Features;
  for (name in defaults) 
    {
      if (typeof features[name] === "undefined" && typeof defaults[name] !== "undefined") 
      {
        features[name] = defaults[name];
      }
    }
  if (features.fullscreen) 
  {
    delete features.top;
    delete features.left;
    delete features.width;
    delete features.height;
  }
  var specs = [];
  for (name in features) 
    {
      value = features[name];
      if (name === "name" || name === "dependent" || typeof value === "undefined") 
      {
        continue;
      }
      if (js.lang.Types.isBoolean(value)) 
      {
        value = value ? "yes" : "no";
      }
      specs.push(name + "=" + value);
    }
  var childWindow, childNativeWindow;
  try {
    childNativeWindow = this._window.open(url, features.name, specs.join(","), false);
    if (childNativeWindow === null) 
    {
      $error("js.ua.Window#open", "Fail to create native window:\r\n" + "\t- url: %s\r\n" + "\t- name: %s\r\n" + "\t- specs: %s", url, features.name, specs.join(","));
      return null;
    }
    childWindow = new js.ua.Window(childNativeWindow, {parent: this, url: url, crossDomain: this.url.isCrossDomain(url)});
    if (features.dependent) 
    {
      if (this._dependentChildWindows === null) 
      {
        this._dependentChildWindows = [];
      }
      this._dependentChildWindows.push(childWindow);
    }
  }  catch (er) {
  childWindow = null;
  js.ua.System.error(er);
}
  return childWindow;
}, close: function() {
  $debug("js.ua.Window#close", "Close window |%s|", this._id);
  if (this._window.closed) 
  {
    $debug("js.ua.Window#close", "Attempt to close already closed window |%s|", this._id);
    return;
  }
  this._window.close();
}, assign: function(url, parameters) {
  if (typeof parameters !== "undefined") 
  {
    url += js.net.URL.formatQuery(parameters);
  }
  this._window.location.assign(url);
  return this;
}, replace: function(url, parameters) {
  if (typeof parameters !== "undefined") 
  {
    url += js.net.URL.formatQuery(parameters);
  }
  this._window.location.replace(url);
  return this;
}, reload: function() {
  this._window.location.reload();
  return this;
}, getTitle: function() {
  $assert(this.doc !== null, "js.ua.System#getTitle", "Window document is null.");
  var title = this.doc.getByTag("title");
  return title != null ? title.getText() : "Untitled";
}, getWidth: function() {
  return Number(this._window.innerWidth);
}, getHeight: function() {
  return Number(this._window.innerHeight);
}, _EVENT_STATES: null, on: function(type, listener, scope) {
  $assert(this._state < js.ua.Window.State.FINALIZED, "js.ua.Window#on", "Can't add event listener after instance finalization.");
  if (this._EVENT_STATES === null) 
  {
    this._EVENT_STATES = {"dom-ready": js.ua.Window.State.DOM_READY, "load": js.ua.Window.State.LOADED, "pre-unload": js.ua.Window.State.BEFORE_UNLOADED, "unload": js.ua.Window.State.UNLOADED};
  }
  if (this._state >= this._EVENT_STATES[type]) 
  {
    listener.call(scope, this);
    return this;
  }
  this._events.addListener(type, listener, scope || js.ua.Window);
  return this;
}, un: function(type, listener) {
  $assert(this._state < js.ua.Window.State.FINALIZED, "js.ua.Window#un", "Can't remove event listener after instance finalization.");
  this._events.removeListener(type, listener);
  return this;
}, getOrientation: function() {
  return (this._window.orientation % 180 === 0) ? js.ua.Orientation.PORTRAIT : js.ua.Orientation.LANDSCAPE;
}, _domContentLoadedHandler: function() {
  $trace("js.ua.Window#_domContenLoadedHandler", this._id);
  this._removeEventListener("DOMContentLoaded", arguments.callee);
  this._fireDomReady();
}, _loadHandler: function() {
  $assert(this._state === js.ua.Window.State.CREATED || this._state === js.ua.Window.State.DOM_READY, "js.ua.Window#_loadHandler", "Invalid state. Expected CREATED or DOM_READY but got %s.", this._stateName());
  $trace("js.ua.Window#_loadHandler", this._id);
  this._removeEventListener("load", arguments.callee);
  this._fireDomReady();
  $debug("js.ua.Window#_loadHandler", "Fire load event for %s.", this._id);
  this._events.fire("load", this);
  this._state = js.ua.Window.State.LOADED;
}, _beforeUnloadHandler: function() {
  $assert(this._state === js.ua.Window.State.LOADED, "js.ua.Window#_beforeUnloadHandler", "Invalid state. Expected LOADED but got %s.", this._stateName());
  $debug("js.ua.Window#_beforeUnloadHandler", "Fire pre-unload event for %s.", this._id);
  this._removeEventListener("beforeunload", arguments.callee);
  var results = this._events.fire("pre-unload", this);
  var preventUnload = false;
  for (var i = 0; i < results.length; ++i) 
    {
      preventUnload |= (results[i] === false);
    }
  this._state = js.ua.Window.State.BEFORE_UNLOADED;
  if (preventUnload) 
  {
    return this._DESTROY_CONFIRM;
  }
}, _unloadHandler: function() {
  if (this._state === js.ua.Window.State.CREATED) 
  {
    $debug("js.ua.Window#_unloadHandler", "Ignore strange unload event on window creation.");
    return;
  }
  $assert(this._state === js.ua.Window.State.BEFORE_UNLOADED, "js.ua.Window#_unloadHandler", "Invalid state. Expected BEFORE_UNLOADED but got %s.", this._stateName());
  this._removeEventListener("unload", arguments.callee);
  $debug("js.ua.Window#_unloadHandler", "Fire unload event for %s.", this._id);
  this._events.fire("unload", this);
  if (this._dependentChildWindows !== null) 
  {
    this._dependentChildWindows.forEach(function(childWindow) {
  $debug("js.ua.Window#finalize", "Force child window %s closing on parent finalization.", childWindow._id);
  childWindow.close();
});
  }
  this._state = js.ua.Window.State.FINALIZED;
}, _orientationChangeHandler: function() {
  $debug("js.ua.Window#_orientationChangeHandler", "Fire orientation-change event for %s.", this._id);
  this._events.fire("orientation-change", this.getOrientation());
}, _addEventListener: function(type, listener, scope) {
  var target = (type === "DOMContentLoaded") ? this._window.document : this._window;
  target.addEventListener(type, listener.bind(scope), false);
}, _removeEventListener: function(type, listener) {
  var target = (type === "DOMContentLoaded") ? this._window.document : this._window;
  target.removeEventListener(type, listener, false);
}, _fireDomReady: function() {
  $assert(this._state === js.ua.Window.State.CREATED, "js.ua.Window#_fireDomReady", "Invalid state. Expected CREATED but got %s.", this._stateName());
  this._fireDomReady = js.lang.NOP;
  $assert(this.url === null, "js.ua.Window#_fireDomReady", "Window URL is not null.");
  this.url = new js.net.URL(this._window.location.toString());
  this.doc = new js.dom.Document(this._window.document);
  this.doc.body = this.doc.getByTag("body");
  if (this.doc.body !== null) 
  {
    this.doc.body.addCssClass(js.ua.Engine.cssClass);
  }
  var isWinMain = (this === WinMain);
  if (isWinMain) 
  {
    $assert(typeof $E === "undefined", "js.ua.Window#_fireDomReady", "Global selector for first element already defined.");
    $assert(typeof $L === "undefined", "js.ua.Window#_fireDomReady", "Global selector for list of elements already defined.");
    $E = function(selectors) {
  $assert(selectors, 'js.ua.Page#$E', 'Selectors is undefined, null or empty.');
  if (arguments.length > 1) 
  {
    selectors = $format(arguments);
  }
  return WinMain.doc.getElement(js.dom.Node.querySelector(window.document, selectors));
};
    $L = function(selectors) {
  $assert(selectors, 'js.ua.Page#$L', 'Selectors is undefined, null or empty.');
  if (arguments.length > 1) 
  {
    selectors = $format(arguments);
  }
  return WinMain.doc.getEList(js.dom.Node.querySelectorAll(window.document, selectors));
};
    $static.execute();
  }
  $debug("js.ua.Window#_fireDomReady", "Fire pre-dom-ready event for %s.", this._id);
  this._events.fire("pre-dom-ready", this);
  if (isWinMain) 
  {
    if (this === WinMain && this.page === null) 
    {
      $debug("js.ua.Window#_fireDomReady", "No user space page. Uses js.ua.Page instead.");
      this.page = new js.ua.Page();
    }
  }
  $debug("js.ua.Window#_fireDomReady", "Fire dom-ready event for for %s.", this._id);
  this._events.fire("dom-ready", this);
  if (isWinMain) 
  {
    $preload.execute();
  }
  this._state = js.ua.Window.State.DOM_READY;
}, _stateName: function() {
  if (typeof js.ua.Window.STATE_NAMES === "undefined") 
  {
    js.ua.Window.STATE_NAMES = ["NONE", "CREATED", "DOM_READY", "LOADED", "BEFORE_UNLOADED", "UNLOADED", "FINALIZED"];
  }
  return js.ua.Window.STATE_NAMES[this._state];
}, toString: function() {
  return "js.ua.Window";
}};
$extends(js.ua.Window, Object);
js.ua.Window.State = {NONE: 0, CREATED: 1, DOM_READY: 2, LOADED: 3, BEFORE_UNLOADED: 4, UNLOADED: 5, FINALIZED: 6};
js.ua.Window.Features = {top: undefined, left: undefined, width: undefined, height: undefined, resizable: false, fullscreen: false, menubar: true, location: true, toolbar: true, directories: true, scrollbars: true, status: true, dependent: true, name: "_blank"};
$legacy(!document.addEventListener || !document.removeEventListener, function() {
  js.ua.Window.prototype._addEventListener = function(type, listener, scope) {
  var doc = this._window.document;
  var _this = this;
  if (typeof this.__window_load_complete__ === "undefined") 
  {
    this.__window_load_complete__ = false;
  }
  if (typeof this.__dom_ready_fired__ === "undefined") 
  {
    this.__dom_ready_fired__ = false;
  }
  if (type !== "DOMContentLoaded") 
  {
    if (type === "load" && doc.readyState === "complete") 
    {
      $debug("js.ua.Window#_addEventListener", "Trying to register window load event after ready state complete.");
      _this.__window_load_complete__ = true;
      if (_this.__dom_ready_fired__) 
      {
        window.setTimeout(function() {
  _this.__window_load_complete__ = false;
  _this._loadHandler();
}, 10);
      }
    } else {
      this._window.attachEvent("on" + type, listener.bind(scope));
    }
    return this;
  }
  function fireDomReady() {
    if (!_this.__dom_ready_fired__) 
    {
      _this.__dom_ready_fired__ = true;
      _this._fireDomReady();
      if (_this.__window_load_complete__) 
      {
        _this.__window_load_complete__ = false;
        _this._loadHandler();
      }
    }
  }
  var docReadyStateHandler = function() {
  if (doc.readyState === "complete") 
  {
    doc.detachEvent("onreadystatechange", docReadyStateHandler);
    fireDomReady();
  }
};
  doc.attachEvent("onreadystatechange", docReadyStateHandler);
  if (this._window.top === this._window.self) 
  {
    (function() {
  try {
    doc.documentElement.doScroll("left");
  }  catch (e) {
  window.setTimeout(arguments.callee, 10);
  return;
}
  fireDomReady();
})();
  }
  return this;
};
  js.ua.Window.prototype._removeEventListener = function(type, listener) {
  if (type !== "DOMContentLoaded") 
  {
    this._window.detachEvent(type, listener);
  }
  return this;
};
});
$legacy(js.ua.Engine.TRIDENT, function() {
  js.ua.Window.__before_unload_handler__ = js.ua.Window.prototype._beforeUnloadHandler;
  js.ua.Window.prototype._beforeUnloadHandler = function() {
  if (this._state === js.ua.Window.State.LOADED) 
  {
    js.ua.Window.__before_unload_handler__.call(this);
  }
};
});
$include = function() {
};
$include("js.lang.Operator");
$include("js.ua.System");
$include("js.ua.Window");
(function() {
  try {
    WinMain = new js.ua.Window(window);
  }  catch (er) {
  js.ua.System.error(er);
}
})();
$package("js.dom");
js.dom.Element = function(ownerDoc, node) {
  var dataCfg, pairs, value, i;
  $assert(this instanceof js.dom.Element, "js.dom.Element#Element", "Invoked as function.");
  $assert(ownerDoc, "js.dom.Element#Element", "Undefined or null owner document.");
  $assert(ownerDoc instanceof js.dom.Document, "js.dom.Element#Element", "Owner document is not an instance of js.dom.Document.");
  $assert(node, "js.dom.Element#Element", "Undefined or null node.");
  $assert(node.nodeType === Node.ELEMENT_NODE, "js.dom.Element#Element", "Invalid node type #%d", node.nodeType);
  this._ownerDoc = ownerDoc;
  this._node = node;
  js.dom.Node.setElement(node, this);
  this.style = new js.dom.Style(this);
  this._format = js.format.Factory.getFormat(js.dom.Node.getFormatName(node));
  $assert(this._format === null || js.lang.Types.isObject(this._format), "js.dom.Element#Element", "Formatter is not an object.");
  this._config = {};
  dataCfg = this.getAttr("data-cfg");
  if (dataCfg !== null) 
  {
    pairs = js.util.Strings.parseNameValues(dataCfg);
    for (i = 0; i < pairs.length; i++) 
      {
        value = pairs[i].value;
        if (value === "true") 
        {
          value = true;
        } else if (value === "false") 
        {
          value = false;
        } else if (!isNaN(value)) 
        {
          value = Number(value);
        }
        this._config[js.util.Strings.toScriptCase(pairs[i].name)] = value;
      }
    this.removeAttr("data-cfg");
  }
  this._domEvents = new js.event.DomEvents(this);
  this._hashCode = $format("%X", js.util.Rand());
};
js.dom.Element.prototype = {getNode: function() {
  return this._node;
}, getOwnerDoc: function() {
  return this._ownerDoc;
}, addChild: function() {
  $assert(arguments.length > 0, "js.dom.Element#addChild", "Missing element to add.");
  for (var i = 0, a; i < arguments.length; ++i) 
    {
      a = arguments[i];
      $assert(a, "js.dom.Element#addChild", "Undefined or null argument.");
      if (a) 
      {
        $assert(a instanceof js.dom.Element, "js.dom.Element#addChild", "Argument is not a js.dom.Element.");
        if (a instanceof js.dom.Element) 
        {
          if (!this._ownerDoc.equals(a._ownerDoc)) 
          {
            a = this._ownerDoc.importElement(a);
          }
          this._node.appendChild(a._node);
        }
      }
    }
  return this;
}, addChildFirst: function(children) {
  $assert(children, "js.dom.Element#addChildFirst", "Undefined or null argument.");
  var firstChild = this.getFirstChild();
  if (children instanceof js.dom.Element) 
  {
    if (firstChild != null) 
    {
      firstChild.insertBefore(children);
    } else {
      this.addChild(children);
    }
    return this;
  }
  if (children instanceof js.dom.EList) 
  {
    var it = children.it();
    if (firstChild != null) 
    {
      while (it.hasNext()) 
        {
          firstChild.insertBefore(it.next());
        }
    } else {
      while (it.hasNext()) 
        {
          this.addChild(it.next());
        }
    }
    return this;
  }
  $assert(false, "js.dom.Element#addChildFirst", "Argument is not element or elist.");
  return this;
}, replaceChild: function(replacement, existing) {
  $assert(replacement, "js.dom.Element#replaceChild", "Replacement element is undefined or null.");
  $assert(existing, "js.dom.Element#replaceChild", "Existing element is undefined or null.");
  if (replacement && existing) 
  {
    if (!replacement._ownerDoc.equals(this._ownerDoc)) 
    {
      replacement = this._ownerDoc.importElement(replacement);
    }
    this._node.replaceChild(replacement._node, existing._node);
  }
  return this;
}, insertBefore: function(el) {
  $assert(el, "js.dom.Element#insertBefore", "Element to insert is undefined or null.");
  if (el) 
  {
    if (!el._ownerDoc.equals(this._ownerDoc)) 
    {
      el = this._ownerDoc.importElement(el);
    }
    $assert(this._node.parentNode, "js.dom.Element#insertBefore", "This element has no parent.");
    if (this._node.parentNode) 
    {
      this._node.parentNode.insertBefore(el._node, this._node);
    }
  }
  return this;
}, clone: function(deep) {
  $assert(typeof deep === "undefined" || js.lang.Types.isBoolean(deep), "js.dom.Element#clone", "Deep flag is not boolean.");
  return this._ownerDoc.getElement(this._node.cloneNode(deep === true));
}, replace: function(replacement) {
  $assert(replacement, "js.dom.Element#replace", "Replacement element is undefined or null.");
  if (replacement) 
  {
    if (!replacement._ownerDoc.equals(this._ownerDoc)) 
    {
      replacement = this._ownerDoc.importElement(replacement);
    }
    $assert(this._node.parentNode, "js.dom.Element#replace", "This element have not a parent.");
    if (this._node.parentNode) 
    {
      this._node.parentNode.replaceChild(replacement._node, this._node);
    }
  }
}, remove: function(clear) {
  $assert(typeof clear === "undefined" || clear === false, "js.dom.Element#remove", "Clear flag is not false.");
  if (clear === false) 
  {
    this._node.parentNode.removeChild(this._node);
    return this;
  }
  var tmpNodeRef = this._node;
  tmpNodeRef.parentNode.removeChild(tmpNodeRef);
  this._clean(this._node);
}, removeChildren: function() {
  var child, removed;
  while ((child = this._node.firstChild) !== null) 
    {
      removed = false;
      if (child.nodeType === Node.ELEMENT_NODE) 
      {
        var el = js.dom.Node.getElement(child);
        if (el !== null) 
        {
          el.remove();
          removed = true;
        }
      }
      if (!removed) 
      {
        this._node.removeChild(child);
      }
      child = this._node.firstChild;
    }
  return this;
}, getByXPath: function(xpath) {
  $assert(xpath, "js.dom.Element#getByXPath", "XPath expression is undefined, null or empty.");
  if (arguments.length > 1) 
  {
    xpath = $format(arguments);
  }
  return null;
}, findByXPath: function(xpath) {
  $assert(xpath, "js.dom.Element#findByXPath", "XPath expression is undefined, null or empty.");
  if (arguments.length > 1) 
  {
    xpath = $format(arguments);
  }
  return this._ownerDoc.getEList(new js.dom.NodeList());
}, getByCss: function(selectors) {
  $assert(selectors, "js.dom.Element#getByCss", "CSS selectors is undefined, null or empty.");
  if (arguments.length > 1) 
  {
    selectors = $format(arguments);
  }
  return this._ownerDoc.getElement(js.dom.Node.querySelector(this._node, selectors));
}, findByCss: function(selectors) {
  $assert(selectors, "js.dom.Element#findByCss", "CSS selectors is undefined, null or empty.");
  if (arguments.length > 1) 
  {
    selectors = $format(arguments);
  }
  return this._ownerDoc.getEList(js.dom.Node.querySelectorAll(this._node, selectors));
}, getByTag: function(tag) {
  $assert(tag, "js.dom.Element#getByTag", "Tag name is undefined, null or empty.");
  return this._ownerDoc.getElement(js.dom.Node.getElementsByTagName(this._node, tag));
}, findByTag: function(tag) {
  $assert(tag, "js.dom.Element#findByTag", "Tag name is undefined, null or empty.");
  return this._ownerDoc.getEList(js.dom.Node.getElementsByTagName(this._node, tag));
}, getByCssClass: function(cssClass) {
  $assert(cssClass, "js.dom.Element#getByCssClass", "CSS class is undefined, null or empty.");
  return this._ownerDoc.getElement(js.dom.Node.getElementsByClassName(this._node, cssClass));
}, findByCssClass: function(cssClass) {
  $assert(cssClass, "js.dom.Element#findByCssClass", "CSS class is undefined, null or empty.");
  return this._ownerDoc.getEList(js.dom.Node.getElementsByClassName(this._node, cssClass));
}, getParent: function() {
  if (this._node.parentNode === null) 
  {
    return null;
  }
  return this._node.parentNode.nodeType === Node.ELEMENT_NODE ? this._ownerDoc.getElement(this._node.parentNode) : null;
}, getParentByTag: function(tag) {
  var el = this;
  while (el.getTag() !== tag) 
    {
      el = el.getParent();
      if (el === null) 
      {
        return null;
      }
    }
  return el;
}, getParentByCssClass: function(cssClass) {
  var el = this;
  while (!el.hasCssClass(cssClass)) 
    {
      el = el.getParent();
      if (el === null) 
      {
        return null;
      }
    }
  return el;
}, getChildren: function() {
  return this._ownerDoc.getEList(this._node.children);
}, hasChildren: function() {
  return js.dom.Node.firstElementChild(this._node) !== null;
}, getFirstChild: function() {
  return this._ownerDoc.getElement(js.dom.Node.firstElementChild(this._node));
}, getLastChild: function() {
  return this._ownerDoc.getElement(js.dom.Node.lastElementChild(this._node));
}, getPreviousSibling: function() {
  return this._ownerDoc.getElement(js.dom.Node.previousElementSibling(this._node));
}, getNextSibling: function() {
  return this._ownerDoc.getElement(js.dom.Node.nextElementSibling(this._node));
}, getTag: function() {
  return this._node.tagName.toLowerCase();
}, setAttr: function() {
  $assert(arguments.length >= 2, "js.dom.Element#setAttr", "Missing attribute name and/or value.");
  $assert(arguments.length % 2 === 0, "js.dom.Element#setAttr", "Odd number of arguments.");
  if (arguments.length > 2) 
  {
    for (var i = 0, l = arguments.length - 1; i < l; ) 
      {
        arguments.callee.call(this, arguments[i++], arguments[i++]);
      }
  } else if (arguments.length === 2) 
  {
    $assert(js.lang.Types.isString(arguments[0]), "js.dom.Element#setAttr", "Attribute name is not a string.");
    $assert(js.lang.Types.isString(arguments[1]), "js.dom.Element#setAttr", "Attribute value is not a string.");
    this._node.setAttribute(arguments[0], arguments[1]);
  }
  return this;
}, getAttr: function(name) {
  $assert(name, "js.dom.Element#getAttr", "Attribute name is undefined, null or empty.");
  if (this._node.attributes.length > 0) 
  {
    var attr = this._node.attributes.getNamedItem(name);
    if (attr !== null) 
    {
      return attr.value;
    }
  }
  return null;
}, removeAttr: function(name) {
  $assert(name, "js.dom.Element#removeAttr", "Attribute name is undefined, null or empty.");
  if (name) 
  {
    this._node.removeAttribute(name);
  }
  return this;
}, hasAttr: function(name) {
  if (this._node.attributes.length === 0) 
  {
    return false;
  }
  $assert(name, "js.dom.Element#hasAttr", "Attribute name is undefined, null or empty.");
  return this._node.attributes.getNamedItem(name) !== null;
}, addText: function(text) {
  $assert(text, "js.dom.Element#addText", "Text is undefined, null or empty.");
  if (text) 
  {
    if (!js.lang.Types.isString(text)) 
    {
      text = text.toString();
    }
    this._node.appendChild(this._ownerDoc._document.createTextNode(text));
  }
  return this;
}, setText: function(text) {
  $assert(typeof text !== "undefined" && text !== null && text !== "", "js.dom.Element#setText", "Text argument is undefined, null or empty.");
  if (!(typeof text !== "undefined" && text !== null && text !== "")) 
  {
    return this.removeText();
  }
  if (!js.lang.Types.isString(text)) 
  {
    text = text.toString();
  }
  var textNode = this.removeText(true);
  if (textNode === null) 
  {
    this._node.appendChild(this._ownerDoc._document.createTextNode(text));
  } else {
    textNode.nodeValue = text;
  }
  return this;
}, getText: function() {
  var text = "";
  var nodelist = this._node.childNodes;
  for (var i = 0; i < nodelist.length; i++) 
    {
      var node = nodelist.item(i);
      if (node.nodeType === Node.TEXT_NODE) 
      {
        text += node.nodeValue;
      }
    }
  return text;
}, removeText: function() {
  var first = false, firstTextNode = null;
  if (arguments[0] === true) 
  {
    first = true;
  }
  var nodelist = this._node.childNodes;
  for (var i = 0; i < nodelist.length; ++i) 
    {
      var node = nodelist.item(i);
      if (node.nodeType === Node.TEXT_NODE) 
      {
        if (first) 
        {
          firstTextNode = node;
        } else {
          this._node.removeChild(node);
          --i;
        }
        first = false;
      }
    }
  return arguments[0] === true ? firstTextNode : this;
}, addCssClass: function(cssClass, enabled) {
  $assert(cssClass, "js.dom.Element#addCssClass", "CSS class is undefined, null or empty.");
  if (cssClass) 
  {
    if (typeof enabled === "undefined") 
    {
      enabled = true;
    }
    if (enabled) 
    {
      this._node.classList.add(cssClass);
    } else {
      this._node.classList.remove(cssClass);
    }
  }
  return this;
}, removeCssClass: function(cssClass) {
  $assert(cssClass, "js.dom.Element#removeCssClass", "CSS class is undefined, null or empty.");
  if (cssClass) 
  {
    this._node.classList.remove(cssClass);
  }
  return this;
}, toggleCssClass: function(cssClass) {
  $assert(cssClass, "js.dom.Element#toggleCssClass", "CSS class is undefined, null or empty.");
  if (cssClass) 
  {
    this._node.classList.toggle(cssClass);
  }
  return this;
}, hasCssClass: function(cssClass) {
  $assert(cssClass, "js.dom.Element#hasCssClass", "CSS class is undefined, null or empty.");
  if (!cssClass) 
  {
    return false;
  }
  return this._node.classList.contains(cssClass);
}, setValue: function(value) {
  $assert(typeof value !== "undefined", "js.dom.Element#setValue", "Value is undefined.");
  $assert(!this.hasChildren(), "js.dom.Element#setValue", "Unsupported state: this element has children.");
  if (typeof value === "undefined") 
  {
    return this;
  }
  if (value === null) 
  {
    return this.removeText();
  }
  if (this._format !== null) 
  {
    value = this._format.format(value);
  }
  $assert(js.lang.Types.isPrimitive(value), "js.dom.Element#setValue", "Expected primitive but got %s.", value);
  return this.setText(value);
}, getValue: function() {
  $assert(!this.hasChildren(), "js.dom.Element#getValue", "Unsupported state: this element has children.");
  var v = this.getText();
  return this._format !== null ? this._format.parse(v) : v.length > 0 ? v : null;
}, setObject: function(value) {
  $assert(!arguments.callee.__super_call__, "js.dom.Element#setObject", "$super call!");
  $assert(!js.lang.Types.isPrimitive(value), "js.dom.Element#setObject", "Primitive value not supported.");
  $assert(js.lang.Types.isArray(value) || this.hasChildren(), "js.dom.Element#setObject", "Unsupported state: this element has no child.");
  this._ownerDoc._template.subinject(this, value);
  return this;
}, addHTML: function(html) {
  $assert(html, "js.dom.Element#setHTML", "HTML fragment is undefined, null or empty.");
  if (html) 
  {
    var range = this._ownerDoc._document.createRange();
    range.selectNode(this._node);
    var fragment = range.createContextualFragment(html);
    this._node.appendChild(fragment);
  }
  return this;
}, setHTML: function(html) {
  $assert(html, "js.dom.Element#setHTML", "HTML fragment is undefined, null or empty.");
  this.removeChildren();
  if (html) 
  {
    this._node.innerHTML = html;
  }
  return this;
}, getHTML: function() {
  return this._node.innerHTML;
}, focus: function() {
  this._node.focus();
  return this;
}, on: function(type, listener, scope, capture) {
  if (typeof this._customEvents !== "undefined" && this._customEvents.hasType(type)) 
  {
    this._customEvents.addListener(type, listener, scope);
    return this;
  }
  if (typeof capture === "undefined") 
  {
    capture = false;
  }
  this._domEvents.addListener(type, listener, scope, capture);
  return this;
}, un: function(type, listener) {
  if (typeof this._customEvents !== "undefined" && this._customEvents.hasType(type)) 
  {
    this._customEvents.removeListener(type, listener);
    return this;
  }
  if (typeof capture === "undefined") 
  {
    capture = false;
  }
  this._domEvents.removeListener(type, listener, capture);
  return this;
}, setUserData: function(key, data) {
  $assert(key, "js.dom.Element#setUserData", "Key is undefined, null or empty.");
  if (!key) 
  {
    return null;
  }
  if (typeof this._userData === "undefined") 
  {
    this._userData = {};
  }
  var previousData = this._userData[key];
  if (typeof previousData === "undefined") 
  {
    previousData = null;
  }
  if (data === null) 
  {
    delete this._userData[key];
  } else {
    this._userData[key] = data;
  }
  return previousData;
}, getUserData: function(key) {
  if (typeof key === "undefined") 
  {
    key = "value";
  }
  $assert(key, "js.dom.Element#getUserData", "Key is null or empty.");
  if (!key) 
  {
    return null;
  }
  if (typeof this._userData === "undefined") 
  {
    return null;
  }
  var data = this._userData[key];
  return typeof data !== "undefined" ? data : null;
}, removeUserData: function(key) {
  $assert(key, "js.dom.Element#removeUserData", "Key is undefined, null or empty.");
  if (!key) 
  {
    return null;
  }
  if (typeof this._userData === "undefined") 
  {
    return null;
  }
  var data = this._userData[key];
  if (typeof data === "undefined") 
  {
    return null;
  }
  delete this._userData[key];
  return data;
}, bind: function(selectors, typeName) {
  js.dom.Node.bind(this._node, selectors, typeName);
}, getCustomEvents: function() {
  if (typeof this._customEvents === "undefined") 
  {
    this._customEvents = new js.event.CustomEvents(this);
  }
  return this._customEvents;
}, show: function(show) {
  if (typeof show === "undefined") 
  {
    show = true;
  }
  return this[(show ? "remove" : "add") + "CssClass"]("hidden");
}, hide: function() {
  return this.addCssClass("hidden");
}, _clean: function(node, guard) {
  if (typeof guard === "undefined") 
  {
    guard = 0;
  }
  $assert(guard < 8, "js.dom.Element#_clean", "Too many recursive iterations.");
  if (guard === 8) 
  {
    return;
  }
  var it = new js.dom.Node.Iterator(node);
  while (it.hasNext()) 
    {
      guard++;
      arguments.callee.call(this, it.next(), guard);
      guard--;
    }
  var el = js.dom.Node.getElement(node);
  if (el !== null) 
  {
    delete el._ownerDoc;
    delete el._node;
    delete el.style;
    if (el._format !== null) 
    {
      delete el._format;
    }
    el._domEvents.finalize();
    delete el._domEvents;
    if (typeof el._customEvents !== "undefined") 
    {
      el._customEvents.finalize();
      delete el._customEvents;
    }
    if (typeof el._userData !== "undefined") 
    {
      for (var p in el._userData) 
        {
          delete el._userData[p];
        }
      delete el._userData;
    }
    js.dom.Node.removeBackRef(node);
  }
}, trace: function() {
  var sb = "";
  var el = this, index;
  while (el != null) 
    {
      index = el._index();
      if (index != -1) 
      {
        sb = "[" + index + "]" + sb;
      }
      sb = "/" + el.getTag() + sb;
      el = el.getParent();
    }
  return sb;
}, _index: function() {
  var parent = this.getParent();
  if (parent == null) 
  {
    return -1;
  }
  var n = parent._node.firstChild;
  var index = 0, twinsCount = 0, indexFound = false;
  while (n != null) 
    {
      if (n === this._node) 
      {
        indexFound = true;
      }
      if (n.nodeType === Node.ELEMENT_NODE && n.nodeName === this._node.nodeName) 
      {
        ++twinsCount;
        if (!indexFound) 
        {
          ++index;
        }
      }
      n = n.nextSibling;
    }
  return twinsCount > 1 ? index : -1;
}, hashCode: function() {
  return this._hashCode;
}, toString: function() {
  return "js.dom.Element";
}};
$extends(js.dom.Element, Object);
js.dom.Element.prototype.$E = js.dom.Element.prototype.getByCss;
js.dom.Element.prototype.$L = js.dom.Element.prototype.findByCss;
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Element.prototype.clone = function(deep) {
  $assert(typeof deep === "undefined" || js.lang.Types.isBoolean(deep), "js.dom.Element#clone", "Deep flag is not boolean.");
  var clone = this._node.cloneNode(deep === true);
  this._ieCloneWorkaround(this, clone, 0);
  return this._ownerDoc.getElement(clone);
};
  js.dom.Element.prototype._ieCloneWorkaround = function(originalElement, cloneNode, guard) {
  $assert(guard < 8, "js.dom.Element#_ieCloneWorkaround", "Too many recursive iterations.");
  if (guard === 8) 
  {
    return;
  }
  var originalElementsIt = originalElement.getChildren().it();
  var cloneNodesIt = new js.dom.Node.Iterator(cloneNode);
  while (cloneNodesIt.hasNext()) 
    {
      ++guard;
      arguments.callee.call(this, originalElementsIt.next(), cloneNodesIt.next(), guard);
      --guard;
    }
  originalElement._domEvents.getHandlers().forEach(function(handler) {
  cloneNode.detachEvent("on" + handler.type, handler.domEventListener);
});
  js.dom.Node.removeBackRef(cloneNode);
};
  js.dom.Element.prototype.addHTML = function(html) {
  if (html) 
  {
    this._node.insertAdjacentHTML("beforeEnd", html);
  }
  return this;
};
  js.dom.Element.prototype.getChildren = function() {
  var nodeList = this._node.childNodes;
  for (var i = 0, child; i < nodeList.length; ++i) 
    {
      child = nodeList.item(i);
      if (child.nodeType !== Node.ELEMENT_NODE) 
      {
        child.parentNode.removeChild(child);
      }
    }
  return this._ownerDoc.getEList(nodeList);
};
});
$legacy(js.ua.Engine.TRIDENT || js.ua.Engine.MOBILE_WEBKIT, function() {
  js.dom.Element.prototype.addCssClass = function(cssClass) {
  $assert(cssClass, "js.dom.Element#addCssClass", "CSS class is undefined, null or empty.");
  if (cssClass) 
  {
    cssClass = js.util.Strings.trim(cssClass);
    if (!this.hasCssClass(cssClass)) 
    {
      if (this._node.className.length === 0) 
      {
        this._node.className = cssClass;
      } else {
        this._node.className = [this._node.className, cssClass].join(" ");
      }
    }
  }
  return this;
};
  js.dom.Element.prototype.removeCssClass = function(cssClass) {
  $assert(cssClass, "js.dom.Element#removeCssClass", "CSS class is undefined, null or empty.");
  if (cssClass) 
  {
    var re = new RegExp("(?:^|\\s+)" + js.util.Strings.escapeRegExp(cssClass) + "(?:\\s+|$)", "g");
    if (re.test(this._node.className)) 
    {
      this._node.className = js.util.Strings.trim(this._node.className.replace(re, " "));
    }
  }
  return this;
};
  js.dom.Element.prototype.toggleCssClass = function(cssClass) {
  $assert(cssClass, "js.dom.Element#toggleCssClass", "CSS class is undefined, null or empty.");
  if (cssClass) 
  {
    this[this.hasCssClass(cssClass) ? "removeCssClass" : "addCssClass"](cssClass);
  }
  return this;
};
  js.dom.Element.prototype.hasCssClass = function(cssClass) {
  $assert(cssClass, "js.dom.Element#hasCssClass", "CSS class is undefined, null or empty.");
  if (!cssClass) 
  {
    return false;
  }
  var re = new RegExp("(?:^|\\s+)" + js.util.Strings.escapeRegExp(cssClass) + "(?:\\s+|$)", "g");
  return re.test(this._node.className);
};
});
$package('js.dom');
js.dom.Anchor = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Anchor, 'js.dom.Anchor#Anchor', 'Invoked as function.');
  this.$super(ownerDoc, node);
  $assert(node.nodeName.toLowerCase() === 'a', 'js.dom.Anchor#Anchor', 'Node is not an anchor.');
};
js.dom.Anchor.prototype = {setHref: function(href) {
  $assert(href, 'js.dom.Anchor#setHref', 'HREF is undefined, null or empty.');
  if (href) 
  {
    this.setAttr('href', href);
  }
  return this;
}, getHref: function() {
  return this.getAttr('href');
}, toString: function() {
  return 'js.dom.Anchor';
}};
$extends(js.dom.Anchor, js.dom.Element);
$package('js.dom');
js.dom.Box = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._caption = this.getByCssClass(this._CAPTION);
  $assert(this._caption !== null, 'js.dom.Box#Box', 'Invalid Box. Caption element missing.');
  if (this._caption === null) 
  {
    return;
  }
  this._caption.on('mousedown', this._onCaptionMouseDown, this);
  this._caption.on('mouseup', this._onCaptionMouseUp, this);
  $assert(this.style.getPosition() === "fixed", "js.dom.Box#Box", "Element is not fixed positioned.");
  if (this.style.getPosition() !== "fixed") 
  {
    this.style.setPosition("fixed");
  }
  this._movingStateDelay = new js.util.Timeout(this._MOVING_STATE_DELAY);
  this._movingStateDelay.setCallback(this._onStartMoving, this);
  this.style.setLeft((WinMain.getWidth() - this.getWidth()) / 2).setTop(WinMain.getHeight() / 4);
  var boxClose = this.getByCss('.box-close');
  if (boxClose !== null) 
  {
    boxClose.on('click', this._onBoxClose, this);
  }
  this._x = 0;
  this._y = 0;
  this._FRAME_REQUEST_CALLBACK = this._moveBox.bind(this);
};
js.dom.Box.prototype = {_CAPTION: 'caption', _MOVING_STATE_DELAY: 100, _SWAP_STYLES: {position: 'absolute', visibility: 'hidden', display: 'block'}, getWidth: function() {
  function width() {
    return this._node.offsetWidth;
  }
  var w = width.call(this);
  if (w === 0) 
  {
    w = this.style.swap(this._SWAP_STYLES, width, this);
  }
  return w;
}, getHeight: function() {
  function height() {
    return this._node.offsetHeight;
  }
  var h = height.call(this);
  if (h === 0) 
  {
    h = this.style.swap(this._SWAP_STYLES, height, this);
  }
  return h;
}, _onCaptionMouseDown: function(ev) {
  ev.halt();
  this._boxStartX = parseInt(this.style.get('left'));
  this._boxStartY = parseInt(this.style.get('top'));
  this._mouseStartX = ev.pageX;
  this._mouseStartY = ev.pageY;
  this._ownerDoc.un('mousemove', this._onDocumentMouseMove);
  this._ownerDoc.un('mouseup', this._onDocumentMouseUp);
  this._movingStateDelay.start();
}, _onCaptionMouseUp: function(ev) {
  if (this._movingStateDelay.isTicking()) 
  {
    this._movingStateDelay.stop();
  }
}, _onStartMoving: function() {
  var boxWidth = this.getWidth();
  var boxHeight = this.getHeight();
  this._maxX = WinMain.getWidth() - boxWidth;
  this._maxY = WinMain.getHeight() - boxHeight;
  this.addCssClass('moving');
  this._ownerDoc.on('mousemove', this._onDocumentMouseMove, this);
  this._ownerDoc.on('mouseup', this._onDocumentMouseUp, this);
}, _onDocumentMouseMove: function(ev) {
  function confine(number, minim, maxim) {
    if (number < minim) 
    {
      return minim;
    }
    if (number > maxim) 
    {
      return maxim;
    }
    return number;
  }
  ev.halt();
  var dx = ev.pageX - this._mouseStartX;
  var dy = ev.pageY - this._mouseStartY;
  this._x = confine(this._boxStartX + dx, 0, this._maxX);
  this._y = confine(this._boxStartY + dy, 0, this._maxY);
  this._requestAnimationFrame();
}, _onDocumentMouseUp: function(ev) {
  ev.halt();
  this._ownerDoc.un('mousemove', this._onDocumentMouseMove);
  this._ownerDoc.un('mouseup', this._onDocumentMouseUp);
  this.removeCssClass('moving');
}, _onBoxClose: function(ev) {
  this.addCssClass('hidden');
}, _requestAnimationFrame: function() {
  return window.requestAnimationFrame(this._FRAME_REQUEST_CALLBACK);
}, _moveBox: function() {
  this.style.setLeft(this._x).setTop(this._y);
}, toString: function() {
  return 'js.dom.Box';
}};
$extends(js.dom.Box, js.dom.Element);
$legacy(typeof window.requestAnimationFrame !== "function", function() {
  js.dom.Box._requestAnimationFrame = function() {
  this._moveBox();
};
});
$package('js.dom');
js.dom.Builder = {createXML: function(root) {
  $assert(root, 'js.dom.Builder#createXML', 'Root is undefined, null or empty.');
  return new js.dom.Document(window.document.implementation.createDocument('', root, null));
}, parseXML: function(xml) {
  $assert(xml, 'js.dom.Builder#parseXML', 'XML is undefined, null or empty.');
  return this._parse(xml, 'text/xml');
}, parseHTML: function(html) {
  $assert(html, 'js.dom.Builder#parseHTML', 'HTML is undefined, null or empty.');
  return this._parse(html, 'application/xhtml+xml');
}, _parse: function(source, contentType) {
  $assert(source, 'js.dom.Builder#_parse', 'Source is undefined, null or empty.');
  var document = new DOMParser().parseFromString(source, contentType);
  if (typeof document === 'undefined') 
  {
    throw new js.dom.DomException('Missing DOM parser support.');
  }
  var root = document.documentElement;
  if (root.nodeName === 'parsererror' || (root.firstChild && root.firstChild.nodeName === 'parsererror')) 
  {
    throw new js.dom.DomException('Parse error.');
  }
  return new js.dom.Document(document);
}, loadXML: function(url, callback, scope) {
  this._load(url, 'text/xml', callback, scope);
}, loadHTML: function(url, callback, scope) {
  this._load(url, 'application/xhtml+xml', callback, scope);
}, _load: function(url, contentType, callback, scope) {
  $assert(url, 'js.dom.Builder#_load', 'URL is undefined, null or empty.');
  $assert(js.lang.Types.isFunction(callback), 'js.dom.Builder#_load', 'Callback is not a function.');
  $assert(this._pageDomain === js.net.URL.getHost(url), 'js.dom.Builder#_load', 'Cross-domain URL.');
  if (!url || !js.lang.Types.isFunction(callback)) 
  {
    return;
  }
  var xhr = new js.net.XHR();
  xhr.on('load', callback, scope);
  xhr.open('GET', url);
  xhr.send();
}, toString: function() {
  return 'js.dom.Builder';
}};
$static(function() {
  js.dom.Builder._pageDomain = js.net.URL.getHost(window.location.toString());
});
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Builder.createXML = function(root) {
  var doc = new ActiveXObject('MSXML2.DOMDocument');
  doc.async = false;
  doc.loadXML('<' + root + '/>');
  return new js.dom.Document(doc);
};
  js.dom.Builder._parse = function(source, contentType) {
  $assert(source, 'js.dom.Builder#_parse', 'Source is undefined, null or empty.');
  var doc = new ActiveXObject('MSXML2.DOMDocument');
  doc.async = false;
  doc.loadXML(source);
  if (typeof doc === 'undefined') 
  {
    throw new js.dom.DomException('js.dom.Builder#_parse', 'Missing DOM parser support.');
  }
  if (Number(doc.parseError.errorCode) !== 0) 
  {
    throw new js.dom.DomException('js.dom.Builder#_parse', 'Parse error.');
  }
  return new js.dom.Document(doc);
};
});
$package('js.dom');
js.dom.Captcha = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Captcha, 'js.dom.Captcha#Captcha', 'Invoked as function.');
  this.$super(ownerDoc, node);
  this._callback = null;
  this._scope = null;
  this._value = this.getByCssClass('value');
  this._images = this.getByCssClass('images');
  this._images.removeChildren();
  this._response = null;
  this.getByCssClass('load-challenge').on('click', this._loadChallenge, this);
  this._loadChallenge();
};
js.dom.Captcha.prototype = {_SERVER_CAPTCHA_CLASS: 'js.web.captcha.Captcha', reset: function() {
  this.removeCssClass(js.dom.Form.CLASS_INVALID);
  this.findByTag('img').removeCssClass(js.dom.Form.CLASS_SELECTED);
  this._response = null;
  return this;
}, isValid: function() {
  if (this._response === null) 
  {
    this.addCssClass(js.dom.Form.CLASS_INVALID);
    return false;
  }
  this.removeCssClass(js.dom.Form.CLASS_INVALID);
  return true;
}, isCorrect: function(callback, scope) {
  $assert(js.lang.Types.isFunction(callback), 'js.dom.Captcha#isCorrect', 'Callback is not a function.');
  this._callback = callback;
  this._scope = scope || window;
  $assert(this._response !== null, 'js.dom.Captcha#isCorrect', 'No image selected.');
  if (this._response !== null) 
  {
    var rmi = new js.net.RMI();
    rmi.setMethod(this._SERVER_CAPTCHA_CLASS, 'verifyChallengeResponse');
    rmi.setParameters(this._response);
    rmi.exec(this._onResponseVerified, this);
  }
  return this;
}, _onResponseVerified: function(challenge) {
  if (challenge) 
  {
    this._response = null;
    this._onChallengeLoaded(challenge);
    this.addCssClass(js.dom.Form.CLASS_INVALID);
  } else {
    this._callback.call(this._scope);
  }
}, _loadChallenge: function(ev) {
  if (typeof ev !== 'undefined') 
  {
    ev.halt();
  }
  var rmi = new js.net.RMI();
  rmi.setMethod(_SERVER_CAPTCHA_CLASS, 'getChallenge');
  rmi.exec(this._onChallengeLoaded, this);
}, _onChallengeLoaded: function(challenge) {
  this._value.setValue(challenge.value);
  this._images.removeChildren();
  for (var i = 0, images = challenge.images, img; i < images.length; i++) 
    {
      img = this._ownerDoc.createElement('img').setSrc(images[i]);
      img.on('click', this._onCaptchaImageClick, this);
      this._images.addChild(img);
    }
}, _onCaptchaImageClick: function(ev) {
  this.removeCssClass(js.dom.Form.CLASS_INVALID);
  this.findByCss('img').removeCssClass(js.dom.Form.CLASS_SELECTED);
  var img = ev.target;
  img.addCssClass(js.dom.Form.CLASS_SELECTED);
  var src = img.getSrc();
  this._response = src.substr(src.length - 32);
}, toString: function() {
  return 'js.dom.Captcha';
}};
$extends(js.dom.Captcha, js.dom.Element);
$package("js.dom");
js.dom.ControlInterface = {setValue: function(value) {
}, getValue: function() {
}, reset: function() {
}, clear: function() {
}, isEmpty: function() {
}, isValid: function() {
}};
$package("js.dom");
js.dom.Control = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Control, "js.dom.Control#Control", "Invoked as function.");
  this.$super(ownerDoc, node);
};
js.dom.Control.prototype = {setValue: function(value) {
  $assert(typeof value !== "undefined", "js.dom.Control#setValue", "Value is undefined.");
  if (typeof value === "undefined") 
  {
    return this;
  }
  $assert(this.getAttr("type") === "hidden" || this.style.get("display") !== "none", "js.dom.Control#setValue", "Display is none.");
  if (value === null) 
  {
    return this.reset();
  }
  if (this._format !== null) 
  {
    value = this._format.format(value);
  }
  $assert(js.lang.Types.isPrimitive(value), "js.dom.Control#setValue", "Expected primitive but got %s.", value);
  if (!js.lang.Types.isString(value)) 
  {
    value = value.toString();
  }
  this._node.value = value;
  return this;
}, getValue: function() {
  var v = this._node.value;
  return this._format !== null ? this._format.parse(v) : v.length > 0 ? v : null;
}, reset: function() {
  var attr = this._node.attributes.getNamedItem("value");
  this._node.value = attr !== null ? attr.value : "";
  return this;
}, clear: function() {
  this._node.value = "";
  return this;
}, isEmpty: function() {
  return !this._node.value;
}, isValid: function() {
  return this._format !== null ? this._format.test(this._node.value) : !this.isEmpty();
}, toString: function() {
  return "js.dom.Control";
}};
$extends(js.dom.Control, js.dom.Element);
$implements(js.dom.Control, js.dom.ControlInterface);
$package('js.dom');
js.dom.Checkbox = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Checkbox, 'js.dom.Checkbox#Checkbox', 'Invoked as function.');
  this.$super(ownerDoc, node);
  $assert(node.nodeName.toLowerCase() === 'input', 'js.dom.Checkbox#Checkbox', 'Node is not an input.');
};
js.dom.Checkbox.prototype = {setValue: function(checked) {
  this._node.checked = checked;
  return this;
}, check: function() {
  this._node.checked = true;
  return this;
}, uncheck: function() {
  this._node.checked = false;
  return this;
}, checked: function() {
  return this._node.checked;
}, isValid: function() {
  return true;
}, isEmpty: function() {
  return true;
}, toString: function() {
  return 'js.dom.Checkbox';
}};
$extends(js.dom.Checkbox, js.dom.Control);
$package("js.dom");
js.dom.ControlsList = {CSS_OPTIONAL: "optional", CSS_INVALID: "invalid", reset: function() {
  this._forEachControl(false, function(control) {
  control.removeCssClass(this.CSS_INVALID);
  if (control.reset) 
  {
    control.reset();
  }
});
  return this._autofocus();
}, clear: function() {
  this._forEachControl(true, function(control) {
  control.removeCssClass(this.CSS_INVALID);
  if (control.clear) 
  {
    control.clear();
  }
});
  return this._autofocus();
}, _autofocus: function() {
  var autofocusControl = this.getByCss("[autofocus]");
  if (autofocusControl !== null) 
  {
    autofocusControl.focus();
  }
  return this;
}, isValid: function() {
  var controlsValid = true, valid;
  this._forEachControl(false, function(control) {
  valid = false;
  if (control.hasCssClass(this.CSS_OPTIONAL) && control.isEmpty()) 
  {
    valid = true;
  } else {
    valid = control.isValid ? control.isValid() : true;
  }
  control.addCssClass(this.CSS_INVALID, !valid);
  controlsValid = valid && controlsValid;
});
  return controlsValid;
}, _forEachControl: function(includeHidden, callback) {
  $assert(js.lang.Types.isElement(this), "js.dom.ControlsList#_forEachControl", "Mixin target is not an element.");
  this._scanControls(this.getNode(), includeHidden, callback);
}, _scanControls: function(node, includeHidden, callback) {
  function isControl(node) {
    if (!includeHidden && node.attributes.getNamedItem("type") === "hidden") 
    {
      return false;
    }
    return node.attributes.getNamedItem("name") !== null || node.attributes.getNamedItem("data-name") !== null;
  }
  var nodeList = node.children;
  for (var i = 0, n; i < node.children.length; i++) 
    {
      n = node.children.item(i);
      if (isControl(n)) 
      {
        callback.call(this, this._ownerDoc.getElement(n));
      } else {
        this._scanControls(n, includeHidden, callback);
      }
    }
}};
$package("js.dom");
js.dom.Date = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  var datePicker = this._config.datePicker;
  if (typeof datePicker === "undefined") 
  {
    datePicker = this.DEF_DATE_PICKER;
  }
  this._datePicker = ownerDoc.getByCss("[data-class='%s']", datePicker);
  if (this._datePicker !== null) 
  {
    this.on("click", this._onClick, this);
    this.on("focus", this._onFocus, this);
    var label = this.getPreviousSibling();
    if (label.getTag() === "label") 
    {
      this._caption = label.getText();
    }
  }
};
js.dom.Date.prototype = {DEF_DATE_PICKER: "js.widget.DatePicker", _onFocus: function(ev) {
  this._datePicker.setCallback(this._onDateSelected, this);
  if (this._caption) 
  {
    this._datePicker.setCaption(this._caption);
  }
  this._datePicker.show();
}, _onDateSelected: function(date) {
  if (date === null) 
  {
    this.reset();
  }
  if (typeof date !== "undefined") 
  {
    this.setValue(date);
  }
}, _onClick: function(ev) {
  ev.prevent();
}, toString: function() {
  return "js.dom.Date";
}};
$extends(js.dom.Date, js.dom.Control);
$preload(js.dom.Date);
$package("js.dom");
js.dom.Document = function(document) {
  $assert(this instanceof js.dom.Document, "js.dom.Document#Document", "Invoked as function.");
  $assert(document, "js.dom.Document#Document", "Undefined or null native document.");
  $assert(document.nodeType === Node.DOCUMENT_NODE, "js.dom.Document#Document", "Invalid document type #%d", document.nodeType);
  this._document = document;
  this._template = js.dom.template.Template.getInstance(this);
  this._domEvents = new js.event.DomEvents(this);
};
js.dom.Document.prototype = {getDocument: function() {
  return this._document;
}, isXML: function() {
  if (typeof this._document.contentType !== "undefined") 
  {
    return this._document.contentType.indexOf("xml") !== -1;
  }
  if (typeof this._document.xmlVersion !== "undefined") 
  {
    return true;
  }
  if (typeof XMLDocument !== "undefined" && this._document instanceof XMLDocument) 
  {
    return true;
  }
  if (typeof this._document.xml !== "undefined") 
  {
    return true;
  }
  return false;
}, createElement: function(tag) {
  $assert(tag, "js.dom.Document#createElement", "Undefined, null or empty tag name.");
  $assert(arguments.length % 2 === 1, "js.dom.Document#createElement", "Invalid attributes name/value.");
  if (!tag) 
  {
    return null;
  }
  var node = this._document.createElement(tag);
  if (arguments.length > 2) 
  {
    var attrs = $args(arguments, 1);
    for (var i = 0, l = attrs.length - 1; i < l; ) 
      {
        node.setAttribute(attrs[i++], attrs[i++]);
      }
  }
  return this.getElement(node);
}, importElement: function(el) {
  $assert(el, "js.dom.Document#importElement", "Undefined or null foreign element.");
  if (!el) 
  {
    return null;
  }
  $assert(!el._ownerDoc.equals(this), "js.dom.Document#importElement", "Element is not foreign.");
  if (el._ownerDoc.equals(this)) 
  {
    return el;
  }
  return this.getElement(this._importNode(el._node));
}, _importNode: function(node) {
  return this._document.importNode(node, true);
}, getRoot: function() {
  return this.getElement(this._document.documentElement);
}, getById: function(id) {
  $assert(id, "js.dom.Document#getById", "ID is undefined or null.");
  var node = this._getById(id);
  return node ? this.getElement(node) : null;
}, _getById: function(id) {
  return this._document.getElementById(id);
}, getByTag: function(tag) {
  return this.getElement(js.dom.Node.getElementsByTagName(this._document, tag));
}, findByTag: function(tag) {
  return this.getEList(js.dom.Node.getElementsByTagName(this._document, tag));
}, getByXPath: function(xpath) {
  $assert(xpath, "js.dom.Document#getByXPath", "XPath is undefined, null or empty.");
  if (arguments.length > 1) 
  {
    xpath = $format(arguments);
  }
  return null;
}, findByXPath: function(xpath) {
  $assert(xpath, "js.dom.Document#findByXPath", "XPath is undefined, null or empty.");
  if (arguments.length > 1) 
  {
    xpath = $format(arguments);
  }
  return this.getEList(new js.dom.NodeList());
}, getByCss: function(selectors) {
  if (arguments.length > 1) 
  {
    selectors = $format(arguments);
  }
  return this.getElement(js.dom.Node.querySelector(this._document, selectors));
}, findByCss: function(selectors) {
  if (arguments.length > 1) 
  {
    selectors = $format(arguments);
  }
  return this.getEList(js.dom.Node.querySelectorAll(this._document, selectors));
}, getByCssClass: function(cssClass) {
  return this.getElement(js.dom.Node.getElementsByClassName(this._document, cssClass));
}, findByCssClass: function(cssClass) {
  return this.getEList(js.dom.Node.getElementsByClassName(this._document, cssClass));
}, serialize: function() {
  return new XMLSerializer().serializeToString(this._document);
}, on: function(type, listener, scope, capture) {
  if (typeof capture === "undefined") 
  {
    capture = false;
  }
  this._domEvents.addListener(type, listener, scope, capture);
  return this;
}, un: function(type, listener, capture) {
  if (typeof capture === "undefined") 
  {
    capture = false;
  }
  this._domEvents.removeListener(type, listener, capture);
  return this;
}, getElement: function(node) {
  if (js.lang.Types.isNodeList(node)) 
  {
    node = node.item(0);
  }
  if (!node) 
  {
    return null;
  }
  var el = js.dom.Node.getElement(node);
  if (el !== null) 
  {
    return el;
  }
  var className = js.dom.Node.getElementClassName(node);
  if (className === null) 
  {
    className = this._getStandardElementClassName(node);
  }
  $assert(js.lang.Types.isString(className), "js.dom.Document#getElement", "Class name |%s| is not a string.", className);
  var clazz = js.lang.Class.forName(className);
  $assert(clazz !== null, "js.dom.Document#getElement", "Undefined class |%s| for node |%s|.", className, js.dom.Node.toString(node));
  $assert(js.lang.Types.isElement(clazz), "js.dom.Document#getElement", "Element class must extend js.dom.Element.");
  return js.lang.Types.isElement(clazz) ? new clazz(this, node) : null;
}, getEList: function(nodeList) {
  $assert(nodeList, "js.dom.Document#getEList", "Node list is undefined or null.");
  if (!nodeList) 
  {
    nodeList = new js.dom.NodeList();
  }
  return new js.dom.EList(this, nodeList);
}, bind: function(selectors, typeName) {
  js.dom.Node.bind(this._document, selectors, typeName);
}, _getStandardElementClassName: function(node) {
  switch (node.nodeName.toLowerCase()) {
    case "a":
      return "js.dom.Anchor";
    case "img":
      return "js.dom.Image";
    case "form":
      return "js.dom.FormData";
    case "input":
      switch (node.getAttribute("type")) {
        case "checkbox":
          return "js.dom.Checkbox";
        case "radio":
          return "js.dom.Radio";
        case "file":
          return "js.dom.FileInput";
        case "number":
          return "js.dom.NumberInput";
        case "date":
          return "js.dom.Date";
      }
      switch (node.getAttribute("data-type")) {
        case "number":
          return "js.dom.NumberInput";
        case "date":
          return "js.dom.Date";
      }
    case "textarea":
      return "js.dom.Control";
    case "select":
      return "js.dom.Select";
    case "option":
      return "js.dom.Element";
    case "iframe":
      return "js.dom.IFrame";
    case "progress":
      return "js.dom.Progress";
    default:
      return "js.dom.Element";
  }
}, inject: function(selector, value) {
  var el = this.getByCss(selector);
  $assert(el !== null, "js.dom.Document#inject", "Bad selector.");
  if (el !== null) 
  {
    this._template.subinject(el, value);
  }
  return this;
}, equals: function(doc) {
  $assert(doc, "js.dom.Document#equals", "Document is undefined or null.");
  $assert(doc instanceof js.dom.Document, "js.dom.Document#equals", "Bad argument type.");
  if (!(doc && doc instanceof js.dom.Document)) 
  {
    return false;
  }
  return this._document === doc._document;
}, toString: function() {
  return "js.dom.Document";
}};
$extends(js.dom.Document, Object);
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Document.prototype._importNode = function(foreignNode) {
  switch (foreignNode.nodeType) {
    case Node.ELEMENT_NODE:
      var node = this._document.createElement(foreignNode.nodeName);
      for (var i = 0, attr; i < foreignNode.attributes.length; ++i) 
        {
          attr = foreignNode.attributes.item(i);
          if (attr.nodeName !== "data-back-ref") 
          {
            node.setAttribute(attr.nodeName, attr.value);
          }
        }
      for (i = 0; i < foreignNode.childNodes.length; ++i) 
        {
          node.appendChild(arguments.callee.call(this, foreignNode.childNodes.item(i)));
        }
      return node;
    case Node.TEXT_NODE:
    case Node.CDATA_SECTION_NODE:
      return this._document.createTextNode(foreignNode.nodeValue);
    case Node.COMMENT_NODE:
      return this._document.createComment(foreignNode.nodeValue);
  }
};
  js.dom.Document.prototype._getById = function(id) {
  try {
    return this._document.getElementById(id);
  }  catch (e) {
  return null;
}
};
  js.dom.Document.prototype.serialize = function() {
  if (typeof this._document.xml !== "undefined") 
  {
    return this._document.xml;
  }
  if (typeof this._document.html !== "undefined") 
  {
    return this._document.html;
  }
  if (typeof XMLSerializer !== "undefined") 
  {
    return new XMLSerializer().serializeToString(this._document);
  }
  throw new js.dom.DomException("js.dom.Document#serialize", "Missing DOM serializer support.");
};
});
$package('js.lang');
js.lang.Exception = function() {
  $assert(this instanceof js.lang.Exception, 'js.lang.Exception#Exception', 'Invoked as function.');
  this.name = 'j(s)-lib exception';
  this.message = js.lang.Types.isString(arguments[0]) ? $format(arguments) : "";
};
js.lang.Exception.prototype = {toString: function() {
  return 'js.lang.Exception';
}};
$extends(js.lang.Exception, Error);
$package('js.dom');
js.dom.DomException = function() {
  $assert(this instanceof js.dom.DomException, 'js.dom.DomException#DomException', 'Invoked as function.');
  this.$super(arguments);
  this.name = 'j(s)-lib DOM exception';
};
js.dom.DomException.prototype = {toString: function() {
  return 'js.dom.DomException';
}};
$extends(js.dom.DomException, js.lang.Exception);
$package("js.dom");
js.dom.DynaSets = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  $assert(this.getFirstChild() !== null, "js.dom.DynaSets#DynaSets", "Invalid dyna sets: missing template child.");
  this._setname = this.getAttr("data-name");
  this.clear();
  this._template = this.getFirstChild().remove(false);
};
js.dom.DynaSets.prototype = {_MAX_RESET_SETS_COUNT: 4, setValue: function(objects) {
  $assert(js.lang.Types.isArray(objects), "js.dom.DynaSets#setValue", "Values is not an array.");
  this.removeChildren();
  objects.forEach(function(object) {
  var fieldset = this._template.clone(true);
  fieldset.findByCss("[name]").forEach(function(control) {
  var opp = control.getAttr("name");
  var value = js.lang.OPP.get(object, opp);
  if (typeof value !== "undefined") 
  {
    control.setValue(value);
  }
});
  this.addChild(fieldset);
}, this);
}, getValue: function(objects) {
  var fieldsets = this.getChildren();
  if (typeof objects === "undefined") 
  {
    objects = new Array(fieldsets.size());
  }
  fieldsets.forEach(function(fieldset, index) {
  var object = objects[index];
  if (typeof object === "undefined") 
  {
    object = {};
    objects[index] = object;
  }
  fieldset.findByCss("[name]").forEach(function(control) {
  var opp = control.getAttr("name");
  js.lang.OPP.set(object, opp, control.getValue());
});
});
  return objects;
}, reset: function(setsCount) {
  if (typeof setsCount === "undefined") 
  {
    setsCount = 0;
  }
  $assert(js.lang.Types.isNumber(setsCount), "js.dom.DynaSets#reset", "Sets count is not numeric value.");
  $assert(setsCount < this._MAX_RESET_SETS_COUNT, "js.dom.DynaSets#reset", "Sets count value is unreasonable large.");
  this.removeChildren();
  while (setsCount-- > 0) 
    {
      this.addSet();
    }
  return this;
}, isEmpty: function() {
  return false;
}, addSet: function() {
  return this.addChild(this._template.clone(true));
}, getSetsCount: function() {
  return js.dom.Node.childElementCount(this._node);
}, toString: function() {
  return "js.dom.DynaSets";
}};
$extends(js.dom.DynaSets, js.dom.Element);
$mixin(js.dom.DynaSets, js.dom.ControlsList);
$implements(js.dom.DynaSets, js.dom.ControlInterface);
$package("js.lang");
js.lang.Iterator = {hasNext: function() {
}, next: function() {
}};
$package("js.dom");
js.dom.EList = function(ownerDoc, nodeList) {
  $assert(this instanceof js.dom.EList, "js.dom.EList#EList", "Invoked as function.");
  $assert(ownerDoc, "js.dom.EList#EList", "Undefined or null owner document.");
  $assert(ownerDoc instanceof js.dom.Document, "js.dom.EList#EList", "Owner document is not an instance of js.dom.Document.");
  $assert(typeof nodeList !== "undefined", "js.dom.EList#EList", "Node list is undefined.");
  if (nodeList === null) 
  {
    nodeList = new js.dom.NodeList();
  }
  $assert(js.lang.Types.isNodeList(nodeList), "js.dom.EList#EList", "Argument supplied as node list does not implement NodeList interface.");
  this._ownerDoc = ownerDoc;
  this._nodeList = nodeList;
};
js.dom.EList.prototype = {size: function() {
  return this._nodeList.length;
}, item: function(index) {
  if (typeof index === "undefined") 
  {
    index = 0;
  }
  $assert(index < this._nodeList.length, "js.dom.EList#item", "Index out of range.");
  return this._ownerDoc.getElement(this._nodeList.item(index));
}, isEmpty: function() {
  return this._nodeList.length === 0;
}, remove: function() {
  var nodes = [], i, el;
  for (i = 0; i < this._nodeList.length; ++i) 
    {
      nodes.push(this._nodeList.item(i));
    }
  for (i = 0; i < nodes.length; ++i) 
    {
      el = this._ownerDoc.getElement(nodes[i]);
      $assert(el, "js.dom.EList#remove", "List element is undefined or null.");
      if (el) 
      {
        el.remove();
      }
    }
  nodes.length = 0;
}, call: function(methodName) {
  $assert(methodName, "js.dom.EList#call", "Method name is undefined, null or empty.");
  var it = this.it(), el;
  while (it.hasNext()) 
    {
      el = it.next();
      $assert(js.lang.Types.isFunction(el[methodName]), "js.dom.EList#call", "Element property is no a function.");
      if (js.lang.Types.isFunction(el[methodName])) 
      {
        el[methodName].apply(el, $args(arguments, 1));
      }
    }
  return this;
}, forEach: function(callback, thisArg) {
  $assert(js.lang.Types.isFunction(callback), "js.dom.EList#forEach", "Callback is not a function.");
  if (typeof thisArg === "undefined") 
  {
    thisArg = window;
  }
  for (var i = 0; i < this.size(); i++) 
    {
      callback.call(thisArg, this.item(i), i, this);
    }
}, addCssClass: function(cssClass) {
  this.call("addCssClass", cssClass);
  return this;
}, removeCssClass: function(cssClass) {
  this.call("removeCssClass", cssClass);
  return this;
}, toggleCssClass: function(cssClass) {
  this.call("toggleCssClass", cssClass);
  return this;
}, it: function() {
  return new js.dom.EList.Iterator(this);
}, on: function(type, listener, scope, arg) {
  this.call("on", type, listener, scope, arg);
  return this;
}, un: function(type, listener) {
  this.call("un", type, listener);
  return this;
}, toString: function() {
  return "js.dom.EList";
}};
$extends(js.dom.EList, Object);
js.dom.EList.Iterator = function(elist) {
  this._elist = elist;
  this._index = 0;
};
js.dom.EList.Iterator.prototype = {hasNext: function() {
  return this._index < this._elist.size();
}, next: function() {
  return this._elist.item(this._index++);
}, toString: function() {
  return "js.dom.EList.Iterator";
}};
$extends(js.dom.EList.Iterator, Object);
$implements(js.dom.EList.Iterator, js.lang.Iterator);
$package("js.dom");
js.dom.FileInput = function(ownerDoc, node) {
  $assert(this instanceof js.dom.FileInput, "js.dom.FileInput#FileInput", "Invoked as function.");
  this.$super(ownerDoc, node);
  $assert(node.nodeName.toLowerCase() === "input", "js.dom.FileInput#FileInput", "Node is not an input.");
  $assert(node.getAttribute("type") === "file", "js.dom.FileInput#FileInput", "Node is not a file.");
};
js.dom.FileInput.prototype = {setValue: function(value) {
  $assert(false, "js.dom.FileInput#setValue", "Unsupported operation.");
}, toString: function() {
  return "js.dom.FileInput";
}};
$extends(js.dom.FileInput, js.dom.Control);
$package('js.dom');
js.dom.Form = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Form, 'js.dom.Form#Form', 'Invoked as function.');
  this.$super(ownerDoc, node);
  if (this._node.method !== js.net.Method.POST) 
  {
    this._node.method = js.net.Method.POST;
  }
  if (this._getEnctype() !== 'multipart/form-data') 
  {
    this._setEnctype('multipart/form-data');
  }
  this.on('submit', function(ev) {
  ev.halt();
});
  this.on('reset', function(ev) {
  ev.halt();
});
  var submit = this.getByCss('[type="submit"],.submit');
  if (submit !== null) 
  {
    submit.on('click', this._onSubmit, this);
  }
  var reset = this.getByCss('[type="reset"],.reset');
  if (reset !== null) 
  {
    reset.on('click', this._onReset, this);
  }
  this._captcha = this.getByCssClass(js.dom.Form.CLASS_CAPTCHA);
  this._progress = this.getByCss('progress,.progress');
  this.findByCss('input,textarea,select').on('focus', function(ev) {
  ev.target.removeCssClass(js.dom.Form.CLASS_INVALID);
});
};
js.dom.Form.CLASS_OPTIONAL = 'optional';
js.dom.Form.CLASS_INVALID = 'invalid';
js.dom.Form.CLASS_SELECTED = 'selected';
js.dom.Form.CLASS_CAPTCHA = 'captcha';
js.dom.Form.CLASS_PROGRESS = 'progress';
js.dom.Form.prototype = {setAction: function(action) {
  $assert(action, 'js.dom.Form#setAction', 'Action is not defined, null or empty.');
  this._node.action = action;
  return this;
}, getAction: function() {
  return this._node.action;
}, setValue: function(value) {
  $assert(false, "js.dom.Form#setValue", "Value setter not supported.");
}, getValue: function() {
  $assert(false, "js.dom.Form#getValue", "Value getter not supported.");
}, setProgress: function(progress) {
  $assert(progress && progress instanceof js.dom.Progress, 'js.dom.Form#setProgress', 'Progress is undefined, null or not of proper type.');
  this._progress = progress;
  return this;
}, getProgress: function() {
  return this._progress;
}, submit: function() {
  $assert(this._node.action, 'js.dom.Form#submit', 'Form action is missing.');
  if (!this.isValid()) 
  {
    return false;
  }
  if (this._captcha !== null) 
  {
    this._captcha.isCorrect(this._submit, this);
  } else {
    this._submit();
  }
  return true;
}, reset: function() {
  this._getControls().removeCssClass(js.dom.Form.CLASS_INVALID);
  this._node.reset();
  if (this._captcha !== null) 
  {
    this._captcha.reset();
  }
  return this;
}, isValid: function() {
  var controlsValid = true;
  var it = this._getControls().it(), el, valid;
  while (it.hasNext()) 
    {
      el = it.next();
      if (el.getAttr('type') === 'hidden') 
      {
        continue;
      }
      valid = (el.hasCssClass(js.dom.Form.CLASS_OPTIONAL) && el.isEmpty()) ? true : el.isValid();
      el[valid ? 'removeCssClass' : 'addCssClass'](js.dom.Form.CLASS_INVALID);
      controlsValid = valid && controlsValid;
    }
  var captchaValid = true;
  if (this._captcha !== null) 
  {
    captchaValid = this._captcha.isValid();
  }
  return controlsValid && captchaValid;
}, add: function(name, value) {
  var hidden = this.getByCss('input[name="%s"]', name);
  if (hidden !== null) 
  {
    hidden.setValue(value);
    return hidden;
  }
  hidden = this._ownerDoc.createElement('input', 'type', 'hidden', 'name', name, 'value', value);
  var el = this.getFirstChild();
  if (el !== null) 
  {
    el.insertBefore(hidden);
  } else {
    this.addChild(hidden);
  }
  return hidden;
}, _setEnctype: function(enctype) {
  this._node.enctype = enctype;
  return this;
}, _getEnctype: function() {
  return this._node.enctype;
}, _onSubmit: function(ev) {
  this.submit();
  ev.halt();
}, _onReset: function(ev) {
  this.reset();
  ev.halt();
}, _submit: function() {
  this._preprocess();
  this._node.submit();
  this._postprocess();
  return this;
}, _preprocess: function() {
  var it = this.findByCss('[data-format]').it(), ctrl, name, value;
  while (it.hasNext()) 
    {
      ctrl = it.next();
      name = ctrl.getAttr('name');
      $assert(name, 'js.dom.Form#_preprocess', 'Control name is undefined, null or empty');
      if (name) 
      {
        ctrl.removeAttr('name');
        value = js.lang.JSON.stringify(ctrl.getValue());
        if (value.charAt(0) === '"') 
        {
          value = value.substr(1, value.length - 2);
        }
        ctrl.setUserData('entangled', this.add(name, value));
      }
    }
}, _postprocess: function() {
  var it = this.findByCss('[data-format]').it(), ctrl, entangled;
  while (it.hasNext()) 
    {
      ctrl = it.next();
      entangled = ctrl.removeUserData('entangled');
      ctrl.setAttr('name', entangled.getAttr('name'));
      entangled.remove();
    }
}, _getControls: function() {
  return this.findByCss('input,textarea,select');
}, toString: function() {
  return 'js.dom.Form';
}};
$extends(js.dom.Form, js.dom.Element);
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Form.prototype._setEnctype = function(enctype) {
  this._node.encoding = enctype;
  return this;
};
  js.dom.Form.prototype._getEnctype = function() {
  return this._node.encoding;
};
  js.dom.Form.prototype.reset = function() {
  var hiddenValues = {}, hiddens = this.findByCss('input[type="hidden"]'), el;
  var it = hiddens.it();
  while (it.hasNext()) 
    {
      el = it.next();
      hiddenValues[el.getAttr('name')] = el.getValue();
    }
  this.findByCss('input,textarea,select').removeCssClass(js.dom.Form.CLASS_INVALID);
  this._node.reset();
  it = hiddens.it();
  while (it.hasNext()) 
    {
      el = it.next();
      el.setValue(hiddenValues[el.getAttr('name')]);
    }
  if (this._captcha !== null) 
  {
    this._captcha.reset();
  }
  return this;
};
});
$package("js.dom");
js.dom.FormData = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._node.method = js.net.Method.POST;
  this._setEnctype("multipart/form-data");
  this.on("focus", this._onFocus, this, true);
};
js.dom.FormData.prototype = {append: function(name, value) {
  var hidden = this.getByCss("input[name='%s']", name);
  if (hidden !== null) 
  {
    hidden.setValue(value);
    return hidden;
  }
  hidden = this._ownerDoc.createElement("input", "type", "hidden", "name", name, "value", value);
  var el = this.getFirstChild();
  if (el !== null) 
  {
    el.insertBefore(hidden);
  } else {
    this.addChild(hidden);
  }
  return hidden;
}, setObject: function(object) {
  this._forEachControl(true, function(control) {
  var opp = this._getOPPath(control), value;
  if (opp !== null) 
  {
    value = js.lang.OPP.get(object, opp);
    if (typeof value !== "undefined") 
    {
      control.setValue(value);
    }
  }
});
  return this._autofocus();
}, getObject: function(object) {
  if (typeof object === "undefined") 
  {
    object = {};
  }
  this._forEachControl(true, function(control) {
  var opp = this._getOPPath(control);
  if (opp !== null) 
  {
    js.lang.OPP.set(object, opp, control.getValue());
  }
});
  return object;
}, _getOPPath: function(control) {
  var name = control.getAttr("name");
  if (name === null) 
  {
    name = control.getAttr("data-name");
  }
  return name !== null ? js.util.Strings.toScriptCase(name) : null;
}, focus: function() {
  var autofocusControl = this.getByCss("[autofocus]");
  $assert(autofocusControl !== null, "js.dom.FormData#focus", "Attempt to focus form data but no autofocus control found.");
  if (autofocusControl !== null) 
  {
    autofocusControl.focus();
  }
  return this;
}, getAction: function() {
  return this._node.action || null;
}, _setEnctype: function(enctype) {
  $assert(enctype === "multipart/form-data", "js.dom.FormData#_setEnctype", "Form data supports only multipart/form-data.");
  this._node.enctype = enctype;
  return this;
}, _onFocus: function(ev) {
  ev.originalTarget.removeCssClass(this.CSS_INVALID).focus();
}, toString: function() {
  return "js.dom.FormData";
}};
$extends(js.dom.FormData, js.dom.Element);
$mixin(js.dom.FormData, js.dom.ControlsList);
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Form.prototype._setEnctype = function(enctype) {
  this._node.encoding = enctype;
  return this;
};
});
$package('js.dom');
js.dom.IFrame = function(ownerDoc, node) {
  $assert(this instanceof js.dom.IFrame, 'js.dom.IFrame#IFrame', 'Invoked as function.');
  this.$super(ownerDoc, node);
  this._window = null;
  this._innerDoc = null;
};
js.dom.IFrame.prototype = {setSrc: function(src) {
  this._node.src = src;
  return this;
}, getSrc: function() {
  return this._node.src;
}, getWindow: function() {
  if (this._window === null) 
  {
    this._window = new js.ua.Window(this._ownerDoc.getParentWindow(), this._node.contentWindow);
  }
  return this._window;
}, getInnerDoc: function() {
  if (this._innerDoc === null) 
  {
    this._innerDoc = new js.dom.Document(this._node.contentWindow.document);
  }
  return this._innerDoc;
}, getLocation: function() {
  return this._node.contentWindow.location.toString();
}, toString: function() {
  return 'js.dom.IFrame';
}};
$extends(js.dom.IFrame, js.dom.Element);
$package('js.dom');
js.dom.Image = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Image, 'js.dom.Image#Image', 'Invoked as function.');
  this.$super(ownerDoc, node);
  $assert(node.nodeName.toLowerCase() === 'img', 'js.dom.Image#Image', 'Node is not an image.');
};
js.dom.Image.prototype = {_TRANSPARENT_DOT: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', reset: function() {
  this._node.src = this._TRANSPARENT_DOT;
  return this;
}, setSrc: function(src) {
  if (!src || /^\s+|(?:&nbsp;)+$/g.test(src)) 
  {
    return this.reset();
  }
  if (this._format !== null) 
  {
    src = this._format.format(src);
  }
  this._node.src = src;
  return this;
}, getSrc: function() {
  return this._node.src;
}, setWidth: function(width) {
  $assert(js.lang.Types.isNumber(width), "js.dom.Image#setWidth", "Width attribute is not a number.");
  return this.setAttr("width", width.toString());
}, setHeight: function(height) {
  $assert(js.lang.Types.isNumber(height), "js.dom.Image#setHeight", "Height attribute is not a number.");
  return this.setAttr("height", height.toString());
}, reload: function(src) {
  $assert(src, "js.dom.Image#reload", "Image source is undefined, null or empty.");
  var i = src.indexOf('?');
  if (i !== -1) 
  {
    src = src.substring(0, i);
  }
  this._node.src = src + '?' + Math.random().toString(36).substr(2);
  return this;
}, isValid: function() {
  return this._node.src && this._node.src !== this._TRANSPARENT_DOT;
}, toString: function() {
  return 'js.dom.Image';
}};
$extends(js.dom.Image, js.dom.Element);
$package("js.dom");
js.dom.Navigation = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this.on("click", this._onClick, this);
};
js.dom.Navigation.$extends = function(superClass, subClass) {
  $preload($format("[data-class='%s']", superClass));
};
js.dom.Navigation.prototype = {_onClick: function(ev) {
  var href = ev.target.getAttr("href");
  if (href === null) 
  {
    return;
  }
  ev.halt();
  var handler = js.util.Strings.toScriptCase(href);
  if (typeof this[handler] !== "undefined") 
  {
    this[handler].call(this);
  } else {
    js.ua.System.alert("Undefined navigation handler |%s|.", handler);
  }
}, toString: function() {
  return "js.dom.Navigation";
}};
$extends(js.dom.Navigation, js.dom.Element);
$package("js.dom");
js.dom.Node = {_BACK_REF: "__js_element__", setElement: function(node, el) {
  $assert(node.nodeType === Node.ELEMENT_NODE, "js.dom.Node#setElement", "Node is not element.");
  node[js.dom.Node._BACK_REF] = el;
}, getElement: function(node) {
  $assert(node.nodeType === Node.ELEMENT_NODE, "js.dom.Node#getElement", "Node is not element.");
  var el = node[js.dom.Node._BACK_REF];
  return el ? el : null;
}, removeBackRef: function(node) {
  $assert(node.nodeType === Node.ELEMENT_NODE, "js.dom.Node#removeBackRef", "Node is not element.");
  if (node[js.dom.Node._BACK_REF]) 
  {
    delete node[js.dom.Node._BACK_REF];
  }
}, _DATA_CLASS: "data-class", _DATA_FORMAT: "data-format", bind: function(context, selectors, className) {
  $assert(js.lang.Types.isObject(context), "js.dom.Node#bind", "Context is not and object.");
  $assert(js.lang.Types.isString(selectors), "js.dom.Node#bind", "Selectors is not a string.");
  if (arguments.length === 2) 
  {
    var node = context;
    var clazz = selectors;
    if (!node.getAttribute(js.dom.Node._DATA_CLASS)) 
    {
      node.setAttribute(js.dom.Node._DATA_CLASS, clazz);
    }
    return;
  }
  $assert(js.lang.Types.isString(className), "js.dom.Node#bind", "Class name is not a string.");
  var clazz = js.lang.Class.forName(className);
  var datasetName;
  if (js.lang.Types.isElement(clazz)) 
  {
    datasetName = this._DATA_CLASS;
  } else {
    datasetName = this._DATA_FORMAT;
  }
  var nodeList = this.querySelectorAll(context, selectors);
  for (var i = 0; i < nodeList.length; ++i) 
    {
      nodeList.item(i).setAttribute(datasetName, className);
    }
}, getElementClassName: function(node) {
  var className = node.getAttribute(this._DATA_CLASS);
  return className ? className : null;
}, getFormatName: function(node) {
  var formatName = node.getAttribute(this._DATA_FORMAT);
  return formatName ? formatName : null;
}, firstChild: function(node, nodeType) {
  $assert(node, "js.dom.Node#firstChild", "Node is undefined or null.");
  $assert(nodeType, "js.dom.Node#firstChild", "Node type is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.firstChild, nodeType || Node.ELEMENT_NODE, "next") : null;
}, firstElementChild: function(node) {
  $assert(node, "js.dom.Node#firstElementChild", "Node is undefined or null.");
  return node ? node.firstElementChild : null;
}, lastChild: function(node, nodeType) {
  $assert(node, "js.dom.Node#lastChild", "Node is undefined or null.");
  $assert(nodeType, "js.dom.Node#lastChild", "Node type is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.lastChild, nodeType || Node.ELEMENT_NODE, "previous") : null;
}, lastElementChild: function(node) {
  $assert(node, "js.dom.Node#lastElementChild", "Node is undefined or null.");
  return node ? node.lastElementChild : null;
}, nextSibling: function(node, nodeType) {
  $assert(node, "js.dom.Node#nextSibling", "Node is undefined or null.");
  $assert(nodeType, "js.dom.Node#nextSibling", "Node is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.nextSibling, nodeType || Node.ELEMENT_NODE, "next") : null;
}, nextElementSibling: function(node) {
  $assert(node, "js.dom.Node#nextElementSibling", "Node is undefined or null.");
  return node ? node.nextElementSibling : null;
}, previousSibling: function(node, nodeType) {
  $assert(node, "js.dom.Node#previousSibling", "Node is undefined or null.");
  $assert(nodeType, "js.dom.Node#previousSibling", "Node type is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.previousSibling, nodeType || Node.ELEMENT_NODE, "previous") : null;
}, previousElementSibling: function(node) {
  $assert(node, "js.dom.Node#previousElementSibling", "Node is undefined or null.");
  return node ? node.previousElementSibling : null;
}, childElementCount: function(node) {
  $assert(node, "js.dom.Node#childElementCount", "Node is undefined or null.");
  return node.childElementCount;
}, hasChildren: function(node, nodeType) {
  $assert(node, "js.dom.Node#hasChildren", "Node is undefined or null.");
  if (!node) 
  {
    return false;
  }
  return js.dom.Node.firstChild(node, nodeType || Node.ELEMENT_NODE) !== null;
}, getElementsByTagName: function(context, tag) {
  $assert(context, "js.dom.Node#getElementsByTagName", "Context is undefined or null.");
  $assert(tag, "js.dom.Node#getElementsByTagName", "Tag is undefined, null or empty.");
  return context && tag ? context.getElementsByTagName(tag) : new js.dom.NodeList();
}, getElementsByClassName: function(context, cssClass) {
  $assert(context, "js.dom.Node#getElementsByClassName", "Context is undefined or null.");
  if (!context) 
  {
    return new js.dom.NodeList();
  }
  $assert(cssClass, "js.dom.Node#getElementsByClassName", "CSS class is undefined, null or empty.");
  $assert(typeof context.getElementsByClassName === "function", "js.dom.Node#getElementsByClassName", "Get elements by class name not supported.");
  return context.getElementsByClassName(cssClass);
}, querySelector: function(context, selectors) {
  $assert(context, "js.dom.Node#querySelector", "Context is undefined or null.");
  if (!context) 
  {
    return null;
  }
  $assert(selectors, "js.dom.Node#querySelector", "Selectors is undefined, null or empty.");
  if (!selectors) 
  {
    return null;
  }
  $assert(typeof context.querySelector !== "undefined", "js.dom.Node#querySelector", "Unsupported query selector.");
  try {
    return context.querySelector(selectors);
  }  catch (e) {
  $assert(false, "js.dom.Node#querySelector", "bad selectors: ", selectors);
  return null;
}
}, querySelectorAll: function(context, selectors) {
  $assert(context, "js.dom.Node#querySelectorAll", "Context is undefined or null.");
  if (!context) 
  {
    return new js.dom.NodeList();
  }
  $assert(selectors, "js.dom.Node#querySelectorAll", "Selectors is undefined, null or empty.");
  if (!selectors) 
  {
    return new js.dom.NodeList();
  }
  $assert(typeof context.querySelectorAll !== "undefined", "js.dom.Node#querySelectorAll", "Unsupported query selector all.");
  try {
    return context.querySelectorAll(selectors);
  }  catch (e) {
  $assert(false, "js.dom.Node#querySelectorAll", "bad selectors: ", selectors);
  return new js.dom.NodeList();
}
}, _getNeighbor: function(node, nodeType, direction, predicate) {
  if (!predicate) 
  {
    predicate = function() {
  return true;
};
  }
  while (!!node) 
    {
      if (node.nodeType === nodeType && predicate(node)) 
      {
        return node;
      }
      node = node[direction + "Sibling"];
    }
  return null;
}, toString: function(node) {
  if (!node) 
  {
    return "undefined node";
  }
  var s = node.nodeName.toLowerCase();
  if (s === "input") 
  {
    s += ("[" + node.getAttribute("type") + "]");
  }
  return s;
}};
js.dom.Node.Iterator = function(node) {
  $assert(node, "js.dom.Node.Iterator#Iterator", "Node is undefined or null.");
  this._child = js.dom.Node._getNeighbor(node ? node.firstChild : null, Node.ELEMENT_NODE, "next");
};
js.dom.Node.Iterator.prototype = {hasNext: function() {
  return this._child !== null;
}, next: function() {
  if (this._child === null) 
  {
    return null;
  }
  var node = this._child;
  this._child = js.dom.Node._getNeighbor(this._child.nextSibling, Node.ELEMENT_NODE, "next");
  return node;
}, toString: function() {
  return "js.dom.Node.Iterator";
}};
$extends(js.dom.Node.Iterator, Object);
$implements(js.dom.Node.Iterator, js.lang.Iterator);
$legacy(typeof Node === "undefined", function() {
  Node = {ELEMENT_NODE: 1, ATTRIBUTE_NODE: 2, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, ENTITY_REFERENCE_NODE: 5, ENTITY_NODE: 6, PROCESSING_INSTRUCTION_NODE: 7, COMMENT_NODE: 8, DOCUMENT_NODE: 9, DOCUMENT_TYPE_NODE: 10, DOCUMENT_FRAGMENT_NODE: 11, NOTATION_NODE: 12};
});
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Node._backRefs = {};
  js.dom.Node.setElement = function(node, el) {
  try {
    node[js.dom.Node._BACK_REF] = el;
  }  catch (e) {
  var backRef = node.getAttribute("data-back-ref");
  if (!backRef) 
  {
    backRef = js.util.ID();
    node.setAttribute("data-back-ref", backRef);
  }
  js.dom.Node._backRefs[backRef] = el;
}
};
  js.dom.Node.getElement = function(node) {
  var el = node[js.dom.Node._BACK_REF];
  if (typeof el !== "undefined") 
  {
    return el;
  }
  $assert(node.nodeType === Node.ELEMENT_NODE, "js.dom.Node#getElement", "Node is not element.");
  if (node.nodeType !== Node.ELEMENT_NODE) 
  {
    return null;
  }
  var backRef = node.getAttribute("data-back-ref");
  if (!backRef) 
  {
    return null;
  }
  el = js.dom.Node._backRefs[backRef];
  return el ? el : null;
};
  js.dom.Node.removeBackRef = function(node) {
  if (node[js.dom.Node._BACK_REF]) 
  {
    delete node[js.dom.Node._BACK_REF];
    return;
  }
  var backRef = node.getAttribute("data-back-ref");
  if (backRef && js.dom.Node._backRefs[backRef]) 
  {
    delete js.dom.Node._backRefs[backRef];
  }
};
});
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Node.getElementsByTagName = function(node, tag) {
  $assert(node, "js.dom.Node#getElementsByTagName", "Node is undefined or null.");
  $assert(tag, "js.dom.Node#getElementsByTagName", "Tag is undefined, null or empty.");
  if (!node || !tag) 
  {
    return new js.dom.NodeList();
  }
  if (tag !== "*") 
  {
    return node.getElementsByTagName(tag);
  }
  var nodeList = node.getElementsByTagName("*"), result = new js.dom.NodeList();
  for (var i = 0; i < nodeList.length; i++) 
    {
      node = nodeList.item(i);
      if (node.nodeType === Node.ELEMENT_NODE) 
      {
        result.push(node);
      }
    }
  return nodeList;
};
});
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Node.firstElementChild = function(node) {
  $assert(node);
  return node ? js.dom.Node._getNeighbor(node.firstChild, Node.ELEMENT_NODE, "next") : null;
};
  js.dom.Node.lastElementChild = function(node) {
  $assert(node, "js.dom.Node#lastElementChild", "Node is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.lastChild, Node.ELEMENT_NODE, "previous") : null;
};
  js.dom.Node.nextElementSibling = function(node) {
  $assert(node, "js.dom.Node#nextElementSibling", "Node is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.nextSibling, Node.ELEMENT_NODE, "next") : null;
};
  js.dom.Node.previousElementSibling = function(node) {
  $assert(node, "js.dom.Node#previousElementSibling", "Node is undefined or null.");
  return node ? js.dom.Node._getNeighbor(node.previousSibling, Node.ELEMENT_NODE, "previous") : null;
};
  js.dom.Node.childElementCount = function(node) {
  $assert(node, "js.dom.Node#childElementCount", "Node is undefined or null.");
  var child = this.firstElementChild(node);
  var count = 0;
  while (child !== null) 
    {
      ++count;
      child = this.nextElementSibling(child);
    }
  return count;
};
  js.dom.Node.getElementsByClassName = function(node, cssClass) {
  $assert(node, "js.dom.Node#getElementsByClassName", "Node is undefined or null.");
  $assert(cssClass, "js.dom.Node#getElementByClassName", "CSS class is undefined, null or empty.");
  return node && cssClass ? node.querySelectorAll("." + cssClass) : new js.dom.NodeList();
};
});
$package('js.dom');
js.dom.NodeList = function(array) {
  var nodeList = typeof array !== 'undefined' ? array : [];
  nodeList.item = function(index) {
  return this[index];
};
  return nodeList;
};
$extends(js.dom.NodeList, Object);
$package('js.dom');
js.dom.NumberInput = function(ownerDoc, node) {
  $assert(this instanceof js.dom.NumberInput, 'js.dom.NumberInput#NumberInput', 'Invoked as function.');
  this.$super(ownerDoc, node);
};
js.dom.NumberInput.prototype = {toString: function() {
  return "js.dom.NumberInput";
}};
$extends(js.dom.NumberInput, js.dom.Control);
$package('js.dom');
js.dom.Progress = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Progress, 'js.dom.Progress#Progress', 'Invoked as function.');
  this.$super(ownerDoc, node);
  this.setTotal(100);
};
js.dom.Progress.prototype = {start: function() {
  return this;
}, setTotal: function(total) {
  $assert(js.lang.Types.isNumber(total), 'js.dom.Progress#setTotal', 'Total is not a number.');
  this._node.max = this._getNumber(total, 1);
  return this;
}, setValue: function(value) {
  $assert(js.lang.Types.isNumber(value), 'js.dom.Progress#setValue', 'Value is not a number.');
  this._node.value = this._getNumber(value, 0);
  return this;
}, update: function(progressEvent) {
  this.setTotal(progressEvent.total);
  this.setValue(progressEvent.loaded);
  return this;
}, _getNumber: function(value, threshold) {
  if (!js.lang.Types.isNumber(value)) 
  {
    value = Number(value);
    if (isNaN(value)) 
    {
      value = threshold;
    }
  }
  if (value < threshold) 
  {
    value = threshold;
  }
  return value;
}, toString: function() {
  return 'js.dom.Progress';
}};
$extends(js.dom.Progress, js.dom.Element);
$package('js.dom');
js.dom.Radio = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Radio, 'js.dom.Radio#Radio', 'Invoked as function.');
  this.$super(ownerDoc, node);
  $assert(node.nodeName.toLowerCase() === 'input', 'js.dom.Radio#Radio', 'Node is not an input.');
  $assert(node.getAttribute('type') === 'radio', 'js.dom.Radio#Radio', 'Node is not a checkbox.');
};
js.dom.Radio.prototype = {setValue: function(value) {
  this._node.checked = (this._node.value === value);
  return this;
}, toString: function() {
  return 'js.dom.Radio';
}};
$extends(js.dom.Radio, js.dom.Checkbox);
$package('js.dom');
js.dom.Select = function(ownerDoc, node) {
  $assert(this instanceof js.dom.Select, 'js.dom.Select#Select', 'Invoked as function.');
  this.$super(ownerDoc, node);
  $assert(node.nodeName.toLowerCase() === 'select', 'js.dom.Select#Select', 'Node is not a select.');
  this._events = this.getCustomEvents();
  this._events.register("updated");
  this.on("change", this._onChange, this);
};
js.dom.Select.prototype = {_DEF_OPTION_CSS: "default-option", load: function(remoteClassStub, remoteMethod) {
  var args = $args(arguments, 2);
  args.push(this.setOptions);
  args.push(this);
  remoteClassStub[remoteMethod].apply(remoteClassStub, args);
  return this;
}, setOptions: function(items) {
  var child = this.getFirstChild(), nextSibling;
  while (child !== null) 
    {
      nextSibling = child.getNextSibling();
      if (!child.hasCssClass(this._DEF_OPTION_CSS)) 
      {
        child.remove();
      }
      child = nextSibling;
    }
  for (var i = 0, item, option; i < items.length; i++) 
    {
      item = items[i];
      option = this._ownerDoc._document.createElement('option');
      if (typeof item.id !== "undefined") 
      {
        $assert(typeof item.name !== 'undefined', 'js.dom.Select#_onLoad', 'Item name is undefined.');
        option.text = item.name;
        option.value = item.id.toString();
        if (typeof this._data === "undefined") 
        {
          this._data = {};
        }
        this._data[option.value] = item;
      } else {
        $assert(typeof item.text !== 'undefined', 'js.dom.Select#_onLoad', 'Item text is undefined.');
        option.text = item.text;
        option.value = typeof item.value !== 'undefined' ? item.value : item.text;
      }
      this._node.add(option, null);
    }
  this._events.fire("updated", this._getOption());
  return this;
}, setValue: function(value) {
  var i, opts, l;
  this._node.selectedIndex = 0;
  for (i = 0 , opts = this._node.options , l = opts.length; i < l; i++) 
    {
      if (opts[i].value == value || opts[i].text == value) 
      {
        this._node.selectedIndex = i;
        break;
      }
    }
  return this;
}, clear: function() {
  this._node.selectedIndex = 0;
  return this;
}, reset: function() {
  this._node.selectedIndex = 0;
  return this;
}, getValue: function() {
  return this._getOption().value;
}, getText: function() {
  return this._getOption().text;
}, getObject: function() {
  $assert(typeof this._data !== "undefined", "js.dom.Select#getObject", "No user defined data.");
  return this._getOption().data;
}, isEmpty: function() {
  return this.getIndex() === -1;
}, isValid: function() {
  return !this.isEmpty();
}, getIndex: function() {
  return this._node.selectedIndex;
}, equals: function(value) {
  return this._getOption().value == value;
}, _onChange: function(ev) {
  this._events.fire("updated", this._getOption());
}, _getOption: function() {
  var idx, option;
  if (this._node.options.length === 0) 
  {
    return {value: null, text: null, data: null};
  }
  idx = this._node.selectedIndex;
  if (idx === -1) 
  {
    idx = 0;
  }
  option = this._node.options[idx];
  return {value: option.value, text: option.text, data: typeof this._data !== "undefined" ? this._data[option.value] : null};
}, toString: function() {
  return 'js.dom.Select';
}};
$extends(js.dom.Select, js.dom.Control);
$package('js.dom');
js.dom.Style = function(el) {
  $assert(this instanceof js.dom.Style, 'js.dom.Style#Style', 'Invoked as function.');
  $assert(el, 'js.dom.Style#Style', 'Element is undefined or null.');
  this._node = el._node;
  this._noStyles = !this._node.style;
};
js.dom.Style.prototype = {set: function(style, value) {
  $assert(style, 'js.dom.Style#set', 'Style is undefined or null.');
  $assert(!this._noStyles, 'js.dom.Style#set', 'Element with no styles.');
  if (this._noStyles) 
  {
    return this;
  }
  if (js.lang.Types.isObject(style)) 
  {
    for (var s in style) 
      {
        this.set(s, style[s]);
      }
    return this;
  }
  if (js.ua.Engine.TRIDENT) 
  {
    if (style === 'opacity') 
    {
      this._node.style.filter = 'alpha(opacity=' + (Number(value) * 100).toString() + ')';
      return this;
    }
  }
  $assert(js.lang.Types.isString(style), 'js.dom.Style#set', 'Style is undefined, null or empty.');
  $assert(js.lang.Types.isString(value), 'js.dom.Style#set', 'Value is undefined, null or empty.');
  this._node.style[js.util.Strings.toScriptCase(style)] = value;
  return this;
}, get: function(style) {
  $assert(!this._noStyles, 'js.dom.Style#get', 'Element with no styles.');
  if (this._noStyles) 
  {
    return null;
  }
  $assert(style, 'js.dom.Style#get', 'Style is undefined, null or empty.');
  if (!style) 
  {
    return null;
  }
  style = js.util.Strings.toScriptCase(style);
  var v = this._getComputedStyle(style);
  var isNull = (typeof v === 'undefined' || v.length === 0);
  if (js.ua.Engine.TRIDENT && style === 'zIndex' && v === 0) 
  {
    isNull = true;
  }
  if (isNull) 
  {
    return null;
  }
  if (!js.lang.Types.isString(v)) 
  {
    v = v.toString();
  }
  return v;
}, _getComputedStyle: function(style) {
  return window.getComputedStyle(this._node).getPropertyValue(style);
}, remove: function(style) {
  $assert(!this._noStyles, 'js.dom.Style#remove', 'Element with no styles.');
  if (!this._noStyles) 
  {
    this._node.style[js.util.Strings.toScriptCase(style)] = '';
  }
  return this;
}, has: function(style) {
  $assert(!this._noStyles, 'js.dom.Style#has', 'Element with no styles.');
  if (this._noStyles) 
  {
    return false;
  }
  style = this._node.style[js.util.Strings.toScriptCase(style)];
  if (!style) 
  {
    return false;
  }
  if (arguments.length === 1) 
  {
    return Boolean(style);
  }
  for (var i = 1; i < arguments.length; ++i) 
    {
      if (style === arguments[i]) 
      {
        return true;
      }
    }
  return false;
}, isVisible: function() {
  var n = this._node;
  while (n) 
    {
      if (n.style.display.toLowerCase() === 'none') 
      {
        return false;
      }
      if (n.style.visibility.toLowerCase() !== 'hidden') 
      {
        return false;
      }
      if (n.nodeName.toLowerCase() === 'body') 
      {
        return true;
      }
      n = n.parentNode;
    }
  return false;
}, getWidth: function() {
  $assert(!this._noStyles, 'js.dom.Style#getWidth', 'Element with no styles.');
  return parseInt(this._getComputedStyle('width'), 10);
}, setWidth: function(width) {
  $assert(!this._noStyles, 'js.dom.Style#setWidth', 'Element with no styles.');
  $assert(width === 'auto' || width === 'inherit' || js.lang.Types.isNumber(width), 'js.dom.Style#setWidth', 'Width is not a valid.');
  if (js.lang.Types.isNumber(width)) 
  {
    width = width.toString(10) + 'px';
  }
  return this.set('width', width);
}, getHeight: function() {
  $assert(!this._noStyles, 'js.dom.Style#getHeight', 'Element with no styles.');
  return parseInt(this._getComputedStyle('height'), 10);
}, setHeight: function(height) {
  $assert(!this._noStyles, 'js.dom.Style#setHeight', 'Element with no styles.');
  $assert(height === 'auto' || height === 'inherit' || js.lang.Types.isNumber(height), 'js.dom.Style#setHeight', 'Height is not valid.');
  if (js.lang.Types.isNumber(height)) 
  {
    height = height.toString(10) + 'px';
  }
  return this.set('height', height);
}, getBorderWidth: function() {
  return {top: parseInt(this._getComputedStyle('border-top-width'), 10), right: parseInt(this._getComputedStyle('border-right-width'), 10), bottom: parseInt(this._getComputedStyle('border-bottom-width'), 10), left: parseInt(this._getComputedStyle('border-left-width'), 10)};
}, getPadding: function() {
  return {top: parseInt(this._getComputedStyle('padding-top'), 10), right: parseInt(this._getComputedStyle('padding-right'), 10), bottom: parseInt(this._getComputedStyle('padding-bottom'), 10), left: parseInt(this._getComputedStyle('padding-left'), 10)};
}, getMargin: function() {
  return {top: parseInt(this._getComputedStyle('margin-top'), 10), right: parseInt(this._getComputedStyle('margin-right'), 10), bottom: parseInt(this._getComputedStyle('margin-bottom'), 10), left: parseInt(this._getComputedStyle('margin-left'), 10)};
}, setPosition: function(position) {
  $assert(position, 'js.dom.Style#setPosition', 'Position is undefined, null or empty.');
  if (position) 
  {
    this.set('position', position);
  }
  return this;
}, getPosition: function() {
  return this.get('position');
}, isPositioned: function() {
  var p = this.get('position');
  return p === 'absolute' || p === 'fixed' || p === 'relative';
}, setTop: function(top) {
  $assert(this.isPositioned(), 'js.dom.Style#setTop', 'Trying to set position on not positioned element.');
  $assert(js.lang.Types.isNumber(top), 'js.dom.Style#setTop', 'Top value is not numeric.');
  return this.set('top', Math.round(top).toString(10) + 'px');
}, setRight: function(right) {
  $assert(this.isPositioned(), 'js.dom.Style#setRight', 'Trying to set position on not positioned element.');
  $assert(js.lang.Types.isNumber(right), 'js.dom.Style#setRight', 'Right value is not numeric.');
  return this.set('right', Math.round(right).toString(10) + 'px');
}, setBottom: function(bottom) {
  $assert(this.isPositioned(), 'js.dom.Style#setBottom', 'Trying to set position on not positioned element.');
  $assert(js.lang.Types.isNumber(bottom), 'js.dom.Style#setBottom', 'Bottom value is not numeric.');
  return this.set('bottom', Math.round(bottom).toString(10) + 'px');
}, setLeft: function(left) {
  $assert(this.isPositioned(), 'js.dom.Style#setLeft', 'Trying to set position on not positioned element.');
  $assert(js.lang.Types.isNumber(left), 'js.dom.Style#setLeft', 'Left value is not numeric.');
  return this.set('left', Math.round(left).toString(10) + 'px');
}, getPageLeft: function() {
  $assert(!this._noStyles, 'js.dom.Style#getPageLeft', 'Element with no styles.');
  if (this._noStyles) 
  {
    return null;
  }
  var left = 0;
  for (var n = this._node; n; n = n.offsetParent) 
    {
      left += n.offsetLeft;
    }
  return left;
}, getPageTop: function() {
  $assert(!this._noStyles, 'js.dom.Style#getPageTop', 'Element with no styles.');
  if (this._noStyles) 
  {
    return null;
  }
  var top = 0;
  for (var n = this._node; n; n = n.offsetParent) 
    {
      top += n.offsetTop;
    }
  return top;
}, swap: function(styles, fn, scope) {
  var old = {};
  for (var name in styles) 
    {
      old[name] = this._node.style[name];
      this._node.style[name] = styles[name];
    }
  var value = fn.apply(scope, $args(arguments, 3));
  for (var name in styles) 
    {
      this._node.style[name] = old[name];
    }
  return value;
}, toString: function() {
  return 'js.dom.Style';
}};
$extends(js.dom.Style, Object);
$legacy(js.ua.Engine.TRIDENT, function() {
  js.dom.Style.prototype._getComputedStyle = function(style) {
  if (window.getComputedStyle) 
  {
    return window.getComputedStyle(this._node).getPropertyValue(style);
  }
  if (this._node.currentStyle) 
  {
    return this._node.currentStyle[js.util.Strings.toScriptCase(style)];
  }
};
});
$package("js.dom.template");
js.dom.template.ArabicNumeralNumbering = function() {
};
js.dom.template.ArabicNumeralNumbering.prototype = {format: function(index) {
  return index.toString(10);
}, toString: function() {
  return "js.dom.template.ArabicNumeralNumbering";
}};
$extends(js.dom.template.ArabicNumeralNumbering, Object);
$package('js.dom.template');
js.dom.template.Operator = function(content) {
  this._content = content;
};
js.dom.template.Operator.prototype = {_OBJECT_SETTER: "setObject", exec: function(element, scope, operand) {
  if (element.__ctor__ !== js.dom.Element && element.__ctor__ && element.__ctor__.prototype.hasOwnProperty(this._OBJECT_SETTER)) 
  {
    $assert(typeof this._content !== "undefined", "js.dom.template.Operator#exec", "User defined object setter for operator |%s| with no content.", this);
    $debug("js.dom.template.Operator#exec", "User defined |%s| object setter for operator |%s|.", element, this);
    element.setObject(this._content.getValue(scope, operand));
    return;
  }
  $assert(element instanceof js.dom.Element, "js.dom.template.Operator#exec", "Element is undefined, null or not of proper type.");
  $assert(typeof scope !== "undefined" && scope !== null, "js.dom.template.Operator#exec", "Scope is undefined or null.");
  $assert(js.lang.Types.isString(operand), "js.dom.template.Operator#exec", "Operand is undefined, null or not a string.");
  try {
    return this._exec(element, scope, operand);
  }  catch (er) {
  if (er instanceof js.dom.template.ContentException) 
  {
    $warn("js.dom.template.Operator#exec", "Undefined or invalid property:\r\n" + "\t- element: %s\r\n" + "\t- property path: %s\r\n" + "\t- cause: %s", element.trace(), er.propertyPath, er.message);
    return undefined;
  }
  throw er;
}
}, _exec: function(element, scope, operand) {
}, toString: function() {
  return "js.dom.template.Operator";
}};
$extends(js.dom.template.Operator, Object);
$package("js.dom.template");
js.dom.template.AttrOperator = function(content) {
  this.$super(content);
};
js.dom.template.AttrOperator.prototype = {_exec: function(element, scope, expression) {
  js.util.Strings.parseNameValues(expression).forEach(function(pairs) {
  var propertyPath = pairs.value;
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.AttrOperator#exec", "Operand is property path but scope is not an object.");
  var attrName = pairs.name;
  var value = this._content.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.AttrOperator#_exec", "Null property |%s|. Remove %s attribute from element |%s|.", propertyPath, attrName, element.trace());
    element.removeAttr(attrName);
  } else {
    if (attrName === "id" && js.lang.Types.isNumber(value)) 
    {
      value = value.toString();
    }
    $assert(js.lang.Types.isString(value), "js.dom.template.AttrOperator#_exec", "Content value is not a string.");
    $debug("js.dom.template.AttrOperator#_exec", "Set element |%s| %s attribute from property |%s|.", element.trace(), attrName, propertyPath);
    element.setAttr(attrName, value);
  }
}, this);
}, toString: function() {
  return "js.dom.template.AttrOperator";
}};
$extends(js.dom.template.AttrOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.CaseOperator = function(content) {
  this.$super(content);
};
js.dom.template.CaseOperator.prototype = {_exec: function(element, scope, expression) {
  var separatorIndex = expression.indexOf(':');
  $assert(separatorIndex !== -1, "js.dom.template.CaseOperator#_exec", "Invalid expression |%s|. Missing separator.", expression);
  $assert(separatorIndex < expression.length - 1, "js.dom.template.CaseOperator#_exec", "Invalid expression |%s|. Missing literal.", expression);
  var propertyPath = expression.substring(0, separatorIndex);
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.CaseOperator#exec", "Operand is property path but scope is not an object.");
  var literal = expression.substring(separatorIndex + 1);
  var value = this._content.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.CaseOperator#_exec", "Null property |%s|. Disable element |%s| branch.", propertyPath, element.trace());
    return false;
  }
  $assert(js.lang.Types.isString(value), "js.dom.template.CaseOperator#_exec", "Content value is not a string.");
  var branchEnabled = literal === value;
  $debug("js.dom.template.CaseOperator#_exec", "Property |%s| %sables element |%s| branch.", propertyPath, branchEnabled ? "en" : "dis", element.trace());
  return branchEnabled;
}, toString: function() {
  return "js.dom.template.CaseOperator";
}};
$extends(js.dom.template.CaseOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.Content = function(model) {
  $assert(model, "js.dom.template.Content#Content", "Model is undefined or null.");
  this._model = model ? model : {};
};
$static(function() {
  js.dom.template.Content._EMPTY_ITERATOR = new js.lang.Uniterator([]);
  js.dom.template.Content._EMPTY_MAP = {};
});
js.dom.template.Content.prototype = {getModel: function() {
  return this._model;
}, getIterable: function(scope, propertyPath) {
  var value = this.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.Content#getIterable", "Null content value for property |%s|. Returns empty iterator.", propertyPath);
    return js.dom.template.Content._EMPTY_ITERATOR;
  }
  if (!js.lang.Types.isArray(value)) 
  {
    throw new js.dom.template.ContentException(propertyPath, "Invalid content type. Expected array but got |%s|.", value);
  }
  return new js.lang.Uniterator(value);
}, getMap: function(scope, propertyPath) {
  var value = this.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.Content#getMap", "Null content value for property |%s|. Returns empty map.", propertyPath);
    return js.dom.template.Content._EMPTY_MAP;
  }
  if (!js.lang.Types.isStrictObject(value)) 
  {
    throw new js.dom.template.ContentException(propertyPath, "Invalid content type. Expected map but got |%s|.", value);
  }
  return value;
}, isEmpty: function(scope, propertyPath) {
  var value = this.getValue(scope, propertyPath);
  if (value === null) 
  {
    return true;
  }
  if (typeof value.length !== "undefined") 
  {
    return value.length === 0;
  }
  if (js.lang.Types.isFunction(value.size)) 
  {
    return value.size() === 0;
  }
  if (js.lang.Types.isFunction(value.isEmpty)) 
  {
    return value.isEmpty();
  }
  return !value;
}, getValue: function(context, propertyPath) {
  $assert(arguments.length === 1 || arguments.length === 2, "js.dom.template.Content#getValue", "Invalid arguments count.");
  if (propertyPath === ".") 
  {
    return context;
  }
  if (propertyPath.charAt(0) === ".") 
  {
    return this._getAbsoluteValue(propertyPath);
  }
  return this._getRelativeValue(context, propertyPath);
}, _getAbsoluteValue: function(propertyPath) {
  $assert(propertyPath && js.lang.Types.isString(propertyPath), "js.dom.template.Content#_getAbsoluteValue", "Property path is undefined, null, empty or not string.");
  $assert(propertyPath.charAt(0) === ".", "js.dom.template.Content#_getAbsoluteValue", "Property path is not absolute.");
  return this._getRelativeValue(this._model, propertyPath.substr(1));
}, _getRelativeValue: function(context, propertyPath) {
  $assert(context && js.lang.Types.isObject(context), "js.dom.template.Content#_getRelativeValue", "Context is undefined, null or not object.");
  $assert(propertyPath && js.lang.Types.isString(propertyPath), "js.dom.template.Content#_getRelativeValue", "Property path is undefined, null, empty or not string.");
  var o = context;
  var pathElements = propertyPath.split(".");
  for (var i = 0; ; ) 
    {
      o = this._getObjectProperty(o, pathElements[i]);
      if (++i === pathElements.length) 
      {
        return o;
      }
      if (o === null) 
      {
        return null;
      }
      if (!js.lang.Types.isObject(o)) 
      {
        throw new js.dom.template.ContentException(propertyPath, "Undefined content value.");
      }
    }
  return o;
}, _getObjectProperty: function(object, property) {
  $assert(js.lang.Types.isObject(object), "js.dom.template.Content#_getObjectProperty", "Object is not of proper type.");
  $assert(js.lang.Types.isString(property), "js.dom.template.Content#_getObjectProperty", "Property name is not a string.");
  var value = object[property];
  if (typeof value !== "undefined") 
  {
    return value;
  }
  var getterName = "get" + property.charAt(0).toUpperCase() + property.substr(1);
  var getter = this[getterName];
  if (js.lang.Types.isFunction(getter)) 
  {
    return getter.call(this, object);
  }
  throw new js.dom.template.ContentException(property, "Undefined content value.");
}, toString: function() {
  return "js.dom.template.Content";
}};
$extends(js.dom.template.Content, Object);
$package('js.dom.template');
js.dom.template.ContentException = function(propertyPath, message) {
  $assert(this instanceof js.dom.template.ContentException, 'js.dom.template.ContentException#ContentException', 'Invoked as function.');
  this.$super($format(arguments, 1));
  this.name = 'Undefined property exception';
  this.propertyPath = propertyPath;
};
js.dom.template.ContentException.prototype = {toString: function() {
  return 'js.dom.template.ContentException';
}};
$extends(js.dom.template.ContentException, js.lang.Exception);
$package("js.dom.template");
js.dom.template.CssClassOperator = function(content) {
  this.$super(content);
};
js.dom.template.CssClassOperator.prototype = {_exec: function(element, scope, expression) {
  js.util.Strings.parseNameValues(expression).forEach(function(pair) {
  var propertyPath = pair.name;
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.CssClassOperator#_exec", "Scope is not an object.");
  var cssClass = pair.value;
  var value = this._content.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.CssClassOperator#_exec", "Null property |%s|. Remove CSS class |%s| from element |%s|.", propertyPath, cssClass, element.trace());
    element.removeCssClass(cssClass);
    return;
  }
  if (js.lang.Types.isString(value)) 
  {
    value = value === cssClass;
  } else if (js.lang.Types.isArray(value)) 
  {
    value = value.indexOf(cssClass) !== -1;
  }
  if (value) 
  {
    $debug("js.dom.template.CssClassOperator#_exec", "Add CSS class |%s| to element |%s|.", cssClass, element.trace());
    element.addCssClass(cssClass);
  } else {
    $debug("js.dom.template.CssClassOperator#_exec", "Remove CSS class |%s| from element |%s|.", cssClass, element.trace());
    element.removeCssClass(cssClass);
  }
}, this);
}, toString: function() {
  return "js.dom.template.CssClassOperator";
}};
$extends(js.dom.template.CssClassOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.ExcludeOperator = function() {
};
js.dom.template.ExcludeOperator.prototype = {_exec: function(element, scope, booleanExpression) {
  return !(booleanExpression.toLowerCase() === "true");
}, toString: function() {
  return "js.dom.template.ExcludeOperator";
}};
$extends(js.dom.template.ExcludeOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.GotoOperator = function() {
};
js.dom.template.GotoOperator.prototype = {_exec: function(element, scope, elementID) {
  return elementID;
}, toString: function() {
  return "js.dom.template.GotoOperator";
}};
$extends(js.dom.template.GotoOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.HrefOperator = function(content) {
  this.$super(content);
};
js.dom.template.HrefOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.HrefOperator#exec", "Operand is property path but scope is not an object.");
  var href = this._content.getValue(scope, propertyPath);
  if (href === null) 
  {
    $warn("js.dom.template.HrefOperator#_exec", "Null property |%s|. Remove href attribute from element |%s|.", propertyPath, element.trace());
    element.removeAttr("href");
  } else {
    $assert(js.lang.Types.isString(href), "js.dom.template.HrefOperator#_exec", "Content value is not a string.");
    $debug("js.dom.template.HrefOperator#_exec", "Set element |%s| href attribute from property |%s|.", element.trace(), propertyPath);
    element.setAttr("href", href);
  }
}, toString: function() {
  return "js.dom.template.HrefOperator";
}};
$extends(js.dom.template.HrefOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.HtmlOperator = function(content) {
  this.$super(content);
};
js.dom.template.HtmlOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.HtmlOperator#exec", "Operand is property path but scope is not an object.");
  $assert(!element.hasChildren(), "js.dom.template.HtmlOperator#_exec", "Element has children.");
  var html = this._content.getValue(scope, propertyPath);
  if (html === null) 
  {
    $warn("js.dom.template.HtmlOperator#_exec", "Null property |%s|. Remove children from element |%s|.", propertyPath, element.trace());
    element.removeChildren();
  } else {
    $assert(js.lang.Types.isString(html), "js.dom.template.HtmlOperator#_exec", "Content value is not a string.");
    $debug("js.dom.template.HtmlOperator#_exec", "Set element |%s| inner HTML from property |%s|.", element.trace(), propertyPath);
    element.setHTML(html);
  }
  return null;
}, toString: function() {
  return "js.dom.template.HtmlOperator";
}};
$extends(js.dom.template.HtmlOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.IdOperator = function(content) {
  this.$super(content);
};
js.dom.template.IdOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.IdOperator#exec", "Operand is property path but scope is not an object.");
  var id = this._content.getValue(scope, propertyPath);
  if (id === null) 
  {
    $warn("js.dom.template.IdOperator#_exec", "Null property |%s|. Remove id attribute from element |%s|.", propertyPath, element.trace());
    element.removeAttr("id");
  } else {
    if (js.lang.Types.isNumber(id)) 
    {
      id = id.toString();
    }
    $assert(js.lang.Types.isString(id), "js.dom.template.IdOperator#_exec", "Content value is not a string.");
    $debug("js.dom.template.IdOperator#_exec", "Set element |%s| id attribute from property |%s|.", element.trace(), propertyPath);
    element.setAttr("id", id);
  }
}, toString: function() {
  return "js.dom.template.IdOperator";
}};
$extends(js.dom.template.IdOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.IfNotOperator = function(content) {
  this.$super(content);
};
js.dom.template.IfNotOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.IfNotOperator#exec", "Operand is property path but scope is not an object.");
  return this._content.isEmpty(scope, propertyPath);
}, toString: function() {
  return "js.dom.template.IfNotOperator";
}};
$extends(js.dom.template.IfNotOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.IfOperator = function(content) {
  this.$super(content);
};
js.dom.template.IfOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.IfOperator#exec", "Operand is property path but scope is not an object.");
  return !this._content.isEmpty(scope, propertyPath);
}, toString: function() {
  return "js.dom.template.IfOperator";
}};
$extends(js.dom.template.IfOperator, js.dom.template.Operator);
$package('js.dom.template');
js.dom.template.Index = function() {
  this.value = 0;
};
js.dom.template.Index.prototype = {increment: function() {
  ++this.value;
}, toString: function() {
  return "js.dom.template.Index";
}};
$extends(js.dom.template.Index, Object);
$package("js.dom.template");
js.dom.template.ListOperator = function(template, content) {
  this._template = template;
  this.$super(content);
};
js.dom.template.ListOperator.prototype = {_ITEM_TEMPLATE: "item-template", _ITEM_VALUE: "value", _exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.ListOperator#exec", "Operand is property path but scope is not an object.");
  var itemTemplate = element.getUserData(this._ITEM_TEMPLATE);
  if (itemTemplate === null) 
  {
    itemTemplate = element.getFirstChild();
    $assert(itemTemplate !== null, "js.dom.template.ListOperator#exec", "Invalid list element |%s|. Missing item template.", element.trace());
    itemTemplate.remove(false);
    element.setUserData(this._ITEM_TEMPLATE, itemTemplate);
  }
  element.removeChildren();
  $debug("js.dom.template.ListOperator#_exec", "Process element |%s| for property |%s|.", element.trace(), propertyPath);
  var it = this._content.getIterable(scope, propertyPath), itemElement, value;
  while (it.hasNext()) 
    {
      value = it.next();
      itemElement = itemTemplate.clone(true);
      itemElement.setUserData(this._ITEM_VALUE, value);
      element.addChild(itemElement);
      this._template._injectItem(itemElement, value);
    }
  return null;
}, toString: function() {
  return "js.dom.template.ListOperator";
}};
$extends(js.dom.template.ListOperator, js.dom.template.Operator);
$package('js.dom.template');
js.dom.template.UpperCaseRomanNumbering = function() {
};
js.dom.template.UpperCaseRomanNumbering.prototype = {Numeral: [{roman: 'I', decimal: 1}, {roman: 'IV', decimal: 4}, {roman: 'V', decimal: 5}, {roman: 'IX', decimal: 9}, {roman: 'X', decimal: 10}, {roman: 'XL', decimal: 40}, {roman: 'L', decimal: 50}, {roman: 'XC', decimal: 90}, {roman: 'C', decimal: 100}, {roman: 'CD', decimal: 400}, {roman: 'D', decimal: 500}, {roman: 'CM', decimal: 900}, {roman: 'M', decimal: 1000}], format: function(index) {
  var s = '';
  for (var i = this.Numeral.length - 1; i >= 0; i--) 
    {
      while (index >= this.Numeral[i].decimal) 
        {
          s += this.Numeral[i].roman;
          index -= this.Numeral[i].decimal;
        }
    }
  return s;
}, toString: function() {
  return 'js.dom.template.UpperCaseRomanNumbering';
}};
$extends(js.dom.template.UpperCaseRomanNumbering, Object);
$package('js.dom.template');
js.dom.template.LowerCaseRomanNumbering = function() {
};
js.dom.template.LowerCaseRomanNumbering.prototype = {format: function(index) {
  return this.$super('format', index).toLowerCase();
}, toString: function() {
  return "js.dom.template.LowerCaseRomanNumbering";
}};
$extends(js.dom.template.LowerCaseRomanNumbering, js.dom.template.UpperCaseRomanNumbering);
$package('js.dom.template');
js.dom.template.UpperCaseStringNumbering = function() {
};
js.dom.template.UpperCaseStringNumbering.prototype = {_dictionary: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", format: function(index) {
  --index;
  var charsCount = Math.floor(index / this._dictionary.length) + 1;
  index = index % this._dictionary.length;
  var c = this._dictionary.charAt(index);
  var s = "";
  for (var i = 0; i < charsCount; ++i) 
    {
      s += c;
    }
  return s;
}, toString: function() {
  return 'js.dom.template.UpperCaseStringNumbering';
}};
$extends(js.dom.template.UpperCaseStringNumbering, Object);
$package('js.dom.template');
js.dom.template.LowerCaseStringNumbering = function() {
};
js.dom.template.LowerCaseStringNumbering.prototype = {format: function(index) {
  return this.$super('format', index).toLowerCase();
}, toString: function() {
  return "js.dom.template.LowerCaseStringNumbering";
}};
$extends(js.dom.template.LowerCaseStringNumbering, js.dom.template.UpperCaseStringNumbering);
$package("js.dom.template");
js.dom.template.MapOperator = function(template, content) {
  this._template = template;
  this.$super(content);
};
js.dom.template.MapOperator.prototype = {_KEY_TEMPLATE: "key-template", _VALUE_TEMPLATE: "value-template", _exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.MapOperator#exec", "Operand is property path but scope is not an object.");
  var keyTemplate = element.getUserData(this._KEY_TEMPLATE), valueTemplate;
  if (keyTemplate === null) 
  {
    keyTemplate = element.getFirstChild();
    $assert(keyTemplate !== null, "js.dom.template.MapOperator#_exec", "Invalid map element |%s|. Missing key template.", element);
    keyTemplate.remove(false);
    element.setUserData(this._KEY_TEMPLATE, keyTemplate);
    valueTemplate = element.getFirstChild();
    $assert(valueTemplate !== null, "js.dom.template.MapOperator#_exec", "Invalid MAP element |%s|. Missing value template.", element.trace());
    valueTemplate.remove(false);
    element.setUserData(this._VALUE_TEMPLATE, valueTemplate);
  } else {
    valueTemplate = element.getUserData(this._VALUE_TEMPLATE);
  }
  element.removeChildren();
  $debug("js.dom.template.MapOperator#_exec", "Process element |%s| for property |%s|.", element.trace(), propertyPath);
  var map = this._content.getMap(scope, propertyPath), keyElement, valueElement;
  for (var key in map) 
    {
      keyElement = keyTemplate.clone(true);
      valueElement = valueTemplate.clone(true);
      element.addChild(keyElement, valueElement);
      this._template._injectItem(keyElement, key);
      this._template._injectItem(valueElement, map[key]);
    }
  return null;
}, toString: function() {
  return "js.dom.template.MapOperator";
}};
$extends(js.dom.template.MapOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.NumberingOperator = function(template, content) {
  this._template = template;
  this.$super(content);
};
js.dom.template.NumberingOperator.prototype = {_exec: function(element, scope, format) {
  var indexes = this._template._indexes;
  $assert(indexes.length > 0, "js.dom.template.NumberingOperator#_exec", "Required ordered collection index is missing. Numbering operator cancel execution.");
  element.setText(this._getNumbering(indexes, format));
  return null;
}, _getNumbering: function(indexes, format) {
  var sb = "";
  var i = format.length;
  var j = i;
  var indexPosition = indexes.length - 1;
  for (; ; ) 
    {
      i = format.lastIndexOf('%', i);
      if (i === -1 && j > 0) 
      {
        sb = format.substring(0, j) + sb;
        break;
      }
      if (i + 2 < format.length) 
      {
        sb = format.substring(i + 2, j) + sb;
      }
      if (i + 1 === format.length) 
      {
        continue;
      }
      var numberingFormat = this._getNumberingFormat(format.charAt(i + 1));
      sb = numberingFormat.format(indexes[indexPosition--].value) + sb;
      if (i === 0) 
      {
        break;
      }
      j = i;
      i--;
    }
  return sb;
}, _getNumberingFormat: function(formatCode) {
  switch (formatCode) {
    case 'n':
      return new js.dom.template.ArabicNumeralNumbering();
    case 's':
      return new js.dom.template.LowerCaseStringNumbering();
    case 'S':
      return new js.dom.template.UpperCaseStringNumbering();
    case 'i':
      return new js.dom.template.LowerCaseRomanNumbering();
    case 'I':
      return new js.dom.template.UpperCaseRomanNumbering();
  }
  $assert(false, "js.dom.template.NumberingOperator#_getNumberingFormat", "Invalid numbering format code |%s|.", formatCode);
}, toString: function() {
  return "js.dom.template.NumberingOperator";
}};
$extends(js.dom.template.NumberingOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.ObjectOperator = function(content) {
  this.$super(content);
};
js.dom.template.ObjectOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isStrictObject(scope), "js.dom.template.ObjectOperator#exec", "Operand is property path but scope is not an object.");
  var value = this._content.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.ObjectOperator#_exec", "Null scope for property |%s| on element |%s|.", propertyPath, element.trace());
  } else if ((propertyPath === "." && js.lang.Types.isFunction(value)) || (propertyPath !== "." && !js.lang.Types.isStrictObject(value))) 
  {
    throw new js.dom.template.ContentException(propertyPath, "Invalid content type. Expected strict object but got |%s|.", js.lang.Types.getTypeName(value));
  }
  return value;
}, toString: function() {
  return "js.dom.template.ObjectOperator";
}};
$extends(js.dom.template.ObjectOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.OListOperator = function(template, content) {
  this._template = template;
  this.$super(content);
};
js.dom.template.OListOperator.prototype = {_ITEM_TEMPLATE: "item-template", _exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.OListOperator#exec", "Operand is property path but scope is not an object.");
  var itemTemplate = element.getUserData(this._ITEM_TEMPLATE);
  if (itemTemplate === null) 
  {
    itemTemplate = element.getFirstChild();
    $assert(itemTemplate !== null, "js.dom.template.OListOperator#exec", "Invalid list element |%s|. Missing item template.", element.trace());
    itemTemplate.remove(false);
    element.setUserData(this._ITEM_TEMPLATE, itemTemplate);
  }
  element.removeChildren();
  var indexes = this._template._indexes;
  var index = new js.dom.template.Index();
  indexes.push(index);
  $debug("js.dom.template.OListOperator#_exec", "Process element |%s| with property |%s|.", element.trace(), propertyPath);
  var it = this._content.getIterable(scope, propertyPath), itemElement;
  while (it.hasNext()) 
    {
      index.increment();
      itemElement = itemTemplate.clone(true);
      element.addChild(itemElement);
      this._template._injectItem(itemElement, it.next());
    }
  indexes.pop();
  return null;
}, toString: function() {
  return "js.dom.template.OListOperator";
}};
$extends(js.dom.template.OListOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.OMapOperator = function(template, content) {
  this._template = template;
  this.$super(content);
};
js.dom.template.OMapOperator.prototype = {_KEY_TEMPLATE: "key-template", _VALUE_TEMPLATE: "value-template", _exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.OMapOperator#exec", "Operand is property path but scope is not an object.");
  var keyTemplate = element.getUserData(this._KEY_TEMPLATE), valueTemplate;
  if (keyTemplate === null) 
  {
    keyTemplate = element.getFirstChild();
    $assert(keyTemplate !== null, "js.dom.template.OMapOperator#_exec", "Invalid map element |%s|. Missing key template.", element);
    keyTemplate.remove(false);
    element.setUserData(this._KEY_TEMPLATE, keyTemplate);
    valueTemplate = element.getFirstChild();
    $assert(valueTemplate !== null, "js.dom.template.OMapOperator#_exec", "Invalid MAP element |%s|. Missing value template.", element.trace());
    valueTemplate.remove(false);
    element.setUserData(this._VALUE_TEMPLATE, valueTemplate);
  } else {
    valueTemplate = element.getUserData(this._VALUE_TEMPLATE);
  }
  element.removeChildren();
  var indexes = this._template._indexes;
  var index = new js.dom.template.Index();
  indexes.push(index);
  $debug("js.dom.template.OMapOperator#_exec", "Process element |%s| for property |%s|.", element.trace(), propertyPath);
  var map = this._content.getMap(scope, propertyPath), keyElement, valueElement;
  for (var key in map) 
    {
      index.increment();
      keyElement = keyTemplate.clone(true);
      valueElement = valueTemplate.clone(true);
      element.addChild(keyElement, valueElement);
      this._template._injectItem(keyElement, key);
      this._template._injectItem(valueElement, map[key]);
    }
  indexes.pop();
  return null;
}, toString: function() {
  return "js.dom.template.OMapOperator";
}};
$extends(js.dom.template.OMapOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.Opcode = {NONE: 1, ATTR: 2, ID: 3, SRC: 4, HREF: 5, TITLE: 6, VALUE: 7, EXCLUDE: 8, GOTO: 9, IF: 10, IFNOT: 11, CASE: 12, TEXT: 13, HTML: 14, NUMBERING: 15, OBJECT: 16, LIST: 17, OLIST: 18, MAP: 19, OMAP: 20, CSS_CLASS: 21, _OPCODE_PREFIX: "data-", fromAttrName: function(attrName) {
  if (attrName.indexOf(this._OPCODE_PREFIX) !== 0) 
  {
    return this.NONE;
  }
  var opcode = attrName.substring(this._OPCODE_PREFIX.length).toUpperCase().replace(/-/g, '_');
  if (!(opcode in this)) 
  {
    return this.NONE;
  }
  return this[opcode];
}, hasOperator: function(element, operatorName) {
  return element.hasAttr(this._OPCODE_PREFIX + operatorName.toLowerCase());
}, type: function(opcode) {
  var t = this._types[opcode];
  return (typeof t === "undefined") ? js.dom.template.Opcode.Type.NONE : t;
}};
js.dom.template.Opcode.Type = {NONE: 1, JUMP: 2, CONDITIONAL: 3, CONTENT: 4, ATTRIBUTE: 5, name: function(type) {
  if (!this._names) 
  {
    this._names = ["NONE", "JUMP", "CONDITIONAL", "CONTENT", "ATTRIBUTE"];
  }
  return this._names[type - 1] || this._names[0];
}};
$static(function() {
  var Opcode = js.dom.template.Opcode;
  Opcode._types = {};
  Opcode._types[Opcode.NONE] = Opcode.Type.NONE;
  Opcode._types[Opcode.ATTR] = Opcode.Type.ATTRIBUTE;
  Opcode._types[Opcode.ID] = Opcode.Type.ATTRIBUTE;
  Opcode._types[Opcode.SRC] = Opcode.Type.ATTRIBUTE;
  Opcode._types[Opcode.HREF] = Opcode.Type.ATTRIBUTE;
  Opcode._types[Opcode.TITLE] = Opcode.Type.ATTRIBUTE;
  Opcode._types[Opcode.VALUE] = Opcode.Type.ATTRIBUTE;
  Opcode._types[Opcode.IF] = Opcode.Type.CONDITIONAL;
  Opcode._types[Opcode.IFNOT] = Opcode.Type.CONDITIONAL;
  Opcode._types[Opcode.CASE] = Opcode.Type.CONDITIONAL;
  Opcode._types[Opcode.EXCLUDE] = Opcode.Type.CONDITIONAL;
  Opcode._types[Opcode.TEXT] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.HTML] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.NUMBERING] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.OBJECT] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.LIST] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.OLIST] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.MAP] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.OMAP] = Opcode.Type.CONTENT;
  Opcode._types[Opcode.GOTO] = Opcode.Type.JUMP;
  Opcode._types[Opcode.CSS_CLASS] = Opcode.Type.ATTRIBUTE;
});
$package('js.dom.template');
js.dom.template.OperatorFactory = function(template) {
  $assert(template instanceof js.dom.template.Template, "js.dom.template.OperatorFactory#OperatorFactory", "Content is undefined, null or not of proper type.");
  this._template = template;
};
js.dom.template.OperatorFactory.prototype = {init: function(content) {
  $assert(content instanceof js.dom.template.Content, "js.dom.template.OperatorFactory#init", "Content is undefined, null or not of proepr type.");
  var Opcode = js.dom.template.Opcode;
  this[Opcode.GOTO] = new js.dom.template.GotoOperator(content);
  this[Opcode.EXCLUDE] = new js.dom.template.ExcludeOperator(content);
  this[Opcode.IF] = new js.dom.template.IfOperator(content);
  this[Opcode.IFNOT] = new js.dom.template.IfNotOperator(content);
  this[Opcode.CASE] = new js.dom.template.CaseOperator(content);
  this[Opcode.ATTR] = new js.dom.template.AttrOperator(content);
  this[Opcode.ID] = new js.dom.template.IdOperator(content);
  this[Opcode.SRC] = new js.dom.template.SrcOperator(content);
  this[Opcode.HREF] = new js.dom.template.HrefOperator(content);
  this[Opcode.TITLE] = new js.dom.template.TitleOperator(content);
  this[Opcode.VALUE] = new js.dom.template.ValueOperator(content);
  this[Opcode.CSS_CLASS] = new js.dom.template.CssClassOperator(content);
  this[Opcode.OBJECT] = new js.dom.template.ObjectOperator(content);
  this[Opcode.TEXT] = new js.dom.template.TextOperator(content);
  this[Opcode.HTML] = new js.dom.template.HtmlOperator(content);
  this[Opcode.NUMBERING] = new js.dom.template.NumberingOperator(this._template, content);
  this[Opcode.LIST] = new js.dom.template.ListOperator(this._template, content);
  this[Opcode.OLIST] = new js.dom.template.OListOperator(this._template, content);
  this[Opcode.MAP] = new js.dom.template.MapOperator(this._template, content);
  this[Opcode.OMAP] = new js.dom.template.OMapOperator(this._template, content);
}, getInstance: function(opcode) {
  var operator = this[opcode];
  $assert(typeof operator !== "undefined", "js.dom.template.OperatorFactory#getInstance", "Operator |%s| is not implemented.", opcode);
  return operator;
}, toString: function() {
  return "js.dom.template.OperatorFactory";
}};
$extends(js.dom.template.OperatorFactory, Object);
$package('js.dom.template');
js.dom.template.OperatorsList = function() {
};
js.dom.template.OperatorsList.prototype = {initElement: function(element) {
  this._excludeOperator = false;
  this._jumpOperator = null;
  this._conditionalOperator = null;
  this._formattingOperator = null;
  this._inlineOperator = null;
  this._contentOperator = null;
  this._attributeOperators = [];
  var Opcode = js.dom.template.Opcode;
  var attrs = element.getNode().attributes, i = 0, meta;
  for (var attr, attrName, attrValue, opcode, type; i < attrs.length; i++) 
    {
      attr = attrs[i];
      attrName = attr.nodeName;
      attrValue = attr.nodeValue;
      opcode = Opcode.fromAttrName(attrName);
      if (opcode === Opcode.NONE) 
      {
        continue;
      }
      if (opcode === Opcode.EXCLUDE) 
      {
        this._excludeOperator = true;
        break;
      }
      $assert(attrValue.length !== 0, "js.dom.template.OperatorsList#initElement", "Empty operand on element |%s| for opcode |%s|.", element, opcode);
      meta = {opcode: opcode, operand: attrValue};
      type = Opcode.type(opcode);
      switch (type) {
        case Opcode.Type.JUMP:
          this._insanityCheck(element, this._jumpOperator, type);
          this._jumpOperator = meta;
          break;
        case Opcode.Type.CONDITIONAL:
          this._insanityCheck(element, this._conditionalOperator, type);
          this._conditionalOperator = meta;
          break;
        case Opcode.Type.FORMATTING:
          this._insanityCheck(element, this._formattingOperator, type);
          this._formattingOperator = meta;
          break;
        case Opcode.Type.INLINE:
          this._insanityCheck(element, this._inlineOperator, type);
          this._inlineOperator = meta;
          break;
        case Opcode.Type.CONTENT:
          this._insanityCheck(element, this._contentOperator, type);
          this._contentOperator = meta;
          break;
        case Opcode.Type.ATTRIBUTE:
          this._attributeOperators.push(meta);
          break;
        default:
          $assert(false, "js.dom.template.OperatorsList#initElement", "Invalid operators list on element |%s|. Unknown opcode type |%s|.", element, Opcode.Type.name(type));
      }
    }
}, initItem: function(element) {
  this.initElement(element);
  this._inlineOperator = null;
  if (this._contentOperator === null) 
  {
    var opcode = element.hasChildren() ? js.dom.template.Opcode.OBJECT : js.dom.template.Opcode.TEXT;
    this._contentOperator = {opcode: opcode, operand: "."};
  }
}, initSubtree: function(element) {
  this.initElement(element);
  if (this._contentOperator !== null) 
  {
    $assert(this._contentOperator.opcode !== js.dom.template.Opcode.TEXT, "js.dom.template.OperatorsList#initSubtree", "Subtree initializer forbids TEXT operator.");
    $assert(this._contentOperator.opcode !== js.dom.template.Opcode.HTML, "js.dom.template.OperatorsList#initSubtree", "Subtree initializer forbids HTML operator.");
    $assert(this._contentOperator.opcode !== js.dom.template.Opcode.NUMBERING, "js.dom.template.OperatorsList#initSubtree", "Subtree initializer forbids NUMBERING operator.");
    this._contentOperator.operand = ".";
    return;
  }
  if (this._inlineOperator !== null) 
  {
    this._inlineOperator.operand = ".";
    return;
  }
  $assert(false, "js.dom.template.OperatorsList#initSubtree", "Subtree initializer mandates content or inline operator.");
}, hasExcludeOperator: function() {
  return this._excludeOperator;
}, hasJumpOperator: function() {
  return this._jumpOperator !== null;
}, hasConditionalOperator: function() {
  return this._conditionalOperator !== null;
}, hasInlineOperator: function() {
  return this._inlineOperator !== null;
}, hasContentOperator: function() {
  return this._contentOperator !== null;
}, getJumpOperatorMeta: function() {
  $assert(this._jumpOperator !== null, "js.dom.template.OperatorsList#getJumpOperatorMeta", "Jump operator is null.");
  return this._jumpOperator;
}, getConditionalOperatorMeta: function() {
  $assert(this._conditionalOperator !== null, "js.dom.template.OperatorsList#getConditionalOperatorMeta", "Conditional operator is null.");
  return this._conditionalOperator;
}, getInlineOperatorMeta: function() {
  $assert(this._inlineOperator !== null, "js.dom.template.OperatorsList#getInlineOperatorMeta", "Inline operator is null.");
  return this._inlineOperator;
}, getContentOperatorMeta: function() {
  $assert(this._contentOperator !== null, "js.dom.template.OperatorsList#getContentOperatorMeta", "Content operator is null.");
  return this._contentOperator;
}, getAttributeOperatorsMeta: function() {
  return this._attributeOperators;
}, _insanityCheck: function(element, meta, type) {
  $assert(meta === null, "js.dom.template.OperatorsList#_insanityCheck", "Invalid operators list on element |%s|. Only one %s operator is allowed.", element, js.dom.template.Opcode.Type.name(type));
}, toString: function() {
  return "js.dom.template.OperatorsList";
}};
$extends(js.dom.template.OperatorsList, Object);
$package("js.dom.template");
js.dom.template.SrcOperator = function(content) {
  this.$super(content);
};
js.dom.template.SrcOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert((function() {
  var elementsWithSrc = ["iframe", "script", "img", "input", "textarea", "video", "audio"];
  return elementsWithSrc.indexOf(element.getTag()) !== -1;
})(), "js.dom.template.SrcOperator#exec", "SRC operator is not supported on element |%s|.", element.trace());
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.SrcOperator#exec", "Operand is property path but scope is not an object.");
  var value = this._content.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.SrcOperator#_exec", "Null property |%s|. Remove src attribute from element |%s|.", propertyPath, element.trace());
    element.removeAttr("src");
  } else {
    $assert(js.lang.Types.isString(value), "js.dom.template.SrcOperator#_exec", "Content value is not a string.");
    $debug("js.dom.template.SrcOperator#_exec", "Set element |%s| src attribute from property |%s|.", element.trace(), propertyPath);
    if (js.lang.Types.isFunction(element.setSrc)) 
    {
      element.setSrc(value);
    } else {
      element.setAttr("src", value);
    }
  }
}, toString: function() {
  return "js.dom.template.SrcOperator";
}};
$extends(js.dom.template.SrcOperator, js.dom.template.Operator);
$package('js.dom.template');
js.dom.template.Template = function(doc) {
  $assert(doc, "js.dom.template.Template#Template", "Document is undefined or null.");
  $assert(doc instanceof js.dom.Document, "js.dom.template.Template#Template", "Document is not of proper type.");
  this._doc = doc;
  this._operatorFactory = new js.dom.template.OperatorFactory(this);
  this._operators = new js.dom.template.OperatorsList();
  this._indexes = [];
};
js.dom.template.Template.getInstance = function(doc) {
  return new js.dom.template.Template(doc);
};
js.dom.template.Template.prototype = {inject: function(value) {
  $assert(value, "js.dom.template.Template#inject", "Value is undefined or null.");
  var content = this._init(value);
  this._injectElement(this._doc.getRoot(), content.getModel());
}, subinject: function(element, value) {
  $assert(element, "js.dom.template.Template#subinject", "Element is undefined or null.");
  $assert(element instanceof js.dom.Element, "js.dom.template.Template#subinject", "Element is not of proper type.");
  $assert(value, "js.dom.template.Template#subinject", "Value is undefined or null.");
  var content = this._init(value);
  this._operators.initSubtree(element);
  this._inject(element, content.getModel());
}, _init: function(value) {
  var content = value instanceof js.dom.template.Content ? value : new js.dom.template.Content(value);
  this._operatorFactory.init(content);
  return content;
}, _injectElement: function(element, scope) {
  this._operators.initElement(element);
  this._inject(element, scope);
}, _injectItem: function(element, scope) {
  this._operators.initItem(element);
  this._inject(element, scope);
}, _inject: function(element, scope) {
  $assert(element, "js.dom.template.Template#_inject", "Element is undefined or null.");
  $assert(element instanceof js.dom.Element, "js.dom.template.Template#_inject", "Element is not of proper type.");
  $assert(typeof scope !== "undefined" && scope !== null, "js.dom.template.Template#_inject", "Scope object is undefined or null.");
  if (this._operators.hasExcludeOperator()) 
  {
    $debug("js.dom.template.Template#_inject", "Element |%s| rejected by exclussion operator.", element.trace());
    return;
  }
  if (this._operators.hasJumpOperator()) 
  {
    var id = this._execOperator(element, scope, this._operators.getJumpOperatorMeta());
    element = this._doc.getById(id);
    this._operators.initElement(element);
  }
  if (this._operators.hasConditionalOperator()) 
  {
    var branchEnabled = this._execOperator(element, scope, this._operators.getConditionalOperatorMeta());
    if (!branchEnabled) 
    {
      $debug("js.dom.template.Template#_inject", "Element |%s| rejected by conditional operator.", element.trace());
      element.addCssClass("hidden");
      return;
    }
    element.removeCssClass("hidden");
  }
  if (this._operators.hasInlineOperator()) 
  {
    this._execOperator(element, scope, this._operators.getInlineOperatorMeta());
    return;
  }
  this._operators.getAttributeOperatorsMeta().forEach(function(meta) {
  this._execOperator(element, scope, meta);
}, this);
  if (this._operators.hasContentOperator()) 
  {
    scope = this._execOperator(element, scope, this._operators.getContentOperatorMeta());
    if (scope == null) 
    {
      return;
    }
  }
  var it = element.getChildren().it(), el;
  while (it.hasNext()) 
    {
      this._injectElement(it.next(), scope);
    }
}, _execOperator: function(element, scope, meta) {
  var operator = this._operatorFactory.getInstance(meta.opcode);
  return operator.exec(element, scope, meta.operand);
}, toString: function() {
  return "js.dom.template.Template";
}};
$extends(js.dom.template.Template, Object);
$package("js.dom.template");
js.dom.template.TextOperator = function(content) {
  this.$super(content);
};
js.dom.template.TextOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.TextOperator#exec", "Operand is property path but scope is not an object.");
  $assert(!element.hasChildren(), "js.dom.template.TextOperator#_exec", "Element has children.");
  var value = this._content.getValue(scope, propertyPath);
  if (value === null || value === '') 
  {
    $warn("js.dom.template.TextOperator#_exec", "Null or empty property |%s|. Remove element |%s| text content.", propertyPath, element.trace());
    element.removeText();
  } else {
    $debug("js.dom.template.TextOperator#_exec", "Set text content to element |%s| from property |%s|.", element.trace(), propertyPath);
    element.setValue(value);
  }
  return null;
}, toString: function() {
  return "js.dom.template.TextOperator";
}};
$extends(js.dom.template.TextOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.TitleOperator = function(content) {
  this.$super(content);
};
js.dom.template.TitleOperator.prototype = {_exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.TitleOperator#exec", "Operand is property path but scope is not an object.");
  var value = this._content.getValue(scope, propertyPath);
  if (value === null) 
  {
    $warn("js.dom.template.TitleOperator#_exec", "Null property |%s|. Remove title attribute from element |%s|.", propertyPath, element.trace());
    element.removeAttr("title");
  } else {
    $assert(js.lang.Types.isString(value), "js.dom.template.TitleOperator#_exec", "Content value is not a string.");
    $debug("js.dom.template.TitleOperator#_exec", "Set element |%s| title attribute from property |%s|.", element.trace(), propertyPath);
    element.setAttr("title", value);
  }
}, toString: function() {
  return "js.dom.template.TitleOperator";
}};
$extends(js.dom.template.TitleOperator, js.dom.template.Operator);
$package("js.dom.template");
js.dom.template.ValueOperator = function(content) {
  this.$super(content);
};
js.dom.template.ValueOperator.prototype = {GENERIC_ELEMENTS: ["div"], _exec: function(element, scope, propertyPath) {
  $assert(propertyPath === "." || js.lang.Types.isObject(scope), "js.dom.template.ValueOperator#_exec", "Operand is property path but scope is not an object.");
  var value = this._content.getValue(scope, propertyPath);
  if (js.util.Arrays.contains(this.GENERIC_ELEMENTS, element.getTag())) 
  {
    $assert(js.lang.Types.isFunction(element.setValue), "js.dom.template.ValueOperator#_exec", "Invalid generic element: missing value setter.");
    element.setValue(value);
    return;
  }
  $assert(element instanceof js.dom.Control, "js.dom.template.ValueOperator#_exec", "Element is not a control.");
  if (value === null) 
  {
    $warn("js.dom.template.ValueOperator#_exec", "Null property |%s|. Reset value for element |%s|.", propertyPath, element.trace());
    element.reset();
  } else {
    $assert(element._format !== null || js.lang.Types.isPrimitive(value), "js.dom.template.ValueOperator#_exec", "Formatter is null and content value is not a primitive.");
    $debug("js.dom.template.ValueOperator#_exec", "Set element |%s| value from property |%s|.", element.trace(), propertyPath);
    element.setValue(value);
  }
}, toString: function() {
  return "js.dom.template.ValueOperator";
}};
$extends(js.dom.template.ValueOperator, js.dom.template.Operator);
$package("js.event");
js.event.DomEvents = function(targetNode) {
  $assert(targetNode, "js.event.DomEvents#DomEvents", "Target node is undefined or null.");
  $assert(targetNode instanceof js.dom.Element || targetNode instanceof js.dom.Document, "js.event.DomEvents#DomEvents", "Given argument is not of proper type.");
  this._targetNode = new js.event.TargetNode(targetNode);
  this._handlers = [];
};
js.event.DomEvents.prototype = {hasType: function(type) {
  $assert(type, "js.event.DomEvents#hasType", "Event type is undefined, null or empty.");
  return type in js.event.Types;
}, getHandlers: function() {
  return this._handlers;
}, addListener: function(type, listener, scope, capture) {
  $assert(type in js.event.Types, "js.event.DomEvents#addListener", "Unrecognized event type #%s.", type);
  $assert(js.lang.Types.isFunction(listener), "js.event.DomEvents#addListener", "Event listener is not a function.");
  $assert(!scope || js.lang.Types.isObject(scope), "js.event.DomEvents#addListener", "Scope is not an object.");
  $assert(js.lang.Types.isBoolean(capture), "js.event.DomEvents#addListener", "Capture flag is not a boolean value.");
  if (!(type in js.event.Types)) 
  {
    return;
  }
  var handler = new js.event.Handler(this._targetNode, type, listener, scope, capture);
  if (js.util.Arrays.contains(this._handlers, handler)) 
  {
    $assert("js.event.DomEvents#addListener", "Event |%s:%s| already registered.", type, capture ? "capture" : "bubbling");
    return;
  }
  this._addListener(handler);
  this._handlers.push(handler);
}, removeListener: function(type, listener, capture) {
  $assert(type in js.event.Types, "js.event.DomEvents#removeListener", "Unrecognized event type #%s.", type);
  $assert(js.lang.Types.isFunction(listener), "js.event.DomEvents#removeListener", "Event listener is not a function.");
  $assert(js.lang.Types.isBoolean(capture), "js.event.DomEvents#removeListener", "Capture flag is not a boolean value.");
  if (!(type in js.event.Types)) 
  {
    return;
  }
  var _this = this;
  js.util.Arrays.removeAll(this._handlers, function(handler) {
  if (handler.type === type && handler.listener === listener && handler.capture === capture) 
  {
    _this._removeListener(handler);
    return true;
  }
  return false;
});
}, _addListener: function(handler) {
  handler.node.addEventListener(handler.type, handler.domEventListener, handler.capture);
}, _removeListener: function(handler) {
  handler.node.removeEventListener(handler.type, handler.domEventListener, handler.capture);
}, toString: function() {
  return "js.event.DomEvents";
}, finalize: function() {
  js.util.Arrays.clear(this._handlers, this._removeListener, this);
  delete this._targetNode;
  delete this._handlers;
}};
$extends(js.event.DomEvents, Object);
$legacy(typeof document.addEventListener === "undefined", function() {
  js.event.DomEvents.prototype._addListener = function(handler) {
  handler.node.attachEvent("on" + handler.type, handler.domEventListener);
};
  js.event.DomEvents.prototype._removeListener = function(handler) {
  handler.node.detachEvent("on" + handler.type, handler.domEventListener);
};
});
$legacy(js.ua.Engine.GECKO, function() {
  js.event.DomEvents.prototype._addListener = function(handler) {
  var type = handler.type;
  if (type === "mousewheel") 
  {
    type = "DOMMouseScroll";
  }
  handler.node.addEventListener(type, handler.domEventListener, handler.capture);
  return true;
};
});
$package('js.event');
js.event.Event = function(doc, type) {
  $assert(doc, 'js.dom.Event#Event', 'Document is undefined or null.');
  $assert(doc instanceof js.dom.Document, 'js.dom.Event#Event', 'Document is not an instance of js.dom.Document');
  $assert(js.lang.Types.isString(type), 'js.dom.Event#Event', 'Invalid event type.');
  this._doc = doc;
  this.type = type;
};
js.event.Event.prototype = {init: function(domEvent) {
  this.timeStamp = domEvent.timeStamp;
  this._init(domEvent || window.event);
  this.shiftKey = domEvent.shiftKey;
  this.altKey = domEvent.altKey;
  this.ctrlKey = domEvent.ctrlKey;
  if (this.type === 'mousewheel') 
  {
    this.wheel = 0;
    if (domEvent.wheelDelta) 
    {
      this.wheel = domEvent.wheelDelta / 120;
      if (js.ua.Engine.PRESTO) 
      {
        this.wheel = -this.wheel;
      }
    } else if (domEvent.detail) 
    {
      this.wheel = -domEvent.detail / 3;
    }
  }
  this.prevented = false;
  this.stopped = false;
  return this;
}, _init: function(domEvent) {
  $assert(typeof domEvent.srcElement !== "undefined" || typeof domEvent.originalTarget !== "undefined", "js.event.Event#_init", "Missing support for event original target.");
  this._domEvent = domEvent;
  this.target = domEvent.target.nodeType === Node.ELEMENT_NODE ? this._doc.getElement(domEvent.target) : null;
  this.originalTarget = this._doc.getElement(typeof domEvent.srcElement !== "undefined" ? domEvent.srcElement : domEvent.originalTarget);
  this.pageX = domEvent.pageX;
  this.pageY = domEvent.pageY;
  this.key = Number(domEvent.keyCode) || Number(domEvent.which);
}, prevent: function() {
  if (this._domEvent.cancelable) 
  {
    this.prevented = true;
  }
}, stop: function() {
  this.stopped = true;
}, halt: function() {
  this.stop();
  this.prevent();
}, toString: function() {
  return 'js.event.Event';
}};
$extends(js.event.Event, Object);
$legacy(js.ua.Engine.TRIDENT, function() {
  js.event.Event.prototype._init = function(domEvent) {
  this.target = this._doc.getElement(domEvent.srcElement);
  this.pageX = domEvent.clientX + this._doc._document.body.scrollLeft + this._doc._document.documentElement.scrollLeft;
  this.pageY = domEvent.clientY + this._doc._document.body.scrollTop + this._doc._document.documentElement.scrollTop;
  this.key = domEvent.keyCode;
};
  js.event.Event.prototype.prevent = function() {
  this.prevented = true;
};
});
$package("js.event");
js.event.Handler = function(targetNode, type, listener, scope, capture) {
  this.node = targetNode.node;
  this.type = type;
  this.listener = listener;
  this._scope = scope;
  this.capture = capture;
  this._event = new js.event.Event(targetNode.ownerDoc, type);
  this.domEventListener = this._handle.bind(this);
};
js.event.Handler.DEF_IDLE_TIMEOUT = 10;
js.event.Handler.idleTimeout = null;
$static(function() {
  js.event.Handler.idleTimeout = new js.util.Timeout(js.event.Handler.DEF_IDLE_TIMEOUT * 60 * 1000, function() {
  WinMain.page.onIdleTimeout();
});
  js.event.Handler.idleTimeout.start();
});
js.event.Handler.prototype = {_handle: function(domEvent) {
  if (js.event.Handler.idleTimeout !== null) 
  {
    js.event.Handler.idleTimeout.start();
  }
  if (!this._preHandle(domEvent)) 
  {
    return;
  }
  var ev = this._event.init(domEvent);
  try {
    this.listener.call(this._scope, ev);
  }  catch (er) {
  js.ua.System.error(er);
}
  if (ev.prevented === true) 
  {
    this._prevent(domEvent);
  }
  if (ev.stopped === true) 
  {
    this._stop(domEvent);
  }
}, _preHandle: function(domEvent) {
  return true;
}, _prevent: function(domEvent) {
  domEvent.preventDefault();
}, _stop: function(domEvent) {
  domEvent.stopPropagation();
}, equals: function(handler) {
  $assert(handler instanceof js.event.Handler, "js.dom.Handler#equals", "Handler to compare is undefined or null.");
  return handler.node === this.node && handler.type === this.type && handler.listener === this.listener;
}, toString: function() {
  return "js.event.Handler";
}};
$extends(js.event.Handler, Object);
$legacy(js.ua.Engine.TRIDENT, function() {
  js.event.Handler.prototype._prevent = function(domEvent) {
  domEvent.returnValue = false;
};
  js.event.Handler.prototype._stop = function(domEvent) {
  domEvent.cancelBubble = true;
};
});
$legacy(js.ua.Engine.TRIDENT || js.ua.Engine.PRESTO || js.ua.Engine.MOBILE_WEBKIT, function() {
  js.event.Handler.prototype._preHandle = function(domEvent) {
  if (this.type === "load" && this.node.nodeName.toLowerCase() === "iframe" && this.node.contentWindow.location.toString() === "about:blank") 
  {
    return false;
  }
  return true;
};
});
$package('js.event');
js.event.Key = {BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, BREAK: 19, CAPS_LOCK: 20, ESCAPE: 27, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, COLON: 59, PLUS: 61, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, NUM0: 96, NUM1: 97, NUM2: 98, NUM3: 99, NUM4: 100, NUM5: 101, NUM6: 102, NUM7: 103, NUM8: 104, NUM9: 105, NUM_MULTIPLY: 106, NUM_PLUS: 107, NUM_MINUS: 109, NUM_POINT: 110, NUM_DIVIDE: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, NUM_LOCK: 144, SCROLL_LOCK: 145, LESS_THAN: 188, MINUS: 189, GREATER_THAN: 190, QUESTION: 191, TILDE: 192, LEFT_BRACKET: 219, DIVIDE: 220, RIGHT_BRACKET: 221, QUOTATION: 222};
$package('js.event');
js.event.TargetNode = function(node) {
  this.node = node instanceof js.dom.Document ? node._document : node._node;
  this.ownerDoc = node instanceof js.dom.Document ? node : node._ownerDoc;
};
js.event.TargetNode.prototype = {toString: function() {
  return 'js.event.TargetNode';
}};
$extends(js.event.TargetNode, Object);
$package('js.event');
js.event.Types = {abort: 'HTMLEvents', beforeunload: 'HTMLEvents', blur: 'HTMLEvents', change: 'HTMLEvents', click: 'MouseEvents', dblclick: 'MouseEvents', error: 'HTMLEvents', focus: 'HTMLEvents', input: 'HTMLEvents', keydown: 'UIEvents', keypress: 'UIEvents', keyup: 'UIEvents', load: 'HTMLEvents', mousedown: 'MouseEvents', mousemove: 'MouseEvents', mouseout: 'MouseEvents', mouseover: 'MouseEvents', mouseup: 'MouseEvents', mousewheel: 'SyntheticEvents', orientationchange: 'HTMLEvents', paste: 'UIEvents', reset: 'HTMLEvents', resize: 'HTMLEvents', scroll: 'HTMLEvents', select: 'HTMLEvents', submit: 'HTMLEvents', unload: 'HTMLEvents'};
$package("js.format");
js.format.Format = {format: function(object) {
}, parse: function(string) {
}, test: function(string) {
}};
$package("js.format");
js.format.AbstractDateTime = function(dateFormat) {
  $assert(dateFormat instanceof js.format.DateFormat, "js.format.AbstractDateTime#AbstractDateTime", "Argument is not a date format utility.");
  this._dateFormat = dateFormat;
};
js.format.AbstractDateTime.prototype = {format: function(date) {
  if (date == null) 
  {
    return "";
  }
  $assert(js.lang.Types.isDate(date), "js.format.AbstractDateTime#format", "Argument is not a date.");
  if (!js.lang.Types.isDate(date)) 
  {
    return "";
  }
  return this._dateFormat.format(date);
}, parse: function(source) {
  $assert(source, "js.format.AbstractDateTime#parse", "Source is undefined, null or empty.");
  if (!source) 
  {
    return null;
  }
  $assert(js.lang.Types.isString(source), "js.format.AbstractDateTime#parse", "Source is not a string.");
  if (!js.lang.Types.isString(source)) 
  {
    return null;
  }
  return this._dateFormat.parse(source);
}, test: function(source) {
  return this._dateFormat.test(source);
}, toString: function() {
  return "js.format.AbstractDateTime";
}};
$extends(js.format.AbstractDateTime, Object);
$implements(js.format.AbstractDateTime, js.format.Format);
$package("js.format");
js.format.BitRate = function() {
  this._numberFormat = new js.format.NumberFormat();
  this._numberFormat.setGroupingUsed(true);
  this._numberFormat.setMinimumFractionDigits(2);
  this._numberFormat.setMaximumFractionDigits(2);
};
js.format.BitRate.Unit = {1: "bps", 1000: "Kbps", 1000000: "Mbps", 1000000000: "Gbps", 1000000000000: "Tbps"};
js.format.BitRate.prototype = {_VALID_INPUT: function() {
  var units = [];
  for (var u in js.format.BitRate.Unit) 
    {
      units.push(js.format.BitRate.Unit[u]);
    }
  return new RegExp("^([^ ]+)\\s+(" + units.join("|") + ")$", "gi");
}(), format: function(bitRate) {
  $assert(js.lang.Types.isNumber(bitRate), "js.format.BitRate#format", "Bit rate is not a number.");
  $assert(bitRate >= 0, "js.format.BitRate#format", "Bit rate is not positive or zero.");
  if (!bitRate) 
  {
    return this._format(0, "1");
  }
  var adjustToNextUnit = false;
  if (bitRate.toString().indexOf("99999") !== -1) 
  {
    adjustToNextUnit = Math.round("0." + bitRate.toString().substr(5)) === 1;
  }
  var threshold = 0, t = 0;
  for (t in js.format.BitRate.Unit) 
    {
      if (bitRate < t) 
      {
        if (!adjustToNextUnit) 
        {
          break;
        }
        adjustToNextUnit = false;
      }
      threshold = t;
    }
  if (threshold === 0) 
  {
    threshold = t;
  }
  return this._format(bitRate / Number(threshold), threshold);
}, _format: function(bitRate, threshold) {
  return this._numberFormat.format(bitRate) + " " + js.format.BitRate.Unit[threshold];
}, parse: function(string) {
  this._VALID_INPUT.lastIndex = 0;
  var m = this._VALID_INPUT.exec(string);
  $assert(m !== null && m.length === 3, "js.format.BitRate#parse", "Invalid bit rate format.");
  var value = this._numberFormat.parse(m[1]);
  var unit = m[2].toLowerCase();
  if (unit.length > 3) 
  {
    unit = js.util.Strings.toTitleCase(unit);
  }
  for (var t in js.format.BitRate.Unit) 
    {
      if (js.format.BitRate.Unit[t] === unit) 
      {
        return value * Number(t);
      }
    }
}, test: function(string) {
  this._VALID_INPUT.lastIndex = 0;
  var m = this._VALID_INPUT.exec(string);
  return (m !== null && typeof m[1] !== "undefined") ? this._numberFormat.test(m[1]) : false;
}, toString: function() {
  return "js.format.BitRate";
}};
$extends(js.format.BitRate, Object);
$implements(js.format.BitRate, js.format.Format);
$package("js.format");
js.format.Currency = function() {
  var symbols = js.format.Currency[js.ua.Regional.country];
  if (typeof symbols === "undefined") 
  {
    symbols = js.format.Currency.US;
  }
  this._numberFormat = new js.format.NumberFormat(symbols.pattern);
  this._numberFormat.setGroupingUsed(true);
  this._numberFormat.setMinimumFractionDigits(2);
  this._numberFormat.setMaximumFractionDigits(2);
};
js.format.Currency.prototype = {format: function(currency) {
  $assert(js.lang.Types.isNumber(currency), "js.format.Currency#format", "Currency is not a number.");
  return this._numberFormat.format(currency);
}, parse: function(string) {
  return this._numberFormat.parse(string);
}, test: function(string) {
  return this._numberFormat.test(string);
}, toString: function() {
  return "js.format.Currency";
}};
$extends(js.format.Currency, Object);
$implements(js.format.Currency, js.format.Format);
js.format.Currency.US = {pattern: "$#"};
js.format.Currency.RO = {pattern: "# LEI"};
$package("js.format");
js.format.DateFormat = function(pattern) {
  $assert(js.lang.Types.isString(pattern), "js.format.DateFormat#DateFormat", "Pattern is not a string.");
  this._pattern = pattern;
  this._symbols = new js.format.DateFormatSymbols();
  this._validInput = null;
  this._compile();
};
js.format.DateFormat.SHORT = 1;
js.format.DateFormat.MEDIUM = 2;
js.format.DateFormat.LONG = 3;
js.format.DateFormat.FULL = 4;
js.format.DateFormat.DATE_STYLES = {1: "shortDate", 2: "mediumDate", 3: "longDate", 4: "fullDate"};
js.format.DateFormat.TIME_STYLES = {1: "shortTime", 2: "mediumTime", 3: "longTime", 4: "fullTime"};
js.format.DateFormat.getDateTimeInstance = function(dateStyle, timeStyle) {
  var symbols = new js.format.DateFormatSymbols();
  var datePattern = symbols.patterns[this.DATE_STYLES[dateStyle]];
  var timePattern = symbols.patterns[this.TIME_STYLES[timeStyle]];
  return new js.format.DateFormat(datePattern + " " + timePattern);
};
js.format.DateFormat.getDateInstance = function(style) {
  var symbols = new js.format.DateFormatSymbols();
  var datePattern = symbols.patterns[this.DATE_STYLES[style]];
  return new js.format.DateFormat(datePattern);
};
js.format.DateFormat.getTimeInstance = function(style) {
  var symbols = new js.format.DateFormatSymbols();
  var timePattern = symbols.patterns[this.TIME_STYLES[style]];
  return new js.format.DateFormat(timePattern);
};
js.format.DateFormat.PatternFormatters = {symbols: null, date: null, y: function() {
  return this.truncateYear(this.date.getFullYear());
}, yy: function() {
  return this.truncateYear(this.date.getFullYear());
}, yyy: function() {
  return this.date.getFullYear().toString();
}, yyyy: function() {
  return this.date.getFullYear().toString();
}, M: function() {
  return (this.date.getMonth() + 1).toString();
}, MM: function() {
  return this.pad(this.date.getMonth() + 1, 2);
}, MMM: function() {
  return this.symbols.shortMonths[this.date.getMonth()];
}, MMMM: function() {
  return this.symbols.fullMonths[this.date.getMonth()];
}, d: function() {
  return this.date.getDate();
}, dd: function() {
  return this.pad(this.date.getDate(), 2);
}, E: function() {
  return this.symbols.shortWeekDays[this.date.getDay()];
}, EE: function() {
  return this.symbols.shortWeekDays[this.date.getDay()];
}, EEE: function() {
  return this.symbols.shortWeekDays[this.date.getDay()];
}, EEEE: function() {
  return this.symbols.fullWeekDays[this.date.getDay()];
}, h: function() {
  var h = this.date.getHours() % 12;
  if (h === 0) 
  {
    h = 12;
  }
  return h.toString();
}, hh: function() {
  return this.pad(js.format.DateFormat.PatternFormatters["h"]());
}, H: function() {
  return this.date.getHours().toString();
}, HH: function() {
  return this.pad(this.date.getHours(), 2);
}, m: function() {
  return this.date.getMinutes().toString();
}, mm: function() {
  return this.pad(this.date.getMinutes(), 2);
}, s: function() {
  return this.date.getSeconds().toString();
}, ss: function() {
  return this.pad(this.date.getSeconds(), 2);
}, S: function() {
  var S = this.date.getMilliseconds();
  return this.pad(S > 99 ? Math.round(S / 100) : S, 1);
}, SS: function() {
  var S = this.date.getMilliseconds();
  return this.pad(S > 9 ? Math.round(S / 10) : S, 2);
}, SSS: function() {
  return this.pad(this.date.getMilliseconds(), 3);
}, a: function() {
  return this.date.getHours() < 12 ? "AM" : "PM";
}, z: function() {
  return this.shortTZ(this.date);
}, zz: function() {
  return this.shortTZ(this.date);
}, zzz: function() {
  return this.shortTZ(this.date);
}, zzzz: function() {
  return this.fullTZ(this.date);
}, Z: function() {
  return this.rfc822TZ(this.date);
}, pad: function(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) 
    {
      val = "0" + val;
    }
  return val;
}, truncateYear: function(fullYear) {
  var currentYear = new Date().getFullYear();
  $assert(currentYear - 80 < fullYear && fullYear <= currentYear + 20, "js.format.DateFormat#format", "Year is not in proper range.");
  return fullYear.toString().substr(2);
}, shortTZ: function(date) {
  return this.rfc822TZ(date);
}, fullTZ: function(date) {
  return this.rfc822TZ(date);
}, rfc822TZ: function(date) {
  var tz = date.getTimezoneOffset();
  var s = tz < 0 ? "+" : "-";
  var h = Math.abs(Math.round(tz / 60));
  var m = Math.abs(Math.round(tz % 60));
  return s + this.pad(h) + this.pad(m);
}};
js.format.DateFormat.prototype = {_FORMAT_PATTERNS: /y{1,4}|M{1,4}|d{1,2}|E{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|a|z{1,4}|Z/g, _PATTERN_CHARS: "yMdEhHmsSazZ", format: function(date) {
  $assert(js.lang.Types.isDate(date), "js.format.DateFormat#format", "Date argument is not a valid Date instance.");
  var formatters = js.format.DateFormat.PatternFormatters;
  formatters.symbols = this._symbols;
  formatters.date = date;
  this._FORMAT_PATTERNS.lastIndex = 0;
  return this._pattern.replace(this._FORMAT_PATTERNS, function($0) {
  return formatters[$0]();
});
}, parse: function(source) {
  $assert(js.lang.Types.isString(source), "js.format.DateFormat#parse", "Source is not a string.");
  var sourceIndex = 0;
  var pattern = this._pattern;
  var patternChars = this._PATTERN_CHARS;
  var patternIndex = 0;
  var symbols = this._symbols;
  function isDigit(c) {
    return c >= "0" && c <= "9";
  }
  function isPattern(c) {
    return patternChars.indexOf(c) !== -1;
  }
  function text() {
    skipPattern();
    return parseText();
  }
  function number() {
    return Number(parseNumber(skipPattern()));
  }
  function year() {
    var patternLength = skipPattern();
    var year = parseNumber(patternLength);
    if (patternLength > 2) 
    {
      return year;
    }
    $assert(year < 100, "js.format.DateFormat#parse", "Year is greater than 99.");
    var nowFullYear = new Date().getFullYear();
    var nowYear = nowFullYear % 100;
    var century = Math.floor(nowFullYear / 100);
    if (nowYear >= 80) 
    {
      if (year <= nowYear - 80) 
      {
        ++century;
      }
    } else {
      if (year > nowYear + 20) 
      {
        --century;
      }
    }
    return 100 * century + year;
  }
  function month() {
    var patternLength = skipPattern();
    if (patternLength <= 2) 
    {
      return parseNumber(patternLength) - 1;
    }
    var rex = new RegExp(parseText(), "gi");
    var i = index(symbols.fullMonths, rex);
    if (i === -1) 
    {
      i = index(symbols.shortMonths, rex);
    }
    if (i === -1 && typeof symbols.fullMonthsAlias !== "undefined") 
    {
      i = index(symbols.fullMonthsAlias, rex);
    }
    if (i === -1 && typeof symbols.shortMonthsAlias !== "undefined") 
    {
      i = index(symbols.shortMonthsAlias, rex);
    }
    $assert(i !== -1, "js.format.DateFormat#parse", "Invalid month name.");
    return i;
  }
  function weekDay() {
    var s = text();
    var rex = new RegExp(s, "gi");
    var i = index(symbols.fullWeekDays, rex);
    if (i === -1) 
    {
      i = index(symbols.shortWeekDays, rex);
    }
    if (i === -1 && typeof symbols.fullWeekDaysAlias !== "undefined") 
    {
      i = index(symbols.fullWeekDaysAlias, rex);
    }
    if (i === -1 && typeof symbols.shortWeekDaysAlias !== "undefined") 
    {
      i = index(symbols.shortWeekDaysAlias, rex);
    }
    $assert(i !== -1, "js.format.DateFormat#parse", "Invalid week day.");
  }
  function ampmMarker() {
    ++patternIndex;
    var ampm = source.substr(sourceIndex, 2).toLowerCase();
    sourceIndex += 2;
    return ampm;
  }
  function skipPattern() {
    var c = pattern.charAt(patternIndex);
    var patternLength = 1;
    while (patternIndex < pattern.length && c === pattern.charAt(++patternIndex)) 
      {
        ++patternLength;
      }
    return patternLength;
  }
  function parseNumber(patternLength) {
    var inputLengthHint = isPattern(pattern.charAt(patternIndex)) ? patternLength : Number.POSITIVE_INFINITY;
    if (patternIndex === pattern.length) 
    {
      inputLengthHint = Number.POSITIVE_INFINITY;
    }
    var text = "";
    while (sourceIndex < source.length && isDigit(source.charAt(sourceIndex)) && inputLengthHint-- > 0) 
      {
        text += source.charAt(sourceIndex++);
      }
    return Number(text);
  }
  function parseText() {
    var text = "";
    var endOfText = patternIndex < pattern.length ? pattern.charAt(patternIndex) : null;
    while (sourceIndex < source.length && source.charAt(sourceIndex) !== endOfText) 
      {
        text += source.charAt(sourceIndex++);
      }
    return text;
  }
  function index(names, rex) {
    for (var i = 0; i < names.length; ++i) 
      {
        if (rex.test(names[i])) 
        {
          return i;
        }
      }
    return -1;
  }
  var y = 1970, M = 0, d = 1, h = 0, m = 0, s = 0, S = 0;
  var pm = false;
  for (; patternIndex < pattern.length; ) 
    {
      switch (pattern.charAt(patternIndex)) {
        case "y":
          y = year();
          break;
        case "M":
          M = month();
          break;
        case "d":
          d = number();
          break;
        case "H":
          h = number();
          break;
        case "h":
          h = number();
          break;
        case "m":
          m = number();
          break;
        case "s":
          s = number();
          break;
        case "S":
          S = number();
          break;
        case "a":
          pm = ampmMarker() === "pm";
          break;
        case "E":
          weekDay();
          break;
        case "z":
          text();
          break;
        case "Z":
          text();
          break;
        default:
          $assert(source.charAt(sourceIndex) === pattern.charAt(patternIndex), "js.format.DateFormat#parse", "Source and pattern does not match.");
          ++patternIndex;
          ++sourceIndex;
      }
    }
  if (pm) 
  {
    h = (h + 12) % 24;
  }
  return new Date(y, M, d, h, m, s, S);
}, test: function(source) {
  this._validInput.lastIndex = 0;
  return this._validInput.test(source);
}, _compile: function() {
  var pattern = this._pattern;
  var index = 0;
  var rex = "";
  function year() {
    var subPatternLength = skipSubPattern();
    $assert(subPatternLength <= 4, "js.format.DateFormat#_compile", "Invalid year.");
    return subPatternLength > 2 ? "\\d{1,4}" : "\\d{2}";
  }
  function month() {
    var subPatternLength = skipSubPattern();
    $assert(subPatternLength <= 4, "js.format.DateFormat#_compile", "Invalid month.");
    return subPatternLength <= 2 ? "\\d{1,2}" : subPatternLength === 3 ? "\\w{3}" : "\\w{3,}";
  }
  function weekDay() {
    var subPatternLength = skipSubPattern();
    $assert(subPatternLength <= 4, "js.format.DateFormat#_compile", "Invalid week day.");
    return subPatternLength === 3 ? "\\w{3}" : "\\w{3,}";
  }
  function number(maxDigitsCount) {
    if (typeof maxDigitsCount === "undefined") 
    {
      maxDigitsCount = 2;
    }
    $assert(skipSubPattern() <= maxDigitsCount, "js.format.DateFormat#_compile", "Invalid number format.");
    return "\\d{1," + maxDigitsCount + "}";
  }
  function ampmMarker() {
    $assert(skipSubPattern() === 1, "js.format.DateFormat#_compile", "Invalid AM/PM marker.");
    return "am|pm";
  }
  function generalTZ() {
    $assert(skipSubPattern() <= 4, "js.format.DateFormat#_compile", "Invalid time zone.");
    return "[+-]?\\d{4}";
  }
  function rfc822TZ() {
    $assert(skipSubPattern() === 1, "js.format.DateFormat#_compile", "Invalid time zone.");
    return "[+-]?\\d{4}";
  }
  function skipSubPattern() {
    var c = pattern.charAt(index);
    var subPatternLength = 1;
    while (index < pattern.length && c === pattern.charAt(++index)) 
      {
        ++subPatternLength;
      }
    return subPatternLength;
  }
  for (var c; index < pattern.length; ) 
    {
      c = pattern.charAt(index);
      switch (c) {
        case "y":
          rex += year();
          break;
        case "M":
          rex += month();
          break;
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
          rex += number();
          break;
        case "S":
          rex += number(3);
          break;
        case "a":
          rex += ampmMarker();
          break;
        case "E":
          rex += weekDay();
          break;
        case "z":
          rex += generalTZ();
          break;
        case "Z":
          rex += rfc822TZ();
          break;
        default:
          $assert(!/[a-zA-Z]/.test(c), "js.format.DateFormat#_compile", "Invalid pattern.");
          rex += js.util.Strings.escapeRegExp(c);
          ++index;
      }
    }
  this._validInput = new RegExp("^" + rex + "$", "gi");
}, toString: function() {
  return "js.format.DateFormat";
}};
$extends(js.format.DateFormat, Object);
$implements(js.format.DateFormat, js.format.Format);
$package('js.format');
js.format.DateFormatSymbols = function() {
  if (typeof js.format.DateFormatSymbols._symbols === 'undefined') 
  {
    var l = js.ua.Regional.language;
    var key = l.charAt(0).toUpperCase() + l.charAt(1);
    js.format.DateFormatSymbols._symbols = js.format.DateFormatSymbols[key];
  }
  return js.format.DateFormatSymbols._symbols;
};
$extends(js.format.DateFormatSymbols, Object);
js.format.DateFormatSymbols.En = {patterns: {fullDate: 'EEEE, MMMM dd, yyyy', fullTime: 'hh:mm:ss a Z', longDate: 'MMMM dd, yyyy', longTime: 'hh:mm:ss a Z', mediumDate: 'MMM dd, yyyy', mediumTime: 'hh:mm:ss a', shortDate: 'M/d/yy', shortTime: 'hh:mm a'}, fullMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], fullWeekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], shortWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], tinyWeekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']};
js.format.DateFormatSymbols.Ro = {patterns: {fullDate: 'dd MMMM yyyy', fullTime: 'HH:mm:ss Z', longDate: 'dd MMMM yyyy', longTime: 'HH:mm:ss Z', mediumDate: 'dd.MM.yyyy', mediumTime: 'HH:mm:ss', shortDate: 'dd.MM.yyyy', shortTime: 'HH:mm'}, fullMonths: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'], shortMonths: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'], fullWeekDays: ['duminic\u0103', 'luni', 'mar\u0163i', 'miercuri', 'joi', 'vineri', 's\xe2mb\u0103t\u0103'], fullWeekDaysAlias: ['duminica', 'luni', 'marti', 'miercuri', 'joi', 'vineri', 'sambata'], shortWeekDays: ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 's\xe2m'], shortWeekDaysAlias: ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sam'], tinyWeekDays: ['du', 'lu', 'ma', 'mi', 'jo', 'vi', 's\xe2']};
$package('js.format');
js.format.Factory = {_pool: {}, getFormat: function(className) {
  if (className === null) 
  {
    return null;
  }
  var instance = this._pool[className];
  if (typeof instance !== 'undefined') 
  {
    return instance;
  }
  var clazz = js.lang.Class.forName(className);
  $assert(js.lang.Types.isFunction(clazz), 'js.format.Factory#getFormat', 'Formatter class is not a function.');
  instance = new clazz();
  this._pool[className] = instance;
  return instance;
}};
$package("js.format");
js.format.FileSize = function() {
  this._numberFormat = new js.format.NumberFormat();
  this._numberFormat.setGroupingUsed(true);
  this._numberFormat.setMinimumFractionDigits(2);
  this._numberFormat.setMaximumFractionDigits(2);
  var units = [];
  for (var t in js.format.FileSize.Unit) 
    {
      units.push(js.format.FileSize.Unit[t]);
    }
  this._validInput = new RegExp("^([^ ]+)\\s+(" + units.join("|") + ")$", "gi");
};
js.format.FileSize.Unit = {1: "B", 1024: "KB", 1048576: "MB", 1073741824: "GB", 1099511627776: "TB"};
js.format.FileSize.prototype = {_VALID_INPUT: function() {
  var units = [];
  for (var u in js.format.FileSize.Unit) 
    {
      units.push(js.format.FileSize.Unit[u]);
    }
  return new RegExp("^([^ ]+)\\s+(" + units.join("|") + ")$", "gi");
}(), format: function(fileSize) {
  $assert(js.lang.Types.isNumber(fileSize), "js.format.FileSize#format", "File size is not a number.");
  $assert(fileSize >= 0, "js.format.FileSize#format", "File size is not positive.");
  if (!fileSize) 
  {
    return this._format(0, "1");
  }
  var threshold = 0, t = 0;
  for (t in js.format.FileSize.Unit) 
    {
      if (fileSize < t) 
      {
        break;
      }
      threshold = t;
    }
  if (threshold === 0) 
  {
    threshold = t;
  }
  return this._format(fileSize / Number(threshold), threshold);
}, _format: function(fileSize, threshold) {
  return this._numberFormat.format(fileSize) + " " + js.format.FileSize.Unit[threshold];
}, parse: function(string) {
  this._VALID_INPUT.lastIndex = 0;
  var m = this._VALID_INPUT.exec(string);
  $assert(m !== null && m.length === 3, "js.format.FileSize#parse", "Invalid file size format.");
  var value = this._numberFormat.parse(m[1]);
  var unit = m[2].toUpperCase();
  for (var t in js.format.FileSize.Unit) 
    {
      if (js.format.FileSize.Unit[t] === unit) 
      {
        return value * Number(t);
      }
    }
}, test: function(string) {
  this._VALID_INPUT.lastIndex = 0;
  var m = this._VALID_INPUT.exec(string);
  return (m !== null && typeof m[1] !== "undefined") ? this._numberFormat.test(m[1]) : false;
}, toString: function() {
  return "js.format.FileSize";
}};
$extends(js.format.FileSize, Object);
$implements(js.format.FileSize, js.format.Format);
$package('js.format');
js.format.FullDate = function() {
  this.$super(js.format.DateFormat.getDateInstance(js.format.DateFormat.FULL));
};
$extends(js.format.FullDate, js.format.AbstractDateTime);
$package('js.format');
js.format.FullDateTime = function() {
  this.$super(js.format.DateFormat.getDateTimeInstance(js.format.DateFormat.FULL, js.format.DateFormat.FULL));
};
$extends(js.format.FullDateTime, js.format.AbstractDateTime);
$package('js.format');
js.format.FullTime = function() {
  this.$super(js.format.DateFormat.getTimeInstance(js.format.DateFormat.FULL));
};
$extends(js.format.FullTime, js.format.AbstractDateTime);
$package('js.format');
js.format.LongDate = function() {
  this.$super(js.format.DateFormat.getDateInstance(js.format.DateFormat.LONG));
};
$extends(js.format.LongDate, js.format.AbstractDateTime);
$package('js.format');
js.format.LongDateTime = function() {
  this.$super(js.format.DateFormat.getDateTimeInstance(js.format.DateFormat.LONG, js.format.DateFormat.LONG));
};
$extends(js.format.LongDateTime, js.format.AbstractDateTime);
$package('js.format');
js.format.LongTime = function() {
  this.$super(js.format.DateFormat.getTimeInstance(js.format.DateFormat.LONG));
};
$extends(js.format.LongTime, js.format.AbstractDateTime);
$package('js.format');
js.format.MediumDate = function() {
  this.$super(js.format.DateFormat.getDateInstance(js.format.DateFormat.MEDIUM));
};
$extends(js.format.MediumDate, js.format.AbstractDateTime);
$package('js.format');
js.format.MediumDateTime = function() {
  this.$super(js.format.DateFormat.getDateTimeInstance(js.format.DateFormat.MEDIUM, js.format.DateFormat.MEDIUM));
};
$extends(js.format.MediumDateTime, js.format.AbstractDateTime);
$package('js.format');
js.format.MediumTime = function() {
  this.$super(js.format.DateFormat.getTimeInstance(js.format.DateFormat.MEDIUM));
};
$extends(js.format.MediumTime, js.format.AbstractDateTime);
$package('js.format');
js.format.Number = function() {
  this._numberFormat = new js.format.NumberFormat();
  this._numberFormat.setGroupingUsed(true);
  this._numberFormat.setMinimumFractionDigits(2);
  this._numberFormat.setMaximumFractionDigits(2);
};
js.format.Number.prototype = {format: function(number) {
  return this._numberFormat.format(number);
}, parse: function(string) {
  return this._numberFormat.parse(string);
}, test: function(string) {
  return this._numberFormat.test(string);
}, toString: function() {
  return 'js.format.Number';
}};
$extends(js.format.Number, Object);
$implements(js.format.Number, js.format.Format);
$package('js.format');
js.format.NumberFormat = function(pattern) {
  var l = js.ua.Regional.language;
  var c = js.ua.Regional.country;
  var key = l.charAt(0).toUpperCase() + l.charAt(1) + '_' + c;
  var symbols = js.format.NumberFormat[key];
  if (typeof symbols === 'undefined') 
  {
    symbols = js.format.NumberFormat.En_US;
  }
  this._pattern = pattern;
  this._decimalSeparator = symbols.decimalSeparator;
  this._groupingSeparator = symbols.groupingSeparator;
  this._groupingUsed = false;
  this._minimumFractionDigits = 0;
  this._maximumFractionDigits = Number.POSITIVE_INFINITY;
  this._minimumIntegerDigits = 0;
  this._maximumIntegerDigits = Number.POSITIVE_INFINITY;
  this._validInput = null;
  this._compile();
};
js.format.NumberFormat.prototype = {setGroupingUsed: function(value) {
  $assert(js.lang.Types.isBoolean(value), 'js.format.NumberFormat#setGroupingUsed', 'Value is not boolean.');
  this._groupingUsed = value;
  return this;
}, setMinimumFractionDigits: function(value) {
  $assert(js.lang.Types.isNumber(value), 'js.format.NumberFormat#setMinimumFractionDigits', 'Value is not a number.');
  this._minimumFractionDigits = value;
  if (this._minimumFractionDigits > this._maximumFractionDigits) 
  {
    this._maximumFractionDigits = this._minimumFractionDigits;
  }
  return this;
}, setMaximumFractionDigits: function(value) {
  $assert(js.lang.Types.isNumber(value), 'js.format.NumberFormat#setMaximumFractionDigits', 'Value is not a number.');
  this._maximumFractionDigits = value;
  if (this._maximumFractionDigits < this._minimumFractionDigits) 
  {
    this._minimumFractionDigits = this._maximumFractionDigits;
  }
  return this;
}, setMinimumIntegerDigits: function(value) {
  $assert(js.lang.Types.isNumber(value), 'js.format.NumberFormat#setMinimumIntegerDigits', 'Value is not a number.');
  this._minimumIntegerDigits = value;
  if (this._minimumIntegerDigits > this._maximumIntegerDigits) 
  {
    this._maximumIntegerDigits = this._minimumIntegerDigits;
  }
  return this;
}, setMaximumIntegerDigits: function(value) {
  $assert(js.lang.Types.isNumber(value), 'js.format.NumberFormat#setMaximumIntegerDigits', 'Value is not a number.');
  this._maximumIntegerDigits = value;
  if (this._maximumIntegerDigits < this._minimumIntegerDigits) 
  {
    this._minimumIntegerDigits = this._maximumIntegerDigits;
  }
  return this;
}, format: function(number) {
  var formattedNumber = this._formatNumericPart(number);
  return typeof this._pattern === 'undefined' ? formattedNumber : this._injectNumericPart(formattedNumber);
}, _formatNumericPart: function(number) {
  $assert(js.lang.Types.isNumber(number), 'js.format.NumberFormat#_formatNumericPart', 'Argument is not a number.');
  var value = number.toString();
  var parts = value.split('.');
  var integerPart = parts[0], i;
  var fractionalPart = parts.length > 1 ? parts[1] : '';
  if (fractionalPart.length > this._maximumFractionDigits) 
  {
    if (this._maximumFractionDigits === 0) 
    {
      integerPart = (Number(integerPart) + Math.round('0.' + fractionalPart)).toString();
      fractionalPart = '';
    } else {
      fractionalPart = this._round(fractionalPart, this._maximumFractionDigits);
      if (fractionalPart.length > this._maximumFractionDigits) 
      {
        fractionalPart = fractionalPart.substr(fractionalPart.length - this._maximumFractionDigits);
        integerPart = (Number(integerPart) + 1).toString();
      }
    }
  }
  for (i = fractionalPart.length; i < this._minimumFractionDigits; ++i) 
    {
      fractionalPart += '0';
    }
  for (i = integerPart.length; i < this._minimumIntegerDigits; ++i) 
    {
      integerPart = '0' + integerPart;
    }
  if (integerPart.length > this._maximumIntegerDigits) 
  {
    integerPart = this._round(integerPart, this._maximumIntegerDigits);
  }
  if (this._groupingUsed) 
  {
    var rex = /(\d+)(\d{3})/;
    while (rex.test(integerPart)) 
      {
        integerPart = integerPart.replace(rex, '$1' + this._groupingSeparator + '$2');
      }
  }
  value = integerPart;
  if (fractionalPart) 
  {
    value += (this._decimalSeparator + fractionalPart);
  }
  return value;
}, parse: function(string) {
  if (string.length === 0) 
  {
    return 0;
  }
  if (typeof this._pattern !== 'undefined') 
  {
    string = this._extractNumericPart(string);
  }
  return this._parseNumericPart(string);
}, _parseNumericPart: function(string) {
  $assert(string, 'js.format.NumberFormat#_parseNumericPart', 'Argument is not a string.');
  if (!string) 
  {
    return null;
  }
  if (this._groupingUsed) 
  {
    var rex = new RegExp(js.util.Strings.escapeRegExp(this._groupingSeparator), 'g');
    string = string.replace(rex, '');
  }
  if (this._decimalSeparator !== '.') 
  {
    string = string.replace(this._decimalSeparator, '.');
  }
  return Number(string);
}, test: function(text) {
  if (typeof this._pattern === 'undefined') 
  {
    return this._testNumericPart(text);
  }
  var patternIndex = 0;
  var pattern = this._pattern;
  var textIndex = 0;
  var c;
  function skipNumericPart() {
    c = pattern.charAt(++patternIndex);
    while (textIndex < text.length && c !== text.charAt(textIndex)) 
      {
        ++textIndex;
      }
    return textIndex;
  }
  for (; patternIndex < pattern.length; ++patternIndex , ++textIndex) 
    {
      if (pattern.charAt(patternIndex) === '#') 
      {
        if (!this._testNumericPart(text.substring(textIndex, skipNumericPart()))) 
        {
          return false;
        }
      }
      if (!js.util.Strings.equalsIgnoreCase(pattern.charAt(patternIndex), text.charAt(textIndex))) 
      {
        return false;
      }
    }
  return true;
}, _testNumericPart: function(text) {
  if (!js.lang.Types.isString(text) || text.length === 0) 
  {
    return false;
  }
  function isDigit(c) {
    return c >= '0' && c <= '9';
  }
  var i = 0;
  if (text.charAt(0) === '+' || text.charAt(0) === '-') 
  {
    ++i;
  }
  for (var c; i < text.length; ++i) 
    {
      c = text.charAt(i);
      if (isDigit(c) || c === this._decimalSeparator) 
      {
        continue;
      }
      if (this._groupingUsed && c === this._groupingSeparator) 
      {
        continue;
      }
      return false;
    }
  return true;
}, _injectNumericPart: function(numericPart) {
  return this._pattern.replace('#', numericPart);
}, _extractNumericPart: function(source) {
  $assert(this._validInput !== null, 'js.format.NumberFormat#_extractNumericPart', 'Invalid input.');
  this._validInput.lastIndex = 0;
  var m = this._validInput.exec(source);
  $assert(m !== null, 'js.format.NumberFormat#_extractNumericPart', 'Source does not match.');
  if (m === null) 
  {
    return null;
  }
  $assert(typeof m[1] !== 'undefined', 'js.format.NumberFormat#_extractNumericPart', 'Source does not match.');
  if (typeof m[1] === "undefined") 
  {
    return null;
  }
  return m[1];
}, _round: function(number, digitsCount) {
  if (digitsCount === 0) 
  {
    return '';
  }
  var s = number.substr(0, digitsCount) + '.' + number.substr(digitsCount);
  s = Math.round(Number(s)).toString();
  while (s.length < digitsCount) 
    {
      s = '0' + s;
    }
  return s;
}, _compile: function() {
  if (typeof this._pattern !== 'undefined') 
  {
    var rex = '([0-9' + this._decimalSeparator + this._groupingSeparator + ']+)';
    this._validInput = new RegExp('^' + js.util.Strings.escapeRegExp(this._pattern).replace('#', rex) + '$', 'g');
  }
}, toString: function() {
  return 'js.format.NumberFormat';
}};
$extends(js.format.NumberFormat, Object);
$implements(js.format.NumberFormat, js.format.Format);
js.format.NumberFormat.En_US = {decimalSeparator: '.', groupingSeparator: ',', infinity: 'infinity'};
js.format.NumberFormat.De_CH = {decimalSeparator: '\'', groupingSeparator: '.', infinity: 'unendlich'};
js.format.NumberFormat.Ro_RO = {decimalSeparator: ',', groupingSeparator: '.', infinity: 'infinit'};
$package('js.format');
js.format.Percent = function() {
  var l = js.ua.Regional.language;
  var c = js.ua.Regional.country;
  var key = l.charAt(0).toUpperCase() + l.charAt(1) + '_' + c;
  var symbols = js.format.Percent[key];
  if (typeof symbols === 'undefined') 
  {
    symbols = js.format.Percent.En_US;
  }
  this._numberFormat = new js.format.NumberFormat(symbols.pattern);
  this._numberFormat.setGroupingUsed(true);
  this._numberFormat.setMinimumFractionDigits(2);
  this._numberFormat.setMaximumFractionDigits(2);
};
js.format.Percent.prototype = {format: function(percent) {
  $assert(js.lang.Types.isNumber(percent), 'js.format.Percent#format', 'Percent is not a number.');
  return this._numberFormat.format(100 * percent);
}, parse: function(string) {
  return this._numberFormat.parse(string) / 100;
}, test: function(string) {
  return this._numberFormat.test(string);
}, toString: function() {
  return 'js.format.Percent';
}};
$extends(js.format.Percent, Object);
$implements(js.format.Percent, js.format.Format);
js.format.Percent.En_US = {pattern: '#%'};
js.format.Percent.Ro_RO = {pattern: '#%'};
$package('js.format');
js.format.ShortDate = function() {
  this.$super(js.format.DateFormat.getDateInstance(js.format.DateFormat.SHORT));
};
$extends(js.format.ShortDate, js.format.AbstractDateTime);
$package('js.format');
js.format.ShortDateTime = function() {
  this.$super(js.format.DateFormat.getDateTimeInstance(js.format.DateFormat.SHORT, js.format.DateFormat.SHORT));
};
$extends(js.format.ShortDateTime, js.format.AbstractDateTime);
$package('js.format');
js.format.ShortTime = function() {
  this.$super(js.format.DateFormat.getTimeInstance(js.format.DateFormat.SHORT));
};
$extends(js.format.ShortTime, js.format.AbstractDateTime);
$package('js.fx');
js.fx.Anim = function() {
  $assert(arguments.length >= 1, 'js.fx.Anim#Anim', 'Missing descriptors.');
  var i, descriptor, defaultProperties, property;
  this._fxs = [];
  defaultProperties = {};
  for (i = 0; i < arguments.length; i++) 
    {
      descriptor = arguments[i];
      $assert(descriptor, 'js.fx.Anim#Anim', 'Descriptor object is undefined or null.');
      if (descriptor.defaultProperties) 
      {
        delete descriptor.defaultProperties;
        defaultProperties = descriptor;
        continue;
      }
      if (typeof descriptor.at !== "undefined") 
      {
        continue;
      }
      for (property in defaultProperties) 
        {
          if (typeof descriptor[property] === "undefined") 
          {
            descriptor[property] = defaultProperties[property];
          }
        }
      $assert(descriptor.el, 'js.fx.Anim#Anim', 'Descriptor <element> is undefined or null.');
      $assert(descriptor.style, 'js.fx.Anim#Anim', 'Descriptor <style> is undefined or null.');
      $assert(typeof descriptor.from !== 'undefined' && descriptor.from !== null, 'js.fx.Anim#Anim', 'Descriptor <from> is undefined or null.');
      $assert(typeof descriptor.to !== 'undefined' && descriptor.to !== null, 'js.fx.Anim#Anim', 'Descriptor <to> is undefined or null.');
      this._fxs.push(new js.fx.Effect(descriptor));
    }
  this._FRAME_REQUEST_CALLBACK = this._render.bind(this);
  this._animationFrameRequestId = null;
  this._startTimestamp = null;
  this._events = new js.event.CustomEvents();
  this._events.register("anim-stop");
};
js.fx.Anim.prototype = {on: function(type, listener, scope) {
  this._events.addListener(type, listener, scope || window);
  return this;
}, un: function(type, listener) {
  this._events.removeListener(type, listener);
  return this;
}, start: function() {
  this._fxs.forEach(function(fx) {
  fx.running = true;
});
  this._startTimestamp = null;
  this._animationFrameRequestId = this._requestAnimationFrame(this._FRAME_REQUEST_CALLBACK);
}, stop: function() {
  if (this._animationFrameRequestId !== null) 
  {
    this._fxs.forEach(function(fx) {
  fx.running = false;
});
    if (this._animationFrameRequestId !== null) 
    {
      this._cancelAnimationFrame(this._animationFrameRequestId);
    }
    this._animationFrameRequestId = null;
  }
}, _requestAnimationFrame: function(frameRequestCallback) {
  return window.requestAnimationFrame(frameRequestCallback);
}, _cancelAnimationFrame: function(animationFrameRequestId) {
  window.cancelAnimationFrame(animationFrameRequestId);
}, _render: function(timestamp) {
  var runningFxs;
  if (this._startTimestamp === null) 
  {
    this._startTimestamp = timestamp;
  }
  timestamp -= this._startTimestamp;
  runningFxs = 0;
  this._fxs.forEach(function(fx) {
  var t, value;
  if (!fx.running) 
  {
    return;
  }
  t = timestamp - fx.offset;
  if (t < 0) 
  {
    return;
  }
  value = Math.round(fx.ttf(t, fx.origin, fx.magnitude, fx.duration));
  fx.el.style.set(fx.style, value + fx.units);
  if (t > fx.duration) 
  {
    fx.running = false;
  } else {
    runningFxs++;
  }
}, this);
  if (runningFxs > 0) 
  {
    this._requestAnimationFrame(this._FRAME_REQUEST_CALLBACK);
    return;
  }
  this._fxs.forEach(function(fx) {
  fx.el.style.set(fx.style, (fx.magnitude + fx.origin) + fx.units);
});
  this._events.fire("anim-stop");
}, toString: function() {
  return 'js.fx.Anim';
}};
$extends(js.fx.Anim, Object);
$legacy(typeof window.requestAnimationFrame !== "function", function() {
  if (typeof webkitRequestAnimationFrame === "function") 
  {
    js.fx.Anim.prototype._requestAnimationFrame = function(frameRequestCallback) {
  return window.webkitRequestAnimationFrame(frameRequestCallback);
};
    js.fx.Anim._cancelAnimationFrame = function(animationFrameRequestId) {
  window.webkitCancelAnimationFrame(animationFrameRequestId);
};
  } else {
    js.fx.Anim.prototype._requestAnimationFrame = function(callback) {
  return window.setTimeout(function() {
  callback(new Date().getTime() - js.lang.Operator._timestamp);
}, 33);
};
    js.fx.Anim._cancelAnimationFrame = function(timeoutId) {
  window.clearTimeout(timeoutId);
};
  }
});
$package('js.fx');
js.fx.Config = {PX_UNITS: /width|height|top|bottom|left|right|margin|marginTop|marginRight|marginBottom|marginLeft|padding|paddingTop|paddingRight|paddingBottom|paddingLeft/i, DEF_DURATION: 1000};
$package('js.fx');
js.fx.Descriptor = {el: null, offset: null, duration: null, style: null, units: null, from: null, to: null, ttf: null};
$package("js.fx");
js.fx.Effect = function(descriptor) {
  $assert(js.lang.Types.isElement(descriptor.el), "js.fx.Effect#Effect", "Element argument is not a valid j(s)-lib element.");
  $assert(js.lang.Types.isString(descriptor.style), "js.fx.Effect#Effect", "Style argument should be a not empty string.");
  $assert(js.lang.Types.isNumber(descriptor.from), "js.fx.Effect#Effect", "Not numeric start value.");
  $assert(js.lang.Types.isNumber(descriptor.to), "js.fx.Effect#Effect", "Not numeric end value.");
  $assert(descriptor.from !== descriptor.to, "js.fx.Effect#Effect", "Same value for start and end.");
  this.running = false;
  this.offset = descriptor.offset || 0;
  this.duration = descriptor.duration || js.fx.Config.DEF_DURATION;
  this.ttf = descriptor.ttf || js.fx.TTF.Linear;
  this.style = descriptor.style;
  this.units = descriptor.units || (js.fx.Config.PX_UNITS.test(this.style) ? 'px' : '');
  this.origin = descriptor.from;
  this.magnitude = descriptor.to - descriptor.from;
  this.el = descriptor.el;
};
$extends(js.fx.Effect, Object);
$package('js.fx');
js.fx.TTF = {};
js.fx.TTF.Linear = function(timestamp, origin, magnitude, duration) {
  var tgalpha = magnitude / duration;
  return origin + tgalpha * timestamp;
};
$extends(js.fx.TTF.Linear, Object);
js.fx.TTF.Exponential = function(timestamp, origin, magnitude, duration) {
  timestamp /= duration;
  return origin + magnitude * timestamp * timestamp;
};
$extends(js.fx.TTF.Exponential, Object);
js.fx.TTF.Logarithmic = function(timestamp, origin, magnitude, duration) {
  return origin - magnitude * (timestamp /= duration) * (timestamp - 2);
};
$extends(js.fx.TTF.Logarithmic, Object);
js.fx.TTF.Swing = function(timestamp, origin, magnitude, duration) {
  var CYCLES = 4;
  var radians = CYCLES * 2 * Math.PI;
  var deltaR = radians / duration;
  var deltaM = magnitude / duration;
  return origin - Math.sin(timestamp * deltaR) * (magnitude - timestamp * deltaM);
};
$extends(js.fx.TTF.Swing, Object);
$package('js.lang');
js.lang.AssertException = function() {
  $assert(this instanceof js.lang.AssertException, 'js.lang.AssertException#AssertException', 'Invoked as function.');
  this.$super(arguments);
  this.name = 'j(s)-lib assertion';
};
js.lang.AssertException.prototype = {toString: function() {
  return 'js.lang.AssertException';
}};
$extends(js.lang.AssertException, js.lang.Exception);
$package("js.lang");
js.lang.Class = {_CLASS_LOADER_URL: "js/core/JsClassLoader/loadClass.rmi", _cache: {}, forName: function(className) {
  $assert(className, "js.lang.Class#forName", "Undefined, null or empty class name.");
  $assert(js.lang.Types.isString(className), "js.lang.Class#forName", "Expected string but got %s.", js.lang.Types.getTypeName(className));
  var clazz = this._cache[className];
  if (typeof clazz !== "undefined") 
  {
    return clazz;
  }
  try {
    clazz = eval(className);
  }  catch (er) {
}
  if (typeof clazz === "undefined") 
  {
    $debug("js.lang.Class#forName", "Class %s not found. Try to load it from server.", className);
    clazz = this._loadClass(className);
  }
  this._cache[className] = clazz;
  return clazz;
}, _loadClass: function(className) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", this._CLASS_LOADER_URL, false);
  xhr.timeout = 4000;
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader("Accept", "text/javascript");
  try {
    xhr.send(js.lang.JSON.stringify(className));
    eval(xhr.responseText);
    return eval(className);
  }  catch (er) {
  $error("js.lang.Class#loadClass", er);
}
  return null;
}, getResource: function(className, resourceName) {
}, toString: function() {
  return "js.lang.Class";
}};
$package('js.lang');
js.lang.JSON = {parse: function(json) {
  $assert(json, 'js.lang.JSON#parse', 'JSON string is undefined, null or empty.');
  return JSON.parse(json, function(key, value) {
  if (js.lang.Types.isString(value)) 
  {
    var d = js.lang.JSON._json2date(value);
    if (d !== null) 
    {
      return d;
    }
  }
  return value;
});
}, stringify: function(value) {
  $assert(typeof value !== 'undefined', 'js.lang.JSON#stringify', 'Value is undefined.');
  return JSON.stringify(value);
}, _REX_DATE: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/i, _json2date: function(json) {
  this._REX_DATE.lastIndex = 0;
  var m = json.match(this._REX_DATE);
  if (m === null) 
  {
    return null;
  }
  if (typeof m[7] === 'undefined') 
  {
    m[7] = 0;
  }
  m.shift();
  m[1] -= 1;
  return new Date(Date.UTC.apply(Date.UTC, m));
}, toString: function() {
  return 'js.lang.JSON';
}};
$legacy(typeof JSON === 'undefined' || js.ua.Engine.TRIDENT, function() {
  String.prototype.toJSON = function() {
  return this.valueOf();
};
  Number.prototype.toJSON = function() {
  return this.valueOf();
};
  Boolean.prototype.toJSON = function() {
  return this.valueOf();
};
  Date.prototype.toJSON = function() {
  function f(n) {
    return n < 10 ? '0' + n : n;
  }
  return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z';
};
  JSON = {REX_ISO8601: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{3})?Z$/i, REX_DECODE_ESCAPE: /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, REX_ENCODE_ESCAPE: /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, ESCAPE_CHAR: {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'}, stringify: function(object) {
  return this._serialize('', {'': object});
}, parse: function(json) {
  function postProcees(holder, key) {
    var v, value = holder[key];
    if (value && typeof value === 'object') 
    {
      for (var k in value) 
        {
          if (Object.hasOwnProperty.call(value, k)) 
          {
            v = postProcees(value, k);
            if (typeof v !== 'undefined') 
            {
              value[k] = v;
            } else {
              delete value[k];
            }
          }
        }
    }
    if (!(typeof value === 'string' || (typeof value === 'object' && value instanceof String))) 
    {
      return value;
    }
    var m = value.match(JSON.REX_ISO8601);
    if (!m) 
    {
      return value;
    }
    if (m.length != 7) 
    {
      return value;
    }
    var t = Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6]);
    return new Date(t);
  }
  ;
  JSON.REX_DECODE_ESCAPE.lastIndex = 0;
  if (JSON.REX_DECODE_ESCAPE.test(json)) 
  {
    function replacer(m) {
      return '\\u' + ('0000' + m.charCodeAt(0).toString(16)).slice(-4);
    }    ;
    json = json.replace(JSON.REX_DECODE_ESCAPE, replacer);
  }
  if (/^[\],:{}\s]*$/.test(json.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) 
  {
    var object = eval('(' + json + ')');
    return postProcees({'': object}, '');
  }
}, _quote: function(string) {
  JSON.REX_ENCODE_ESCAPE.lastIndex = 0;
  if (!JSON.REX_ENCODE_ESCAPE.test(string)) 
  {
    return '"' + string + '"';
  }
  function replacer(m) {
    var c = JSON.ESCAPE_CHAR[m];
    return typeof c === 'string' ? c : '\\u' + ('0000' + m.charCodeAt(0).toString(16)).slice(-4);
  }
  ;
  return '"' + string.replace(JSON.REX_ENCODE_ESCAPE, replacer) + '"';
}, _serialize: function(key, holder) {
  var i, v, partial, value = holder[key];
  if (typeof value === 'undefined' || value === null) 
  {
    return 'null';
  }
  if (typeof value.toJSON === 'function') 
  {
    value = value.toJSON(key);
  }
  switch (typeof value) {
    case 'string':
      return this._quote(value);
    case 'number':
      return isFinite(value) ? String(value) : 'null';
    case 'boolean':
    case 'null':
      return String(value);
    case 'object':
      partial = [];
      if (Object.prototype.toString.apply(value) === '[object Array]') 
      {
        for (i = 0; i < value.length; i++) 
          {
            partial[i] = this._serialize(i, value) || 'null';
          }
        return partial.length ? '[' + partial.join(',') + ']' : '[]';
      }
      for (var k in value) 
        {
          if (Object.hasOwnProperty.call(value, k)) 
          {
            v = this._serialize(k, value);
            if (v) 
            {
              partial.push(this._quote(k) + ':' + v);
            }
          }
        }
      return partial.length ? '{' + partial.join(',') + '}' : '{}';
  }
}};
});
$package('js.lang');
js.lang.NOP = function() {
};
$extends(js.lang.NOP, Object);
$package("js.lang");
js.lang.OPP = {get: function(obj, opp) {
  return this._get(obj, opp.split("."), 0);
}, _get: function(obj, opp, i) {
  $assert(i === opp.length || js.lang.Types.isObject(obj), "js.lang.OPP#_get", "Invalid property. Expected Object but got primitive.");
  $assert(js.lang.Types.isArray(opp), "js.lang.OPP#_get", "OPP argument is not an array.");
  if (typeof obj !== "undefined" && obj !== null && i < opp.length) 
  {
    obj = arguments.callee.call(this, obj[opp[i++]], opp, i);
  }
  return obj;
}, set: function(obj, opp, value) {
  this._set(obj, opp.split("."), 0, value);
}, _set: function(obj, opp, i, value) {
  $assert(typeof obj === "object", "js.lang.OPP#_set", "Target object is undefined or not of Object type.");
  $assert(js.lang.Types.isArray(opp), "js.lang.OPP#_set", "OPP is not an array.");
  $assert(typeof value !== "undefined", "js.lang.OPP#_set", "Value is undefined.");
  if (i === opp.length - 1) 
  {
    obj[opp[i]] = value;
    return;
  }
  obj = obj[opp[i]];
  $assert(obj !== null && typeof obj === "object", "js.lang.OPP#_set", "Path component |%d| from |%s| points to undefined, null or not Object type.", i, opp.join('.'));
  if (obj === null || typeof obj !== "object") 
  {
    return;
  }
  ++i;
  obj = arguments.callee.call(this, obj, opp, i, value);
}, toString: function() {
  return "js.lang.OPP";
}};
$package("js.lang");
js.lang.Uniterator = function(value) {
  $assert(this instanceof js.lang.Uniterator, "js.lang.Uniterator#Uniterator", "Invoked as function.");
  $assert(arguments.length === 1, "js.lang.Uniterator#Uniterator", "Missing argument.");
  if (arguments.length !== 1) 
  {
    value = js.lang.Uniterator._EMPTY_ARRAY;
  } else if (typeof value === "undefined") 
  {
    value = js.lang.Uniterator._UNDEF_ARRAY;
  } else if (value === null) 
  {
    value = js.lang.Uniterator._NULL_ARRAY;
  } else if (js.lang.Types.isFunction(value.it)) 
  {
    return value.it();
  }
  if (!js.lang.Types.isNodeList(value)) 
  {
    if (!js.lang.Types.isArray(value)) 
    {
      value = [value];
    }
    value.item = function(index) {
  return this[index];
};
  }
  this._items = value;
  this._index = 0;
};
js.lang.Uniterator._EMPTY_ARRAY = [];
js.lang.Uniterator._UNDEF_ARRAY = [undefined];
js.lang.Uniterator._NULL_ARRAY = [null];
js.lang.Uniterator.prototype = {hasNext: function() {
  return this._index < this._items.length;
}, next: function() {
  $assert(this._index < this._items.length, "js.lang.Uniterator#next", "Iteration out of range.");
  return this._items.item(this._index++);
}, toString: function() {
  return "js.lang.Uniterator";
}};
$extends(js.lang.Uniterator, Object);
$implements(js.lang.Uniterator, js.lang.Iterator);
$package('js.net');
js.net.Method = {DELETE: 'DELETE', GET: 'GET', HEAD: 'HEAD', OPTIONS: 'OPTIONS', POST: 'POST', PUT: 'PUT'};
$package('js.net');
js.net.ReadyState = {UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4};
$package('js.net');
js.net.RMI = function(forceSynchronousMode) {
  $assert(this instanceof js.net.RMI, 'js.net.RMI#RMI', 'Invoked as function.');
  this._forceSynchronousMode = (forceSynchronousMode === true);
  this._className = null;
  this._methodName = null;
  this._parameters = null;
  this._callback = null;
  this._scope = null;
  this._xhr = null;
  this._progress = null;
};
js.net.RMI._loopValues = {};
js.net.RMI.setLoop = function(remoteClass, remoteMethod, value) {
  this._loopValues[remoteClass + '$' + remoteMethod] = value;
};
js.net.RMI.removeLoop = function(remoteClass, remoteMethod) {
  delete this._loopValues[remoteClass + '$' + remoteMethod];
};
js.net.RMI._hasLoop = function(rmi) {
  return typeof this._loopValues[rmi._className + '$' + rmi._methodName] !== 'undefined';
};
js.net.RMI._getLoopValue = function(rmi) {
  return this._loopValues[rmi._className + '$' + rmi._methodName];
};
js.net.RMI.prototype = {setMethod: function(className, methodName) {
  $assert(className && js.lang.Types.isString(className), 'js.net.RMI#setMethod', 'Class name is undefined, null, empty or not a string.');
  $assert(methodName && js.lang.Types.isString(methodName), 'js.net.RMI#setMethod', 'Method name is undefined, null, empty or not a string.');
  if (className && methodName) 
  {
    this._className = className;
    this._methodName = methodName;
  }
  return this;
}, setParameters: function(parameters) {
  $assert(arguments.length > 0, 'js.net.RMI#setParameters', 'Missing argument.');
  $assert(typeof parameters !== 'undefined', 'js.net.RMI#setParameters', 'Undefined parameter(s).');
  if (typeof parameters === 'undefined') 
  {
    return this;
  }
  if (parameters !== null && typeof parameters.callee === 'function') 
  {
    var startIdx = arguments.length > 1 ? arguments[1] : 0;
    if (startIdx >= arguments[0].length) 
    {
      return this;
    }
    var args = [];
    for (var i = startIdx; i < arguments[0].length; i++) 
      {
        args.push(arguments[0][i]);
      }
    arguments.callee.apply(this, args);
    return this;
  }
  if (arguments.length >= 1 && (arguments[0] instanceof js.dom.Document || arguments[0] instanceof js.dom.FormData)) 
  {
    this._parameters = arguments[0];
    if (js.lang.Types.isFunction(this._parameters.getProgress)) 
    {
      this._progress = this._parameters.getProgress();
      $assert(this._progress === null || this._progress instanceof js.dom.Progress, 'js.net.RMI#setParameters', 'Progress is not of proper type.');
    }
    return this;
  }
  this._parameters = [];
  for (var i = 0; i < arguments.length; ++i) 
    {
      $assert(typeof arguments[i] !== 'undefined', 'js.net.RMI#addParameter', 'Argument is undefined.');
      if (typeof arguments[i] !== 'undefined') 
      {
        this._parameters.push(arguments[i]);
      }
    }
  return this;
}, exec: function(callback, scope) {
  $assert(typeof callback === 'undefined' || js.lang.Types.isFunction(callback), 'js.net.RMI#exec', 'Callback is not a function.');
  $assert(typeof scope === 'undefined' || js.lang.Types.isObject(scope), 'js.net.RMI#exec', 'Scope is not an object.');
  this._callback = callback;
  this._scope = scope || window;
  if (js.net.RMI._hasLoop(this)) 
  {
    try {
      return this._onLoad(js.net.RMI._getLoopValue(this));
    }    catch (er) {
  js.ua.System.error(er);
  return null;
}
  }
  var url = this._className.replace(/\./g, '/') + '/' + this._methodName + '.rmi';
  $debug('js.net.RMI#exec', 'RMI call on %s(%s).', url, this._parameters !== null ? this._parameters.toString() : '');
  this._xhr = new js.net.XHR();
  this._xhr.on('load', this._onLoad, this);
  if (this._progress !== null) 
  {
    this._progress.start();
    this._xhr.on('progress', this._progress.update, this._progress);
  }
  this._xhr.open(js.net.Method.POST, url, !this._forceSynchronousMode);
  var remoteValue = this._xhr.send(this._parameters);
  return this._forceSynchronousMode ? remoteValue : undefined;
}, _onLoad: function(value) {
  if (this._callback) 
  {
    this._callback.call(this._scope, value);
  }
  this.finalize();
}, finalize: function() {
  delete this._callback;
  delete this._scope;
  delete this._xhr;
}, toString: function() {
  return 'js.net.RMI';
}};
$extends(js.net.RMI, Object);
$package("js.net");
js.net.WebSocket = function() {
  $assert(arguments.length, "js.net.WebSocket#WebSocket", "Missing argument(s).");
  var url, subProtocol;
  if (arguments.length === 2) 
  {
    url = arguments[0];
    subProtocol = arguments[1];
  } else {
    var u = WinMain.url;
    url = $format("ws://%s:%d/%s/sock.wsp", u.host, u.port, u.path);
    subProtocol = arguments[0];
  }
  $assert(url, "js.net.WebSocket#WebSocket", "URL is undefined, null or empty.");
  $assert(subProtocol, "js.net.WebSocket#WebSocket", "Sub-protocol is undefined, null or empty.");
  this._events = new js.event.CustomEvents();
  this._events.register("open", "close", "message", "error");
  this._sock = new WebSocket(url, subProtocol);
  this._sock.onopen = this._onopen.bind(this);
  this._sock.onclose = this._onclose.bind(this);
  this._sock.onmessage = this._onmessage.bind(this);
  this._sock.onerror = this._onerror.bind(this);
};
js.net.WebSocket.prototype = {on: function(type, listener, scope) {
  this._events.addListener(type, listener, scope || window);
  return this;
}, send: function(data) {
  this._sock.send(JSON.stringify(data));
  return this;
}, close: function() {
  this._sock.close();
}, _onopen: function() {
  this._events.fire("open");
}, _onclose: function() {
  this._events.fire("close");
}, _onmessage: function(message) {
  var data = JSON.parse(message.data);
  this._events.fire("message", data);
}, _onerror: function() {
  this._events.fire("error");
}, toString: function() {
  return "js.net.WebSocket";
}};
$extends(js.net.WebSocket, Object);
$package("js.net");
js.net.XHR = function() {
  $assert(this instanceof js.net.XHR, "js.net.XHR#XHR", "Invoked as function.");
  this._request = new XMLHttpRequest();
  this._state = js.net.XHR.StateMachine.CREATED;
  this._synchronousMode = false;
  this._timeout = new js.util.Timeout(0);
  this._timeout.setCallback(this._onTimeout, this);
  this._events = new js.event.CustomEvents();
  this._events.register("progress", "error", "timeout", "load", "loadend");
};
js.net.XHR.SYNC_TIMEOUT = 4000;
js.net.XHR.VALID_HEADER = /^[A-Z0-9\-\/\s,\.]+$/gi;
js.net.XHR.prototype = {on: function(type, listener, scope) {
  $assert(this._state === js.net.XHR.StateMachine.CREATED, "js.net.XHR#on", "Illegal state.");
  if (type === "progress") 
  {
    this._request.upload.addEventListener("progress", function(ev) {
  this._events.fire("progress", ev);
}.bind(this));
  }
  this._events.addListener(type, listener, scope || window);
  return this;
}, setTimeout: function(timeout) {
  $assert(js.lang.Types.isNumber(timeout), "js.net.XHR#setTimeout", "Timeout is not a number.");
  $assert(timeout >= 0, "js.net.XHR#setTimeout", "Timeout is not strict positive.");
  this._timeout.set(timeout);
  return this;
}, setHeader: function(header, value) {
  function isValid(str) {
    js.net.XHR.VALID_HEADER.lastIndex = 0;
    return str && js.net.XHR.VALID_HEADER.test(str);
  }
  $assert(this._state === js.net.XHR.StateMachine.OPENED, "js.net.XHR#setHeader", "Illegal state.");
  $assert(isValid(header), "js.net.XHR#setHeader", "Header name is invalid.");
  $assert(isValid(value), "js.net.XHR#setHeader", "Header value is invalid.");
  return this._setHeader(header, value);
}, _setHeader: function(header, value) {
  this._request.setRequestHeader(header, value);
  return this;
}, getHeader: function(header) {
  $assert(this._state === js.net.XHR.StateMachine.DONE, "js.net.XHR#getHeader", "Illegal state.");
  return this._request.getResponseHeader(header);
}, getStatus: function() {
  $assert(this._state === js.net.XHR.StateMachine.DONE, "js.net.XHR#getStatus", "Illegal state.");
  return window.parseInt(this._request.status, 10);
}, getStatusText: function() {
  $assert(this._state === js.net.XHR.StateMachine.DONE, "js.net.XHR#getStatusText", "Illegal state.");
  return this._request.statusText;
}, open: function(method, url, async, user, password) {
  $assert(this._state === js.net.XHR.StateMachine.CREATED, "js.net.XHR#open", "Illegal state.");
  this._state = js.net.XHR.StateMachine.OPENED;
  $assert(method, "js.net.XHR#open", "Undefined or null method.");
  $assert(url, "js.net.XHR#open", "Undefined or null URL.");
  $assert(typeof async === "undefined" || js.lang.Types.isBoolean(async), "js.net.XHR#open", "Asynchronous flag is not boolean.");
  $assert(typeof user === "undefined" || js.lang.Types.isString(user), "js.net.XHR#open", "User is not string.");
  $assert(typeof password === "undefined" || js.lang.Types.isString(password), "js.net.XHR#open", "Password is not string.");
  if (typeof async === "undefined") 
  {
    async = true;
  }
  this._synchronousMode = !async;
  if (this._synchronousMode && this._timeout.get() === 0) 
  {
    this._timeout.set(js.net.XHR.SYNC_TIMEOUT);
  }
  if (async) 
  {
    this._request.onreadystatechange = this._onReadyStateChange.bind(this);
  }
  this._request.open(method, url, async, user, password);
  this._request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  this._request.setRequestHeader("Cache-Control", "no-cache");
  this._request.setRequestHeader("Cache-Control", "no-store");
  this._request.setRequestHeader("Accept", "application/json, text/xml, text/plain");
  return this;
}, send: function(data) {
  $assert(this._state === js.net.XHR.StateMachine.OPENED, "js.net.XHR#send", "Illegal state.");
  this._state = js.net.XHR.StateMachine.SENDING;
  if (typeof data === "undefined" || data === null) 
  {
    this._request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    this._timeout.start();
    this._request.send();
  } else if (js.lang.Types.isString(data)) 
  {
    this._request.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
    this._timeout.start();
    this._request.send(data);
  } else if (data instanceof js.dom.Document) 
  {
    this._request.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");
    this._timeout.start();
    this._request.send(data._document);
  } else if (data instanceof js.dom.FormData) 
  {
    this._request.send(new FormData(data.getNode()));
  } else {
    this._request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    this._timeout.start();
    this._request.send(js.lang.JSON.stringify(data));
  }
  if (this._synchronousMode) 
  {
    this._timeout.stop();
    var res = this._processResponse();
    this.finalize();
    return res;
  }
}, abort: function() {
  try {
    this._request.onreadystatechange = null;
    this._timeout.stop();
    this._request.abort();
    this._state = js.net.XHR.StateMachine.ABORTED;
    this._events.fire("loadend");
    this.finalize();
  }  catch (er) {
  $error("js.net.XHR#abort", er);
}
}, _onReadyStateChange: function() {
  if (this._request.readyState === js.net.ReadyState.DONE) 
  {
    try {
      this._timeout.stop();
      var response = this._processResponse();
      if (typeof response !== "undefined") 
      {
        this._events.fire("load", response);
      }
    }    catch (er) {
  js.ua.System.error(er);
}
 finally     {
      try {
        this._events.fire("loadend");
      }      catch (er) {
  $error("js.net.XHR#_onReadyStateChange", "Error on loadend listeners: %s.", er);
}
      this.finalize();
    }
  }
}, _processResponse: function() {
  var er, contentType;
  if (this._request.status === 500) 
  {
    er = JSON.parse(this._request.responseText);
    $debug("js.net.XHR#_processResponse", "Server side error: %s: %s", er.cause, er.message);
    if (this._events.hasListener("error")) 
    {
      this._events.fire("error", er);
    } else {
      js.ua.System.error(er.cause + "\n" + er.message);
    }
    this._state = js.net.XHR.StateMachine.ERROR;
    return undefined;
  }
  contentType = this._request.getResponseHeader("Content-Type");
  if (this._request.status === 400) 
  {
    $assert(contentType.indexOf("json") !== -1, "js.net.XHR#_processResponse", "Bad content type for business constrain exception.");
    er = js.lang.JSON.parse(this._request.responseText);
    $debug("js.net.XHR#_processResponse", "Broken business constrain: 0x%4X", er.errorCode);
    WinMain.page.onBusinessFail(er);
    this._state = js.net.XHR.StateMachine.ERROR;
    return undefined;
  }
  if (this._request.status !== 200) 
  {
    $error("js.net.XHR#_processResponse", "Invalid server response status code |%s|.", this._request.status);
    throw new js.lang.Exception("Invalid server response.");
  }
  this._state = js.net.XHR.StateMachine.DONE;
  var redirect = this._request.getResponseHeader("X-JSLIB-Location");
  if (redirect) 
  {
    $debug("js.net.XHR#_processResponse", "Server side redirect to |%s|.", redirect);
    WinMain.assign(redirect);
    return undefined;
  }
  if (contentType && contentType.indexOf("xml") !== -1) 
  {
    return new js.dom.Document(this._request.responseXML);
  }
  if (contentType && contentType.indexOf("json") !== -1) 
  {
    return js.lang.JSON.parse(this._request.responseText);
  }
  return this._request.responseText;
}, _onTimeout: function() {
  this._events.fire("timeout");
  this.abort();
}, toString: function() {
  return "js.net.XHR";
}, finalize: function() {
  delete this._events;
  delete this._request;
  delete this._timeout;
}};
$extends(js.net.XHR, Object);
js.net.XHR.StateMachine = {CREATED: 0, OPENED: 1, SENDING: 2, ABORTED: 3, DONE: 4, ERROR: 5};
$legacy(typeof FormData === "undefined", function() {
  js.net.XHR.MAGIC_ID = "LEGACY-FORM.rmi";
  js.net.XHR.prototype.on = function(type, listener, scope) {
  $assert(this._state === js.net.XHR.StateMachine.CREATED, "js.net.XHR#on", "Illegal state.");
  if (type === "progress") 
  {
    this._hasProgress = true;
  }
  this._events.addListener(type, listener, scope || window);
  return this;
};
  js.net.XHR.prototype._onProgress = function(progress) {
  this._events.fire("progress", progress);
};
  js.net.XHR.prototype._open = js.net.XHR.prototype.open;
  js.net.XHR.prototype.open = function(method, url, async, user, password) {
  $assert(this._state === js.net.XHR.StateMachine.CREATED, "js.net.XHR#open", "Illegal state.");
  this._state = js.net.XHR.StateMachine.OPENED;
  $assert(method, "js.net.XHR#open", "Undefined or null method.");
  $assert(url, "js.net.XHR#open", "Undefined or null URL.");
  $assert(typeof async === "undefined" || js.lang.Types.isBoolean(async), "js.net.XHR#open", "Asynchronous flag is not boolean.");
  $assert(typeof user === "undefined" || js.lang.Types.isString(user), "js.net.XHR#open", "User is not string.");
  $assert(typeof password === "undefined" || js.lang.Types.isString(password), "js.net.XHR#open", "Password is not string.");
  this._method = method;
  this._url = url;
  this._async = async;
  this._user = user;
  this._password = password;
  this._headers = [];
  return this;
};
  js.net.XHR.prototype._setHeader = function(header, value) {
  this._headers.push({header: header, value: value});
  return this;
};
  js.net.XHR.prototype._send = js.net.XHR.prototype.send;
  js.net.XHR.prototype.send = function(data) {
  var res = undefined;
  if (data instanceof js.dom.Form) 
  {
    this._request.abort();
    delete this._requets;
    this._request = new js.net.XHR.Upload(this);
    if (this._url.indexOf(js.net.XHR.MAGIC_ID) === -1) 
    {
      this._url = this._url.replace(/rmi$/, js.net.XHR.MAGIC_ID);
    }
    var form = data;
    form.setAction(this._url);
    this._request.send(form);
  } else {
    this._state = js.net.XHR.StateMachine.CREATED;
    this._open(this._method, this._url, this._async, this._user, this._password);
    for (var i = 0, item; i < this._headers.length; ++i) 
      {
        item = this._headers[i];
        this._request.setRequestHeader(item.header, item.value);
      }
    res = this._send(data);
  }
  return res;
};
  js.net.XHR.prototype._finalize = js.net.XHR.prototype.finalize;
  js.net.XHR.prototype.finalize = function() {
  delete this._method;
  delete this._url;
  delete this._async;
  delete this._user;
  delete this._password;
  delete this._headers;
  if (this._request instanceof js.net.XHR.Upload) 
  {
    this._request.finalize();
  }
  this._finalize();
};
  js.net.XHR.Upload = function(transaction) {
  $assert(transaction instanceof js.net.XHR, "js.net.XHR.Upload#Upload", "Transaction is not instance of js.net.XHR");
  this._transaction = transaction;
  if (transaction._hasProgress) 
  {
    this._progressTimer = new js.util.Timer(js.net.XHR.Upload.PROGRESS_INTERVAL);
    this._progressTimer.setCallback(this._onProgressTimer, this);
    this._progressTotal = 0;
  }
  this.readyState = js.net.ReadyState.UNSET;
  this._timestamp = null;
  this._send = false;
  this.status = null;
  this.statusText = null;
  this.responseText = null;
  this.responseXML = null;
  this._controlRequest = null;
  this._controlRequestPending = false;
  this._iframe = null;
  this._uploadUUID = null;
  this._responseHeaders = null;
};
  js.net.XHR.Upload.PROGRESS_TIMEOUT = 4000;
  js.net.XHR.Upload.PROGRESS_INTERVAL = 200;
  js.net.XHR.Upload.prototype = {send: function(form) {
  this.readyState = js.net.ReadyState.OPENED;
  this._controlRequest = new js.net.XHR.ControlRequest(form.getAction());
  this._controlRequest.setCallback(this._onControlResponse, this);
  var doc = form.getOwnerDoc();
  var id = js.util.ID();
  this._iframe = doc.createElement("iframe", "id", id, "name", id, "src", "about:blank");
  this._iframe.style.set({"position": "absolute", "top": "-1000px", "left": "-1000px"});
  this._iframe.on("load", this._onIFrameLoaded, this);
  doc.getByTag("body").addChild(this._iframe);
  form.setAttr("target", this._iframe.getAttr("id"));
  this._uploadUUID = js.util.UUID();
  form.add("upload-uuid", this._uploadUUID);
  form.getNode().submit();
  if (this._progressTimer) 
  {
    this._progressTimer.start();
  }
  return this;
}, _onIFrameLoaded: function() {
  $assert(this._iframe.getLocation() !== "about:blank", "js.net.XHR.Upload$_onIFrameLoaded", "Load event generated by blank iframe.");
  if (this._progressTimer) 
  {
    this._progressTimer.stop();
    this._transaction._onProgress({total: this._progressTotal, loaded: this._progressTotal});
  }
  var doc = this._iframe.getInnerDoc();
  this._responseHeaders = {};
  var it = doc.findByTag("meta").it(), meta;
  while (it.hasNext()) 
    {
      meta = it.next();
      if (meta.hasAttr("http-equiv")) 
      {
        this._responseHeaders[meta.getAttr("http-equiv")] = meta.getAttr("content");
      } else {
        this[meta.getAttr("name")] = meta.getAttr("content");
      }
    }
  this.status = Number(this.status);
  this.responseText = doc.getByTag("body").getText();
  if (this.getResponseHeader("Content-Type") === "text/xml") 
  {
    this.responseXML = js.dom.Builder.parseXML(this.responseText).getDocument();
  }
  this.readyState = js.net.ReadyState.DONE;
  this._transaction._onReadyStateChange();
}, abort: function() {
  this.status = 0;
  this.statusText = "USER ABORT";
  if (this._progressTimer) 
  {
    this._progressTimer.stop();
  }
  this._iframe.reload();
  this._iframe.remove();
  delete this._iframe;
  this._sendControlRequest("ABORT");
}, getResponseHeader: function(header) {
  var h = this._responseHeaders[header];
  return h ? h : null;
}, _onProgressTimer: function() {
  var now = new Date().getTime();
  if (now - this._timestamp > js.net.XHR.Upload.PROGRESS_TIMEOUT) 
  {
    this._controlRequest.abort();
    this._controlRequestPending = false;
  }
  if (!this._controlRequestPending) 
  {
    this._sendControlRequest("STATUS");
  }
}, _sendControlRequest: function(opcode) {
  this._controlRequestPending = true;
  this._timestamp = new Date().getTime();
  this._controlRequest.send({uploadUUID: this._uploadUUID, opcode: opcode});
}, _onControlResponse: function(res) {
  this["_on" + res.opcode](res.value);
  this._controlRequestPending = false;
}, _onABORT: function() {
  this._send = false;
}, _onSTATUS: function(progress) {
  if (this._transaction) 
  {
    this._progressTotal = progress.total;
    this._transaction._onProgress(progress);
  }
}, finalize: function() {
  this._iframe.remove();
  delete this._iframe;
  if (this._progressTimer) 
  {
    this._progressTimer.stop();
    delete this._progressTimer;
  }
  this._controlRequest.finalize();
  delete this._controlRequest;
  delete this._transaction;
}};
  js.net.XHR.ControlRequest = function(url) {
  this._url = url;
  this._send = false;
  this._xhr = new XMLHttpRequest();
  this._callback = null;
  this._scope = null;
};
  js.net.XHR.ControlRequest.prototype = {_contentType: "application/json; charset=UTF-8", setCallback: function(callback, scope) {
  this._callback = callback;
  this._scope = scope || window;
}, send: function(req) {
  if (this._send) 
  {
    this._xhr.abort();
  }
  this._send = true;
  this._xhr.onreadystatechange = this._onReadyStateChange.bind(this);
  this._xhr.open("POST", this._url, true);
  this._xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  this._xhr.setRequestHeader("Cache-Control", "no-cache");
  this._xhr.setRequestHeader("Cache-Control", "no-store");
  this._xhr.setRequestHeader("Content-Type", this._contentType);
  this._xhr.setRequestHeader("Accept", this._contentType);
  this._xhr.send(js.lang.JSON.stringify(req));
}, _onReadyStateChange: function() {
  if (this._xhr.readyState === js.net.ReadyState.DONE) 
  {
    this._callback.call(this._scope, js.lang.JSON.parse(this._xhr.responseText));
    this._send = false;
  }
}, abort: function() {
  this._xhr.abort();
  this._send = false;
}, finalize: function() {
  delete this._xhr;
}};
});
$package("js.ua");
js.ua.SystemDialog = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._message = this.getByTag("p");
  this._onCloseCallback = null;
  this._onCloseScope = null;
  this._preventCheckbox = this.getByCss(".prevent input");
  this.getByTag("h1").setText(WinMain.getTitle());
};
js.ua.SystemDialog.prototype = {open: function() {
}, setMessage: function(message) {
  this._message.setHTML(message);
}, show: function() {
  WinMain.doc.on("keypress", this._onKeyPress, this);
  this.removeCssClass("hidden");
}, hide: function() {
  this.addCssClass("hidden");
  WinMain.doc.un("keypress", this._onKeyPress);
  if (this._onCloseCallback !== null) 
  {
    this._onCloseCallback.call(this._onCloseScope, this._preventCheckbox.checked());
    this._onCloseCallback = null;
    this._onCloseScope = null;
  }
}, setOnCloseListener: function(callback, scope) {
  this._onCloseCallback = callback;
  this._onCloseScope = scope || window;
}, enablePreventCheckbox: function() {
  this.getByCssClass("prevent").removeCssClass("hidden");
}, _onKeyPress: function(ev) {
  switch (ev.key) {
    case js.event.Key.ENTER:
      this._onEnter();
      ev.halt();
      break;
    case js.event.Key.ESCAPE:
      this._onEscape();
      ev.halt();
      break;
  }
}, _onEnter: function() {
}, _onEscape: function() {
}, toString: function() {
  return "js.ua.SystemDialog";
}};
$extends(js.ua.SystemDialog, js.dom.Box);
$package('js.ua');
js.ua.AlertDialog = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._button = this.getByTag('button');
  this._button.on('click', this.hide, this);
};
js.ua.AlertDialog.prototype = {open: function(message) {
  this.setMessage(arguments.length === 1 ? message : $format(arguments));
  this.show();
}, _onEnter: function() {
  this.hide();
}, _onEscape: function() {
  this.hide();
}, toString: function() {
  return 'js.ua.AlertDialog';
}};
$extends(js.ua.AlertDialog, js.ua.SystemDialog);
$package('js.ua');
js.ua.ConfirmDialog = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._okButton = this.getByCssClass('ok');
  this._okButton.on('click', this._onOK, this);
  this._cancelButton = this.getByCssClass('cancel');
  this._cancelButton.on('click', this._onCancel, this);
};
js.ua.ConfirmDialog.prototype = {open: function(message, callback, scope) {
  this._callback = callback;
  this._scope = scope || window;
  this.setMessage(message);
  this.show();
}, _onOK: function(ev) {
  this._close(true);
}, _onCancel: function(ev) {
  this._close(false);
}, _close: function(value) {
  this.hide();
  if (this._callback !== undefined) 
  {
    this._callback.call(this._scope, value);
  }
}, _onEnter: function() {
  this._onOK();
}, _onEscape: function() {
  this._onCancel();
}, toString: function() {
  return 'js.ua.ConfirmDialog';
}};
$extends(js.ua.ConfirmDialog, js.ua.SystemDialog);
$package("js.ua");
js.ua.Cookies = {MAX_LENGTH: 4096, set: function(name, value, expires, path, domain, secure) {
  $assert(typeof name !== "undefined" && this.isValidName(name), "js.ua.Cookies#set", "Invalid cookie name |%s|.", name);
  $assert(typeof expires === "undefined" || js.lang.Types.isDate(expires), "js.ua.Cookies#set", "Expires is not date type.");
  $assert(typeof path === "undefined" || this.isValidValue(path), "js.ua.Cookies#set", "Path is not string.");
  $assert(typeof domain === "undefined" || this.isValidValue(domain), "js.ua.Cookies#set", "Domain is not string.");
  $assert(typeof secure === "undefined" || js.lang.Types.isBoolean(secure), "js.ua.Cookies#set", "Secure is not boolean.");
  var comment = "j(s)-lib-";
  if (js.lang.Types.isBoolean(value)) 
  {
    comment += "b";
    value = value ? "true" : "false";
  } else if (js.lang.Types.isNumber(value)) 
  {
    comment += "n";
    value = value.toString();
  } else if (js.lang.Types.isDate(value)) 
  {
    comment += "d";
    value = js.lang.JSON.stringify(value);
  } else if (js.lang.Types.isString(value)) 
  {
    $assert(this.isValidValue(value), "js.ua.Cookies#set", "Invalid cookie value.");
    comment += "s";
  } else if (js.lang.Types.isArray(value)) 
  {
    comment += "a";
    value = js.lang.JSON.stringify(value);
  } else {
    comment += "o";
    value = js.lang.JSON.stringify(value);
  }
  var cookie = name + "=" + escape(value) + ("; comment=" + comment) + (expires ? "; expires=" + expires.toGMTString() : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
  this._setCookie(cookie);
}, get: function(name, value, expires) {
  $assert(name, "js.ua.Cookies#get", "Name is undefined, null or empty.");
  $assert(typeof value === "undefined" || this.isValidValue(value), "js.ua.Cookies#get", "Invalid cookie value.");
  $assert(typeof expires === "undefined" || js.lang.Types.isDate(expires), "js.ua.Cookies#get", "Expires is not date type.");
  var cookies = this._getCookies();
  var rex = new RegExp("(?:^|.*;\\s*)" + name + "\\s*\\=\\s*([^;]+)(?:;\\s*comment=j\\(s\\)\\-lib\\-([bndsoa]))?.*");
  var match = rex.exec(cookies);
  if (match !== null && match.length > 1) 
  {
    value = unescape(match[1]);
    switch (match[2]) {
      case "b":
        return value === "true" ? true : false;
      case "n":
        return Number(value);
      case "d":
      case "o":
      case "a":
        return js.lang.JSON.parse(value);
    }
    return value;
  }
  if (typeof value !== "undefined") 
  {
    this.set(name, value, expires);
    return value;
  }
  return null;
}, has: function(name) {
  $assert(name, "js.ua.Cookies#has", "Name is undefined, null or empty.");
  var cookies = this._getCookies();
  var rex = new RegExp("(?:^|;\\s*)" + name + "\\s*\\=");
  return rex.test(cookies);
}, remove: function(name) {
  if (this.has(name)) 
  {
    var cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/";
    this._setCookie(cookie);
  }
}, isEnabled: function() {
  return navigator.cookieEnabled;
}, _INVALID_NAME: /^(?:comment|expires|max\-age|path|domain|secure|version)$|^\$|[;=\s]+/, isValidName: function(name) {
  if (!name || !js.lang.Types.isString(name)) 
  {
    return false;
  }
  this._INVALID_NAME.lastIndex = 0;
  return !this._INVALID_NAME.test(name);
}, isValidValue: function(value) {
  if (!value || !js.lang.Types.isString(value)) 
  {
    return false;
  }
  return value.indexOf(";") === -1;
}, _setCookie: function(cookie) {
  $assert(cookie.length < this.MAX_LENGTH);
  document.cookie = cookie;
}, _getCookies: function() {
  return document.cookie;
}, toString: function() {
  return "js.ua.Cookies";
}};
$legacy(js.ua.Engine.WEBKIT, function() {
  js.ua.Cookies.isEnabled = function() {
  var name = js.util.UUID();
  this.set(name, "fake-value");
  if (this.get(name) === null) 
  {
    return false;
  }
  this.remove(name);
  return true;
};
});
$package('js.ua');
js.ua.ToastDialog = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._timeout = new js.util.Timeout(this._DEF_TIMEOUT);
  this._timeout.setCallback(this._onTimeout, this);
};
js.ua.ToastDialog.prototype = {_DEF_TIMEOUT: 2000, open: function(message) {
  this.setMessage(arguments.length === 1 ? message : $format(arguments));
  this.show();
  this._timeout.start();
}, setTimeout: function(timeout) {
  this._timeout.set(timeout);
}, _onTimeout: function() {
  if (this.hasCssClass('moving')) 
  {
    this._timeout.start();
  } else {
    this.hide();
  }
}, _onEnter: function() {
  this.hide();
}, _onEscape: function() {
  this.hide();
}, toString: function() {
  return 'js.ua.ToastDialog';
}};
$extends(js.ua.ToastDialog, js.ua.SystemDialog);
$package('js.ua');
js.ua.PromptDialog = function(ownerDoc, node) {
  this.$super(ownerDoc, node);
  this._input = this.getByTag('input');
};
js.ua.PromptDialog.prototype = {open: function(message, callback, scope) {
  this._input.reset();
  this.$super('open', arguments);
  this._input.focus();
}, _onOK: function(ev) {
  this._close(this._input.getValue());
}, _onCancel: function(ev) {
  this._close();
}, toString: function() {
  return 'js.ua.PromptDialog';
}};
$extends(js.ua.PromptDialog, js.ua.ConfirmDialog);
$package('js.ua');
$include('js.ua.AlertDialog');
$include('js.ua.ToastDialog');
$include('js.ua.ConfirmDialog');
$include('js.ua.PromptDialog');
js.ua.DialogsFactory = {_style: '' + '.system-dialog {' + '\tposition: fixed;' + '\tmin-width: 250px;' + '\tmax-width: 400px;' + '\tpadding: 10px 20px;' + '\tz-index: 16777270;' + '\tborder-style: solid;' + '\tbackground-color: #EEE;' + '\tborder-width: 2px;' + '\tborder-bottom-color: #777;' + '\tborder-left-color: #CCC;' + '\tborder-right-color: #777;' + '\tborder-top-color: #CCC;' + '\tborder-radius: 8px;' + '\topacity: 0.96;' + '\tfilter: alpha(opacity=96);' + '\tfont-family: Tahoma;' + '}' + '.system-dialog.moving {' + '\topacity: 0.80;' + '\tfilter: alpha(opacity=80);' + '\tz-index: 16777271;' + '}' + '.system-dialog h1 {' + '\tborder-bottom: solid 1px #CCC;' + '\tpadding-bottom: 4px;' + '\tmargin: 0px 0px 20px;' + '\tfont-size: 18px;' + '\tfont-weight: normal;' + '\ttext-decoration: none;' + '\tcursor: move;' + '\tcolor: #666;' + '\tbackground-color: transparent;' + '\tbackground-image: none;' + '\ttext-shadow: 1px 1px 0px #FFF;' + '}' + '.system-dialog p {' + '\tcolor: #000;' + '\ttext-align: center;' + '\tmargin: 20px 30px;' + '\tmax-height: 300px;' + '\tfont-size: 12px;' + '\toverflow: hidden;' + '}' + '.system-dialog p em : {' + '\tcolor: red;' + '}' + '.system-dialog input[type="text"] {' + '\tdisplay: inline-block;' + '\twidth: 100%;' + '\tmargin-left: -7px;' + '\tfont-size: 12px;' + '\tline-height: 15px;' + '\tpadding: 5px 7px;' + '\tborder-radius: 4px;' + '\tbackground-color: #F8F8F8;' + '\tborder: solid 1px #CCC;' + '\tmargin-bottom: 10px;' + '}' + '.system-dialog input[type="text"]:focus {' + '\tborder: solid 1px #888;' + '}' + '.system-dialog .prevent {' + '\tposition:relative;' + '\tmargin-top: 10px;' + '\tpadding-top: 4px;' + '\tborder-top: solid 1px #CCC;' + '}' + '.system-dialog .prevent input {' + '\tposition: relative;' + '\ttop: 2px;' + '\tmargin-right: 6px;' + '}' + '.system-dialog .prevent label {' + '\tdisplay: inline-block;' + '\tfloat: none;' + '\twidth: auto;' + '\tcolor: #000;' + '\tfont-size: 12px;' + '\ttext-shadow: none;' + '}' + '.hidden {' + '\tdisplay: none;' + '}', _alert: '' + '<div id="js-system-alert-id" class="system-dialog hidden" data-class="js.ua.AlertDialog">' + '\t<h1 class="caption"></h1>' + '\t<p></p>' + '\t<button type="button">OK</button>' + '\t<div class="prevent hidden">' + '\t\t<input id="js-system-alert-prevent" type="checkbox" /><label for="js-system-alert-prevent">Prevent system dialogs.</label>' + '\t</div>' + '</div>', _toast: '' + '<div id="js-system-toast-id" class="system-dialog hidden" data-class="js.ua.ToastDialog">' + '\t<h1 class="caption"></h1>' + '\t<p></p>' + '\t<div class="prevent hidden">' + '\t\t<input id="js-system-toast-prevent" type="checkbox" /><label for="js-system-toast-prevent">Prevent system dialogs.</label>' + '\t</div>' + '</div>', _confirm: '' + '<div id="js-system-confirm-id" class="system-dialog hidden" data-class="js.ua.ConfirmDialog">' + '\t<h1 class="caption"></h1>' + '\t<p></p>' + '\t<button class="ok" type="button">OK</button>' + '\t<button class="cancel" type="button">Cancel</button>' + '\t<div class="prevent hidden">' + '\t\t<input id="js-system-confirm-prevent" type="checkbox" /><label for="js-system-confirm-prevent">Prevent system dialogs.</label>' + '\t</div>' + '</div>', _prompt: '' + '<div id="js-system-prompt-id" class="system-dialog hidden" data-class="js.ua.PromptDialog">' + '\t<h1 class="caption"></h1>' + '\t<p></p>' + '\t<input type="text" />' + '\t<button class="ok" type="button">OK</button>' + '\t<button class="cancel" type="button">Cancel</button>' + '\t<div class="prevent hidden">' + '\t\t<input id="js-system-prompt-prevent" type="checkbox" /><label for="js-system-prompt-prevent">Prevent system dialogs.</label>' + '\t</div>' + '</div>', _container: null, getDialog: function(dialogName) {
  if (this._container === null) 
  {
    var style = WinMain.doc.createElement('style');
    style.setAttr('type', 'text/css');
    style.setText(this._style);
    WinMain.doc.getByTag('head').addChild(style);
    this._container = WinMain.doc.createElement('div');
    this._container.style.set('position', 'relative');
    WinMain.doc.body.addChild(this._container);
  }
  var dialogId = this._getDialogId(dialogName);
  var dialog = WinMain.doc.getById(dialogId);
  if (dialog !== null) 
  {
    return dialog;
  }
  var layout = this['_' + dialogName];
  $assert(typeof layout !== 'undefined', 'js.ua.DialogsFactory#createDialog', 'Missing layout for %s dialog.', dialogName);
  this._container.addHTML(layout);
  return this._container.getLastChild();
}, setDialog: function(dialogName, dialog) {
  var dialogId = this._getDialogId(dialogName);
  var currentDialog = WinMain.doc.getById(dialogId);
  if (currentDialog !== null) 
  {
    currentDialog.remove();
  }
  dialog.setAttr('id', dialogId);
}, DIALOG_NAMES: ['alert', 'toast', 'confirm', 'prompt'], _getDialogId: function(dialogName) {
  $assert(this.DIALOG_NAMES.indexOf(dialogName) !== -1, 'js.ua.DialogsFactory#_getDialogId', 'Not supported dialog name: %s.', dialogName);
  return $format('js-system-%s-id', dialogName);
}};
$package('js.ua');
js.ua.Orientation = {NONE: 0, LANDSCAPE: 1, PORTRAIT: 2};
$package("js.ua");
js.ua.Page = function() {
  $assert(this instanceof js.ua.Page, "js.ua.Page#Page", "Invoked as function.");
  var el = WinMain.doc.getById(this.SSI_CONTENT);
  if (el !== null) 
  {
    this._content = js.lang.JSON.parse(el.getText());
    el.remove();
  }
  var bindings = this.bindings();
  for (var selector in bindings) 
    {
      WinMain.doc.bind(selector, bindings[selector]);
    }
  js.ua.Regional.init();
};
js.ua.Page._ctor = js.ua.Page;
js.ua.Page.$extends = function(pageSubClass) {
  pageSubClass.$extends = function(pageSubClass) {
  js.ua.Page._ctor = pageSubClass;
};
  $assert(js.ua.Page._ctor === js.ua.Page, "js.ua.Page.$extends", "Only one user defined page supported.");
  js.ua.Page._ctor = pageSubClass;
  WinMain.on("pre-dom-ready", function() {
  $assert(WinMain.page === null, "js.ua.Page.$extends", "WinMain.page should be null.");
  WinMain.page = new js.ua.Page._ctor();
  $debug("js.ua.Page#init", "Create main page %s.", js.ua.Page._ctor);
});
};
js.ua.Page.prototype = {SSI_CONTENT: "js.SSI-CONTENT", bindings: function() {
  return new Object();
}, setIdleTimeout: function(value) {
  $assert(js.lang.Types.isNumber(value), "js.ua.Page#setIdleTimeout", "Value is not a number.");
  $assert(value >= 0, "js.ua.Page#setIdleTimeout", "Value is not a positive number.");
  js.event.Handler.idleTimeout.set(value * 60 * 1000);
}, onIdleTimeout: function() {
  $debug("js.ua.Page#onIdleTimeout", "Idle timeout detected.");
}, onBusinessFail: function(er) {
  js.ua.System.error("Broken business constrain: 0x%4X", er.errorCode);
}, _registerButtonKeys: function() {
  var buttonKeys = {};
  var it = $L("button[data-key]").it(), button;
  while (it.hasNext()) 
    {
      button = it.next();
      buttonKeys[button.getAttr("data-key").charCodeAt(0)] = button.getNode();
    }
  $E("body").focus().on("keydown", function(ev) {
  if (ev.altKey && ev.key !== 18) 
  {
    if (ev.key in buttonKeys) 
    {
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      buttonKeys[ev.key].dispatchEvent(evt);
    }
    ev.halt();
  }
});
}, toString: function() {
  return "js.ua.Page";
}};
$extends(js.ua.Page, Object);
$package('js.ua');
js.ua.Regional = {LANGUAGE_COOKIE: 'js.LANGUAGE', COUNTRY_COOKIE: 'js.COUNTRY', TIMEZONE_COOKIE: 'js.TIMEZONE', language: 'en', country: 'US', timeZone: 'UTC', init: function() {
  var locale = this._getUserAgentLocale();
  if (!locale) 
  {
    locale = this.language + '-' + this.country;
  }
  if (js.lang.Types.isString(locale)) 
  {
    locale = locale.split('-');
    if (locale.length !== 2) 
    {
      locale = [this.language, this.country];
    }
  }
  var language = js.ua.Cookies.get(this.LANGUAGE_COOKIE);
  if (language === null) 
  {
    language = locale[0];
  }
  if (language) 
  {
    this.language = language.toLowerCase();
  }
  var country = js.ua.Cookies.get(this.COUNTRY_COOKIE);
  if (country === null) 
  {
    country = locale[1];
  }
  if (this.country) 
  {
    this.country = country.toUpperCase();
  }
  var timeZone = js.ua.Cookies.get(this.TIMEZONE_COOKIE);
  if (timeZone !== null) 
  {
    this.timeZone = timeZone;
  }
}, _getUserAgentLocale: function() {
  return navigator.language;
}, toString: function() {
  return 'js.ua.Regional';
}};
$legacy(js.ua.Engine.TRIDENT, function() {
  js.ua.Regional._getUserAgentLocale = function() {
  return navigator.userLanguage;
};
});
$package('js.util');
js.util.AbstractTimer = function(value, callback, scope) {
  $assert(typeof value === 'undefined' || (js.lang.Types.isNumber(value) && value >= 0), 'js.util.AbstractTimer#AbstractTimer', 'Value is not positive number.');
  if (typeof value === 'undefined') 
  {
    value = 0;
  }
  this._value = value;
  this._id = null;
  if (typeof callback !== 'undefined') 
  {
    this.setCallback(callback, scope);
  }
};
js.util.AbstractTimer.prototype = {set: function(value) {
  $assert(js.lang.Types.isNumber(value), 'js.util.AbstractTimer#set', 'Value is not a number.');
  $assert(value >= 0, 'js.util.AbstractTimer#set', 'Value is not positive.');
  if (js.lang.Types.isString(value)) 
  {
    value = Number(value);
  }
  if (value === 0) 
  {
    this.stop();
  }
  if (value >= 0) 
  {
    this._value = value;
  }
  return this;
}, get: function() {
  return this._value;
}, setCallback: function(callback, scope) {
  $assert(js.lang.Types.isFunction(callback), 'js.util.AbstractTimer#setCallback', 'Callback is not function.');
  $assert(typeof scope === 'undefined' || js.lang.Types.isObject(scope), 'js.util.AbstractTimer#setCallback', 'Scope is not object.');
  this._callback = callback;
  this._scope = scope || window;
  return this;
}, start: function() {
  if (this._value > 0) 
  {
    if (this._id !== null) 
    {
      this._stop(this._id);
      this._id = null;
    }
    this._id = this._start(this._handler.bind(this), this._value);
  }
  return this;
}, _handler: function() {
  try {
    if (this._callback) 
    {
      this._callback.call(this._scope);
    }
    this._tick();
  }  catch (er) {
  this.stop();
  js.ua.System.error(er);
}
}, stop: function() {
  if (this._id !== null) 
  {
    this._stop(this._id);
    this._id = null;
  }
  return this;
}, isTicking: function() {
  return this._id !== null;
}, _start: function(handler, value) {
}, _stop: function(timerID) {
}, _tick: function() {
}, toString: function() {
  return 'js.util.AbstractTimer';
}};
$extends(js.util.AbstractTimer, Object);
$package("js.util");
js.util.Arrays = {pushAll: function(array) {
  $assert(js.lang.Types.isArray(array), "js.util.Arrays#pushAll", "Argument is not an array.");
  $assert(arguments.length > 1, "js.util.Arrays#pushAll", "Array is empty.");
  for (var i = 1, it; i < arguments.length; ++i) 
    {
      it = new js.lang.Uniterator(arguments[i]);
      while (it.hasNext()) 
        {
          array.push(it.next());
        }
    }
}, remove: function(array) {
  $assert(js.lang.Types.isArray(array), "js.util.Arrays#remove", "Argument is not an array.");
  $assert(arguments.length > 1, "js.util.Arrays#remove", "Array is empty.");
  for (var i = 1; i < arguments.length; ++i) 
    {
      js.util.Arrays._remove(array, arguments[i], true);
    }
}, removeAll: function(array) {
  $assert(js.lang.Types.isArray(array), "js.util.Arrays#removeAll", "Argument is not array.");
  $assert(arguments.length > 1, "js.util.Arrays#removeAll", "Array is empty.");
  for (var i = 1, it; i < arguments.length; ++i) 
    {
      it = new js.lang.Uniterator(arguments[i]);
      while (it.hasNext()) 
        {
          js.util.Arrays._remove(array, it.next(), false);
        }
    }
}, _remove: function(array, criterion, firstOnly) {
  function doit(a, i) {
    delete a[i];
    a.splice(i, 1);
  }
  var i;
  if (js.lang.Types.isFunction(criterion)) 
  {
    for (i = 0; i < array.length; ++i) 
      {
        if (criterion(array[i], i)) 
        {
          doit(array, i--);
          if (firstOnly) 
          {
            break;
          }
        }
      }
  } else {
    for (i = 0; ; ) 
      {
        i = array.indexOf(criterion, i);
        if (i === -1) 
        {
          break;
        }
        doit(array, i);
        if (firstOnly) 
        {
          break;
        }
      }
  }
}, clear: function(array, finalizer, scope) {
  $assert(js.lang.Types.isArray(array), "js.util.Arrays#clear", "Argument is not an array.");
  for (var i = 0, item, fn; i < array.length; ++i) 
    {
      item = array[i];
      fn = finalizer;
      if (js.lang.Types.isString(fn)) 
      {
        fn = item[fn];
      }
      if (js.lang.Types.isFunction(fn)) 
      {
        fn.call(scope || item, item, i);
      }
      delete array[i];
    }
  array.length = 0;
}, contains: function(array, searchedValue) {
  $assert(js.lang.Types.isArray(array), "js.util.Arrays#contains", "Argument is not an array.");
  $assert(typeof searchedValue !== "undefined", "js.util.Arrays#contains", "Value to search is undefined or null.");
  for (var i = 0, l = array.length; i < l; ++i) 
    {
      if (this._equals(array[i], i, searchedValue)) 
      {
        return true;
      }
    }
  return false;
}, _equals: function(item, index, valueToMatch) {
  if (item === null) 
  {
    return valueToMatch === null;
  }
  if (valueToMatch === null) 
  {
    return false;
  }
  if (js.lang.Types.isFunction(item.equals)) 
  {
    return item.equals(valueToMatch);
  }
  return item.valueOf() === valueToMatch.valueOf();
}, collect: function(array, memberName) {
  $assert(js.lang.Types.isArray(array), "js.util.Arrays#collect", "Argument is not an array.");
  $assert(memberName, "js.util.Arrays#collect", "Member name is undefined, null or empty.");
  var a = [], it = new js.lang.Uniterator(array), item, value;
  while (it.hasNext()) 
    {
      item = it.next();
      $assert(js.lang.Types.isObject(item), "js.util.Arrays#collect", "Item is not an object.");
      if (js.lang.Types.isObject(item)) 
      {
        value = item[memberName];
        if (js.lang.Types.isFunction(value)) 
        {
          value = value.call(item);
        }
        $assert(typeof value !== "undefined", "js.util.Arrays#collect", "Value is undefined.");
        if (typeof value !== "undefined") 
        {
          a.push(value);
        }
      }
    }
  return a;
}, toString: function() {
  return "js.util.Arrays";
}};
$package("js.util");
js.util.Cache = function(factoryMethod) {
  $assert(js.lang.Types.isFunction(factoryMethod), "js.util.Cache#Cache", "Factory method is not a function.");
  this._map = {};
  this._factoryMethod = factoryMethod;
};
js.util.Cache.prototype = {get: function(key) {
  $assert(typeof key !== "undefined", "js.util.Cache#get", "Undefined key.");
  if (key === null) 
  {
    key = "null";
  }
  var value = this._map[key];
  if (typeof value !== "undefined") 
  {
    return value;
  }
  value = this._factoryMethod(key);
  if (typeof value === "undefined") 
  {
    return;
  }
  this._map[key] = value;
  return value;
}, toString: function() {
  return "js.util.Cache";
}};
$extends(js.util.Cache, Object);
$package('js.util');
js.util.ID = function(prefix) {
  if (typeof prefix === 'undefined') 
  {
    prefix = 'js-id';
  }
  this._value = prefix + ++js.util.ID._seed;
  if (this === js.util) 
  {
    return this._value;
  }
  this.valueOf = function() {
  return this._value;
};
  this.toString = function() {
  return 'js.util.ID';
};
};
$extends(js.util.ID, Object);
js.util.ID._seed = 0;
$package('js.util');
js.util.Rand = function() {
  var start, length;
  if (arguments.length === 0) 
  {
    start = 0;
    length = Number.MAX_VALUE;
  } else if (arguments.length === 1) 
  {
    length = arguments[0];
    start = 0;
  } else {
    start = arguments[0];
    length = arguments[1];
  }
  this._start = start;
  this._length = length;
  function _nextNumber(start, length) {
    return start + Math.floor(Math.random() * length);
  }
  if (this === js.util) 
  {
    return _nextNumber(this._start, this._length);
  }
  this.next = function() {
  return _nextNumber(this._start, this._length);
};
  this.toString = function() {
  return 'js.util.Rand';
};
};
$extends(js.util.Rand, Object);
$package('js.util');
js.util.Strings = {trim: function(str) {
  $assert(str, 'js.util.Strings#trim', 'String is undefined, null or empty.');
  return str.trim();
}, REGEXP_PATTERN: /([\/|\.|\*|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$])/g, escapeRegExp: function(str) {
  $assert(str, 'js.util.Strings#escapeRegExp', 'String is undefined, null or empty.');
  js.util.Strings.REGEXP_PATTERN.lastIndex = 0;
  return str.replace(js.util.Strings.REGEXP_PATTERN, '\\$1');
}, equalsIgnoreCase: function(reference, target) {
  $assert(typeof reference !== 'undefined', 'js.util.Strings#equalsIgnoreCase', 'Undefined reference string.');
  if (typeof reference === 'undefined') 
  {
    return false;
  }
  $assert(typeof target !== 'undefined', 'js.util.Strings#equalsIgnoreCase', 'Undefined target string.');
  if (typeof target === 'undefined') 
  {
    return false;
  }
  if (reference === null && target === null) 
  {
    return true;
  }
  if (reference === null || target === null) 
  {
    return false;
  }
  return reference.toLocaleLowerCase() === target.toLocaleLowerCase();
}, startsWith: function(str, prefix) {
  $assert(prefix, 'js.util.Strings#startsWith', 'Prefix is undefined, null or empty.');
  if (!str) 
  {
    return false;
  }
  return str.indexOf(prefix) === 0;
}, endsWith: function(str, suffix) {
  $assert(suffix, 'js.util.Strings#endsWith', 'Suffix is undefined, null or empty.');
  if (!str) 
  {
    return false;
  }
  return (str.length >= suffix.length) && str.lastIndexOf(suffix) === str.length - suffix.length;
}, contains: function(str, value) {
  $assert(str, 'js.util.Strings#contains', 'String is undefined, null or empty.');
  $assert(value, 'js.util.Strings#contains', 'Value is undefined, null or empty.');
  return str ? str.indexOf(value) !== -1 : false;
}, toTitleCase: function(str) {
  $assert(str, 'js.util.Strings#toTitleCase', 'String is undefined, null or empty.');
  return str ? (str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()) : '';
}, toHyphenCase: function(str) {
  $assert(str, 'js.util.Strings#toHyphenCase', 'String is undefined, null or empty.');
  if (!str) 
  {
    return '';
  }
  var s = str.charAt(0).toLowerCase();
  s += str.substr(1).replace(/([A-Z][^A-Z]*)/g, function($0, $1) {
  return '-' + $1.toLowerCase();
});
  return s;
}, toScriptCase: function(str) {
  $assert(str, 'js.util.Strings#toScriptCase', 'String is undefined, null or empty.');
  if (!str) 
  {
    return '';
  }
  if (str.valueOf() == 'float') 
  {
    return js.ua.Engine.TRIDENT ? 'styleFloat' : 'cssFloat';
  }
  if (str.indexOf('-') === -1) 
  {
    return str.valueOf();
  }
  return str.replace(/\-(\w)/g, function($0, $1) {
  return $1.toUpperCase();
});
}, charsCount: function(str, ch) {
  $assert(str, 'js.util.Strings#charsCount', 'String is undefined, null or empty.');
  $assert(ch, 'js.util.Strings#charsCount', 'Character is undefined, null or empty.');
  if (!str) 
  {
    return 0;
  }
  var count = 0;
  for (var i = 0; i < str.length; ++i) 
    {
      if (str.charAt(i) === ch) 
      {
        ++count;
      }
    }
  return count;
}, last: function(str, separator) {
  return str.substr(str.lastIndexOf(separator) + 1);
}, _PACKAGE_NAME_REX: js.lang.Operator._PACKAGE_NAME_REX, isPackageName: function(name) {
  this._PACKAGE_NAME_REX.lastIndex = 0;
  return name && this._PACKAGE_NAME_REX.test(name);
}, _CLASS_NAME_REX: js.lang.Operator._CLASS_NAME_REX, isQualifiedClassName: function(name) {
  this._CLASS_NAME_REX.lastIndex = 0;
  return name && this._CLASS_NAME_REX.test(name);
}, parseNameValues: function(expression) {
  $assert(expression, "js.util.Strings#parseNameValues", "Expression argument is undefined, null or empty.");
  var pairs = [];
  if (!expression) 
  {
    return pairs;
  }
  var semicolonIndex = 0, colonIndex, name;
  for (; ; ) 
    {
      colonIndex = expression.indexOf(':', semicolonIndex);
      if (colonIndex === -1) 
      {
        break;
      }
      name = expression.substring(semicolonIndex, colonIndex);
      ++colonIndex;
      semicolonIndex = expression.indexOf(';', colonIndex);
      if (semicolonIndex === -1) 
      {
        semicolonIndex = expression.length;
      }
      $assert(colonIndex !== semicolonIndex, "js.util.Strings#parseNameValues", "Invalid expression |%s|. Empty value near |%s|.", expression, name);
      pairs.push({name: name, value: expression.substring(colonIndex, semicolonIndex)});
      ++semicolonIndex;
    }
  $assert(pairs.length > 0, "js.util.Strings#parseNameValues", "Invalid expression |%s|. Missing pair separator.", expression);
  return pairs;
}, toString: function() {
  return 'js.util.Strings';
}};
$legacy(js.ua.Engine.TRIDENT, function() {
  js.util.Strings.TRIM_PATTERN = /^\s+|\s+$/g;
  js.util.Strings.trim = function(str) {
  $assert(str, 'js.util.Strings#trim', 'String is undefined, null or empty.');
  js.util.Strings.TRIM_PATTERN.lastIndex = 0;
  return str.replace(js.util.Strings.TRIM_PATTERN, '');
};
});
$package('js.util');
js.util.Timeout = function(timeout, callback, scope) {
  $assert(js.lang.Types.isNumber(timeout), 'js.util.Timeout#Timeout', 'Timeout is not a number.');
  if (!(this instanceof js.util.Timeout)) 
  {
    var t = new js.util.Timeout(timeout, callback, scope);
    t.start();
    return t;
  }
  this.$super(timeout, callback, scope);
};
js.util.Timeout.prototype = {_start: function(handler, value) {
  return window.setTimeout(handler, value);
}, _stop: function(timerID) {
  window.clearTimeout(timerID);
}, _tick: function() {
  this._id = null;
}, toString: function() {
  return 'js.util.Timeout';
}};
$extends(js.util.Timeout, js.util.AbstractTimer);
$package('js.util');
js.util.Timer = function(interval, callback, scope) {
  $assert(js.lang.Types.isNumber(interval), 'js.util.Timer#Timer', 'Interval is not a number.');
  if (!(this instanceof js.util.Timer)) 
  {
    var t = new js.util.Timer(interval, callback, scope);
    t.start();
    return t;
  }
  this.$super(interval, callback, scope);
};
js.util.Timer.prototype = {_start: function(handler, value) {
  return window.setInterval(handler, value);
}, _stop: function(timerID) {
  window.clearInterval(timerID);
}, toString: function() {
  return 'js.util.Timer';
}};
$extends(js.util.Timer, js.util.AbstractTimer);
$package('js.util');
js.util.UUID = function() {
  var uuid = [], chars = js.util.UUID.CHARS;
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4';
  for (var i = 0, r; i < 36; i++) 
    {
      if (!uuid[i]) 
      {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 3) | 8 : r];
      }
    }
  this._value = uuid.join('');
  if (this === js.util) 
  {
    return this._value;
  }
  this.valueOf = function() {
  return this._value;
};
  this.toString = function() {
  return 'js.util.UUID';
};
};
$extends(js.util.UUID, Object);
js.util.UUID.CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
