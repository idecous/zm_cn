var PopSelectorItem = function(){
	this.index = -1;
	this.url = "";
	this.isCache = false;
	this.build();
};
(function(){
	this.setData = function(index,url,label){
		this.index = index;
		this.url = url;
		this.el.text( label);
	};
	this.setCache = function(value){
		this.isCache = value;
		if(value){
			this.index = -1;
			this.url = "";
			this.el.detach();
		}
	};
	this.build = function(){
		this.el = $("<li></li>");
	};
}).call(PopSelectorItem.prototype);
var PopSelector = function(){
	this.isPop = false;
	this.index = -1;
	this.useds = [];
	this.items = [];
	this.oY = 0;
	this.listOY = 0;
	this.listMaxY = 0;
	this.listMinY = 0;
	this.isDrag = false;
	this.init();
};
(function(){
	this.init = function(){
		this.build();
		var that = this;
		this.winEl.resize(function(){
			that.hide();
		});
		this.cancelBtnEl.click(function(){
			that.hide();
		});
		this.okBtnEl.click(function(){
			 location.href = that.useds[that.index].url;
		});
		this.mianPanelEl.on("mousedown touchstart",$.proxy( this._startDragHandler,this));
	};
	this._startDragHandler = function(e){
		this.listEl.stop();
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageY = touch.pageY;
		}
		this.oY = e.pageY;
		this.listOY =  parseInt( this.listEl.css("top") );
		this.listMaxY =  this.getOffsetYByIndex(0);
		this.listMinY =  this.getOffsetYByIndex( this.useds.length-1 );

		this.isDrag = true;
		this.documentEl.bind("mousemove touchmove", $.proxy(this._mouseMoveFn, this));
        this.documentEl.bind("mouseup touchend", $.proxy(this._mouseUpFn, this));
        
        if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } else if (this.el.setCapture) {
            this.el.setCapture();
        }
        return false;
	};
	this._mouseMoveFn = function(e){
		var touch = null;
		if( e.originalEvent.touches || e.originalEvent.changedTouches){
			touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		if( touch ){
			e.pageY = touch.pageY;
		}
		var tY = this.listOY + (e.pageY - this.oY);
		if( tY < this.listMinY){
			tY = this.listMinY;
		}
		if( tY > this.listMaxY){
			tY = this.listMaxY;
		}
		this.listEl.css( "top", tY );
	};
	this._mouseUpFn = function(e){
		this.documentEl.unbind();
        if (window.releaseEvents) {
            window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } else if (this.el.releaseCapture) {
            this.el.releaseCapture();
        }
        this.isDrag = false;
        
        var listY = parseInt( this.listEl.css("top") );
        var offsetY = Math.abs( listY - 195 + 28 );
        var index  = Math.floor( offsetY/56 );
        if( offsetY%56 > 28){
        	index++;
        }
        this.index = index;
        this.listEl.animate({"top": this.getOffsetYByIndex(index)},"fast"  );  
	};
	this.show = function( curColor, aEls ){
		this.popWinMaskEl.show();
		this.el.show();
		this.isPop = true;
		this._updateSizeHandler();
		this.clear();
		var i,item,aEl,aLabel;
		for( i=0; i < aEls.length ;i++ ){
			item = this._getItem();
			aEl = aEls.eq(i);
			aLabel = aEl.text();
			if( this.index ==-1 && aLabel == curColor){
				this.index = i;
			}
			item.setData( i, aEl.attr("href") , aLabel );
			item.el.appendTo(this.listEl);
			this.useds.push( item );
		}
		if( this.index == -1){ this.index = 0;}
		this.setIndex( this.index );
	};
	this.setIndex = function(value){
		this.index = value;
		this.listEl.css("top",  this.getOffsetYByIndex(value) );
	};
	this.getOffsetYByIndex = function(index){
		return 195 - index*56 - 28;
	};
	this.clear = function(){
		for(var i=0; i < this.useds.length ;i++){
			this.useds[i].setCache(true);
		}
		this.useds = [];
		this.index = -1;
	};
	this._getItem = function(){
		var i,item;
		for( i=0; i < this.items.length ;i++ ){
			item = this.items[i];
			if( item.isCache ){
				item.setCache(false);
				return item;
			}
		}
		item = new PopSelectorItem();
		this.items.push( item );
		return item;
	};
	this.hide = function(){
		if(!this.isPop){return;}
		this.isPop = false;
		this.popWinMaskEl.hide();
		this.el.hide();
	};
	this._updateSizeHandler = function(){
        if( !this.isPop ){return;}
        var screenWidth= this.winEl.width(); 
	    var screenHeight= this.winEl.height();
        var screenLeft= this.winEl.scrollLeft(); 
        var bodyWidth = this.bodyEl.width();
        var bodyHeight = this.bodyEl.height();
        this.popWinMaskEl.css({"width":bodyWidth > screenWidth ? bodyWidth : screenWidth,
        "height": bodyHeight > screenHeight ? bodyHeight:screenHeight });
        var popTop = Math.round( ( screenHeight- this.el.height() )/2 ); 
        this.el.css({"top":popTop+"px"});
    };
	this.build = function(){
		this.winEl = $(window);
		this.bodyEl = $("body");
		this.documentEl = $(document);
		this.popWinMaskEl = $(".popWinBgMask");
        if( this.popWinMaskEl.length ==0 ){
            this.popWinMaskEl = $("<div class='popWinBgMask'></div>").appendTo( this.bodyEl );
        }
        this.el = $("<div class='popWindPanel'></div>").appendTo( this.bodyEl );  
        var tEl = $("<div class='operationBar'></div>").appendTo(this.el);
        this.cancelBtnEl = $("<a href='javascript:;'>Cancel</a>").appendTo(tEl);
        this.okBtnEl = $("<a href='javascript:;'>OK</a>").appendTo(tEl);
        this.mianPanelEl = $("<div class='mainPanel'></div>").appendTo(this.el);
        this.listEl = $("<ul></ul>").appendTo(this.mianPanelEl);
        $("<div class='topMask'></div>").appendTo(this.mianPanelEl);
        $("<div class='bottomMask'></div>").appendTo(this.mianPanelEl); 
	};
}).call( PopSelector.prototype);


$(function(){
	var filterComboxEl = $(".subNav7filterPanel>.filterGroup>.combox");
	filterComboxEl.each(function(index){
		var comboxEl = filterComboxEl.eq(index);
		var scrollBlockEl = comboxEl.find(".scrollBlock");
		var liEls = comboxEl.find("li");
		if( liEls.length == 0){
			comboxEl.find(".topSeparator,.scrollBlock").hide();
			return;
		}
		if( scrollBlockEl.length == 0 ){return;}
		if( liEls.length <= 3 ){			
			scrollBlockEl.css( {"overflowY":"auto","borderRight":"none"});
		}
	});
	//--
	var popSelector = new PopSelector();
	var colorAEls = $(".filterGroup .color ul a");
	var curColor = $(".filterGroup .color>span").text();
	var sizeAEls = $(".filterGroup .size ul a");
	var curSize = $(".filterGroup .size>span").text();
	$(".phoneSubNav>.rowFirst>a:eq(0)").click(function(){
		popSelector.show( curColor,colorAEls );
	});
	$(".phoneSubNav>.rowFirst>a:eq(1)").click(function(){
		popSelector.show( curSize,sizeAEls );
	});

	
});
