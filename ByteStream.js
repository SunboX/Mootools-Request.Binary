/*
Script: ByteStream.js

Copyright:
	Copyright (c) 2009 Dipl.-Ing. (FH) André Fiedler <kontakt@visualdrugs.net>

License:
	MIT-style license
	
Credits:
	Based on Binary Ajax 0.1.5, Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
*/

ByteStream = new Class(
{
	options: {
		offset: 0,
		length: 0
	},

	initialize: function(data, options)
	{
		this.data = data;
		
		if($type(data) == 'string')
		{
			options.length = options.length || data.length;
			this.use_vb_script = false;
		}
		else
		{
			this.execVBScript();
			options.length = options.length || VB_Binary_getLength(data);
			this.use_vb_script = true;
		}
		
		this.setOptions(options);
	},
	
	getRawData: function() 
	{
		return this.data;
	},
	
	getByteAt: function(offset)
	{
		if(this.use_vb_script)
			return VB_Binary_getByteAt(this.data, this.offset + offset);
			
		return this.data.charCodeAt(this.offset + offset) & 0xFF;
	},
	
	execVBScript: function()
	{
		var text = "Function VB_Binary_getByteAt(strBinary, offset)\r\n"
			+ "	VB_Binary_getByteAt = AscB(MidB(strBinary, offset + 1,1))\r\n"
			+ "End Function\r\n"
			+ "Function VB_Binary_getLength(strBinary)\r\n"
			+ "	VB_Binary_getLength = LenB(strBinary)\r\n"
			+ "End Function\r\n";
			
		if(window.execScript)
		{
			window.execScript(text, 'vbscript');
		}
		else
		{
			var script = document.createElement('script');
			script.setAttribute('type', 'text/vbscript');
			script[(Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerText' : 'text'] = text;
			document.head.appendChild(script);
			document.head.removeChild(script);
		}
	}
});