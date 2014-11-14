var EBE_FormManager = function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var contactUsForm = $(".m7p_contentMainPanel form");
	var inputEl = contactUsForm.find("input,textarea");
	var borderEl = contactUsForm.find(".inputText,.inputTextarea");
	contactUsForm.submit(function(){
		var hasErr= false;
		if(  $.trim(inputEl.eq(0).val()) == "" ){
			hasErr = true;
			borderEl.eq(0).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		if( !eMailReg.test( $.trim(inputEl.eq(1).val()) ) ){
			hasErr = true;
			borderEl.eq(1).addClass("m7p_validationFailed");
			
		}else{
			borderEl.eq(1).removeClass("m7p_validationFailed");
		}
		
		if(  $.trim(inputEl.eq(3).val()) == "" ){
			hasErr = true;
			borderEl.eq(3).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(3).removeClass("m7p_validationFailed");
		}
		return !hasErr;
	});
};

$(function(){
	new EBE_FormManager();
});
