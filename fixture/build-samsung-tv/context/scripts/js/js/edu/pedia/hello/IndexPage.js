$package("js.edu.pedia.hello");
js.edu.pedia.hello.IndexPage = function() {
  this.$super();
  if (typeof Common !== "undefined") 
  {
    var samsungAPI = new Common.API.Widget();
    samsungAPI.sendReadyEvent();
  }
};
js.edu.pedia.hello.IndexPage.prototype = {toString: function() {
  return "js.edu.pedia.hello.IndexPage";
}};
$extends(js.edu.pedia.hello.IndexPage, js.ua.Page);
