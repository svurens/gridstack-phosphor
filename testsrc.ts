/// <reference path="jquery.d.ts" />
/// <reference path="jqueryui.d.ts" />
/// <reference path="jquery.gridstack.d.ts" />
/// <reference path="underscore.d.ts" />
import { ChildMessage, MSG_AFTER_ATTACH, MSG_BEFORE_DETACH, MSG_LAYOUT_REQUEST,
ResizeMessage, Widget, attachWidget, detachWidget } from 'phosphor-widget';
import { SplitPanel } from 'phosphor-splitpanel';
import { Message, postMessage, sendMessage } from 'phosphor-messaging';
import { GridPanel, Spec } from 'phosphor-gridpanel';
declare function require(name: string): void; //there's probably a better way for this
require('bootstrap');
require('lodash');
require('underscore');
// //create basic gridstack
// $(function() {
// var options = {
// 	float: true
// };
// 	$('.grid-stack').gridstack(options);
// });



//polymer widget
class PolyWidget extends Widget {
	innerElement: HTMLElement;
	constructor(tag: string) {
		super();
		this.innerElement = document.createElement(tag);
		this.node.appendChild(this.innerElement);
	}
}

//widget containing a gridstack item



class GridStackContainer extends Widget {
	public wrappers: GridstackItemWrapper[];
	public gridstack: any;
	constructor(options: any) {
		super();
		this.wrappers = [];
		this.addClass("grid-stack");
		$(this.node).gridstack(options);
		this.gridstack = $(this.node).data("gridstack");
	}

	protected onChildAdded(msg: ChildMessage): void {
		var node = {
			x: 12 * Math.random(),
			y: 5 * Math.random(),
			width: 1 + 3 * Math.random(),
			height: 1 + 3 * Math.random()
		};

		var wrapper = new GridstackItemWrapper(node.x, node.y, node.width, node.height, this);
		this.wrappers.push(wrapper);
		msg.child.addClass("grid-stack-item-content");
		wrapper.item.appendChild(msg.child.node);
		var gs = $(this.node).data("gridstack");
		gs.add_widget(wrapper.item, node.x, node.y, node.width, node.height);
		console.log(msg.currentIndex + 1)
		var next = this.childAt(msg.currentIndex + 1);
		this.node.insertBefore(wrapper.item, next && next.node);

		var jwrapper = $(wrapper.item);
		console.log(jwrapper);
		if (this.isAttached) sendMessage(msg.child, MSG_AFTER_ATTACH);
	}

	// protected onChildRemoved(msg: ChildMessage): void {
	// 	$(this).data("gridstack").remove_widget(msg.child.node);
	// }
}

//wraps a gridstack item,
class GridstackItemWrapper {
	public item: HTMLElement;
	public container: GridStackContainer;
	constructor(x: number, y: number, width: number, height: number, container: GridStackContainer) {
		this.item = document.createElement("div");
		this.item.classList.add("grid-stack-item");
		this.item.setAttribute("data-gs-x", x.toString());
		this.item.setAttribute("data-gs-y", y.toString());
		this.item.setAttribute("data-gs-width", width.toString());
		this.item.setAttribute("data-gs-height", height.toString());
		this.container = container;
	}
}


class GridstackItemWidget extends Widget {
	public content: Node;
	constructor(x: number, y: number, width: number, height: number) {
		super();
		this.node.classList.add("grid-stack-item");
		this.node.setAttribute("data-gs-x", x.toString());
		this.node.setAttribute("data-gs-y", y.toString());
		this.node.setAttribute("data-gs-width", width.toString());
		this.node.setAttribute("data-gs-height", height.toString());
		this.content = this.node.firstChild;

		//test stuff appears
		var div = document.createElement("div");
		div.innerHTML = "lorem ipsum"
		this.content.appendChild(div);
	}
	static createNode(): HTMLElement {
		var node = document.createElement('div');
		var content = document.createElement('div');
		content.classList.add("grid-stack-item-content");
		node.appendChild(content);
		return node;
	}
}

// function createWidgetGridstackItem (x: number, y: number, width: number, height: number, widget: Widget) {
// 	var gsi = new GridstackItemWidget(x, y, width, height);
// 	gsi.addChild(widget);

// 	var grid = $('.grid-stack').data('gridstack');
// 	console.log(grid);
// 	grid.add_widget(gsi.node, x, y, width, height);
// 	//attachWidget(widget, gsi.innerDiv);
// 	return gsi;
// }

// function createGridstackItem(x: number, y: number, width: number, height: number): HTMLElement {
// 	var gsi = document.createElement("div");
// 	var innerDiv = document.createElement("div");
// 	innerDiv.classList.add("grid-stack-item-content");
// 	gsi.appendChild(innerDiv);
// 	gsi.classList.add("grid-stack-item");
// 	gsi.setAttribute("data-gs-x", x.toString());
// 	gsi.setAttribute("data-gs-y", y.toString());
// 	gsi.setAttribute("data-gs-width", width.toString());
// 	gsi.setAttribute("data-gs-height", height.toString());
// 	return gsi;
// }

