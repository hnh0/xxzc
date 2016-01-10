$(function(){
	$('.index_navi a').click(function(){
		var oThis = $(this),
			iIdx = oThis.index();

		oThis
			.addClass('active')
			.siblings().removeClass('active')
		// $('.J_tab').html('<div class="index_add_detail">1111111</div>')
		$('.J_tab .tabs_item').eq(iIdx)
			.addClass('show')
			.siblings().removeClass('show')
	})
})