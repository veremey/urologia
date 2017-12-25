
'use strict';

$(document).ready(function(){
	$('.btn-close').click(function(){
		$('.page').removeClass('is-hidden');

		$('.page-docs').hide();
		$('.document').hide();
	});

	$('[data-pdf]').on('click', function () {
		var $open = $(this).data('pdf');

		$('.page').addClass('is-hidden');
		$('.page-docs').show();
		$('.document').hide();
		$('.' + $open).show();

		return false;
	});
});
