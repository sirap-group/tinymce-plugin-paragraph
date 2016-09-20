'use strict'

module.exports = {
  setPaddings: setPaddings
}

function setPaddings (dom, paragraph, cssData) {
  // set padding style
  var padding, paddingTop, paddingRight, paddingBottom, paddingLeft
  paddingTop = (cssData.paddingTop) ? cssData.paddingTop + cssData.paddingTopUnit : null
  paddingRight = (cssData.paddingRight) ? cssData.paddingRight + cssData.paddingTopRight : null
  paddingBottom = (cssData.paddingBottom) ? cssData.paddingBottom + cssData.paddingTopBottom : null
  paddingLeft = (cssData.paddingLeft) ? cssData.paddingLeft + cssData.paddingTopLeft : null

  var allPaddingsDefined = paddingTop && paddingRight && paddingBottom && paddingLeft
  var topEqualsBottom = allPaddingsDefined && (paddingTop === paddingBottom)
  var rightEqualsLeft = allPaddingsDefined && (paddingRight === paddingLeft)
  var allEquals = topEqualsBottom && rightEqualsLeft && (paddingTop === paddingRight)
  if (allPaddingsDefined) {
    if (allEquals) {
      // padding: (top || bottom || right || left)
      padding = paddingTop
    } else if (topEqualsBottom && rightEqualsLeft) {
      // padding: (top || bottom) (right || left)
      padding = [paddingTop, paddingRight].join(' ')
    } else if (rightEqualsLeft) {
      padding = [paddingTop, paddingRight, paddingBottom].join(' ')
    } else {
      // padding: top right bottom left
      padding = [paddingTop, paddingRight, paddingBottom, paddingLeft].join(' ')
    }
    dom.setStyle(paragraph, 'padding', padding)
  } else {
    if (paddingTop) {
      dom.setStyle(paragraph, 'padding-top', paddingTop)
    }
    if (paddingRight) {
      dom.setStyle(paragraph, 'padding-right', paddingRight)
    }
    if (paddingBottom) {
      dom.setStyle(paragraph, 'padding-bottom', paddingBottom)
    }
    if (paddingLeft) {
      dom.setStyle(paragraph, 'padding-left', paddingLeft)
    }
  }
}
