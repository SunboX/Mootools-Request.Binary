/*
	Script: ComBoo.js
	  
	Copyright:
	  Copyright (c) 2009 Dipl.-Ing. (FH) André Fiedler <kontakt@visualdrugs.net>
	  
	License:
	  MIT-style license
	  
	Version
	  0.9
	  
	Credits:
	  Based on ComboBoo by Bruno Torrinha - www.torrinha.com
*/
var ComBoo = new Class({

    Implements: [Events, Options],
    
    options: {
        className: 'comBoo',
		container: null
    },
    
    initialize: function(el, options){
        this.setOptions(options);
		this.options.container = this.options.container || document.body;
        this.oldCombo = $(el);
        this.bOpen = false;
        var posLink = this.oldCombo.getCoordinates(this.options.container);
		var posList = this.oldCombo.getCoordinates();
        
        this.comboLink = new Element('a', {
            'class': this.options.className + '-label',
            'id': this.oldCombo.name
        }).setStyles({
            position: 'absolute',
            top: posLink.top,
            left: posLink.left,
            width: posLink.width
        }).inject(this.options.container).set('text', this.oldCombo.options[this.oldCombo.options.selectedIndex].text);
        
        this.comboList = new Element('ul', {
            'class': this.options.className + '-list',
            'id': 'choices-' + this.oldCombo.name
        }).setStyles({
            display: 'none',
            position: 'absolute',
            top: posList.top,
            left: posList.left
        }).inject(document.body);
        
        this.comboList.fade('hide');
        
        this.addComboLinkEvents(this.comboLink);
        
        this.build();
        this.comboList.setStyle('display', 'block');
        this.oldCombo.fade('hide');
        
        this.oldCombo.store(this.options.className, this);
    },
    
    build: function(){
        this.comboList.empty();
        for (i = 0; i < this.oldCombo.length; i++) {
            var el2 = new Element('li').addClass(this.oldCombo.options[i].className).store('index', i).set('text', this.oldCombo.options[i].text);
			if(i == this.oldCombo.options.selectedIndex) el2.addClass('selected');
            this.addChoiceEvents(el2).inject(this.comboList);
        }
        this.comboLink.set('text', this.oldCombo.options[this.oldCombo.options.selectedIndex].text);
		this.items = this.comboList.getElements('li');
    },
    
    click: function(el){
        if (this.bOpen) {
            this.close();
        }
        else {
            this.open(true);
        }
        
        this.oldCombo.fireEvent('click');
    },
	
	close: function()
	{
		$(document.body).removeEvent('click', this.checkClickOutside);
		if (this.bOpen) {
			this.bOpen = false;
			this.comboList.fade('out');
		}
	},
	
	open: function(closeOnClickOutside)
	{
        if (!this.bOpen) {
			this.bOpen = true;
			this.comboList.fade('in');
		}
		
		// Check if User clicked Outside the Combobox
		if (closeOnClickOutside) {
			this.checkClickOutside = function(e){
				var clickedCombo = false;
				if (this.comboLink == e.target) 
					clickedCombo = true;
				if (this.comboList == e.target) 
					clickedCombo = true;
				this.items.each(function(li){
					if (li == e.target) 
						clickedCombo = true;
				});
				if (!clickedCombo) 
					this.close();
			}.bind(this);
			$(document.body).addEvent('click', this.checkClickOutside);
		}
	},
    
    comboOver: function(){
        this.oldCombo.fireEvent('mouseover');
    },
    
    comboOut: function(el){
        this.oldCombo.fireEvent('mouseout');
    },
    
    choiceOver: function(el){
        if (this.selected) 
            this.selected.removeClass('choice-selected');
        this.selected = el.addClass('choice-selected');
    },
    
    choiceSelect: function(el){
        this.bOpen = false;
        this.comboList.fade('hide');
        this.comboLink.set('text', el.get('text'));
		var oldIndex = this.oldCombo.selectedIndex;
        this.oldCombo.selectedIndex = el.retrieve('index');
        
        if(this.oldCombo.selectedIndex != oldIndex) this.oldCombo.fireEvent('change');
		this.oldCombo.fireEvent('blur');
		
		this.items.removeClass('selected');
		el.addClass('selected');
    },
    
    addComboLinkEvents: function(el){
        return el.addEvents({
            click: this.click.bind(this, [el]),
            mouseover: this.comboOver.bind(this, [el]),
            mouseleave: this.comboOut.bind(this, [el])
        });
    },
    
    addChoiceEvents: function(el){
        return el.addEvents({
            mouseover: this.choiceOver.bind(this, [el]),
            mousedown: this.choiceSelect.bind(this, [el])
        });
    },
	
	getElement: function(){
		return this.comboLink;
	},
	
	destroy: function()
	{
		this.close();
		this.comboLink.destroy();
		this.comboList.destroy();
	}
});
