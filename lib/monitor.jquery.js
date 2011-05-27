if(jQuery.fn.outerHTML === undefined) {
	jQuery.fn.outerHTML = function() {
		return $('<div>').append(this.eq(0).clone()).html();
	};
}

(function($){
	$.fn.monitor = function(options) {
		$.extend({
			interval: 100,
			limit: null,
			onChange: function(from, to, intervalId){}
		}, options);
		return this.each(function() {
			var currentValue = $(this).outerHTML(), 
				count = 0;
			$(this).data('monitor', setInterval($.proxy(function() {
				if(currentValue !== $(this).outerHTML()) {
					options.onChange(currentValue, $(this).outerHTML(), $(this).data('monitor'));
					currentValue = $(this).outerHTML();
					count++;
					if(count && count >= options.limit) {
						clearTimeout($(this).data('monitor'));
					}
				}
			}, this), options.interval));
		});
	}
})(jQuery);