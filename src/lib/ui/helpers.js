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

module.exports = {
  createTextBox: createTextBox,
  createUnitSelectBox: createUnitSelectBox,
  createTab: createTab,
  createFieldset: createFieldset,
  createForm: createForm,
  createListBox: createListBox,
  createListBoxItem: createListBoxItem,
  createColorPicker: createColorPicker
}

/**
 * Create a simple text box
 * @method
 * @param {string} label The textBox label
 * @param {string} name The textBox name
 * @returns {TextBox} textBox The new textBox
 */
function createTextBox (label, name) {
  return {
    label: label,
    name: name
  }
}

/**
 * Create a select box to select a length unit
 * @method
 * @param {string} inputName - A name to identify the input in the form
 * @param {string} [defaultUnit=pt] - A default unit in (`pt`, `mm`, or `cm`).
 * @returns {SelectBox} unitSelectBox The new unit select box.
 */
function createUnitSelectBox (inputName, defaultUnit) {
  defaultUnit = defaultUnit || 'pt'
  return {
    label: 'Unit',
    name: inputName,
    type: 'listbox',
    minWidth: 90,
    maxWidth: 90,
    values: [
      {text: 'pt', value: 'pt'},
      {text: 'cm', value: 'cm'},
      {text: 'mm', value: 'mm'}
    ],
    text: defaultUnit,
    value: defaultUnit
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
 * @method
 * @static
 * @param {string} label The label for the list box
 * @param {string} name The name of the list box to identify it in the form
 * @param {array<ListBoxItem>} values An array of list box items
 * @param {ListBoxItem} [defaultItem=N/A] An item to select as default value
 * @returns
 */
function createListBox (label, name, values, defaultItem) {
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

/**
 * Create an item for createListBox() values array
 * @param {string} text The text shown for the item
 * @param {string|number} value A value for the item
 * @return {ListBoxItem}
 */
function createListBoxItem (text, value) {
  if (value === undefined) {
    value = text
  }
  var item = {
    text: text,
    value: value
  }
  return item
}

/**
 * Create a color picker
 * @method
 * @param {string} label The label for the color picker
 * @param {string} name The name to identify the color picker in the form set
 * @returns {ColorPicker} colorPicker The new color picker
 */
function createColorPicker (label, name, callback) {
  return {
    type: 'colorbox',
    label: label,
    name: name,
    onaction: callback
  }
}
