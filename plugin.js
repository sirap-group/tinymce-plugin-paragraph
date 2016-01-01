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
			bodyType: 'tabpanel',
			title: 'Paragraph properties',
			data: {
				indent: editor.dom.getStyle(paragraph,'text-indent'),
				linespacing: editor.dom.getStyle(paragraph,'line-height'),
				padding: editor.dom.getStyle(paragraph,'padding'),
				margin: editor.dom.getStyle(paragraph,'margin'),
				borderwidth: editor.dom.getStyle(paragraph,'border-width'),
				bordercolor: editor.dom.getStyle(paragraph,'border-color')
			},
			body: [{
					title: 'Spacings',
					type: 'form',
					items: spacingsTab
				},{
					title: 'Borders',
					type: 'form',
					items: bordersTab
			}],
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
	function createUnitSelectBox(inputName){
		return {
			label: 'Unit',
			name: inputName,
			type: 'listbox',
			text: 'None',
			minWidth: 90,
			maxWidth: null,
			values: [
				{text: 'pt', value: 'pt'},
				{text: 'cm', value: 'cm'},
				{text: 'mm', value: 'mm'}
			]
		}
	}

	var spacingsTab = {
		type: 'form',
		layout: 'flex',
		direction: 'column',
		labelGapCalc: 'children',
		padding: 0
	};
	var bordersTab = {
		type: 'form',
		layout: 'flex',
		direction: 'column',
		labelGapCalc: 'children',
		padding: 0
	};

	function createFieldset(title, items){
		return {
			type: 'fieldset',
			title: title,
			items: items
		};
	}

	function createForm(items){
		return {
			type: 'form',
			labelGapCalc: false,
			padding: 0,
			layout: 'grid',
			columns: 2,
			defaults: {
				type: 'textbox',
				maxWidth: 100
			},
			items: items
		};
	}

	spacingsTab.items = [
		createFieldset('Paragraph',[createForm([
			{label: 'Indent', name: 'indent'}, createUnitSelectBox('indentUnit'),
			{label: 'Line spacing', name: 'linespacing'}, createUnitSelectBox('linespacingUnit')
		])]),
		createFieldset('paddings',[createForm([
			{
				label: 'Padding',
				name: 'padding'
			},{
				label: 'Unit',
				name: 'paddingUnit',
				type: 'listbox',
				text: 'None',
				minWidth: 90,
				maxWidth: null,
				values: [
					{text: 'pt', value: 'pt'},
					{text: 'cm', value: 'cm'},
					{text: 'mm', value: 'mm'}
				]
			}
		])]),
		createFieldset('margins',[createForm([
			{
				label: 'Margin',
				name: 'margin'
			},{
				label: 'Unit',
				name: 'marginUnit',
				type: 'listbox',
				text: 'None',
				minWidth: 90,
				maxWidth: null,
				values: [
					{text: 'pt', value: 'pt'},
					{text: 'cm', value: 'cm'},
					{text: 'mm', value: 'mm'}
				]
			}
		])])
	];

	bordersTab.items = [{
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
			{label: 'Border width', name: 'borderwidth'},
			{label: 'Border color', name: 'bordercolor', type: 'colorbox', onaction: createColorPickAction()}
		]
	}];


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
