'use strict'

var getStyles = require('./dom/styles/get-styles')

var document = window.document

createDpiTestElements()

module.exports = {
  getUnitValues: getUnitValues,
  getValueFromStyle: getValueFromStyle,
  getUnitFromStyle: getUnitFromStyle,
  setFormValueWithUnit: setFormValueWithUnit,
  setFormValueWithoutUnit: setFormValueWithoutUnit,
  px2in: px2in,
  in2pt: in2pt,
  getDpi: getDpi
}

function getUnitValues () {
  return [
    {text: 'pt', value: 'pt'},
    {text: 'cm', value: 'cm'},
    {text: 'mm', value: 'mm'}
  ]
}

/**
 * Get the numerc value of a style value with unit (remove the 2-digits unit and cast as number)
 * For example, returns `11` from a style value of `11px`
 * @method
 * @static
 * @param {string} styleValue A style value with a 2-digits unit
 * @returns {number} - The absolute value of the given style value
 */
function getValueFromStyle (styleValue) {
  return styleValue.slice(0, styleValue.length - 2)
}

/**
 * Get the 2-digit unit representation of a style value with unit.
 * For example, returns `px` from a style value of `11px`
 * @method
 * @static
 * @param {string} styleValue A style value with a 2-digits unit
 * @returns {string} - The unit as a 2-digits representation
 */
function getUnitFromStyle (styleValue) {
  return styleValue.slice(styleValue.length - 2, styleValue.length)
}

function setFormValueWithUnit (dom, paragraph, formData, cssPropertyName, propertyName, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = '0'
  }
  var rawCssValue = dom.getStyle(paragraph, cssPropertyName)
  if (rawCssValue !== '') {
    var unitPropertyName = propertyName + 'Unit'
    formData[propertyName] = rawCssValue.slice(0, rawCssValue.length - 2)
    formData[unitPropertyName] = rawCssValue.slice(rawCssValue.length - 2, rawCssValue.length)
  } else {
    formData[propertyName] = defaultValue
  }
}

/**
 * Set form value, for a value without unit
 * @method
 * @static
 * @param {object} dom The dom object of the tinymce active editor
 * @param {DOMElement} paragraph The paragraph element
 * @param {object} formData A hash containing all needed sets of css property names and values (camelCased)
 * @param {string} cssPropertyName The css property name (ex: `border-style`) which doesnt work with units
 * @param {string} propertyName The camelCased property name (ex: `borderStyle`)
 * @param {string} [defaultValue] An optional default value
 * @returns undefined
 */
function setFormValueWithoutUnit (dom, paragraph, formData, cssPropertyName, propertyName, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = ''
  }
  var rawCssValue = dom.getStyle(paragraph, cssPropertyName)
  if (rawCssValue !== '') {
    formData[propertyName] = rawCssValue
  } else {
    formData[propertyName] = defaultValue
  }
}

/**
 * Converts pixels (px) to inches (in)
 * dpi = px / in -> in = px / dpi
 * @method
 * @static
 * @param {number} px Number of pixels to convert to inches
 * @returns {number} - Resulting number of inches (in)
 */
function px2in (px) {
  var dpi = getDpi()
  return Number(px) / Number(dpi)
}

/**
 * Converts inches (in) to points (pt)
 * 72 = pt / in -> pt = 72 * in
 * @method
 * @static
 * @param {number} inches Number of inches (in) to convet to points (pt)
 * @returns {number} - Resulting number of points (pt)
 */
function in2pt (inches) {
  return Number(inches) * 72
}

function getDpi () {
  return document.getElementById('dpi-test').offsetHeight
}

/**
 * @function
 * @inner
 */
function createDpiTestElements () {
  var getDpiHtmlStyle = 'data-dpi-test { height: 1in; left: -100%; position: absolute; top: -100%; width: 1in; }'

  var head = document.getElementsByTagName('head')[0]
  var getDPIElement = document.createElement('style')
  getDPIElement.setAttribute('type', 'text/css')
  getDPIElement.setAttribute('rel', 'stylesheet')
  getDPIElement.innerHTML = getDpiHtmlStyle
  head.appendChild(getDPIElement)

  var body = document.getElementsByTagName('body')[0]
  var dpiTestElement = document.createElement('data-dpi-test')
  dpiTestElement.setAttribute('id', 'dpi-test')
  body.appendChild(dpiTestElement)
}
