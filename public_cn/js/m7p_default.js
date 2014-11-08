var EBE_MobileManager = function(){
	var windowEl = $(window);
	var bodyEl = $("body");
	var mainPanelEl = $("body>.mainPanel");
	var footerEl = $(".footer");
	
	var phoneMenuPlaceholderEl;
	var screenHeightPlaceholderEl;
	var screenHeightPlaceholderHandler;
	var screenHeightPlaceholderHandler = null;
	if(footerEl.length==0){
		phoneMenuPlaceholderEl = $(".phoneMenuPlaceholder");
	}else{
		phoneMenuPlaceholderEl = $("<div class='phoneMenuPlaceholder'></div>");
		footerEl.after(phoneMenuPlaceholderEl);
		screenHeightPlaceholderEl = $("<div class='footerBeforeHolder'></div>");
		footerEl.before(screenHeightPlaceholderEl);
		screenHeightPlaceholderHandler = function(){
	        var tH = windowEl.height() - (bodyEl.height()-screenHeightPlaceholderEl.height()-phoneMenuPlaceholderEl.height());
	        if(tH < 0){
	            screenHeightPlaceholderEl.height(0);
	        }else{
	            screenHeightPlaceholderEl.height(tH);
	        }
	    };
	}
	
	var topLogoEl = $(".header>.logo");
	var phoneViewMenuEl = $(".topNavigation>.phoneViewTopMenu");
	
	
	function windowResizeHandler(){
		if( windowEl.width() >= 805){
			if( topLogoEl.is(":hidden") ){
				topLogoEl.css("display","");
			}
		}
		if(screenHeightPlaceholderHandler){
			screenHeightPlaceholderHandler();
		}
	}
	windowEl.resize(windowResizeHandler);
	windowResizeHandler();
	
	function screenHeightChangeByMenuHandler(){
	    var elHeight = footerEl.outerHeight() + mainPanelEl.height();
		var	tHeight = 8  - (140+ elHeight);
		if(tHeight < 0 ){tHeight = 0;}
	    phoneMenuPlaceholderEl.height(tHeight);
	}
	var phoneMenuComboxEl = $(".menuCombox");
	var phoneMenuComboxListEl = phoneMenuComboxEl.find("ul");
	phoneMenuComboxEl.mouseenter(function(){
		phoneMenuComboxListEl.show();
		screenHeightChangeByMenuHandler();
	}).mouseleave(function(){
		phoneMenuComboxListEl.hide();
		screenHeightChangeByMenuHandler();
	});
};

var EBE_NormalMenuModule  = function(el,index){
	var menuWidth = 235;
	
	var mainBtnEl = el.children(".btnBlock");
	var popBlockEl = $("<div class='moduleMenuBlock'></div>").appendTo(mainBtnEl);
	$("<div class='bridge'></div>").appendTo(popBlockEl);
	
	var subBlockEl =  $("<div class='subModuleMenuBlock'></div>").width(menuWidth).appendTo(popBlockEl).hide();
	var mainMenuEl = el.find(".popBlock>ul").clone().addClass("mainModule").appendTo(popBlockEl);
	
	var mainMenuLiEls = mainMenuEl.children("li");
	var subMenus = [];
	var i,liEl,subPopEl,subUlEl,hasSub = false,maxSubCount=0;
	for( i=0; i < mainMenuLiEls.length;i++ ){
		liEl = mainMenuLiEls.eq(i);
		subPopEl = liEl.find(".subPopBlock");
		if(subPopEl.length == 1){
			subUlEl = subPopEl.find("ul").hide();
			subBlockEl.append( subUlEl );
			subMenus.push( subUlEl );
			hasSub = true;
			subPopEl.detach();
			maxSubCount = Math.max( maxSubCount,subUlEl.find("li").length );
			
		}else{
			subMenus.push(null);
		}	
	}
	if(index > 4){
		popBlockEl.css({"left":"auto","right":0});
		mainMenuEl.css({"left":"auto","right":0});
		subBlockEl.addClass("right");
	}
	popBlockEl.width(menuWidth);
	mainMenuEl.width(menuWidth);
	
	
	if( hasSub ){
		if(index < 5){
			subBlockEl.css("left",menuWidth);   
		}else{
			subBlockEl.css("left",0);   
		}
	}
	
	
	if( maxSubCount > mainMenuLiEls.length ){
		popBlockEl.height(  maxSubCount  * 48-2 );
	}else{
		popBlockEl.height( mainMenuLiEls.length * 48 - 2 );
		mainMenuLiEls.eq(mainMenuLiEls.length-1).find(".btnBlock").css("borderBottom","none");
		subBlockEl.height( mainMenuLiEls.length * 48  );
	}
	mainMenuLiEls.mouseenter(function(){
		var sub,tIndex = mainMenuLiEls.index(this);
		mainMenuLiEls.removeClass("over");
		mainMenuLiEls.eq(tIndex).addClass("over");
		for( i=0;i<subMenus.length;i++ ){
			sub = subMenus[i];
			if(sub){
				if( i == tIndex){
					sub.show();
					subBlockEl.show();
					popBlockEl.width(menuWidth*2);
				}else{
					sub.hide();
					subBlockEl.hide();
					popBlockEl.width(menuWidth);
				}
			}
		}
	});
	el.mouseleave(function(){
		if( popBlockEl.is(":hidden") ){return;}
		mainMenuLiEls.removeClass("over");
		for(var i=0;i<subMenus.length;i++ ){
			sub = subMenus[i];
			if(sub){sub.hide();}
		}
		popBlockEl.width(menuWidth);
		subBlockEl.hide();
	});
	el.find(".popBlock").detach();
};

