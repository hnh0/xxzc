$(function(){
	$('#menu li').click(function(){
		var oThis = $(this)
		oThis
			.toggleClass('current')
			.siblings().removeClass('current')
	})
	$('.J_changeTab').click(function(){
		var oThis = $(this),
			iIdx = oThis.index()

		$('.J_changeTab').removeClass('active');
		$(this).addClass('active');

		$.ajax({
			url: '',
			type: 'post',
			data: {id: iIdx},
			success: function(data){
				$('#myin_main').html(iIdx)
			},
			error: function(data){
				console.log('error: ', data)
			}
		})
	});
})