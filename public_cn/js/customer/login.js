var EBE_LoginLeftManager = function(eMailReg,passwordReg){
	var formEl = $(".leftPanel form:eq(0)");
	var inputEls = formEl.find("input");
	var borderEl = formEl.find(".inputText");
	formEl.submit(function(){
		var hasErr= false;
		if( !eMailReg.test( $.trim(inputEls.eq(0).val()) ) ){
			hasErr = true;
			borderEl.eq(0).addClass("m7p_validationFailed");
			
		}else{
			borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		if( !passwordReg.test( $.trim(inputEls.eq(1).val()) )   ){
			hasErr = true;
			borderEl.eq(1).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(1).removeClass("m7p_validationFailed");
		}
		return !hasErr;
	});	
};
var EBE_ForgotManager = function(eMailReg){
	var forgotPanelEl = $(".forgotpassword");
	$(".forgotPWBtn").click(function(){
		forgotPanelEl.show();
	});
	forgotPanelEl.find("abbr").click(function(){
		forgotPanelEl.hide();
	});
	var formEl = $(".leftPanel form:eq(1)");
	var inputEl = formEl.find("input");
	var borderEl = formEl.find(".inputText");
	formEl.submit(function(){
		var hasErr= false;
		if( !eMailReg.test( $.trim(inputEl.eq(0).val()) ) ){
			hasErr = true;
			borderEl.eq(0).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		
		return !hasErr;
	});
};
var EBE_LoginRightManager = function(eMailReg,passwordReg){
	var formEl = $(".rightPanel form:eq(0)");
	var inputEls = formEl.find("input");
	var borderEl = formEl.find(".inputText");

	formEl.submit(function(){
		var hasErr= false;
		if(  $.trim(inputEls.eq(0).val()) == "" ){
			hasErr = true;
			borderEl.eq(0).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(0).removeClass("m7p_validationFailed");
		}
		if(  $.trim(inputEls.eq(1).val()) == "" ){
			hasErr = true;
			borderEl.eq(1).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(1).removeClass("m7p_validationFailed");
		}
		
		if( !eMailReg.test( $.trim(inputEls.eq(2).val()) ) ){
			hasErr = true;
			borderEl.eq(2).addClass("m7p_validationFailed");
			
		}else{
			borderEl.eq(2).removeClass("m7p_validationFailed");
		}
		var pw01 = $.trim(inputEls.eq(3).val());
		var pw02 = $.trim(inputEls.eq(4).val());
		if( !passwordReg.test(pw01) ){
			hasErr = true;
			borderEl.eq(3).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(3).removeClass("m7p_validationFailed");
		}
		if( !passwordReg.test(pw02) ){
			hasErr = true;
			borderEl.eq(4).addClass("m7p_validationFailed");
		}else{
			borderEl.eq(4).removeClass("m7p_validationFailed");
		}		
		if( passwordReg.test(pw01)  && passwordReg.test(pw02) && pw01 != pw02 ){
			hasErr = true;
			borderEl.eq(3).addClass("m7p_validationFailed");
			borderEl.eq(4).addClass("m7p_validationFailed");
		}
		return !hasErr;
	});
};

$(function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var passwordReg = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i;
	new EBE_LoginLeftManager(eMailReg,passwordReg);
	new EBE_ForgotManager(eMailReg);
	new EBE_LoginRightManager(eMailReg,passwordReg);
});