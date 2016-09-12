/**
 * This file contains the source code for the module `lib/ui/helpers`
 * @file
 * @author "Rémi Becheras <rbecheras@sirap.fr>"
 * @copyright 2016 © Groupe SIRAP, tout droits réservés
 * @see module:lib/ui/helpers
 */

/**
 * This module exports some useful UI helplers to create UI components
 * @module lib/ui/helpers
 */

'use strict'

// var path = require('path')
var units = require('../units')

module.exports = {
  createBordersTab: createBordersTab,
  createSpacingTab: createSpacingTab,
  createGeneralTab: createGeneralTab,
  createColorPickAction: createColorPickAction,
  createUnitSelectBox: createUnitSelectBox,
  createTab: createTab,
  createFieldset: createFieldset,
  createForm: createForm,
  createListBox: createListBox
}

/**
 * @function
 * @param
 * @returns
 */
function createBordersTab (editor) {
  return createTab('Borders', [{
    type: 'form',
    labelGapCalc: false,
    padding: 0,
    layout: 'grid',
    columns: 2,
    defaults: {
      type: 'textbox',
      maxWidth: 100
    },
    items: [
      {label: 'Border width', name: 'borderwidth'},
      {label: 'Border color', name: 'bordercolor', type: 'colorbox', onaction: createColorPickAction(editor)}
    ]
  }])
}

/**
 * @function
 * @param
 * @returns
 */
function createSpacingTab () {
  return createTab('Spacing', [
    createFieldset('Padding', [createForm([
      { label: 'Padding top', name: 'paddingTop' }, createListBox('Unit', 'paddingTopUnit', units.getUnitValues()),
      { label: 'Padding right', name: 'paddingRight' }, createListBox('Unit', 'paddingRightUnit', units.getUnitValues()),
      { label: 'Padding bottom', name: 'paddingBottom' }, createListBox('Unit', 'paddingBottomUnit', units.getUnitValues()),
      { label: 'Padding left', name: 'paddingLeft' }, createListBox('Unit', 'paddingLeftUnit', units.getUnitValues())
    ])]),
    createFieldset('Margin', [createForm([
      { label: 'Margin top', name: 'marginTop' }, createListBox('Unit', 'marginTopUnit', units.getUnitValues()),
      { label: 'Margin right', name: 'marginRight' }, createListBox('Unit', 'marginRightUnit', units.getUnitValues()),
      { label: 'Margin bottom', name: 'marginBottom' }, createListBox('Unit', 'marginBottomUnit', units.getUnitValues()),
      { label: 'Margin left', name: 'marginLeft' }, createListBox('Unit', 'marginLeftUnit', units.getUnitValues())
    ])])
  ])
}

/**
 * @function
 * @param
 * @returns
 */
function createGeneralTab () {
  return createTab('General', [
    createFieldset('Paragraph', [createForm([
      {label: 'Indent', name: 'indent'}, createUnitSelectBox('indentUnit'),
      {label: 'Line spacing', name: 'linespacing'}, createUnitSelectBox('linespacingUnit')
    ])])
  ])
}

/**
 * @function
 * @param
 * @returns
 */
function createColorPickAction (editor) {
  var colorPickerCallback = editor.settings.color_picker_callback
  if (colorPickerCallback) {
    return function () {
      var self = this
      colorPickerCallback.call(
        editor,
        function (value) {
          self.value(value).fire('change')
        },
        self.value()
      )
    }
  }
}

/**
 * @function
 * @param
 * @returns
 */
function createUnitSelectBox (inputName) {
  return {
    label: 'Unit',
    name: inputName,
    type: 'listbox',
    text: 'None',
    minWidth: 90,
    maxWidth: null,
    values: [
      {text: 'pt', value: 'pt'},
      {text: 'cm', value: 'cm'},
      {text: 'mm', value: 'mm'}
    ]
  }
}

/**
 * @function
 * @param
 * @returns
 */
function createTab (title, fieldsets, direction) {
  return {
    title: title,
    type: 'form',
    items: {
      type: 'form',
      // layout: 'flex',
      direction: direction || 'collumn',
      labelGapCalc: 'children',
      padding: 0,
      items: fieldsets
    }
  }
}

/**
 * @function
 * @param
 * @returns
 */
function createFieldset (title, items) {
  return {
    type: 'fieldset',
    title: title,
    items: items
  }
}

/**
 * @function
 * @param
 * @returns
 */
function createForm (items) {
  return {
    type: 'form',
    labelGapCalc: false,
    padding: 0,
    layout: 'grid',
    columns: 2,
    defaults: {
      type: 'textbox',
      maxWidth: 100
    },
    items: items
  }
}

/**
 * @function
 * @param
 * @returns
 */
function createListBox (label, name, values) {
  return {
    label: label,
    name: name,
    type: 'listbox',
    text: 'None',
    minWidth: 90,
    maxWidth: null,
    values: values
  }
}
