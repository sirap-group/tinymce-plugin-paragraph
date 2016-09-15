'use strict'

var uiHelpers = require('./helpers')
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
  return uiHelpers.createTab('Borders', [{
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
      {label: 'Border color', name: 'bordercolor', type: 'colorbox', onaction: uiHelpers.createColorPickAction(editor)}
    ]
  }])
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
  var textIndentUnitSelect = uiHelpers.createUnitSelectBox('indentUnit')

  // line spacing form inputs
  var lineSpacingTextBox = uiHelpers.createTextBox('Line spacing', 'lineSpacing')
  var lineSpacingUnitSelect = uiHelpers.createUnitSelectBox('lineSpacingUnit')

  // paragraph fieldset form
  var paragraphFieldSetForm = uiHelpers.createForm([
    textIndentTextBox, textIndentUnitSelect,
    lineSpacingTextBox, lineSpacingUnitSelect
  ])

  // paragraph fieldset
  var paragraphFieldSet = uiHelpers.createFieldset('Paragraph', [paragraphFieldSetForm])
  // general tab
  var generalTab = uiHelpers.createTab('General', [paragraphFieldSet])

  return generalTab
}
