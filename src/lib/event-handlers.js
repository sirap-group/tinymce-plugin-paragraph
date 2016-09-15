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
    var data = this.toJSON()
    console.log('data', data)

    if (data.indent) {
      editor.dom.setStyle(paragraph, 'text-indent', data.indent + data.indentUnit)
    }
    if (data.lineSpacing) {
      editor.dom.setStyle(paragraph, 'line-height', data.lineSpacing + data.lineSpacingUnit)
    }
    if (data.paddingTop) {
      editor.dom.setStyle(paragraph, 'padding-top', data.paddingTop + data.paddingTopUnit)
    }
    if (data.paddingRight) {
      editor.dom.setStyle(paragraph, 'padding-right', data.paddingRight + data.paddingRightUnit)
    }
    if (data.paddingBottom) {
      editor.dom.setStyle(paragraph, 'padding-bottom', data.paddingBottom + data.paddingBottomUnit)
    }
    if (data.paddingLeft) {
      editor.dom.setStyle(paragraph, 'padding-left', data.paddingLeft + data.paddingLeftUnit)
    }
    if (data.marginTop) {
      editor.dom.setStyle(paragraph, 'margin-top', data.marginTop + data.marginTopUnit)
    }
    if (data.marginRight) {
      editor.dom.setStyle(paragraph, 'margin-right', data.marginRight + data.marginRightUnit)
    }
    if (data.marginBottom) {
      editor.dom.setStyle(paragraph, 'margin-bottom', data.marginBottom + data.marginBottomUnit)
    }
    if (data.marginLeft) {
      editor.dom.setStyle(paragraph, 'margin-left', data.marginLeft + data.marginLeftUnit)
    }
    if (data.borderWidth) {
      editor.dom.setStyle(paragraph, 'border-width', data.borderWidth + data.borderWidthUnit)
    }
    if (data.borderStyle) {
      editor.dom.setStyle(paragraph, 'border-style', data.borderStyle)
    }
    if (data.borderColor) {
      editor.dom.setStyle(paragraph, 'border-color', data.borderColor)
    }
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
