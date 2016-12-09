'use strict'

var $ = window.jQuery
var getStyles = require('./lib/dom/styles/get-styles')
var findNodes = require('./lib/dom/find-nodes')

module.exports = {
  appendSpanInEmptyBlockOnNodeChange: appendSpanInEmptyBlockOnNodeChange,
  spanInAParagraphOnNodeChange: spanInAParagraphOnNodeChange,
  spanFontConfigDefinedOnNodeChange: spanFontConfigDefinedOnNodeChange,
  checkAllOnSetContent: checkAllOnSetContent,
  eachSpanWrappedInAParagraph: eachSpanWrappedInAParagraph
}

/**
 * Force an Element without children to be wrapped in a SPAN on selected (when NodeChange is fired on it with collapsed selection)
 * @method
 * @static
 * @param {Event} evt The event object
 * @returns {undefined}
 */
function appendSpanInEmptyBlockOnNodeChange (evt) {
  // ignore the uncollapsed selections or elements with children elements
  var editor = evt.target
  var element = evt.element
  if (editor.selection.isCollapsed() && !element.children.length) {
    appendSpanInEmptyBlock(editor, element, evt.parents, true)
  }
}

/**
 * Force a span to be wrapped in a paragraph on selected (when NodeChange is fired on it)
 * @method
 * @static
 * @param {Event} evt The event object
 * @returns {undefined}
 */
function spanInAParagraphOnNodeChange (evt) {
  var editor = evt.target
  var parents = evt.parents
  spanInAParagraph(editor, parents)
}

/**
 * Force a span to be font family and font size defined on selected (when NodeChange is fired on it)
 * @method
 * @static
 * @param {Event} evt The event object
 * @returns {undefined}
 */
function spanFontConfigDefinedOnNodeChange (evt) {
  spanFontConfigDefined(evt.target, evt.element)
}

function checkAllOnSetContent (evt) {
  if (evt.type === 'setcontent' && evt.format === 'html' && evt.content.trim() && evt.set) {
    var editor = evt.target
    // var body = editor.getBody()

    // checks and forces that all block elements like paragraphes contain at least a span
    appendSpanInAllEmptyBlocks(editor)
    // checks and forces that all span elements are wrapped into at least a paragraph
    allSpanInAParagraph(editor)
    // checks and forces that all span elements are font family and font size defined
    allSpanFontConfigDefined(editor)
  }
}

/**
* Force each SPAN element in the doc to be wrapped in a Paragraph element
* @method
* @static
*/
function eachSpanWrappedInAParagraph (evt) {
  var editor = evt.target
  var body = editor.getBody()
  var $span = $('span', body)
  console.log(evt.type, evt)
  console.log('$span', $span)
  // console.log('editor', editor)
}

/**
 * Force an Element without children to be wrapped in a SPAN
 * @function
 * @inner
 * @param {Editor} editor The tinymce active editor
 * @param {Element} element The element on which do the check
 * @param {NodeList} parents The parents of the element
 * @param {Boolean} shouldSelect Set to true to select the SPAN after the DOM changes
 */
function appendSpanInEmptyBlock (editor, element, parents, shouldSelect) {
  var $element = $(element)
  var blockDisplays = ['block', 'inline-block', 'list-item', 'table-cell']
  var elementDisplay = getStyles.getComputed(element).display

  var $newSpan = createNewSpan(element, editor)
  if (element.tagName === 'BR' && parents[1].tagName !== 'SPAN') {
    // if we have something like `<x><br></x>` where `<x>` is not `<span>`,
    // we wrap the BR element with a new SPAN element
    editor.undoManager.transact(function () {
      $element.wrap($newSpan)
    })
  } else if (~blockDisplays.indexOf(elementDisplay)) {
    // or if we are in a block, append a new span with a new bogus element into

    // create new SPAN and BR[bogus] elements
    var $newBogus = $('<br>').attr('data-mce-bogus', 1)

    editor.undoManager.transact(function () {
      // create the proper DOM tree, for example P>SPAN>BR
      var children = element.childNodes
      var nodeToSelect
      var lastChild = children[children.length - 1]
      if (children.length === 1 && lastChild.nodeName === '#text' && !lastChild.textContent.trim()) {
        element.removeChild(lastChild)
      }
      if (children.length) {
        $newSpan.wrapInner(children)
        nodeToSelect = $newSpan[0].lastChild
      } else {
        $newSpan.append($newBogus)
        nodeToSelect = $newBogus[0]
      }
      $element.append($newSpan)

      if (shouldSelect) {
        // and reset the cursor location into the newSpan
        editor.selection.select(nodeToSelect)
        editor.selection.collapse()
        editor.selection.setCursorLocation(nodeToSelect, 0)
      }
    })
  }
}

