Request.Binary
===

With Request.Binary you can request files in binary format trough an AJAX (XHR) call.
It requires Mootools and is tested with v1.2.3.

Syntax
---

<pre><code>var req = new Request.Binary({url: 'demo.jpg'});</code></pre>

Options
---

range - (array[2]) startbit and endbit of the sequenz to download (can be used to download a file in more than one steps)
acceptRanges - (boolean) try to perform a HTTP range request

for more information about options and usage see:

http://mootools.net/docs/core/Request/Request

License
---

See [license](master/license) file.
