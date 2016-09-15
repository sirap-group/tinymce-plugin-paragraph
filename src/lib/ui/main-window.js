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

    console.log('paragraph', paragraph)
    console.log('paragraphStyleData', paragraphStyleData)

    editor.windowManager.open({
      bodyType: 'tabpanel',
      title: 'Paragraph properties',
      body: [ generalTab, spacingsTab, bordersTab ],
      data: paragraphStyleData,
      onsubmit: eventHandlers.processAllChangesOnMainWinSubmit(editor, paragraph)
    })
  }
}
