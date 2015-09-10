
/// <reference path="node_modules/phosphor-widget/lib/phosphor-widget.d.ts" />
/// <reference path="node_modules/phosphor-signaling/lib/phosphor-signaling.d.ts" />
/// <reference path="node_modules/phosphor-messaging/lib/phosphor-messaging.d.ts" />
/// <reference path="node_modules/phosphor-queue/lib/phosphor-queue.d.ts" />
/// <reference path="node_modules/phosphor-disposable/lib/phosphor-disposable.d.ts" />
/// <reference path="node_modules/phosphor-nodewrapper/lib/phosphor-nodewrapper.d.ts" />
/// <reference path="node_modules/phosphor-properties/lib/phosphor-properties.d.ts" />
//// <reference path="node_modules/phosphor-splitpanel/lib/index.d.ts" />
/// <reference path="jquery.d.ts" />
import { SplitPanel } from 'phosphor-splitpanel';
import {Widget, attachWidget, detachWidget} from 'phosphor-widget';
declare function require(name: string): void;
require('bootstrap');
require('lodash');

$(function() {
	var options = {
		float: true
	};
	$('.grid-stack').gridstack(options);
});



class PolyWidget extends Widget {
	innerElement: HTMLElement;
	constructor(tag: string) {
		super();
		this.innerElement = document.createElement(tag);
		this.node.appendChild(this.innerElement);
	}
}

class GridstackWidget extends Widget {
	gridstack: any;
	constructor (gridstack: JQuery) {
		super();
		this.gridstack = gridstack.data('gridstack');
	}
}

class GridstackItemWidget extends Widget {
	constructor(x: number, y: number, width: number, height: number) {
		super();
		this.node.classList.add("grid-stack-item");
		this.node.setAttribute("data-gs-x", x.toString());
		this.node.setAttribute("data-gs-y", y.toString());
		this.node.setAttribute("data-gs-width", width.toString());
		this.node.setAttribute("data-gs-height", height.toString());
		var innerDiv = document.createElement("div");
		innerDiv.classList.add("grid-stack-item-content");
		this.node.appendChild(innerDiv);
	}
}

function createGridstackItem(x: number, y: number, width: number, height: number): HTMLElement {
	var gsi = document.createElement("div");
	var innerDiv = document.createElement("div");
	innerDiv.classList.add("grid-stack-item-content");
	gsi.appendChild(innerDiv);
	gsi.classList.add("grid-stack-item");
	gsi.setAttribute("data-gs-x", x.toString());
	gsi.setAttribute("data-gs-y", y.toString());
	gsi.setAttribute("data-gs-width", width.toString());
	gsi.setAttribute("data-gs-height", height.toString());
	return gsi;
}

function createRandomWidget(): Widget {
	var rand = Math.floor(Math.random() * 3);
	console.log(rand);
	switch (rand) {
		case 0:
			return new PolyWidget("dom-element");
			break;
		case 1:
			var widget = new Widget();
			return widget;
			break;
		case 2:
			var widget = new Widget();
			var div = document.createElement("div");
			div.innerHTML = "Hello World, I am a basic widget!";
			widget.node.appendChild(div);
			return widget;
			break;
	}
}

function createRandomGridstack() {
	var widget = createRandomWidget();
	var node = {
		x: 12 * Math.random(),
		y: 5 * Math.random(),
		width: 1 + 3 * Math.random(),
		height: 1 + 3 * Math.random()
	};
	var grid = $('.grid-stack').data('gridstack');
	var item = grid.add_widget($('<div><div class="grid-stack-item-content" /><div/>'),
		node.x, node.y, node.width, node.height);
	console.log(item);
	console.log(item.get(0));
	console.log(widget);
	attachWidget(widget, item.get(0).childNodes[0]);
}

function createGridstackWidget() {
	var node = {
		x: 12 * Math.random(),
		y: 5 * Math.random(),
		width: 1 + 3 * Math.random(),
		height: 1 + 3 * Math.random()
	};
	var gsw = new GridstackItemWidget(node.x, node.y, node.width, node.height);
	var grid = $('.grid-stack').data('gridstack');
	grid.add_widget(gsw.node, node.x, node.y, node.width, node.height);
}


//console.log(GridStackEngine);
var mainDiv = $("#main");
console.log(mainDiv);
var button = '<div><button class="btn btn-primary" id="newElement">Click me!</button></div>';
mainDiv.append(button);

var gs = document.createElement("div");
gs.classList.add("grid-stack");

mainDiv.append(gs);


var w1 = new Widget();
var w2 = new Widget();
var w3 = new Widget();

// // Set the widget stretch factors (optional).
// SplitPanel.setStretch(w1, 0);
// SplitPanel.setStretch(w2, 2);
// SplitPanel.setStretch(w3, 1);

// // Setup the split panel.
// var sp = new SplitPanel();
// sp.orientation = SplitPanel.Horizontal;
// sp.handleSize = 5;
// sp.children = [w1, w2, w3];

// // sometime later...

// // Get the relative widget sizes.
// var size = sp.sizes();

// // Set the relative widget sizes.
// sp.setSizes([2, 4, 1]);

// attachWidget(sp, document.getElementById("main"));
// document.getElementById("newElement").onclick = function() {
// 	createRandomGridstack();
// };
document.getElementById("newElement").onclick = function() {
	createGridstackWidget();
};
