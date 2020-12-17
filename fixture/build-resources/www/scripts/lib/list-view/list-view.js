$package("js.compo");

js.compo.ListView = function(ownerDoc, node) {
	this.$super(ownerDoc, node);
};

js.compo.ListView.prototype = {
	toString : function() {
		return "js.compo.ListView";
	}
};
$extends(js.compo.ListView, js.dom.Element);
