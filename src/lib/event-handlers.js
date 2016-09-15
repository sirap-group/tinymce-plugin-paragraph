'use strict'

var $ = window.jQuery

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
      if (data.textIndent) {
        editor.dom.setStyle(paragraph, 'text-indent', data.textIndent + data.textIndentUnit)
      }

      // set line height
      if (data.lineHeight) {
        editor.dom.setStyle(paragraph, 'line-height', data.lineHeight + data.lineHeightUnit)
      }

      // set padding style
      var padding = ''
      padding += String((data.paddingTop) ? data.paddingTop + data.paddingTopUnit : '0').concat(' ')
      padding += String((data.paddingRight) ? data.paddingRight + data.paddingRightUnit : '0').concat(' ')
      padding += String((data.paddingBottom) ? data.paddingBottom + data.paddingBottomUnit : '0').concat(' ')
      padding += String((data.paddingLeft) ? data.paddingLeft + data.paddingLeftUnit : '0')
      editor.dom.setStyle(paragraph, 'padding', padding)

      // set margin style
      var margin = ''
      margin += String((data.marginTop) ? data.marginTop + data.marginTopUnit : '0').concat(' ')
      margin += String((data.marginRight) ? data.marginRight + data.marginRightUnit : '0').concat(' ')
      margin += String((data.marginBottom) ? data.marginBottom + data.marginBottomUnit : '0').concat(' ')
      margin += String((data.marginLeft) ? data.marginLeft + data.marginLeftUnit : '0')
      editor.dom.setStyle(paragraph, 'margin', margin)

      // set borders style
      if (data.borderWidth) {
        editor.dom.setStyle(paragraph, 'border-width', data.borderWidth + data.borderWidthUnit)
      }
      if (data.borderStyle) {
        editor.dom.setStyle(paragraph, 'border-style', data.borderStyle)
      }
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
