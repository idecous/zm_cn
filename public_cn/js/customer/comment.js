var CommentManger = function(errMessage){
	var formEl = $(".mainPanel form:eq(0)");
	var fInputEls = formEl.find("input");
	
	var textareaEls = $(".mainPanel textarea");
	var btnEls = $(".mainPanel .btnRow a");
	
	btnEls.click(function(){
		var index  = btnEls.index(this);
		var textareaEl = textareaEls.eq(index);
		if( $.trim(textareaEl.val()) == "" ){
			textareaEl.addClass("warn");
			alert(errMessage);
			return false;
		}else{
			textareaEl.removeClass("warn");
		}
		fInputEls.eq(0).val( textareaEl.attr("iid") );
		fInputEls.eq(1).val( textareaEl.val() );
		formEl.submit();
	});
};
$(function(){
	new CommentManger("请不要留空！");
});
