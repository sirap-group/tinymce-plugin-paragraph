'use strict'

var eventHandlers = require('../event-handlers')
var units = require('../units')
var uiComponents = require('./components')
var findNodes = require('../dom/find-nodes')
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
    // disable visualblock option if enabled
    // (should be re-enabled after)
    var visualblocksClass = 'mce-visualblocks'
    var $body = $(editor.getBody())
    var hadVisualblocksClass = $body.hasClass(visualblocksClass)
    if (hadVisualblocksClass) {
      $body.removeClass(visualblocksClass)
    }

    var paragraphes = findNodes.getSelectedParagraphes(editor.selection)
    var paragraphStyleData = {}

    var propertiesWithUnits = [
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

    var propertiesWithoutUnits = [
      ['border-style', 'borderStyle'],
      ['border-color', 'borderColor']
    ]

    $.each(propertiesWithUnits, setEachFormPropertyWithUnit)
    $.each(propertiesWithoutUnits, setEachFormPropertyWithoutUnit)

    var generalTab = uiComponents.createGeneralTab(paragraphStyleData)
    var spacingsTab = uiComponents.createSpacingTab(paragraphStyleData)
    var bordersTab = uiComponents.createBordersTab(editor, paragraphStyleData)

    editor.windowManager.open({
      bodyType: 'tabpanel',
      title: 'Paragraph properties',
      body: [ generalTab, spacingsTab, bordersTab ],
      data: paragraphStyleData,
      onsubmit: onMainWindowSubmit
    })

    function setEachFormPropertyWithUnit (i, item) {
      units.setFormPropertyWithUnit(editor.dom, paragraphes, paragraphStyleData, item[0], item[1])
    }

    function setEachFormPropertyWithoutUnit (i, item) {
      units.setFormPropertyWithoutUnit(editor.dom, paragraphes, paragraphStyleData, item[0], item[1])
    }

    function onMainWindowSubmit () {
      // re-enable visualblocks if it was defined before
      if (hadVisualblocksClass) {
        $body.addClass(visualblocksClass)
      }
      // process all changes
      eventHandlers.processAllChangesOnMainWinSubmit(editor, paragraphes)
    }
  }
}
