'use strict'

var getComputedStyle = window.getComputedStyle

module.exports = {
  getComputed: getComputed
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
