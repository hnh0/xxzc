$(function(){
	$('.index_navi a').click(function(){
		var oThis = $(this)
		oThis
			.addClass('active')
			.siblings().removeClass('active')
		$('.J_tab').html('<div class="index_add_detail">1111111</div>')
	})
})