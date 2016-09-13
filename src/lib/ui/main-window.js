'use strict'

// var uiHelpers = require('./helpers')
var uiComponents = require('./components')
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
    var generalTab = uiComponents.createGeneralTab()
    var spacingsTab = uiComponents.createSpacingTab()
    var bordersTab = uiComponents.createBordersTab(editor)
    var paragraph = editor.dom.getParent(editor.selection.getStart(), 'p')
    // console.log('paragraph',paragraph)

    editor.windowManager.open({
      bodyType: 'tabpanel',
      title: 'Paragraph properties',
      body: [ generalTab, spacingsTab, bordersTab ],
      data: {
        indent: editor.dom.getStyle(paragraph, 'text-indent'),
        lineSpacing: editor.dom.getStyle(paragraph, 'line-height'),
        padding: editor.dom.getStyle(paragraph, 'padding'),
        margin: editor.dom.getStyle(paragraph, 'margin'),
        borderStyle: editor.dom.getStyle(paragraph, 'border-style'),
        borderWidth: editor.dom.getStyle(paragraph, 'border-width'),
        borderColor: editor.dom.getStyle(paragraph, 'border-color')
      },
      onsubmit: eventHandlers.processAllChangesOnMainWinSubmit(editor, paragraph)
    })
  }
}
