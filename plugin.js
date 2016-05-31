/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 2015 SIRAP SAS All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

var tinymce = window.tinymce
var $ = window.jQuery

tinymce.PluginManager.add('paragraph', ParagraphPlugin)

function ParagraphPlugin (editor) {
  var generalTab = createGeneralTab()
  var spacingsTab = createSpacingTab()
  var bordersTab = createBordersTab(editor)

  // Check if selected text node is a direct chid of a div element.
  // If it does, wrap the text node in a new p element
  editor.on('change', ensureParagraphWrapsTextNodeOnChange(editor))

  editor.addMenuItem('paragraph', {
    separator: 'before',
    text: 'Paragraphe',
    context: 'format',
    onclick: openMainWinFunction(editor, generalTab, spacingsTab, bordersTab)
  })
}

function createBordersTab (editor) {
  return createTab('Borders', [{
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
      {label: 'Border color', name: 'bordercolor', type: 'colorbox', onaction: createColorPickAction(editor)}
    ]
  }])
}
function createSpacingTab () {
  return createTab('Spacing', [
    createFieldset('Padding', [createForm([
      { label: 'Padding top', name: 'paddingTop' }, createListBox('Unit', 'paddingTopUnit', getUnitValues()),
      { label: 'Padding right', name: 'paddingRight' }, createListBox('Unit', 'paddingRightUnit', getUnitValues()),
      { label: 'Padding bottom', name: 'paddingBottom' }, createListBox('Unit', 'paddingBottomUnit', getUnitValues()),
      { label: 'Padding left', name: 'paddingLeft' }, createListBox('Unit', 'paddingLeftUnit', getUnitValues())
    ])]),
    createFieldset('Margin', [createForm([
      { label: 'Margin top', name: 'marginTop' }, createListBox('Unit', 'marginTopUnit', getUnitValues()),
      { label: 'Margin right', name: 'marginRight' }, createListBox('Unit', 'marginRightUnit', getUnitValues()),
      { label: 'Margin bottom', name: 'marginBottom' }, createListBox('Unit', 'marginBottomUnit', getUnitValues()),
      { label: 'Margin left', name: 'marginLeft' }, createListBox('Unit', 'marginLeftUnit', getUnitValues())
    ])])
  ])
}
function createGeneralTab () {
  return createTab('General', [
    createFieldset('Paragraph', [createForm([
      {label: 'Indent', name: 'indent'}, createUnitSelectBox('indentUnit'),
      {label: 'Line spacing', name: 'linespacing'}, createUnitSelectBox('linespacingUnit')
    ])])
  ])
}
function createColorPickAction (editor) {
  var colorPickerCallback = editor.settings.color_picker_callback
  if (colorPickerCallback) {
    return function () {
      var self = this
      colorPickerCallback.call(
        editor,
        function (value) {
          self.value(value).fire('change')
        },
        self.value()
      )
    }
  }
}
function openMainWinFunction (editor, generalTab, spacingsTab, bordersTab) {
  return function openMainWin () {
    var paragraph = editor.dom.getParent(editor.selection.getStart(), 'p')
    // console.log('paragraph',paragraph)

    editor.windowManager.open({
      bodyType: 'tabpanel',
      title: 'Paragraph properties',
      body: [ generalTab, spacingsTab, bordersTab ],
      data: {
        indent: editor.dom.getStyle(paragraph, 'text-indent'),
        linespacing: editor.dom.getStyle(paragraph, 'line-height'),
        padding: editor.dom.getStyle(paragraph, 'padding'),
        margin: editor.dom.getStyle(paragraph, 'margin'),
        borderwidth: editor.dom.getStyle(paragraph, 'border-width'),
        bordercolor: editor.dom.getStyle(paragraph, 'border-color')
      },
      onsubmit: function (evt) {
        editor.dom.setStyle(paragraph, 'text-indent', evt.data.indent)
        editor.dom.setStyle(paragraph, 'line-height', evt.data.linespacing)
        editor.dom.setStyle(paragraph, 'padding', evt.data.padding)
        editor.dom.setStyle(paragraph, 'margin', evt.data.margin)
        editor.dom.setStyle(paragraph, 'border-width', evt.data.borderwidth)
        if (evt.data.borderwidth) {
          editor.dom.setStyle(paragraph, 'border-style', 'solid')
        }
        editor.dom.setStyle(paragraph, 'border-color', evt.data.bordercolor)
      }
    })
  }
}
function ensureParagraphWrapsTextNodeOnChange (editor) {
  return function ensureParagraphWrapsTextNode (changeEvt) {
    // var parentNode
    var currentNode, pTag
    var currentRange = editor.selection.getRng()

    if (currentRange.startContainer === currentRange.endContainer && currentRange.startContainer.nodeName === '#text') {
      currentNode = currentRange.startContainer
      if (currentNode.parentElement && currentNode.parentElement.nodeName === 'DIV') {
        pTag = $('<p></p>')
        $(currentNode).wrap(pTag)
      }
    }
  }
}
function createUnitSelectBox (inputName) {
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
function createTab (title, fieldsets, direction) {
  return {
    title: title,
    type: 'form',
    items: {
      type: 'form',
      // layout: 'flex',
      direction: direction || 'collumn',
      labelGapCalc: 'children',
      padding: 0,
      items: fieldsets
    }
  }
}
function createFieldset (title, items) {
  return {
    type: 'fieldset',
    title: title,
    items: items
  }
}
function createForm (items) {
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
  }
}
function createListBox (label, name, values) {
  return {
    label: label,
    name: name,
    type: 'listbox',
    text: 'None',
    minWidth: 90,
    maxWidth: null,
    values: values
  }
}
function getUnitValues () {
  return [
    {text: 'pt', value: 'pt'},
    {text: 'cm', value: 'cm'},
    {text: 'mm', value: 'mm'}
  ]
}
