var newCanvas = function () {
	"use strict";
	var canvas,
		ctx,
		offset,
		isMouseDown = false,
		cw = 0,
		ch = 0,
		pw = 30,
		ph = 30,
		px = 50,
		py = 100,
		cx = 0,
		cy = 0,
		render = function () {
			ctx.clearRect(0, 0, cw, ch);
			drawRect(0, 0, cw, ch, "rgb(220,220,190)");
			drawRect(px, py, pw, ph, "blue");
		},
		drawRect = function (x, y, w, h, colour) {
			ctx.fillStyle = colour;
			ctx.beginPath();
			ctx.rect(x, y, w, h);
			ctx.closePath();
			ctx.fill();
		},
		mouseMoved = function (e) {
			if (isCursorOverPuck(e.pageX, e.pageY)) {
				document.body.style.cursor = 'pointer';
			} else {
				document.body.style.cursor = 'default';
			}
			if (isMouseDown) {
				px = (e.pageX - offset.left) - cx;
				py = (e.pageY - offset.top) - cy;
			}
		},
		mouseUp = function () {
			isMouseDown = false;
		},
		mouseDown = function (e) {
			if (isCursorOverPuck(e.pageX, e.pageY)) {
				cx = (e.pageX - offset.left) - px;
				cy = (e.pageY - offset.top) - py;
				isMouseDown = true;
			}
		},
		isCursorOverPuck = function (x, y) {
			return (x - offset.left) > px && (x - offset.left) < px + pw
				&& (y - offset.top) > py && (y - offset.top) < py + ph;
		},
		init = function (config) {
			canvas = config.canvas;
			ctx = canvas.get(0).getContext("2d");
			cw = parseInt(canvas.css('width'), 10);
			ch = parseInt(canvas.css('height'), 10);
			offset = canvas.offset();
			canvas.on('mouseup', mouseUp);
			canvas.on('mousedown', mouseDown);
			canvas.on('mousemove', mouseMoved);

			return setInterval(render, 10); // repaint the canvas at intervals
		};
	return {
		init: init
	};
};