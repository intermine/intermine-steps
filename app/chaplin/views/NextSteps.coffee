Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

module.exports = class NextStepsView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'ul'

    getTemplateFunction: ->

    initialize: ->
        super
        
        Mediator.subscribe 'history:activate', @activate, @

    # Set a guid as "current".
    activate: (@current) =>

    # Add a link to a tool from its model.
    add: (slug, label) =>
        assert @method, 'We do not know which linking `method` to use'

        # Get the current tool guid?
        suffix = ''
        if @method is 'continue' then suffix = "/#{@current}"

        # Append the link.
        $(@el).append $('<li/>').append $ '<a/>',
            'text': label
            'href': "/tool/#{slug}/#{@method}#{suffix}"