var EBE_NormalMenuManager = function(){
	var el = $(".topNavlistModule").removeClass("topNavlistModule").addClass("topModuleMenu");
	var moduleBlockEls = el.children("li");
	moduleBlockEls.each( function( index ){
		new EBE_NormalMenuModule( moduleBlockEls.eq(index) ,index);
	} ); 
};

var EVE_ShoppingCarItem = function(){};
(function(){
	this.buildByEl = function(el){
		this.el = el;
		this.id = el.attr("iid");
		this.paramEl = el.find(".paramGroup>div");
		this.name = $.trim( this.paramEl.eq(0).text() );
		var tStr = this.paramEl.eq(1).text();
		this.size = $.trim( tStr.substr(tStr.lastIndexOf(":") + 1 ) );
		tStr = this.paramEl.eq(2).text();
		this.color = $.trim( tStr.substr(tStr.lastIndexOf(":") + 1 ) );
		tStr = this.paramEl.eq(3).text();
		this.count = parseInt( tStr.substr( tStr.lastIndexOf(":")+1 ) );
		tStr = this.paramEl.eq(4).text();
		this.price = parseFloat( tStr.substr( 1 ) );
		this.paramEl = el.find(".paramGroup>div");
	};
	this.buildByData = function(data){
		this.id = data.id;
		this.name = $.trim( data.name );
		var tStr = data.size;
		this.size = tStr.substr( tStr.lastIndexOf(":")+1 ) ;
		
		tStr = data.color;
		this.color = tStr.substr( tStr.lastIndexOf(":")+1 ) ;

		tStr = data.price;
		this.price = parseFloat( tStr.substr(1) );
		tStr = data.num;
		this.count = parseInt( tStr.substr( tStr.lastIndexOf(":")+1 ) );

		this.el = $("<li iid='"+this.id+"'></li>");
		var t01El =$("<div class='imgContainer'></div>").appendTo(this.el);
		$("<img src='"+data.imgUrl +"' />").appendTo(t01El);
		t01El = $("<div class='paramGroup'></div>").appendTo(this.el);
		
		$("<div class='nameRow'>"+ data.name+"</div>").appendTo( t01El );
		$("<div>"+ data.size+"</div>").appendTo( t01El );
		$("<div>"+ data.color+"</div>").appendTo( t01El );
		$("<div>"+ data.num+"</div>").appendTo( t01El );
		$("<div class='priceRow'>"+ data.price+"</div>").appendTo( t01El );
		
		this.paramEl = t01El.find("div");
	};
	this.addSameGoods = function(data){
		var name = $.trim( data.name );
		var tStr = data.size;
		var size = tStr.substr( tStr.lastIndexOf(":")+1 ) ;
		tStr = data.price;
		var price = parseFloat( tStr.substr(1) );
		tStr = data.num;
		var count = parseInt( tStr.substr( tStr.lastIndexOf(":")+1 )  );
		tStr = data.color;
		var color = tStr.substr( tStr.lastIndexOf(":")+1 ) ;
		
		if( name == this.name && data.id == this.id &&  size == this.size && price == this.price && this.color == color){
			this.count += count;
			tStr = this.paramEl.eq(3).text();
			tStr = tStr.substring( 0, tStr.lastIndexOf(":") +1) + " " + this.count;
			this.paramEl.eq(3).text(tStr);
			return true;
		}
		return false;
	};
}).call(EVE_ShoppingCarItem.prototype);

