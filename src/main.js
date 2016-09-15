/**
 * Plugin source main file
 * @file
 *
 * @author "Rémi Becheras <rbecheras@sirap.fr>"
 * @license Released under LGPL License.
 * @copyright Copyright (c) 2015-2016 SIRAP SAS All rights reserved
 *
 * @see Repository: https://github.com/sirap-group/tinymce-plugin-paragraph
 * @see License: http://www.tinymce.com/license
 * @see Contributing: http://www.tinymce.com/contributing
 */

// var uiComponents = require('./lib/ui/components')
var mainWindow = require('./lib/ui/main-window')
var eventHandlers = require('./lib/event-handlers')

var tinymce = window.tinymce

tinymce.PluginManager.add('paragraph', ParagraphPlugin)

function ParagraphPlugin (editor) {
  // Check if selected text node is a direct chid of a div element.
  // If it does, wrap the text node in a new p element
  editor.on('change', eventHandlers.ensureParagraphWrapsTextNodeOnChange(editor))

  editor.addMenuItem('paragraph', {
    separator: 'before',
    text: 'Paragraph properties',
    context: 'format',
    onclick: mainWindow.openMainWinFunction(editor)
  })
}
