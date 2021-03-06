View     = require '../core/View'
Mediator = require '../core/Mediator'

template = require '../templates/app'

root = @

# Represents the app when looking at a tool.
module.exports = class AppView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> template

    getTemplateData: -> 'showHistory': root.Layout.showHistory

    attach: ->
        super

        # Toggle history.
        @delegate 'click', '.button[data-action="history-toggle"]', @historyToggle

        # Show landing page.
        @delegate 'click', 'header#top h1', -> Mediator.publish 'router:landing'

        # App search.
        @delegate 'keyup', 'input#search', (e) -> Mediator.publish 'app:search', $(e.target).val()

        # Set `app`.
        $('body').addClass('app')

        @

    historyToggle: (e) ->
        # Change the button text.
        btn = $(e.target)
        if btn.attr('data-show') is '0'
            btn.text 'Hide history'
            btn.attr 'data-show', '1'
        else
            btn.text 'Show history'
            btn.attr 'data-show', '0'
        
        # Send a message (to HistoryView).
        Mediator.publish 'history:toggle'