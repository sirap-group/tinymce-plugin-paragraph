(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var $ = window.jQuery

module.exports = {
  ensureParagraphWrapsTextNodeOnChange: ensureParagraphWrapsTextNodeOnChange,
  processAllChangesOnMainWinSubmit: processAllChangesOnMainWinSubmit,
  createColorPickAction: createColorPickAction
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

/**
 * Make the `processAllChanges` event handler function as a closure.
 * @method
 * @static
 * @param {Editor} editor The tinymce active editor instance
 * @param {DomElement} paragraph The selected paragraph
 * @returns {function} processAllChanges The event handler as a closure
 */
function processAllChangesOnMainWinSubmit (editor, paragraph) {
  return processAllChanges

  /**
   * Process all changes on the properties of the selected paragraph
   * @function
   * @inner
   * @returns {undefined}
   */
  function processAllChanges () {
    // get form data
    var data = this.toJSON()

    // process all changes in a undo/redo transaction
    editor.undoManager.transact(function () {
      // set text indent
      if (data.textIndent) {
        editor.dom.setStyle(paragraph, 'text-indent', data.textIndent + data.textIndentUnit)
      }

      // set line height
      if (data.lineHeight) {
        editor.dom.setStyle(paragraph, 'line-height', data.lineHeight + data.lineHeightUnit)
      }

      // set padding style
      var padding = ''
      padding += String((data.paddingTop) ? data.paddingTop + data.paddingTopUnit : '0').concat(' ')
      padding += String((data.paddingRight) ? data.paddingRight + data.paddingRightUnit : '0').concat(' ')
      padding += String((data.paddingBottom) ? data.paddingBottom + data.paddingBottomUnit : '0').concat(' ')
      padding += String((data.paddingLeft) ? data.paddingLeft + data.paddingLeftUnit : '0')
      editor.dom.setStyle(paragraph, 'padding', padding)

      // set margin style
      var margin = ''
      margin += String((data.marginTop) ? data.marginTop + data.marginTopUnit : '0').concat(' ')
      margin += String((data.marginRight) ? data.marginRight + data.marginRightUnit : '0').concat(' ')
      margin += String((data.marginBottom) ? data.marginBottom + data.marginBottomUnit : '0').concat(' ')
      margin += String((data.marginLeft) ? data.marginLeft + data.marginLeftUnit : '0')
      editor.dom.setStyle(paragraph, 'margin', margin)

      // set borders style
      if (data.borderWidth) {
        editor.dom.setStyle(paragraph, 'border-width', data.borderWidth + data.borderWidthUnit)
      }
      if (data.borderStyle) {
        editor.dom.setStyle(paragraph, 'border-style', data.borderStyle)
      }
      if (data.borderColor) {
        editor.dom.setStyle(paragraph, 'border-color', data.borderColor)
      }
    })
  }
}

/**
 * @function
 * @param
 * @returns
 */
function createColorPickAction (editor) {
  var colorPickerCallback = editor.settings.color_picker_callback
  if (colorPickerCallback) {
    return colorPickAction
  }

  /**
   * @function
   * @inner
   */
  function colorPickAction () {
    var value = this.value()
    colorPickerCallback.call(editor, setValueAndFireChange.bind(this), value)
  }

  /**
   * @function
   * @inner
   */
  function setValueAndFireChange (value) {
    this.value(value).fire('change')
  }
}

},{}],2:[function(require,module,exports){
'use strict'

var uiHelpers = require('./helpers')
var eventHandlers = require('../event-handlers')

module.exports = {
  createBordersTab: createBordersTab,
  createSpacingTab: createSpacingTab,
  createGeneralTab: createGeneralTab
}

/**
 * Create the borders tab
 * @method
 * @param {Editor} editor The tinymce active editor instance
 * @returns {Tab} borderTab The new border tab
 */
function createBordersTab (editor) {
  // border width form inputs
  var borderWidthTextBox = uiHelpers.createTextBox('Border width', 'borderWidth')
  var borderWidthUnitSelect = uiHelpers.createUnitSelectBox('borderWidthUnit', 'mm')

  // border style
  var borderStyleItemNone = uiHelpers.createListBoxItem('none')
  var borderStyleItemHidden = uiHelpers.createListBoxItem('hidden')
  var borderStyleItemDotted = uiHelpers.createListBoxItem('dotted')
  var borderStyleItemDashed = uiHelpers.createListBoxItem('dashed')
  var borderStyleItemSolid = uiHelpers.createListBoxItem('solid')
  var borderStyleItemDouble = uiHelpers.createListBoxItem('double')
  var borderStyleItemGroove = uiHelpers.createListBoxItem('groove')
  var borderStyleItemRidge = uiHelpers.createListBoxItem('ridge')
  var borderStyleItemInset = uiHelpers.createListBoxItem('inset')
  var borderStyleItemOutset = uiHelpers.createListBoxItem('outset')
  var borderStyleValues = [
    borderStyleItemNone, borderStyleItemHidden, borderStyleItemDotted,
    borderStyleItemDashed, borderStyleItemSolid, borderStyleItemDouble,
    borderStyleItemGroove, borderStyleItemRidge, borderStyleItemInset,
    borderStyleItemOutset
  ]
  var borderStyleListBox = uiHelpers.createListBox('Border style', 'borderStyle', borderStyleValues, borderStyleItemNone)

  // border color picker
  var borderColorPicker = uiHelpers.createColorPicker('Border color', 'borderColor', eventHandlers.createColorPickAction(editor))

  // create form
  var borderForm = uiHelpers.createForm([ borderWidthTextBox, borderWidthUnitSelect, borderStyleListBox, borderColorPicker ])
  // create field set
  var borderFieldset = uiHelpers.createFieldset('', [ borderForm ])

  // create border tab
  var borderTab = uiHelpers.createTab('Borders', borderFieldset)

  return borderTab
}

/**
* Create the spacing tab
 * @method
 * @static
 * @returns {Tab} spacingTab The new spacing tab
 */
function createSpacingTab () {
  // padding top
  var paddingTopTextBox = uiHelpers.createTextBox('Padding top', 'paddingTop')
  var paddingTopUnitSelect = uiHelpers.createUnitSelectBox('paddingTopUnit', 'mm')
  // padding right
  var paddingRightTextBox = uiHelpers.createTextBox('Padding right', 'paddingRight')
  var paddingRightUnitSelect = uiHelpers.createUnitSelectBox('paddingRightUnit', 'mm')
  // padding bottom
  var paddingBottomTextBox = uiHelpers.createTextBox('Padding bottom', 'paddingBottom')
  var paddingBottomUnitSelect = uiHelpers.createUnitSelectBox('paddingBottomUnit', 'mm')
  // padding left
  var paddingLeftTextBox = uiHelpers.createTextBox('Padding left', 'paddingLeft')
  var paddingLeftUnitSelect = uiHelpers.createUnitSelectBox('paddingLeftUnit', 'mm')

  // margin top
  var marginTopTextBox = uiHelpers.createTextBox('Margin top', 'marginTop')
  var marginTopUnitSelect = uiHelpers.createUnitSelectBox('marginTopUnit', 'mm')
  // margin right
  var marginRightTextBox = uiHelpers.createTextBox('Margin right', 'marginRight')
  var marginRightUnitSelect = uiHelpers.createUnitSelectBox('marginRightUnit', 'mm')
  // margin bottom
  var marginBottomTextBox = uiHelpers.createTextBox('Margin bottom', 'marginBottom')
  var marginBottomUnitSelect = uiHelpers.createUnitSelectBox('marginBottomUnit', 'mm')
  // margin left
  var marginLeftTextBox = uiHelpers.createTextBox('Margin left', 'marginLeft')
  var marginLeftUnitSelect = uiHelpers.createUnitSelectBox('marginLeftUnit', 'mm')

  // padding form
  var paddingForm = uiHelpers.createForm([
    paddingTopTextBox, paddingTopUnitSelect,
    paddingRightTextBox, paddingRightUnitSelect,
    paddingBottomTextBox, paddingBottomUnitSelect,
    paddingLeftTextBox, paddingLeftUnitSelect
  ])

  // margin form
  var marginForm = uiHelpers.createForm([
    marginTopTextBox, marginTopUnitSelect,
    marginRightTextBox, marginRightUnitSelect,
    marginBottomTextBox, marginBottomUnitSelect,
    marginLeftTextBox, marginLeftUnitSelect
  ])

  // padding fieldset
  var paddingFieldSet = uiHelpers.createFieldset('Padding', [paddingForm])
  // margin fieldset
  var marginFieldSet = uiHelpers.createFieldset('Margins', [marginForm])

  // spacing tab
  var spacingTab = uiHelpers.createTab('Spacing', [paddingFieldSet, marginFieldSet])

  return spacingTab
}

/**
 * Create the general tab component that show form inputs for:
 * - text indent,
 * - line spacing
 * @method
 * @returns {TabPanel} generalTab
 */
function createGeneralTab () {
  // text indent form inputs
  var textIndentTextBox = uiHelpers.createTextBox('Text indent', 'textIndent')
  var textIndentUnitSelect = uiHelpers.createUnitSelectBox('textIndentUnit', 'mm')

  // line spacing form inputs
  var lineHeightTextBox = uiHelpers.createTextBox('Line height', 'lineHeight')
  var lineSpacingUnitSelect = uiHelpers.createUnitSelectBox('lineSpacingUnit', 'mm')

  // paragraph fieldset form
  var paragraphForm = uiHelpers.createForm([
    textIndentTextBox, textIndentUnitSelect,
    lineHeightTextBox, lineSpacingUnitSelect
  ])

  // paragraph fieldset
  var paragraphFieldSet = uiHelpers.createFieldset('Paragraph', [paragraphForm], 500)
  // general tab
  var generalTab = uiHelpers.createTab('General', [paragraphFieldSet])

  return generalTab
}

},{"../event-handlers":1,"./helpers":3}],3:[function(require,module,exports){
/**
 * This file contains the source code for the module `lib/ui/helpers`
 * @file
 * @author "Rémi Becheras <rbecheras@sirap.fr>"
 * @copyright 2016 © Groupe SIRAP, tout droits réservés
 * @see module:lib/ui/helpers
 */

/**
 * This module exports some useful UI helplers to create UI components
 * @module lib/ui/helpers
 */

'use strict'

module.exports = {
  createTextBox: createTextBox,
  createUnitSelectBox: createUnitSelectBox,
  createTab: createTab,
  createFieldset: createFieldset,
  createForm: createForm,
  createListBox: createListBox,
  createListBoxItem: createListBoxItem,
  createColorPicker: createColorPicker
}

/**
 * Create a simple text box
 * @method
 * @param {string} label The textBox label
 * @param {string} name The textBox name
 * @returns {TextBox} textBox The new textBox
 */
function createTextBox (label, name) {
  return {
    label: label,
    name: name
  }
}

/**
 * Create a select box to select a length unit
 * @method
 * @param {string} inputName - A name to identify the input in the form
 * @param {string} [defaultUnit=pt] - A default unit in (`pt`, `mm`, or `cm`).
 * @returns {SelectBox} unitSelectBox The new unit select box.
 */
function createUnitSelectBox (inputName, defaultUnit) {
  defaultUnit = defaultUnit || 'pt'
  return {
    label: 'Unit',
    name: inputName,
    type: 'listbox',
    minWidth: 90,
    maxWidth: 90,
    values: [
      {text: 'pt', value: 'pt'},
      {text: 'cm', value: 'cm'},
      {text: 'mm', value: 'mm'}
    ],
    text: defaultUnit,
    value: defaultUnit
  }
}

/**
 * @function
 * @param
 * @returns
 */
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

/**
 * Create a field set
 * @method
 * @param {string} title The field set title
 * @param {array<object>} items The field items to put in the field set
 * @param {number} [maxWidth] The maximum with for the fieldset, in pixels
 * @returns {Fieldset} fieldset The new field set
 */
function createFieldset (title, items, maxWidth) {
  var fieldset = {
    type: 'fieldset',
    title: title,
    items: items
  }
  if (maxWidth) {
    fieldset.maxWidth = 500
  }
  return fieldset
}

/**
 * @function
 * @param
 * @returns
 */
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

/**
 * @method
 * @static
 * @param {string} label The label for the list box
 * @param {string} name The name of the list box to identify it in the form
 * @param {array<ListBoxItem>} values An array of list box items
 * @param {ListBoxItem} [defaultItem=N/A] An item to select as default value
 * @returns
 */
function createListBox (label, name, values, defaultItem) {
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

/**
 * Create an item for createListBox() values array
 * @param {string} text The text shown for the item
 * @param {string|number} value A value for the item
 * @return {ListBoxItem}
 */
function createListBoxItem (text, value) {
  if (value === undefined) {
    value = text
  }
  var item = {
    text: text,
    value: value
  }
  return item
}

/**
 * Create a color picker
 * @method
 * @param {string} label The label for the color picker
 * @param {string} name The name to identify the color picker in the form set
 * @returns {ColorPicker} colorPicker The new color picker
 */
function createColorPicker (label, name, callback) {
  return {
    type: 'colorbox',
    label: label,
    name: name,
    onaction: callback
  }
}

},{}],4:[function(require,module,exports){
'use strict'

var eventHandlers = require('../event-handlers')
var units = require('../units')
var uiComponents = require('./components')
// var uiHelpers = require('./helpers')

var $ = window.jQuery

module.exports = {
  openMainWinFunction: openMainWinFunction
}

/**
 * Make the openMainWin function as a closure
 * @method
 * @param {Editor} editor The tinymce active editor instance
 * @returns {function} openMainWin The openMainWin closure function
 */
function openMainWinFunction (editor) {
  return openMainWin

  /**
   * Open the main paragraph properties window
   * @function
   * @inner
   * @returns {undefined}
   */
  function openMainWin () {
    var paragraph = editor.dom.getParent(editor.selection.getStart(), 'p')
    var paragraphStyleData = {}

    var valuesWithUnits = [
      ['text-indent', 'textIndent'],
      ['line-height', 'lineHeight'],
      ['padding-top', 'paddingTop'],
      ['padding-right', 'paddingRight'],
      ['padding-bottom', 'paddingBottom'],
      ['padding-left', 'paddingLeft'],
      ['margin-top', 'marginTop'],
      ['margin-right', 'marginRight'],
      ['margin-bottom', 'marginBottom'],
      ['margin-left', 'marginLeft'],
      ['border-width', 'borderWidth']
    ]
    $.each(valuesWithUnits, function setEachFormValueWithUnit (i, item) {
      var defaultValue = (item.length === 3) ? item[2] : undefined
      units.setFormValueWithUnit(editor.dom, paragraph, paragraphStyleData, item[0], item[1], defaultValue)
    })

    // var defaultBorderStyleItem = uiHelpers.createListBoxItem('none')
    var valuesWithoutUnits = [
      ['border-style', 'borderStyle', 'none'],
      ['border-color', 'borderColor', 'green']
    ]
    $.each(valuesWithoutUnits, function setEachFormValueWithoutUnit (i, item) {
      var defaultValue = (item.length === 3) ? item[2] : undefined
      units.setFormValueWithoutUnit(editor.dom, paragraph, paragraphStyleData, item[0], item[1], defaultValue)
    })

    var generalTab = uiComponents.createGeneralTab(paragraphStyleData)
    var spacingsTab = uiComponents.createSpacingTab(paragraphStyleData)
    var bordersTab = uiComponents.createBordersTab(editor, paragraphStyleData)

    editor.windowManager.open({
      bodyType: 'tabpanel',
      title: 'Paragraph properties',
      body: [ generalTab, spacingsTab, bordersTab ],
      data: paragraphStyleData,
      onsubmit: eventHandlers.processAllChangesOnMainWinSubmit(editor, paragraph)
    })
  }
}

},{"../event-handlers":1,"../units":5,"./components":2}],5:[function(require,module,exports){
'use strict'

module.exports = {
  getUnitValues: getUnitValues,
  setFormValueWithUnit: setFormValueWithUnit,
  setFormValueWithoutUnit: setFormValueWithoutUnit
}

function getUnitValues () {
  return [
    {text: 'pt', value: 'pt'},
    {text: 'cm', value: 'cm'},
    {text: 'mm', value: 'mm'}
  ]
}

function setFormValueWithUnit (dom, paragraph, formData, cssPropertyName, propertyName, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = '0'
  }
  var rawCssValue = dom.getStyle(paragraph, cssPropertyName)
  if (rawCssValue !== '') {
    var unitPropertyName = propertyName + 'Unit'
    formData[propertyName] = rawCssValue.slice(0, rawCssValue.length - 2)
    formData[unitPropertyName] = rawCssValue.slice(rawCssValue.length - 2, rawCssValue.length)
  } else {
    formData[propertyName] = defaultValue
  }
}

function setFormValueWithoutUnit (dom, paragraph, formData, cssPropertyName, propertyName, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = ''
  }
  var rawCssValue = dom.getStyle(paragraph, cssPropertyName)
  if (rawCssValue !== '') {
    formData[propertyName] = rawCssValue
  } else {
    formData[propertyName] = defaultValue
  }
}

},{}],6:[function(require,module,exports){
/**
 * Plugin source main file
 * @file
 *
 * @author "Rémi Becheras <rbecheras@sirap.fr>"
 * @license Released under LGPL License.
 * @copyright Copyright (c) 2015-2016 SIRAP SAS All rights reserved
 *
 * @see Repository: https://github.com/sirap-group/tinymce-plugin-paragraph
 * @see License: http://www.tinymce.com/license
 * @see Contributing: http://www.tinymce.com/contributing
 */

// var uiComponents = require('./lib/ui/components')
var mainWindow = require('./lib/ui/main-window')
var eventHandlers = require('./lib/event-handlers')

var tinymce = window.tinymce

tinymce.PluginManager.add('paragraph', ParagraphPlugin)

function ParagraphPlugin (editor) {
  // Check if selected text node is a direct chid of a div element.
  // If it does, wrap the text node in a new p element
  editor.on('change', eventHandlers.ensureParagraphWrapsTextNodeOnChange(editor))

  editor.addMenuItem('paragraph', {
    separator: 'before',
    text: 'Paragraph properties',
    context: 'format',
    onclick: mainWindow.openMainWinFunction(editor)
  })
}

},{"./lib/event-handlers":1,"./lib/ui/main-window":4}]},{},[6]);
