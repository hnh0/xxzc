var ipt = window.ipt || {};
(function () {
	var cash = 346000;
	var cutdownTime = 60;
	var tip = {
		'phone': ['请输入正确的手机号码！',''],
		'user_name': ['请输入真实正确的姓名!',''],
		'auth_code': ['验证码有误！','请输入您手机收到的验证码'],
		'id_number': ['请输入正确的证件号码！','证件类型和号码是保险唯一用来确认身份的标识， 请准确输入，否则保单可能无效'],
		'cash_num': ['请输入数字，并且不能超出可提取金额!','当前可提取金额：' + cash + ' 元'],
		'bank': ['请选择银行！',''],
		'bank_name': ['收款人姓名输入有误!',''],
		'bank_id': ['卡号输入有误!','只能提现到您名下的银行卡']
	};
	ipt = {
		onFocus: function (obj) {
			var type = obj.attr('id');
			var tip_name = tip[type];
			obj.css({
				'border-color': '#70c99c'
			});
			if(!tip_name){
				tip_name = ''
			}
			obj.closest('.ipt_item')
			   .find('.ipt_tip').removeClass('err_tip')
								.html(tip_name[1]);
		},
		onBlur: function (obj) {
			obj.css({
				'border-color': '#c2c9d1'
			});
		},
		initWithdrawTip: function () {
			var tip_name = ['cash_num', 'bank_name', 'bank_id', 'auth_code'];
			for(var i = 0; i < tip_name.length; i++){
				var name = tip_name[i];
				$('#' + name).closest('.ipt_item').find('.ipt_tip').html(tip[name][1]);
			}
		},
		showErr: function (obj) {
			var type = obj.attr('id');
			obj.css({
				'border-color': '#ff1515'
			});
			if(type == 'bank'){
				$('.select_ipt').css({
					'border-color': '#ff1515'
				})
			}
			obj.closest('.ipt_item')
			   .find('.ipt_tip').addClass('err_tip')
								.html(tip[type][0]);
		},
		showModal: function (sId) {
			$('.modal_backdrop').removeClass('hidden');
			$('#'+sId).removeClass('hidden');
		},
		closeModal: function () {
			$('.modal_backdrop').addClass('hidden');
			$('.modal').addClass('hidden');
		},
		checkPhone: function () {
			var obj = $('#phone');
			var value = obj.val();
			if(value == '' || !value.match(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/)){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkName: function () {
			var obj = $('#user_name');
			var value = obj.val();
			if(value == ''){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkId: function () {
			var obj = $('#id_number');
			var value = obj.val();
			if(value == ''){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkCashNum: function () {
			var obj = $('#cash_num');
			var value = obj.val();
			if(value == '' || Number(value) > cash){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkBank: function () {
			var obj = $('#bank');
			var value = obj.val();
			if(value == ''){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkBankName: function () {
			var obj = $('#bank_name');
			var value = obj.val();
			if(value == ''){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkBankId: function () {
			var obj = $('#bank_id');
			var value = obj.val();
			if(value == ''){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkAuthCode: function () {
			var obj = $('#auth_code');
			var value = obj.val();
			if(value == '' || value.length < 4){
				return {
					check: false,
					obj: obj
				}
			}else{
				return {
					check: true,
					obj: obj
				}
			}
		},
		checkWithdraw: function () {
			var checkRes = [
				ipt.checkCashNum(),
				ipt.checkBank(),
				ipt.checkBankName(),
				ipt.checkBankId(),
				ipt.checkPhone(),
				ipt.checkAuthCode()
				];
			var errObj = null;
			var checkPass = true;
			for(var i = 0; i < checkRes.length; i++){
				if(!checkRes[i].check){
					errObj = checkRes[i].obj;
					ipt.showErr(errObj);
					checkPass = checkPass && false;
				}else{
					checkPass = checkPass && true;
				}
			}
			//验证成功
			if(checkPass){
				ipt.showModal();
			}
		},
		checkLogin: function () {
			var checkRes = [
				ipt.checkPhone(),
				ipt.checkAuthCode()
				];
			var errObj = null;
			var checkPass = true;
			for(var i = 0; i < checkRes.length; i++){
				if(!checkRes[i].check){
					errObj = checkRes[i].obj;
					ipt.showErr(errObj);
					checkPass = checkPass && false;
				}else{
					checkPass = checkPass && true;
				}
			}
			//验证成功
			if(checkPass){
				alert('login成功');
			}
		},
		checkLoginOk: function () {
			var checkRes = [
				ipt.checkName(),
				ipt.checkId()
				];
			var errObj = null;
			var checkPass = true;
			for(var i = 0; i < checkRes.length; i++){
				if(!checkRes[i].check){
					errObj = checkRes[i].obj;
					ipt.showErr(errObj);
					checkPass = checkPass && false;
				}else{
					checkPass = checkPass && true;
				}
			}
			//验证成功
			if(checkPass){
				alert('loginok成功');
			}
		},
		cutdown: function (obj) {
			var countdown = cutdownTime; 
			function settime(obj) { 
				if (countdown == 0) { 
					obj.removeClass('cutdown');
					obj.removeAttr("disabled");    
					obj.val('获取验证码'); 
					countdown = cutdownTime; 
					return;
				} else { 
					obj.addClass('cutdown');
					obj.attr("disabled", true); 
					obj.val(countdown + "秒"); 
					countdown--; 
				} 
				setTimeout(function() { 
					settime(obj) 
				},1000) 
			}
			var checkRes = ipt.checkPhone();
			if(checkRes.check){
				settime(obj);
			}else{
				errObj = checkRes.obj;
				ipt.showErr(errObj);
			}
		}
	};
	$('.ipt').on('focus', function () {
		var obj = $(this);
		ipt.onFocus(obj);
	});
	$('.ipt').on('blur', function () {
		var obj = $(this);
		ipt.onBlur(obj);
	});
	$('.select_ipt').on('click', function (e) {
		e.stopPropagation();
		$(this).css({
			'border-color': '#c2c9d1'
		});
		$(this).closest('.ipt_item').find('.ipt_tip').html('').removeClass('err_tip');
		var $option = $('.select_option');
		var statue = $option.hasClass('hidden');
		if(statue){
			$option.removeClass('hidden');
		}else{
			$option.addClass('hidden');
		}
	});
	$('.select_option_item').on('touchstart', function (e) {
		e.stopPropagation();
		var value = $(this).html();
		var type = $(this).closest('.ipt_item').attr('type');
		if(type == 'bank'){
			$('#bank').val(value);
		}else if(type == 'credential'){
			$('#credential').val(value);
		}
		$('.selected').html(value);
		$(this).addClass('active');
	}).on('touchend', function (e) {
		e.stopPropagation();
		$(this).removeClass('active');
	});
	$(document).on('click', function () {
		var $option = $('.select_option');
		var statue = $option.hasClass('hidden');
		if(!statue){
			$option.addClass('hidden');
		}
		// var oRes = ipt.checkBank()
		// if(!oRes.check){
		// 	ipt.showErr($(oRes.obj[0]));
		// }
	});
	$('.close_modal').on('touchstart', function (e) {
		e.stopPropagation();
		$(this).addClass('active');
	}).on('touchend', function (e) {
		e.stopPropagation();
		$(this).removeClass('active');
		ipt.closeModal();
	});
	$('.modal_close').on('click', function () {
		ipt.closeModal();
	});
	$('#withdraw_next').on('click', function () {
		ipt.checkWithdraw();
	});

	$('#phone').blur(function(){
		var oRes = ipt.checkPhone()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#auth_code').blur(function(){
		var oRes = ipt.checkAuthCode()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#user_name').blur(function(){
		var oRes = ipt.checkName()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#id_number').blur(function(){
		var oRes = ipt.checkId()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#bank_id').blur(function(){
		var oRes = ipt.checkBankId()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#cash_num').blur(function(){
		var oRes = ipt.checkCashNum()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#bank_name').blur(function(){
		var oRes = ipt.checkBankName()
		if(!oRes.check){
			ipt.showErr($(oRes.obj[0]));
		}
	})
	$('#login_btn').on('click', function () {
		ipt.checkLogin();
	});
	$('#loginok_btn').on('click', function () {
		ipt.checkLoginOk();
	});
	$('#auth_code_btn').on('click', function () {
		var obj = $(this);
		ipt.cutdown(obj);
	})
})();