/**
 * Force all block Elements without children to be wrapped in a SPAN
 * @function
 * @inner
 * @param {Editor} editor The tinymce active editor
 */
function appendSpanInAllEmptyBlocks (editor) {
  var body = editor.getBody()
  var $blocks = $('p, th, td, li', body)
  $blocks.each(function () {
    var element = this
    var parents = findNodes.parents(element)
    if (!element.children.length) {
      appendSpanInEmptyBlock(editor, element, parents, false)
    }
  })
}

/**
 * Force a SPAN to be wrapped in a Paragraph or equivalent block
 * @function
 * @inner
 * @param {Editor} editor The tinymce active editor
 * @param {NodeList} parents The parents of the element
 * @returns {Boolean} If the element has been wrapped
 */
function spanInAParagraph (editor, parents) {
  var blockDisplays = ['block', 'inline-block', 'table-cell']
  var wrapped = false
  $.each(parents, function () {
    if (this.nodeName === 'SPAN') {
      var element = this
      var $element = $(element)
      var $parentParagraph = $element.closest('p')
      if (!$parentParagraph.length) {
        var $newParagraph = $('<p>')
        $.each(parents, function (i) {
          if (!wrapped) {
            var itemDisplay = getStyles.getComputed(this).display
            if (~blockDisplays.indexOf(itemDisplay)) {
              editor.undoManager.transact(function () {
                $element.wrap($newParagraph)
              })
              wrapped = true
            }
          }
        })
      }
    }
  })
  return wrapped
}

/**
 * Force all SPAN to be wrapped by a paragraph
 * @function
 * @inner
 * @param {Editor} editor The tinymce active editor
 */
function allSpanInAParagraph (editor) {
  var body = editor.getBody()
  var $spans = $('span', body)
  $spans.each(function () {
    var element = this
    var parents = findNodes.parents(element)
    if (!element.children.length) {
      spanInAParagraph(editor, parents)
    }
  })
}

/**
 * Force a span to be font family and font size defined
 * @function
 * @inner
 * @param {Editor} editor The tinymce active editor
 * @param {Element} element The element on which do the check
 * @returns {Boolean} If the element's style has changed
 */
function spanFontConfigDefined (editor, element) {
  if (element.nodeName === 'SPAN') {
    // var computedStyle = getStyles.getComputed(element)
    var closestFontConfig
    if (!element.style.fontFamily || !element.style.fontSize) {
      editor.undoManager.transact(function () {
        if (!element.style.fontFamily) {
          closestFontConfig = getStyles.getClosestFontConfig(element, 'Calibri', '12pt', editor)
          element.style.fontFamily = closestFontConfig.fontFamily
        }
        if (!element.style.fontSize) {
          if (!closestFontConfig) {
            closestFontConfig = getStyles.getClosestFontConfig(element, 'Calibri', '12pt', editor)
          }
          element.style.fontSize = closestFontConfig.fontSize
        }
      })
      return true
    } else {
      return false
    }
  }
}

/**
 * Force all SPAN to be font family and font size defined
 * @function
 * @inner
 * @param {Editor} editor The tinymce active editor
 */
function allSpanFontConfigDefined (editor) {
  var body = editor.getBody()
  var $spans = $('span', body)
  $spans.each(function () {
    spanFontConfigDefined(editor, this)
  })
}

/**
 * Create a new SPAN with the closest font config
 * @function
 * @inner
 * @param {Element} closestElement An element to search from the closest font config
 * @returns {jQuery} the new SPAN as a jQuery object
 */
function createNewSpan (closestElement, editor) {
  var closestFontConfig = getStyles.getClosestFontConfig(closestElement, 'Calibri', '12pt', editor)
  return $('<span>').attr('style', 'font-family: ' + closestFontConfig.fontFamily + '; font-size:' + closestFontConfig.fontSize)
}
