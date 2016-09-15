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
  createListBox: createListBox
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
