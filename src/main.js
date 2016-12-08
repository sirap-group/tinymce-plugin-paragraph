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

var mainWindow = require('./lib/ui/main-window')
var eventHandlers = require('./lib/event-handlers')
var setStyles = require('./lib/dom/styles/set-styles')
var showParagraphComponent = require('./components/show-paragraphs')
var checks = require('./checks')

var tinymce = window.tinymce

tinymce.PluginManager.add('paragraph', ParagraphPlugin)

function ParagraphPlugin (editor) {
  var _doc

  // Check if selected text node is a direct chid of a div element.
  // If it does, wrap the text node in a new p element
  editor.on('change', eventHandlers.ensureParagraphWrapsTextNode)

  editor.on('init', function () {
    _doc = editor.getDoc()

    // Overrides custom paragraph borders when visualblock is enabled
    setStyles.overridesCustomBordersOnVisualblocks(_doc)

    // Add CSS rules to show paragraphs
    setStyles.addCssRulesToShowParagraphes(_doc)
    setStyles.addCssRulesToAddParagraphIcon(window.document)
  })

  // editor.on('SetContent', checks.eachSpanWrappedInAParagraph)

  editor.on('NodeChange', checks.collapsedSelectionInASpan)
  editor.on('NodeChange', checks.spanInAParagraph)

  editor.addMenuItem('paragraph', {
    separator: 'before',
    text: 'Paragraph properties',
    context: 'format',
    onclick: mainWindow.openMainWinFunction(editor)
  })

  showParagraphComponent.init(editor)
}
