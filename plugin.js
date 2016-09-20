(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var getComputedStyle = window.getComputedStyle

module.exports = {
  getComputed: getComputed
}

/**
 * Get real computed style for an element
 * @function
 * @static
 * @param {Element} element The element to look at its computed styles
 * @param {string} [cssRuleName] The css rule name, camel cased.
 * @returns {object|string} The style object or the style value for the given rule name.
 * @see https://developer.mozilla.org/fr/docs/Web/API/Window/getComputedStyle
 * @see https://msdn.microsoft.com/en-us/library/ms535231(v=vs.85).aspx
 */
function getComputed (element, cssRuleName) {
  if (getComputedStyle) {
    if (cssRuleName) {
      return getComputedStyle(element)[cssRuleName]
    } else {
      return getComputedStyle(element)
    }
  } else if (element.currentStyle) {
    if (cssRuleName) {
      return element.currentStyle[cssRuleName]
    } else {
      return element.currentStyle
    }
  } else {
    throw new Error('Error trying to get computed style. It seems your browser doesnt support it.')
  }
}

},{}],2:[function(require,module,exports){
'use strict'

module.exports = {
  setTextIndent: setTextIndent,
  setLineHeight: setLineHeight,
  setPaddings: setPaddings,
  setMargins: setMargins,
  setBorders: setBorders
}

function setTextIndent (dom, paragraph, cssData) {
  // set text indent
  var textIndent = (cssData.textIndent) ? cssData.textIndent + cssData.textIndentUnit : null
  dom.setStyle(paragraph, 'text-indent', textIndent)
}

function setLineHeight (dom, paragraph, cssData) {
  // set line height
  var lineHeight = (cssData.lineHeight) ? cssData.lineHeight + cssData.lineHeightUnit : null
  dom.setStyle(paragraph, 'line-height', lineHeight)
}

function setPaddings (dom, paragraph, cssData) {
  // set padding style
  var padding, paddingTop, paddingRight, paddingBottom, paddingLeft
  paddingTop = (cssData.paddingTop) ? cssData.paddingTop + cssData.paddingTopUnit : null
  paddingRight = (cssData.paddingRight) ? cssData.paddingRight + cssData.paddingRightUnit : null
  paddingBottom = (cssData.paddingBottom) ? cssData.paddingBottom + cssData.paddingBottomUnit : null
  paddingLeft = (cssData.paddingLeft) ? cssData.paddingLeft + cssData.paddingLeftUnit : null

  var allPaddingsDefined = paddingTop && paddingRight && paddingBottom && paddingLeft
  var topEqualsBottom = allPaddingsDefined && (paddingTop === paddingBottom)
  var rightEqualsLeft = allPaddingsDefined && (paddingRight === paddingLeft)
  var allEquals = topEqualsBottom && rightEqualsLeft && (paddingTop === paddingRight)

  if (allPaddingsDefined) {
    if (allEquals) {
      // padding: (top || bottom || right || left)
      padding = paddingTop
    } else if (topEqualsBottom && rightEqualsLeft) {
      // padding: (top || bottom) (right || left)
      padding = [paddingTop, paddingRight].join(' ')
    } else if (rightEqualsLeft) {
      padding = [paddingTop, paddingRight, paddingBottom].join(' ')
    } else {
      // padding: top right bottom left
      padding = [paddingTop, paddingRight, paddingBottom, paddingLeft].join(' ')
    }
    dom.setStyle(paragraph, 'padding', padding)
  } else {
    if (paddingTop) {
      dom.setStyle(paragraph, 'padding-top', paddingTop)
    }
    if (paddingRight) {
      dom.setStyle(paragraph, 'padding-right', paddingRight)
    }
    if (paddingBottom) {
      dom.setStyle(paragraph, 'padding-bottom', paddingBottom)
    }
    if (paddingLeft) {
      dom.setStyle(paragraph, 'padding-left', paddingLeft)
    }
  }
}

function setMargins (dom, paragraph, cssData) {
  // set margin style
  var margin, marginTop, marginRight, marginBottom, marginLeft
  marginTop = (cssData.marginTop) ? cssData.marginTop + cssData.marginTopUnit : null
  marginRight = (cssData.marginRight) ? cssData.marginRight + cssData.marginRightUnit : null
  marginBottom = (cssData.marginBottom) ? cssData.marginBottom + cssData.marginBottomUnit : null
  marginLeft = (cssData.marginLeft) ? cssData.marginLeft + cssData.marginLeftUnit : null

  var allMarginsDefined = marginTop && marginRight && marginBottom && marginLeft
  var topEqualsBottom = allMarginsDefined && (marginTop === marginBottom)
  var rightEqualsLeft = allMarginsDefined && (marginRight === marginLeft)
  var allEquals = topEqualsBottom && rightEqualsLeft && (marginTop === marginRight)

  if (allMarginsDefined) {
    if (allEquals) {
      // margin: (top || bottom || right || left)
      margin = marginTop
    } else if (topEqualsBottom && rightEqualsLeft) {
      // margin: (top || bottom) (right || left)
      margin = [marginTop, marginRight].join(' ')
    } else if (rightEqualsLeft) {
      margin = [marginTop, marginRight, marginBottom].join(' ')
    } else {
      // margin: top right bottom left
      margin = [marginTop, marginRight, marginBottom, marginLeft].join(' ')
    }
    dom.setStyle(paragraph, 'margin', margin)
  } else {
    if (marginTop) {
      dom.setStyle(paragraph, 'margin-top', marginTop)
    }
    if (marginRight) {
      dom.setStyle(paragraph, 'margin-right', marginRight)
    }
    if (marginBottom) {
      dom.setStyle(paragraph, 'margin-bottom', marginBottom)
    }
    if (marginLeft) {
      dom.setStyle(paragraph, 'margin-left', marginLeft)
    }
  }
}

function setBorders (dom, paragraph, cssData) {
  // set border width
  var borderWidth = (cssData.borderWidth) ? cssData.borderWidth + cssData.borderWidthUnit : null
  dom.setStyle(paragraph, 'border-width', borderWidth)

  // set border style
  if (cssData.borderStyle) {
    dom.setStyle(paragraph, 'border-style', cssData.borderStyle)
  }

  // set border color
  if (cssData.borderColor) {
    dom.setStyle(paragraph, 'border-color', cssData.borderColor)
  }
}

},{}],3:[function(require,module,exports){
'use strict'

var $ = window.jQuery

var setStyles = require('./dom/styles/set-styles')

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
      setStyles.setTextIndent(editor.dom, paragraph, data)
      setStyles.setLineHeight(editor.dom, paragraph, data)
      setStyles.setPaddings(editor.dom, paragraph, data)
      setStyles.setMargins(editor.dom, paragraph, data)
      setStyles.setBorders(editor.dom, paragraph, data)
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

},{"./dom/styles/set-styles":2}],4:[function(require,module,exports){
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
  var borderWidthTextBox = uiHelpers.createTextBox('Border width', 'borderWidth', 90)
  var borderWidthUnitSelect = uiHelpers.createUnitSelectBox('borderWidthUnit', 'mm', 140, 140)

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
  var borderStyleListBox = uiHelpers.createListBox('Border style', 'borderStyle', borderStyleValues, borderStyleItemNone, 90)

  // border color picker
  var borderColorPicker = uiHelpers.createColorPicker('Border color', 'borderColor', eventHandlers.createColorPickAction(editor))

  // create form
  var borderForm = uiHelpers.createForm([ borderWidthTextBox, borderWidthUnitSelect, borderStyleListBox, borderColorPicker ])
  // create field set
  var borderFieldset = uiHelpers.createFieldset('', [ borderForm ], 460)

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
  var paddingTopTextBox = uiHelpers.createTextBox('Padding top', 'paddingTop', 65)
  var paddingTopUnitSelect = uiHelpers.createUnitSelectBox('paddingTopUnit', 'mm')
  // padding right
  var paddingRightTextBox = uiHelpers.createTextBox('Padding right', 'paddingRight', 65)
  var paddingRightUnitSelect = uiHelpers.createUnitSelectBox('paddingRightUnit', 'mm')
  // padding bottom
  var paddingBottomTextBox = uiHelpers.createTextBox('Padding bottom', 'paddingBottom', 65)
  var paddingBottomUnitSelect = uiHelpers.createUnitSelectBox('paddingBottomUnit', 'mm')
  // padding left
  var paddingLeftTextBox = uiHelpers.createTextBox('Padding left', 'paddingLeft', 65)
  var paddingLeftUnitSelect = uiHelpers.createUnitSelectBox('paddingLeftUnit', 'mm')

  // margin top
  var marginTopTextBox = uiHelpers.createTextBox('Margin top', 'marginTop', 65)
  var marginTopUnitSelect = uiHelpers.createUnitSelectBox('marginTopUnit', 'mm')
  // margin right
  var marginRightTextBox = uiHelpers.createTextBox('Margin right', 'marginRight', 65)
  var marginRightUnitSelect = uiHelpers.createUnitSelectBox('marginRightUnit', 'mm')
  // margin bottom
  var marginBottomTextBox = uiHelpers.createTextBox('Margin bottom', 'marginBottom', 65)
  var marginBottomUnitSelect = uiHelpers.createUnitSelectBox('marginBottomUnit', 'mm')
  // margin left
  var marginLeftTextBox = uiHelpers.createTextBox('Margin left', 'marginLeft', 65)
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
  var paddingFieldSet = uiHelpers.createFieldset('Padding', [paddingForm], 500)
  // margin fieldset
  var marginFieldSet = uiHelpers.createFieldset('Margins', [marginForm], 500)

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
  var textIndentTextBox = uiHelpers.createTextBox('Text indent', 'textIndent', 65)
  var textIndentUnitSelect = uiHelpers.createUnitSelectBox('textIndentUnit', 'mm')

  // line height form inputs
  var lineHeightTextBox = uiHelpers.createTextBox('Line height', 'lineHeight', 65)
  var lineHeightUnitSelect = uiHelpers.createUnitSelectBox('lineHeightUnit', 'mm')

  // paragraph fieldset form
  var paragraphForm = uiHelpers.createForm([
    textIndentTextBox, textIndentUnitSelect,
    lineHeightTextBox, lineHeightUnitSelect
  ])

  // paragraph fieldset
  var paragraphFieldSet = uiHelpers.createFieldset('', [paragraphForm], 460)
  // general tab
  var generalTab = uiHelpers.createTab('General', [paragraphFieldSet])

  return generalTab
}

},{"../event-handlers":3,"./helpers":5}],5:[function(require,module,exports){
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
 * @param {number} [maxWidth=null] The maximum width for the input
 * @param {number} [minWidth=55] The minimum width for the input
 * @returns {TextBox} textBox The new textBox
 */
function createTextBox (label, name, maxWidth, minWidth) {
  var textBox = {
    label: label,
    name: name,
    maxWidth: maxWidth || null,
    minWidth: minWidth || 55
  }

  return textBox
}

/**
 * Create a select box to select a length unit
 * @method
 * @param {string} inputName - A name to identify the input in the form
 * @param {string} [defaultUnit=pt] - A default unit in (`pt`, `mm`, or `cm`).
 * @param {number} [maxWidth=55] - The maximum width for th input.
 * @param {number} [minWidth=55] - The minimum width for th input.
 * @returns {SelectBox} unitSelectBox The new unit select box.
 */
function createUnitSelectBox (inputName, defaultUnit, maxWidth, minWidth) {
  defaultUnit = defaultUnit || 'pt'
  return {
    label: 'Unit',
    name: inputName,
    type: 'listbox',
    minWidth: minWidth || 55,
    maxWidth: maxWidth || 55,
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
 * @param {number} [maxWidth=null] The maximum with for the fieldset, in pixels
 * @returns {Fieldset} fieldset The new field set
 */
function createFieldset (title, items, maxWidth) {
  var fieldset = {
    type: 'fieldset',
    title: title,
    items: items,
    maxWidth: maxWidth || null
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
 * @param {number} [maxWidth=null] The maximum width for the input
 * @returns
 */
function createListBox (label, name, values, defaultItem, maxWidth) {
  return {
    label: label,
    name: name,
    type: 'listbox',
    text: 'None',
    minWidth: 90,
    maxWidth: maxWidth,
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
    minWidth: 140,
    maxWidth: 140,
    onaction: callback
  }
}

},{}],6:[function(require,module,exports){
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

},{"../event-handlers":3,"../units":7,"./components":4}],7:[function(require,module,exports){
'use strict'

var getStyles = require('./dom/styles/get-styles')

var document = window.document

createDpiTestElements()

module.exports = {
  getUnitValues: getUnitValues,
  getValueFromStyle: getValueFromStyle,
  getUnitFromStyle: getUnitFromStyle,
  setFormValueWithUnit: setFormValueWithUnit,
  setFormValueWithoutUnit: setFormValueWithoutUnit,
  px2pt: px2pt,
  px2in: px2in,
  in2pt: in2pt,
  getDpi: getDpi
}

function getUnitValues () {
  return [
    {text: 'pt', value: 'pt'},
    {text: 'cm', value: 'cm'},
    {text: 'mm', value: 'mm'}
  ]
}

/**
 * Get the numerc value of a style value with unit (remove the 2-digits unit and cast as number)
 * For example, returns `11` from a style value of `11px`
 * @method
 * @static
 * @param {string} styleValue A style value with a 2-digits unit
 * @returns {number} - The absolute value of the given style value
 */
function getValueFromStyle (styleValue) {
  return styleValue.slice(0, styleValue.length - 2)
}

/**
 * Get the 2-digit unit representation of a style value with unit.
 * For example, returns `px` from a style value of `11px`
 * @method
 * @static
 * @param {string} styleValue A style value with a 2-digits unit
 * @returns {string} - The unit as a 2-digits representation
 */
function getUnitFromStyle (styleValue) {
  return styleValue.slice(styleValue.length - 2, styleValue.length)
}

function setFormValueWithUnit (dom, paragraph, formData, cssPropertyName, propertyName, defaultValue) {
  var _style, computedStyleValue
  if (defaultValue === undefined) {
    defaultValue = '0'
  }
  var rawCssValue = dom.getStyle(paragraph, cssPropertyName)
  var computedStyle = getStyles.getComputed(paragraph, cssPropertyName)

  if (!rawCssValue && computedStyle) {
    computedStyleValue = px2pt(getValueFromStyle(computedStyle))
    _style = computedStyleValue + 'pt'
  } else {
    _style = rawCssValue
  }

  if (_style !== '') {
    var unitPropertyName = propertyName + 'Unit'
    formData[propertyName] = getValueFromStyle(_style)
    formData[unitPropertyName] = getUnitFromStyle(_style)
  } else {
    formData[propertyName] = defaultValue
  }
}

/**
 * Set form value, for a value without unit
 * @method
 * @static
 * @param {object} dom The dom object of the tinymce active editor
 * @param {DOMElement} paragraph The paragraph element
 * @param {object} formData A hash containing all needed sets of css property names and values (camelCased)
 * @param {string} cssPropertyName The css property name (ex: `border-style`) which doesnt work with units
 * @param {string} propertyName The camelCased property name (ex: `borderStyle`)
 * @param {string} [defaultValue] An optional default value
 * @returns undefined
 */
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

/**
 * Converts pixels (px) to points (pt)
 * px -> in -> pt
 * @method
 * @static
 * @param {number} px Number of pixels to convert to points
 * @returns {number} - Resulting number of points (pt)
 */
function px2pt (px) {
  var inches = px2in(px)
  return in2pt(inches)
}

/**
 * Converts pixels (px) to inches (in)
 * dpi = px / in -> in = px / dpi
 * @method
 * @static
 * @param {number} px Number of pixels to convert to inches
 * @returns {number} - Resulting number of inches (in)
 */
function px2in (px) {
  var dpi = getDpi()
  return Number(px) / Number(dpi)
}

/**
 * Converts inches (in) to points (pt)
 * 72 = pt / in -> pt = 72 * in
 * @method
 * @static
 * @param {number} inches Number of inches (in) to convet to points (pt)
 * @returns {number} - Resulting number of points (pt)
 */
function in2pt (inches) {
  return Number(inches) * 72
}

/**
 * Evaluate the DPI of the device's screen (pixels per inche).
 * It creates and inpect a dedicated and hidden `data-dpi-test` DOM element to
 * deduct the screen DPI.
 * @method
 * @static
 * @returns {number} - The current screen DPI, so in pixels per inch.
 */
function getDpi () {
  return document.getElementById('dpi-test').offsetHeight
}

/**
 * @function
 * @inner
 */
function createDpiTestElements () {
  var getDpiHtmlStyle = 'data-dpi-test { height: 1in; left: -100%; position: absolute; top: -100%; width: 1in; }'

  var head = document.getElementsByTagName('head')[0]
  var getDPIElement = document.createElement('style')
  getDPIElement.setAttribute('type', 'text/css')
  getDPIElement.setAttribute('rel', 'stylesheet')
  getDPIElement.innerHTML = getDpiHtmlStyle
  head.appendChild(getDPIElement)

  var body = document.getElementsByTagName('body')[0]
  var dpiTestElement = document.createElement('data-dpi-test')
  dpiTestElement.setAttribute('id', 'dpi-test')
  body.appendChild(dpiTestElement)
}

},{"./dom/styles/get-styles":1}],8:[function(require,module,exports){
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

},{"./lib/event-handlers":3,"./lib/ui/main-window":6}]},{},[8]);
