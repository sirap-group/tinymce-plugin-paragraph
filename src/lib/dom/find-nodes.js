'use strict'

/**
 * This module exports some static methods to help finding DOM nodes in a DOM tree
 * @module dom/findNodes
 */

var $ = window.jQuery
var Node = window.Node

module.exports = {
  getParagraph: getParagraph,
  getSelectedParagraphes: getSelectedParagraphes
}

/**
 * Find the closest paragraph
 */
function getParagraph (node) {
  var paragraph, parents

  if (!node || !node.nodeType) {
    console.log(node)
    throw new Error('InvalidTypeError. `node` must be an HTML Node.')
  }

  if (node.nodeName === 'P') {
    paragraph = node
  }

  parents = $(node).parents('p')
  if (parents.length) {
    paragraph = parents[0]
  }

  return paragraph || null
}

/**
 * Find and return all paragraphes under the given selection
 * @method
 * @static
 * @param {Selection} selection The givent selection
 * @returns {Array<Node>} paragraphes The selected paragraphes
 */
function getSelectedParagraphes (selection) {
  var paragraphes = []
  var range = selection.getRng()
  var nextNode = null
  var firstParagraph = getParagraph(range.startContainer)
  var lastParagraph = getParagraph(range.endContainer)

  paragraphes.push(firstParagraph)

  if (!range.collapsed) {
    nextNode = firstParagraph.nextElementSibling
    while (nextNode) {
      var isBefore = nextNode.compareDocumentPosition(lastParagraph) & Node.DOCUMENT_POSITION_FOLLOWING
      var isSame = nextNode === getParagraph(range.endContainer)

      if (isBefore || isSame) {
        paragraphes.push(getParagraph(nextNode))
        nextNode = (isSame) ? null : nextNode.nextElementSibling
      } else {
        nextNode = null
      }
    }
  }

  return paragraphes
}
