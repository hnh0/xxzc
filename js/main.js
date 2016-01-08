$(function(){
	$('#tabs_home a').hover(function() {
		var oThis = $(this),
			iIdx = oThis.index()

		oThis
			.addClass('current')
			.siblings().removeClass('current')

		$('#tabs_content .tabs_item').eq(iIdx)
			.addClass('show')
			.siblings().removeClass('show')
	});

	$('#gallery')
		.slidesjs({
			height: 503,
			navigation: {
				active: false
			},
			play: {
				auto: true
			}
		})
	$('#gallery_thumb img').click(function() {
		var oThis = $(this),
			iIdx = oThis.index()

		$('.slidesjs-pagination a').eq(iIdx).trigger('click')
	});

})