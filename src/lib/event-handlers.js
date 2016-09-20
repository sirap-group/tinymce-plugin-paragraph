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
      // set text indent
      var textIndent = (data.textIndent) ? data.textIndent + data.textIndentUnit : null
      editor.dom.setStyle(paragraph, 'text-indent', textIndent)

      // set line height
      var lineHeight = (data.lineHeight) ? data.lineHeight + data.lineHeightUnit : null
      editor.dom.setStyle(paragraph, 'line-height', lineHeight)

      setStyles.setPaddings(editor.dom, paragraph, data)
      setStyles.setMargins(editor.dom, paragraph, data)

      // set border width
      var borderWidth = (data.borderWidth) ? data.borderWidth + data.borderWidthUnit : null
      editor.dom.setStyle(paragraph, 'border-width', borderWidth)

      // set border style
      if (data.borderStyle) {
        editor.dom.setStyle(paragraph, 'border-style', data.borderStyle)
      }

      // set border color
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
