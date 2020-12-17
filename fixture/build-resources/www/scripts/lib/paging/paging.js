$package("js.compo");

js.compo.Paging = function(ownerDoc, node) {
	this.$super(ownerDoc, node);
};

js.compo.Paging.prototype = {
	toString : function() {
		return "js.compo.Paging";
	}
};
$extends(js.compo.Paging, js.dom.Element);
