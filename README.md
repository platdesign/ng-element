#ng-element
Describe Angular-Directives like Polymer-Elements

##Install

- Bower: `bower install ng-element --save`


##Example

Creating a custom element

	<ng-element name="xHelloWorld">
		<template>
			<h1>Hello <span ng-transclude></span></h1>
		</template>
		
		<script>
			Directive({
				transclude:true
			});
		</script>	
	</ng-element>
	

Using the created custom element

	<x-hello-world>World</x-hello-world>
	
Generates the following Output

	<h1>Hello <span>World</span></h1>
	
	
##Contact

- [mail@platdesign.de](mailto:mail@platdesign.de)
- [platdesign](https://twitter.com/platdesign) on Twitter

[![Analytics](https://ga-beacon.appspot.com/UA-54136231-1/ng-element/readme)](https://github.com/igrigorik/ga-beacon)
