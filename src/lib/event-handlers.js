'use strict'

var $ = window.jQuery

module.exports = {
  ensureParagraphWrapsTextNodeOnChange: ensureParagraphWrapsTextNodeOnChange,
  processAllChangesOnMainWinSubmit: processAllChangesOnMainWinSubmit
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
   * @param {Event} evt The event object
   * @returns {undefined}
   */
  function processAllChanges (evt) {
    console.log('evt.data', evt.data)
    if (evt.data.indent) {
      editor.dom.setStyle(paragraph, 'text-indent', evt.data.indent + evt.data.indentUnit)
    }
    if (evt.data.linespacing) {
      editor.dom.setStyle(paragraph, 'line-height', evt.data.linespacing + evt.data.linespacingUnit)
    }
    if (evt.data.padding) {
      editor.dom.setStyle(paragraph, 'padding', evt.data.padding + evt.data.paddingUnit)
    }
    if (evt.data.margin) {
      editor.dom.setStyle(paragraph, 'margin', evt.data.margin + evt.data.marginUnit)
    }
    if (evt.data.borderwidth) {
      editor.dom.setStyle(paragraph, 'border-width', evt.data.borderwidth + evt.data.borderwidthUnit)
    }
    if (evt.data.borderStyle) {
      editor.dom.setStyle(paragraph, 'border-style', evt.data.borderStyle)
    }
    if (evt.data.bordercolor) {
      editor.dom.setStyle(paragraph, 'border-color', evt.data.bordercolor)
    }
  }
}
