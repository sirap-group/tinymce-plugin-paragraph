'use strict'

/**
 * This module exports some static methods to help finding DOM nodes in a DOM tree
 * @module dom/findNodes
 */

var $ = window.jQuery
var Node = window.Node

module.exports = {
  getParentParagraph: getParentParagraph,
  getSelectedParagraphes: getSelectedParagraphes,
  getChildrenParagraphes: getChildrenParagraphes,
  parents: parents
}

/**
 * Find the closest paragraph
 * @method
 * @static
 * @param {Node} node A node contained in the searched paragraph
 * @returns {HTMLParagraphElment|null}
 */
function getParentParagraph (node) {
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
 * Find the children paragraphes of a given base element
 * @method
 * @static
 * @param {baseElement} Element An element containing the searched children paragraphes
 * @returns {jQuery<HTMLParagraphElment>} A jquery list of paragraph elements
 */
function getChildrenParagraphes (baseElement) {
  return $(baseElement).find('p')
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
  var firstParagraph = getParentParagraph(range.startContainer)
  var lastParagraph = getParentParagraph(range.endContainer)

  paragraphes.push(firstParagraph)

  if (!range.collapsed) {
    nextNode = firstParagraph.nextElementSibling
    while (nextNode) {
      var isBefore = nextNode.compareDocumentPosition(lastParagraph) & Node.DOCUMENT_POSITION_FOLLOWING
      var isSame = nextNode === getParentParagraph(range.endContainer)

      if (isBefore || isSame) {
        var parentParagraph = getParentParagraph(nextNode)

        // if the current node a paragraph or is contained into a paragraph,
        // selected this paragraph
        if (parentParagraph) {
          paragraphes.push(parentParagraph)
        } else {
          // else, find any paragraph located somewhere in the children of the current node
          getChildrenParagraphes(nextNode).each(function (i) {
            paragraphes.push(this)
          })
        }
        nextNode = (isSame) ? null : nextNode.nextElementSibling
      } else {
        nextNode = null
      }
    }
  }

  return paragraphes
}

/**
 * Get a list of the parents of an element including and starting by itself, and until the page, header or footer element, excluding it.
 * @method
 * @static
 * @param {Element} element The element to get its parents
 * @returns {Array<Element>} The parent list
 */
function parents (element) {
  var $parents = $(element).parentsUntil('section[data-headfoot]')
  var parents = [element]
  for (var i = 0; i < $parents.length; i++) {
    parents.push($parents[i])
  }
  return parents
}
