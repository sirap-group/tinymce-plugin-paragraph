'use strict'

var className = 'mce-show-paragraphs'
var commandName = 'ShowParagraphs'

module.exports = {
  init: init
}

function init (editor) {
  var menuItem, enabled

  editor.addButton('showparagraphs', {
    title: 'Show paragraphs',
    cmd: commandName,
    onPostRender: toggleActiveState
  })

  editor.addMenuItem('showparagraphs', {
    text: 'Show paragraphs',
    cmd: commandName,
    onPostRender: toggleActiveState,
    selectable: true,
    context: 'view',
    prependToContext: true
  })

  editor.addCommand(commandName, showParagraphCommand)

  editor.on('init', function () {
    if (editor.settings.showparagraphs_default_state) {
      editor.execCommand(commandName, false, null, {skip_focus: true})
    }
  })

  editor.on('remove', function () {
    editor.dom.removeClass(editor.getBody(), className)
  })

  function showParagraphCommand () {
    var dom = editor.dom

    dom.toggleClass(editor.getBody(), className)
    enabled = editor.dom.hasClass(editor.getBody(), className)

    if (menuItem) {
      menuItem.active(dom.hasClass(editor.getBody(), className))
    }

    editor.fire(commandName)
  }

  /**
  * @method
  */
  function toggleActiveState () {
    var self = this

    self.active(enabled)

    editor.on(commandName, function () {
      self.active(editor.dom.hasClass(editor.getBody(), className))
    })
  }
}
