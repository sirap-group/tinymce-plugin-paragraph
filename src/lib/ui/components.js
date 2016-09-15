'use strict'

var uiHelpers = require('./helpers')
var eventHandlers = require('../event-handlers')
var units = require('../units')

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
 * @function
 * @param
 * @returns
 */
function createSpacingTab () {
  return uiHelpers.createTab('Spacing', [
    uiHelpers.createFieldset('Padding', [uiHelpers.createForm([
      { label: 'Padding top', name: 'paddingTop' }, uiHelpers.createListBox('Unit', 'paddingTopUnit', units.getUnitValues()),
      { label: 'Padding right', name: 'paddingRight' }, uiHelpers.createListBox('Unit', 'paddingRightUnit', units.getUnitValues()),
      { label: 'Padding bottom', name: 'paddingBottom' }, uiHelpers.createListBox('Unit', 'paddingBottomUnit', units.getUnitValues()),
      { label: 'Padding left', name: 'paddingLeft' }, uiHelpers.createListBox('Unit', 'paddingLeftUnit', units.getUnitValues())
    ])]),
    uiHelpers.createFieldset('Margin', [uiHelpers.createForm([
      { label: 'Margin top', name: 'marginTop' }, uiHelpers.createListBox('Unit', 'marginTopUnit', units.getUnitValues()),
      { label: 'Margin right', name: 'marginRight' }, uiHelpers.createListBox('Unit', 'marginRightUnit', units.getUnitValues()),
      { label: 'Margin bottom', name: 'marginBottom' }, uiHelpers.createListBox('Unit', 'marginBottomUnit', units.getUnitValues()),
      { label: 'Margin left', name: 'marginLeft' }, uiHelpers.createListBox('Unit', 'marginLeftUnit', units.getUnitValues())
    ])])
  ])
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
  var textIndentTextBox = uiHelpers.createTextBox('Text indent', 'indent')
  var textIndentUnitSelect = uiHelpers.createUnitSelectBox('indentUnit', 'mm')

  // line spacing form inputs
  var lineSpacingTextBox = uiHelpers.createTextBox('Line spacing', 'lineSpacing')
  var lineSpacingUnitSelect = uiHelpers.createUnitSelectBox('lineSpacingUnit', 'mm')

  // paragraph fieldset form
  var paragraphForm = uiHelpers.createForm([
    textIndentTextBox, textIndentUnitSelect,
    lineSpacingTextBox, lineSpacingUnitSelect
  ])

  // paragraph fieldset
  var paragraphFieldSet = uiHelpers.createFieldset('Paragraph', [paragraphForm], 500)
  // general tab
  var generalTab = uiHelpers.createTab('General', [paragraphFieldSet])

  return generalTab
}
