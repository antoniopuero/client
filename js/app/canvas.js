var newCanvas = function () {
	"use strict";
	var canvas,
		ctx,
		offset,
		axesIsShown = false,
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
		showAxes = function (ctx, axes) {
			var x0 = axes.x0,
				y0 = axes.y0;
			ctx.beginPath();
			ctx.strokeStyle = "rgb(128,128,128)";
			ctx.moveTo(0, y0);
			ctx.lineTo(cw, y0);  // X axis
			ctx.moveTo(x0, 0);
			ctx.lineTo(x0, ch);  // Y axis
			ctx.stroke();
			axesIsShown = true;
		},
		funGraph = function (props) {
			var xx,
				yy,
				dx = 4,
				x0 = props.axes.x0,
				y0 = props.axes.y0,
				scale = props.axes.scale,
				iMax = Math.round((cw - x0) / dx),
				iMin = props.axes.doNegativeX ? Math.round(-x0 / dx) : 0,
				i;
			ctx.beginPath();
			ctx.lineWidth = (props.thick !== undefined) ? props.thick : 1;
			ctx.strokeStyle = (props.color !== undefined) ? props.color : "rgb(0,0,0)";
			for (i = iMin; i <= iMax; i += 1) {
				xx = dx * i;
				yy = scale * props.func(xx / scale);
				if (i === iMin) {
					ctx.moveTo(x0 + xx, y0 - yy);
				} else {
					ctx.lineTo(x0 + xx, y0 - yy);
				}
			}
			ctx.stroke();
		},
		draw = function (props) {
			var axes = {};
			axes.x0 = 0.5 + 0.5 * cw;  // x0 pixels from left to x=0
			axes.y0 = 0.5 + 0.5 * ch; // y0 pixels from top to y=0
			axes.scale = (props.scale !== undefined) ? props.scale : 50;  // 50 pixels from x=0 to x=1
			axes.doNegativeX = (props.negativeX !== undefined) ? props.negativeX : true;
			if (!axesIsShown) {
				showAxes(ctx, axes);
			}
			funGraph({
				axes: axes,
				func: props.func,
				thick: props.thick,
				color: props.color
			});
		},
		plotFunc = function () {
			draw({
				func: function () {
					return Math.random();
				},
				negativeX: true,
				thick: 1,
				color: "red",
				scale: 60
			});
			draw({
				func: function (x) {
					return Math.abs(x);
				},
				negativeX: true,
				thick: 2,
				color: "green",
				scale: 40
			});
			draw({
				func: function (x) {
					return Math.tan(x);
				},
				negativeX: true,
				thick: 1,
				color: "blue"
			});
		},
		init = function (config) {
			canvas = config.canvas;
			ctx = canvas.get(0).getContext("2d");
			cw = parseInt(canvas.css('width'), 10);
			ch = parseInt(canvas.css('height'), 10);
			plotFunc();
//			offset = canvas.offset();
//			canvas.on('mouseup', mouseUp);
//			canvas.on('mousedown', mouseDown);
//			canvas.on('mousemove', mouseMoved);

//			return setInterval(render, 10); // repaint the canvas at intervals
		};
	return {
		init: init
	};
};