var EVE_ShoppingCar = function(){ 
	var el = $(".header .shoppingCar");
	if(el.length == 0){return;}
	var popWinEl = el.find(".popWindow");
	var viewIndex = 0;
	
	el.mouseenter(function(){
		popWinEl.addClass("open");
		viewIndex = 0;
		listContainerEl.css("top",0);
		updateShoppingCarArrow();
	}).mouseleave(function(){
		popWinEl.removeClass("open");
	});
	var count01El = $(".header .shoppingCar>span:eq(1)");
	var count02El = $(".header .shoppingCar .popWindow .lightRow>span:eq(1)");
	var count03El = $(".header .shoppingCar .popWindow .totalRow>u");
	var emptyInfoEl =  $(".header .shoppingCar .scrollPanel .empty");
	var goodsScrollEl = $(".header .shoppingCar .scrollPanel");

	var upArrowEl = $(".header .shoppingCar .scrollPanel>.upArrow").show();
	var downArrowEl = $(".header .shoppingCar .scrollPanel>.downArrow").show();

	var listContainerEl = $(".header .shoppingCar .scrollPanel .contentBlock");
	var listEl = $(".header .shoppingCar .scrollPanel ul");
	var liEls = listEl.find("li");
	var liHeight = liEls.length==0?emptyInfoEl.height():liEls.eq(0).height();
	var toPayBtnEl = el.find(".payable");
	var items = [];
	var i,item;
	for( i=0; i < liEls.length ;i++){
		item = new EVE_ShoppingCarItem();
		item.buildByEl( liEls.eq(i) );
		items.push( item );
	}
	
	upArrowEl.click(function(){
		listContainerEl.stop();
		viewIndex--;
		if( viewIndex < 0){
			viewIndex = 0;
			return;
		}
		listContainerEl.animate({"top": -viewIndex*160 },"fast" );
		updateShoppingCarArrow();
	});
	downArrowEl.click(function(){
		listContainerEl.stop();
		viewIndex++;
		if( viewIndex == items.length-1){ 
			viewIndex = items.length -2;
			return;
		}
		listContainerEl.animate({"top": -viewIndex*160 },"fast" );
		updateShoppingCarArrow();
	});

	function update(){
		if( items.length == 0 ){
			emptyInfoEl.show();
			updateCount();
			toPayBtnEl.hide();
			updateShoppingCarArrow();
			goodsScrollEl.height( liHeight + 20);
			return;
		}
		emptyInfoEl.hide();
		updateCount();
		listContainerEl.show();
		toPayBtnEl.show();
		
		if( items.length <= 2){
			goodsScrollEl.height( items.length * (liHeight + 10) + 10);
		}else{
			goodsScrollEl.height( 2 * (liHeight + 10) + 10);
		}
		listContainerEl.height( items.length * (liHeight + 10) + 10);
		updateShoppingCarArrow();
	}
	function addGoods( data ){
		var i,item,hasSame = false;
		for(i=0; i < items.length;i++){
			item = items[i];
			hasSame = item.addSameGoods( data);
			if( hasSame ){ break;}
		}
		if( !hasSame ){
			item = new EVE_ShoppingCarItem();
			item.buildByData( data );
			listEl.append(item.el);
			items.push( item );
		}
		update();
		
		popWinEl.addClass("open");
		viewIndex = 0;
		listContainerEl.css("top",0);
		updateShoppingCarArrow();
	}
	function updateShoppingCarArrow(){
		if( items.length < 3 ){
			upArrowEl.hide();
			downArrowEl.hide();
			return;
		}
		if( viewIndex == 0 ){
			upArrowEl.hide();
		}else{
			upArrowEl.show();
		}
		if( viewIndex == items.length -2 ){
			downArrowEl.hide();
		}else{
			downArrowEl.show();
		}
	}
	function updateCount(){
		var i,count = 0;
		for( i=0;i<items.length;i++){
			count += items[i].count;
		}
		count01El.text( count );
		count02El.text( count );
		count03El.text( count );
	}
	update();
	return {"addGoods":addGoods};
};

var G_shoppingCar;

$(function(){
	new EBE_MobileManager();
	new EBE_NormalMenuManager();
	G_shoppingCar = new EVE_ShoppingCar();
});
