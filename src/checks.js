'use strict'

var $ = window.jQuery
var getStyles = require('./lib/dom/styles/get-styles')

module.exports = {
  collapsedSelectionInASpan: collapsedSelectionInASpan,
  spanInAParagraph: spanInAParagraph
}

function spanInAParagraph (evt) {
  var blockDisplays = ['block', 'inline-block', 'table-cell']
  var editor = evt.target
  var element = evt.element
  var parents = evt.parents
  var $element = $(element)
  if (element.nodeName === 'SPAN') {
    var $parentParagraph = $element.closest('p')
    if (!$parentParagraph.length) {
      var $newParagraph = $('<p>')
      var wrapped = false
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
}

function collapsedSelectionInASpan (evt) {
  var editor = evt.target

  // ignore the uncollapsed selections
  if (editor.selection.isCollapsed()) {
    var blockDisplays = ['block', 'inline-block', 'list-item', 'table-cell']
    var element = evt.element
    var $element = $(element)
    var parents = evt.parents
    var elementDisplay = getStyles.getComputed(element).display

    if (element.tagName === 'BR' && $element.attr('data-mce-bogus') && parents[1].tagName !== 'SPAN') {
      // if we have something like <x><br data-mce-bogus/></x>
      // where X is not SPAN, we wrap the BR element by a SPAN element
      $element.wrap($newSpan)
    } else if (~blockDisplays.indexOf(elementDisplay)) {
      // or if we are in a block, append a new span with a new bogus element into

      // create new SPAN and BR[bogus] elements
      var $newBogus = $('<br>').attr('data-mce-bogus', 1)
      var $newSpan = createNewSpan(element, editor)

      // create the proper DOM tree, for example P>SPAN>BR
      $element.empty()
      $element.append($newSpan)
      $newSpan.append($newBogus)

      // and reset the cursor location into the newSpan
      editor.selection.select($newSpan[0])
      editor.selection.collapse()
      editor.selection.setCursorLocation($newSpan[0], 0)
    }
  }
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
  return $('<span>').attr('style', 'font-style: ' + closestFontConfig.fontFamily + '; font-size:' + closestFontConfig.fontSize)
}