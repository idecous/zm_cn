var EBE_EditManager = function(){
	var eMailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var passwordReg = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/i;
	var tInputEls =$(".m7p_formList input[type='text'],input[type='password']");
	var tBorderEls =$(".m7p_formList .inputText");
	var fNameEl = tInputEls.eq(0);
	var fNameBorderEl = tBorderEls.eq(0);
	var lNameEl = tInputEls.eq(1);
	var lNameBorderEl = tBorderEls.eq(1);
	var eMailEl = tInputEls.eq(2);
	var eMailBorderEl = tBorderEls.eq(2);
	var curPasswordEl = tInputEls.eq(3);
	var curPasswordBorderEl = tBorderEls.eq(3);
	var passwordEl = tInputEls.eq(4);
	var passwordBorderEl = tBorderEls.eq(4);
	var conPasswordEl = tInputEls.eq(5);
	var conPasswordBorderEl = tBorderEls.eq(5);
	
	var extraPanelEl = $(".extraPanel");
	var extraBtnEl = $(".m7p_formList input[type='checkbox']");
	if( extraBtnEl.prop("checked") ){
		extraPanelEl.show();
	}else{
		extraPanelEl.hide();
	}
	extraBtnEl.change(function(){
		if( extraBtnEl.prop("checked") ){
			extraPanelEl.show();
		}else{
			extraPanelEl.hide();
		}
	});
	
	$(".m7p_contentMainPanel form").submit(function(){
		var hasErr= false;
		if( $.trim(fNameEl.val()) == "" ){
			hasErr = true;
			fNameBorderEl.addClass("m7p_validationFailed");
		}else{
			fNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( $.trim(lNameEl.val()) == "" ){
			hasErr = true;
			lNameBorderEl.addClass("m7p_validationFailed");
		}else{
			lNameBorderEl.removeClass("m7p_validationFailed");
		}
		if( !eMailReg.test( $.trim(eMailEl.val()) ) ){
			hasErr = true;
			eMailBorderEl.addClass("m7p_validationFailed");
		}else{
			eMailBorderEl.removeClass("m7p_validationFailed");
		}
		
		if( extraBtnEl.prop("checked") ){
			if( !passwordReg.test( curPasswordEl.val() ) ){
				hasErr = true;
				curPasswordBorderEl.addClass("m7p_validationFailed");
			}else{
				curPasswordBorderEl.removeClass("m7p_validationFailed");
			}
			var tErr = false;
			if( !passwordReg.test( passwordEl.val() ) ){
				tErr = true;
				passwordBorderEl.addClass("m7p_validationFailed");
			}else{
				passwordBorderEl.removeClass("m7p_validationFailed");
			}
			if( !passwordReg.test( conPasswordEl.val())  ){
				tErr = true;
				conPasswordBorderEl.addClass("m7p_validationFailed");
			}else{
				conPasswordBorderEl.removeClass("m7p_validationFailed");
			}
			if( !tErr ){
				if( conPasswordEl.val() != passwordEl.val() ){
					tErr = true;
					conPasswordBorderEl.addClass("m7p_validationFailed");
				}else{
					conPasswordBorderEl.removeClass("m7p_validationFailed");
				}	
			}
			hasErr |= tErr;			
		}
		return !hasErr;
	});
	
};

$(function(){
	new EBE_EditManager();
});
