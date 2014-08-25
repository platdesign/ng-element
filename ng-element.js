/**
 * @description Create Angular-Directives like Polymer-elements
 * @author Christian Blaschke <mailplatdesign.de>
 */

(function(){



	/**
	 * Convert camelcased string to dash notation.
	 * @param  {String} str
	 * @return {String}
	 */
	function camel2dash(str) {
	    return strtolower(preg_replace('/([a-zA-Z])(?=[A-Z])/', '$1-', str));
	}



	/**
	 * Convert dashed string to camelcase notation.
	 * @param  {String} str
	 * @param  {String} delimiters
	 * @return {String}
	 */
	var dash2camel = function (str, delimiters) {
		var DEFAULT_REGEX = /[-_]+(.)?/g;

		var toUpper = function(match, group) {
			return group ? group.toUpperCase() : '';
		};

		return str.replace(delimiters ? new RegExp('[' + delimiters + ']+(.)', 'g') : DEFAULT_REGEX, toUpper);
	};






	/**
	 * Prototype Object for ngElement
	 * @type {Object prototype}
	 */
	var ngElementProto = Object.create(HTMLElement.prototype);


		/**
		 * Is called when a new ngElement-Object is instantiated.
		 * @return {null}
		 */
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
						template.addClass( camel2dash(name) );
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


			/**
			 * Global method to extend directive default options and specify the created directive.
			 * @param {Object} opts
			 */
			window.Directive = function(opts) {
				opts = opts || {};
				angular.extend(options, opts)
			};

			// Create angular-directive on detected module with options
			module.directive(name, function(){
				return options;
			});
		};


	// Register a new html-element called ng-element with the ngElement prototype.
	document.registerElement('ng-element', {
		prototype: ngElementProto
	});

}());
