'use strict'

module.exports = {
  getUnitValues: getUnitValues,
  setFormValueWithUnit: setFormValueWithUnit,
  setFormValueWithoutUnit: setFormValueWithoutUnit
}

function getUnitValues () {
  return [
    {text: 'pt', value: 'pt'},
    {text: 'cm', value: 'cm'},
    {text: 'mm', value: 'mm'}
  ]
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
