Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

Action = require 'chaplin/views/Action'

module.exports = class NextStepsView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'div'

    getTemplateFunction: ->

    initialize: ->
        super
        
        # Representation of the list of actions.
        @list = {}

    # Add a link to a tool from its model.
    add: ({ slug, label, category, type, guid }) =>
        assert @method, 'We do not know which linking `method` to use'

        # Get the current tool guid?
        suffix = ''
        if @method is 'continue'
            assert guid, 'Have not provided `guid` parameter, who my daddy?'
            suffix = "/#{guid}"

        # Do we have this category?
        unless @list[category]
            # Create the title.
            $(@el).append $ '<h4/>', 'text': category
            # Add a list saving it under our category.
            $(@el).append @list[category] = $('<ul/>', 'class': 'alternating')

        # Do we already have this label?
        unless ( (views) ->
            for view in views
                if view.options.label is label then return true
            false
        ) @views
            # Render the View for this action.
            @views.push view = new Action
                'slug':   slug
                'type':   type
                'label':  label
                'method': @method
                'suffix': suffix

            # Append the link to an existing category.
            @list[category].append view.el