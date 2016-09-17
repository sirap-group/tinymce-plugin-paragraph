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
