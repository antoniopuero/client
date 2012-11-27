$(document).ready(function () {
	"use strict";
	var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'],
		canvas = $('#plot'),
		ctx = canvas.get(0).getContext('2d'),
		x,
		maxX,
		y,
		maxY,
		increment = 2,
		randomColor = function () {
			var randColor = '#',
				i;
			for (i = 0; i < 6; i += 1) {
				randColor += hex[Math.ceil(Math.random() * 15)];
			}
			return randColor;
		};
	for (x = 0, maxX = parseInt(canvas.css('width'), 10); x < maxX; x += increment) {
		for (y = 0, maxY = parseInt(canvas.css('height'), 10); y < maxY; y += increment) {
			ctx.fillStyle = randomColor();
			ctx.fillRect(x, y, increment, increment);
		}
	}
	canvas.mousemove(function (e) {
		var color,
			x = $('#coordinate-x'),
			y = $('#coordinate-y'),
			colorContainer = $('.coordinate-color'),
			mouseX,
			mouseY;
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		x.text(mouseX);
		y.text(mouseY);
		color = ctx.getImageData(mouseX, mouseY, 1, 1).data;
		console.log(color);
		colorContainer.css('background', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
	})
});