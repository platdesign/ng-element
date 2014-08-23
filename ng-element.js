/*
	Create Angular-Directives as Web-Components
	Author: mail@platdesign.de
*/

(function(){
	var camelToDash = function(str) {
		return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
	};
	var dashToCamel = function(str) {
		return str.replace(/\W+(.)/g, function (x, chr) {
			return chr.toUpperCase();
		});
	};

	var ngElementProto = Object.create(HTMLElement.prototype);

		ngElementProto.createdCallback = function(){
			var that = this,
				attrs = this.attributes,

				// Element-Name
				name = this.attributes.name.value,

				// Read module-name from `module`-attribute or use 'ng'
				moduleName = (attrs.module) ? attrs.module.value : 'ng',
				module,

				// Default ngDirective-parameters
				options = {
					restrict: 'E',
					template: function(){

						var template = $('template', that).clone();
						template.addClass( camelToDash(name) );
						return template[0].outerHTML.replace(/template/g, 'div');

					},
					replace:true,
					scope:true
				};

			// Get or create angular-module by moduleName
			try {
				module = angular.module(moduleName);
			} catch(e) {
				module = angular.module(moduleName, []);
			}


			// Create global Directive-Method for extending default ngDirective-parameters
			window.Directive = function(opts) {
				opts = opts || {};
				angular.extend(options, opts)
			};

			// Create angular-directive on detected module with options
			module.directive(name, function(){
				return options;
			});
		};


	/*
		Register new element
		Name: ng-element
	 */
	document.registerElement('ng-element', {
		prototype: ngElementProto
	});

}());
