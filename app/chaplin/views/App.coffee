Mediator = require 'chaplin/core/Mediator'

View = require 'chaplin/core/View'

module.exports = class AppView extends View

    container:       'body'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/app'

    attach: ->
        super

        # Toggle history.
        @delegate 'click', '.button[data-action="history-toggle"]', @historyToggle

        # Show landing page.
        @delegate 'click', 'header#top h1', -> Mediator.publish 'router:landing'

        # App search.
        @delegate 'keyup', 'input#search', (e) -> Mediator.publish 'app:search', $(e.target).val()

        @

    historyToggle: (e) ->
        # Change the button text.
        btn = $(e.target)
        btn.text(
            if btn.text()[0...4] is 'Show' then 'Hide history'
            else 'Show history'
        )
        
        # Send a message (to HistoryView).
        Mediator.publish 'history:toggle'