// function createRandomWidget(): Widget {
// 	var rand = Math.floor(Math.random() * 3);
// 	console.log(rand);
// 	switch (rand) {
// 		case 0:
// 			return new PolyWidget("dom-element");
// 			break;
// 		case 1:
// 			var widget = new Widget();
// 			return widget;
// 			break;
// 		case 2:
// 			var widget = new Widget();
// 			var div = document.createElement("div");
// 			div.innerHTML = "Hello World, I am a basic widget!";
// 			widget.node.appendChild(div);
// 			return widget;
// 			break;
// 	}
// }

// function createRandomGridstack() {
// 	var widget = createRandomWidget();
// 	var node = {
// 		x: 12 * Math.random(),
// 		y: 5 * Math.random(),
// 		width: 1 + 3 * Math.random(),
// 		height: 1 + 3 * Math.random()
// 	};
// 	var grid = $('.grid-stack').data('gridstack');
// 	var item = grid.add_widget($('<div><div class="grid-stack-item-content" /><div/>'),
// 		node.x, node.y, node.width, node.height);
// 	attachWidget(widget, item.get(0).childNodes[0]);
// }

function createTestSplit(): Widget {
	var w1 = new Widget();
	w1.addClass("red");
	w1.addClass("sized");
	w1.node.innerHTML = "Phosphor";
	var w2 = new Widget();
	w2.addClass("blue");
	w2.addClass("sized");
	w2.node.innerHTML = "Splitpanel";
	var w3 = new Widget();
	w3.addClass("green");
	w3.addClass("sized");
	w3.node.innerHTML = "Example";
	var sp = new SplitPanel();
	sp.orientation = SplitPanel.Horizontal;
	sp.handleSize = 5;
	sp.children = [w1, w2, w3];
	return sp;
}

function createContent(name: string): Widget {
	var widget = new Widget();
	widget.addClass('content');
	widget.addClass(name);
	return widget;
}

function createGridstackWidget(gs: GridStackContainer) {
	var node = {
		x: 12 * Math.random(),
		y: 5 * Math.random(),
		width: 1 + 3 * Math.random(),
		height: 1 + 3 * Math.random()
	};
	//var gsw = createWidgetGridstackItem(node.x, node.y, node.width, node.height, createTestSplit());
	var gsw = new GridstackItemWidget(node.x, node.y, node.width, node.height);
	$(gs.node).data("gridstack").add_widget(gsw.node, node.x, node.y, node.width, node.height);
}


//console.log(GridStackEngine);
var mainDiv = $("#main");
console.log(mainDiv);
var button = '<div><button class="btn btn-primary" id="newElement">Click me!</button></div>';
mainDiv.append(button);

var options = {
	float: true
};

//var w1 = createContent('red');
var w2 = createTestSplit();
var w3 = createContent('blue');
w3.node.appendChild(document.getElementById('myCarousel'));

var w4 = new Widget();
var div = document.createElement("div");
var bootstrapButton = document.createElement("button");
div.appendChild(bootstrapButton);
bootstrapButton.classList.add("btn");
bootstrapButton.classList.add("btn-primary");
bootstrapButton.innerHTML = "Bootstrap Button";
w4.node.appendChild(div);

var w5 = new Widget();
w5.node.appendChild(document.getElementById('map'));

// GridPanel.setRow(<Widget>w1, 0);
// GridPanel.setColumn(w1, 0);

GridPanel.setRow(w2, 0);
GridPanel.setColumn(w2, 0);
GridPanel.setColumnSpan(w2, 2);

GridPanel.setRow(w3, 0);
GridPanel.setColumn(w3, 2);
GridPanel.setRowSpan(w3, 3);

GridPanel.setRow(w4, 4);
GridPanel.setColumn(w4, 0);

GridPanel.setRow(w5, 1);
GridPanel.setColumn(w5, 0);
GridPanel.setRowSpan(w5, 2);
GridPanel.setColumnSpan(w5, 2);


// var gs = new GridStackContainer(options);
// attachWidget(gs, document.getElementById("main"));


var panel = new GridPanel();

//panel.children = [w1, w2, w3, w4, w5];
panel.children = [w2, w3, w4, w5];

panel.rowSpecs = [
    new Spec({ minSize: 50 }),
    new Spec({ minSize: 300 }),
    new Spec({ minSize: 300 }),
    new Spec({ minSize: 50 }),
];

panel.columnSpecs = [
    new Spec({ minSize: 50 }),
    new Spec({ minSize: 50 }),
    new Spec({ minSize: 50 }),
];

attachWidget(panel, document.body);

window.onresize = () => panel.update();

// document.getElementById("newElement").onclick = function() {
// 	var testWidget = new Widget();
// 	testWidget.addChild(createTestSplit());
// 	gs.addChild(testWidget);
// };

// document.getElementById("newElement").onclick = function() {
// 	createRandomGridstack();
// };