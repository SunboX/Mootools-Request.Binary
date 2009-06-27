/*
 Script: Request.Binary.js
 	Extends the basic Request Class with additional methods for interacting with binary responses.
 
 License:
 	MIT-style license.
 */
Request.Binary = new Class({
    Extends: Request,
    
    options: {
        offset: 0,
        length: null
    },
    
    initialize: function(options){
        this.parent(options);
		
        if (this.options.length) 
            this.headers.extend({
                'Range': 'bytes=' + this.options.offset + '-' + this.options.length
            });
			
        this.headers.extend({
            'If-Modified-Since': 'Sat, 1 Jan 1970 00:00:00 GMT'
        });
		
		this.addEvent('request', this.beforeSend.bind(this));
    },
	
	beforeSend: function(){
		if (this.xhr.overrideMimeType) 
            this.xhr.overrideMimeType('text/plain; charset=x-user-defined');
	},
    
    success: function(text){
        this.response.binary = new ByteStream(text);
        this.onSuccess(this.response.binary, text);
    }
});
