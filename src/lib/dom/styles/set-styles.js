'use strict'

module.exports = {
  setTextIndent: setTextIndent,
  setLineHeight: setLineHeight,
  setPaddings: setPaddings,
  setMargins: setMargins
}

function setTextIndent (dom, paragraph, cssData) {
  // set text indent
  var textIndent = (cssData.textIndent) ? cssData.textIndent + cssData.textIndentUnit : null
  dom.setStyle(paragraph, 'text-indent', textIndent)
}

function setLineHeight (dom, paragraph, cssData) {
  // set line height
  var lineHeight = (cssData.lineHeight) ? cssData.lineHeight + cssData.lineHeightUnit : null
  dom.setStyle(paragraph, 'line-height', lineHeight)
}

function setPaddings (dom, paragraph, cssData) {
  // set padding style
  var padding, paddingTop, paddingRight, paddingBottom, paddingLeft
  paddingTop = (cssData.paddingTop) ? cssData.paddingTop + cssData.paddingTopUnit : null
  paddingRight = (cssData.paddingRight) ? cssData.paddingRight + cssData.paddingRightUnit : null
  paddingBottom = (cssData.paddingBottom) ? cssData.paddingBottom + cssData.paddingBottomUnit : null
  paddingLeft = (cssData.paddingLeft) ? cssData.paddingLeft + cssData.paddingLeftUnit : null

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

function setMargins (dom, paragraph, cssData) {
  // set margin style
  var margin, marginTop, marginRight, marginBottom, marginLeft
  marginTop = (cssData.marginTop) ? cssData.marginTop + cssData.marginTopUnit : null
  marginRight = (cssData.marginRight) ? cssData.marginRight + cssData.marginRightUnit : null
  marginBottom = (cssData.marginBottom) ? cssData.marginBottom + cssData.marginBottomUnit : null
  marginLeft = (cssData.marginLeft) ? cssData.marginLeft + cssData.marginLeftUnit : null

  var allMarginsDefined = marginTop && marginRight && marginBottom && marginLeft
  var topEqualsBottom = allMarginsDefined && (marginTop === marginBottom)
  var rightEqualsLeft = allMarginsDefined && (marginRight === marginLeft)
  var allEquals = topEqualsBottom && rightEqualsLeft && (marginTop === marginRight)

  if (allMarginsDefined) {
    if (allEquals) {
      // margin: (top || bottom || right || left)
      margin = marginTop
    } else if (topEqualsBottom && rightEqualsLeft) {
      // margin: (top || bottom) (right || left)
      margin = [marginTop, marginRight].join(' ')
    } else if (rightEqualsLeft) {
      margin = [marginTop, marginRight, marginBottom].join(' ')
    } else {
      // margin: top right bottom left
      margin = [marginTop, marginRight, marginBottom, marginLeft].join(' ')
    }
    dom.setStyle(paragraph, 'margin', margin)
  } else {
    if (marginTop) {
      dom.setStyle(paragraph, 'margin-top', marginTop)
    }
    if (marginRight) {
      dom.setStyle(paragraph, 'margin-right', marginRight)
    }
    if (marginBottom) {
      dom.setStyle(paragraph, 'margin-bottom', marginBottom)
    }
    if (marginLeft) {
      dom.setStyle(paragraph, 'margin-left', marginLeft)
    }
  }
}
