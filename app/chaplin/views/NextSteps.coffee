Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

module.exports = class NextStepsView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'div'

    getTemplateFunction: ->

    initialize: ->
        super
        
        # Representation of the list of actions.
        @list = {}

        Mediator.subscribe 'history:activate', @activate, @

    # Set a guid as "current".
    activate: (@current) =>

    # Add a link to a tool from its model.
    add: ({ slug, label, category }) =>
        assert @method, 'We do not know which linking `method` to use'

        # Get the current tool guid?
        suffix = ''
        if @method is 'continue' then suffix = "/#{@current}"

        # Do we have this category?
        unless @list[category]
            # Create the title.
            $(@el).append $ '<h4/>', 'text': category
            # Add a list saving it under our category.
            $(@el).append @list[category] = $('<ul/>')

        # Append the link to an existing category.
        @list[category].append $('<li/>').append $ '<a/>',
            'text': label
            'href': "/tool/#{slug}/#{@method}#{suffix}"