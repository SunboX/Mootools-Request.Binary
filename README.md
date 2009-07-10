ComBoo, Comboboxes for Mootools
===

With ComBoo you can easily replace any Combobox (Select Box, Dropdown) in your site.
Every replaced Combobox is full styleable and hast more Features like Open/Close Control through JavaScript.
It requires Mootools and is tested with v1.2.3.

Best Feature: All Comboboxes look the same in every Browser! ;o)

Demo
---

[http://visualdrugs.net/dev/comboo/demo/](http://visualdrugs.net/dev/comboo/demo/)

Syntax
---

<pre><code>var combo = new ComBoo('combobox1');</code></pre>

<pre><code>$('combobox_linux').addEvent('change', function(){
	alert(this.options[this.selectedIndex].value);
});

new ComBoo('combobox_linux', {className: 'linuxCombobox'});</code></pre>

Options
---

className - (string: defaults to 'comBoo') CSS Class Name to attach to the generated ComBoo Box.

container - (element: defaults to document.body) Element to place the ComBoo Box inside.

License
---

See [license](master/license) file.
