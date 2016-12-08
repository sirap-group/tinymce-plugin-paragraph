'use strict'

var $ = window.jQuery
var getComputedStyle = window.getComputedStyle

module.exports = {
  getComputed: getComputed,
  getClosestFontConfig: getClosestFontConfig
}

/**
 * Get real computed style for an element
 * @function
 * @static
 * @param {Element} element The element to look at its computed styles
 * @param {string} [cssRuleName] The css rule name, camel cased.
 * @returns {object|string} The style object or the style value for the given rule name.
 * @see https://developer.mozilla.org/fr/docs/Web/API/Window/getComputedStyle
 * @see https://msdn.microsoft.com/en-us/library/ms535231(v=vs.85).aspx
 */
function getComputed (element, cssRuleName) {
  if (getComputedStyle) {
    if (cssRuleName) {
      return getComputedStyle(element)[cssRuleName]
    } else {
      return getComputedStyle(element)
    }
  } else if (element.currentStyle) {
    if (cssRuleName) {
      return element.currentStyle[cssRuleName]
    } else {
      return element.currentStyle
    }
  } else {
    throw new Error('Error trying to get computed style. It seems your browser doesnt support it.')
  }
}

/**
 * Search the closest span element for wich font size and family is defined. Begins with previous, then next, and finally search through the ancestors and their children
 * @method
 * @param {DOMNode} the node from wich the search starts
 * @returns {null|FontConfig}
 */
function getClosestFontConfig (node, defaultFamily, defaultSize, editor) {
  var $node = $(node)
  var $currentNode
  var found, $found

  // is node ok itself ?
  $currentNode = $node.filter(fontConfigFilter)
  if ($currentNode.length) {
    $found = $currentNode
  } else {
    var $allNodes = $('*', editor.getDoc())
    var nodePosition = $allNodes.index(node)

    var $allSpans = $('span', editor.getDoc()).filter(fontConfigFilter)
    var allSpanPositions = $allSpans.map(function (i, el) {
      return $allNodes.index(el)
    })

    var lowerPositions = []
    var greaterPositions = []
    $.each(allSpanPositions, function (i, documentPosition) {
      if (documentPosition < nodePosition) {
        lowerPositions.push(documentPosition)
      } else if (documentPosition > nodePosition) {
        greaterPositions.push(documentPosition)
      }
    })

    var prevIndex = Math.max.apply(null, lowerPositions)
    var nextIndex = Math.min.apply(null, greaterPositions)

    if (!isNaN(prevIndex) && isFinite(prevIndex)) {
      found = $allNodes[prevIndex]
    } else if (!isNaN(nextIndex) && isFinite(nextIndex)) {
      found = $allNodes[nextIndex]
    }
    if (found) {
      $found = $(found)
    }
  }

  if ($found) {
    return getConfigFromElement($found)
  } else {
    return {
      fontFamily: defaultFamily,
      fontSize: defaultSize
    }
  }
}

/**
 * A jquery filter to filter span elements having fontFamily and fontSize defined
 * @function
 * @inner
 * @returns {boolean} true|false
 */
function fontConfigFilter () {
  return (this.style.fontFamily && this.style.fontSize)
}

/**
 * A handy function to return a FontConfig type object from the element styles values
 * @function
 * @inner
 * @param {jQuery} $element A jQuery object from the element to lookup the font style rules
 * @returns {FontConfig} the resulting fontConfig object
 */
function getConfigFromElement ($element) {
  return {
    fontFamily: $element[0].style.fontFamily,
    fontSize: $element[0].style.fontSize
  }
}
