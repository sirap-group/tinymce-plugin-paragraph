'use strict'

// var path = require('path')
var uiHelpers = require('./helpers')
var eventHandlers = require('../event-handlers')

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
    var generalTab = uiHelpers.createGeneralTab()
    var spacingsTab = uiHelpers.createSpacingTab()
    var bordersTab = uiHelpers.createBordersTab(editor)
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
      onsubmit: eventHandlers.processAllChangesOnMainWinSubmit(editor, paragraph)
    })
  }
}
