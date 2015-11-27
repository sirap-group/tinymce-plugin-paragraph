/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 2015 SIRAP SAS All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('paragraph', function(editor) {

	function createColorPickAction() {
		var colorPickerCallback = editor.settings.color_picker_callback;
		if (colorPickerCallback) {
			return function() {
				var self = this;
				colorPickerCallback.call(
					editor,
					function(value) {
						self.value(value).fire('change');
					},
					self.value()
				);
			};
		}
	}
	function openMainWin(){
		var paragraph = editor.dom.getParent(editor.selection.getStart(),'p');
		// console.log('paragraph',paragraph);

		editor.windowManager.open({
			title: "Paragraph properties",
			// bodyType: 'tabpanel',
			data: {
				indent: editor.dom.getStyle(paragraph,'text-indent'),
				linespacing: editor.dom.getStyle(paragraph,'line-height'),
				padding: editor.dom.getStyle(paragraph,'padding'),
				margin: editor.dom.getStyle(paragraph,'margin'),
				borderwidth: editor.dom.getStyle(paragraph,'border-width'),
				bordercolor: editor.dom.getStyle(paragraph,'border-color')
			},
			body: generalParagraphForm,
			onsubmit: function(evt){
				editor.dom.setStyle(paragraph,'text-indent',evt.data.indent);
				editor.dom.setStyle(paragraph,'line-height',evt.data.linespacing);
				editor.dom.setStyle(paragraph,'padding',evt.data.padding);
				editor.dom.setStyle(paragraph,'margin',evt.data.margin);
				editor.dom.setStyle(paragraph,'border-width',evt.data.borderwidth);
				if (evt.data.borderwidth) {
					editor.dom.setStyle(paragraph,'border-style','solid');
				}
				editor.dom.setStyle(paragraph,'border-color',evt.data.bordercolor);
			}
		});
	}
	function div2p(changeEvt){
		if (changeEvt.lastLevel) {
			var selectedParagraph = editor.dom.getParent(editor.selection.getStart(),'p,div');
			if (selectedParagraph.tagName === 'DIV'){
				editor.dom.rename(selectedParagraph,'p');
			}
		}
	}

	var generalParagraphForm = {
		type: 'form',
		layout: 'flex',
		direction: 'column',
		labelGapCalc: 'children',
		padding: 0,
		items: [
			{
				type: 'form',
				labelGapCalc: false,
				padding: 0,
				layout: 'grid',
				columns: 2,
				defaults: {
					type: 'textbox',
					maxWidth: 100
				},
				items: [
					{label: 'Indent', name: 'indent'},
					{label: 'Line spacing', name: 'linespacing'},
					{label: 'Padding', name: 'padding'},
					{label: 'Margin', name: 'margin'},
					{label: 'Border width', name: 'borderwidth'},
					{label: 'Border color', name: 'bordercolor', type: 'colorbox', onaction: createColorPickAction()},
				]
			}
		]
	};

	// change DIV blocks in P on their content changes
	// don't transform outer div elements that can contains tables and paragraphs
	editor.on('change',div2p);

	editor.addMenuItem('paragraph', {
		separator: 'before',
		text: 'Paragraphe',
		context: 'format',
		onclick: openMainWin
	});

});
