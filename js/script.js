$(".carousel-swipe").each(function(){
	var swipe_obj = this;
	var mc = new Hammer(swipe_obj);
	mc.on("panleft panright panend panstart", function(event) {
		var obj_width = $(swipe_obj).width();
		xPos = event.deltaX;
		moveRight = xPos > 0;
		moveLeft  = !moveRight;
		prevClass = "right prev";
		nextClass = "next left";
		var percent =(1 - (xPos < 0 ? (xPos * (0-1)) / obj_width : xPos / obj_width)).toFixed(5);
		percent = percent < 0 ? 0 : percent;
		console.log(percent);
		$(swipe_obj).find(".item.active").css({"left": xPos+"px", "opacity": percent, "z-index": "9999"});
		if (moveLeft) {
			$(swipe_obj).find(".item").removeClass(prevClass);
			$(swipe_obj).find(".item.active").next().addClass(nextClass);
		} else {
			$(swipe_obj).find(".item").removeClass(nextClass);
			$(swipe_obj).find(".item.active").prev().addClass(prevClass);
		}
		if (event.type == "panend") {
			$(swipe_obj).find(".item").removeClass(nextClass + " " + prevClass);
			clickTo = moveLeft ? "[data-slide=next]" : "[data-slide=prev]";
			$(swipe_obj).find(clickTo).click();
			$(swipe_obj).find(".item").animate({left: "0", "z-index": '', opacity: 1}, 700);
		}
	});
});