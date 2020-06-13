(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['rsvp'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<div id=\"rsvp-list\" class=\"rsvp-name-search\">\r\n<strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"person") || (depth0 != null ? lookupProperty(depth0,"person") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"person","hash":{},"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":18}}}) : helper)))
    + "</strong>: "
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":5,"column":29},"end":{"line":5,"column":38}}}) : helper)))
    + "\r\n</div>\r\n";
},"useData":true});
})();