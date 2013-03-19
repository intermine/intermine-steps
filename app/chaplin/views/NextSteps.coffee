Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

Action = require 'chaplin/views/Action'

root = @

module.exports = class NextStepsView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'div'

    getTemplateFunction: -> require 'chaplin/templates/next-steps'

    initialize: ->
        super
        
        # Representation of the list of actions.
        @list = {}

        # Do we have a context to listen to?
        if @context and @context instanceof Array
            # Render tool labels on us
            Mediator.subscribe 'context:render', (context, obj) =>
                # Does this context fit us?
                if root.Utils.arrayEql context, @context
                    @add obj
            , @

    attach: ->
        super

        # Directly render tool labels on us.
        if @context
            assert @context instanceof Array, 'Context not an Array'
            Mediator.publish 'context:new', @context

        # Filter the tool labels.
        Mediator.subscribe 'app:search', @filterLabels, @

        # Show hidden tools.
        @delegate 'click', '.show', @showHidden

        # Link to no actions text.
        @noActions = $(@el).find('p.noactions')

    # Add a link to a tool from its model.
    add: =>
        assert @method, 'We do not know which linking `method` to use'

        # Process the arguments.
        switch arguments.length
            when 1
                obj = arguments[0]
            when 2
                [ context, obj ] = arguments
                assert context and context instanceof Array, 'Context not a list'
            else
                assert false, 'Incorrect number of parameters'

        # Show the input filter.
        $(@el).find('input.filter').show()

        # Get the current tool guid?
        if @method is 'continue' and obj.guid # guid is coming from a Tool
            suffix = "continue/#{obj.guid}"
        else
            suffix = 'new'

        # Do we have this category?
        unless @list[obj.category]
            target = $(@el).find('div.tools') # do not forget the el name!
            # Create the title.
            target.append $ '<h4/>', 'html': obj.category
            # Add a list saving it under our category.
            target.append @list[obj.category] = $('<ul/>', 'class': 'tools')

        # Do we already have this label?
        unless ( (views) ->
            for view in views
                if view.options.label is obj.label then return true
            false
        ) @views
            # Render the View for this action.
            @views.push view = new Action _.extend obj,
                'suffix':   suffix
                'keywords': obj.keywords or []

            # Append the link to an existing category.
            @list[obj.category].append view.el

            # Do we have a hidden label now?
            if obj.weight < 10
                $(@el).find('.show.hidden').removeClass('hidden')

    filterLabels: (query) =>
        assert typeof(query) is 'string', 'Query input not provided'

        # Delay any further processing by a few.
        if @timeout? then clearTimeout @timeout

        @timeout = setTimeout (=>
            # Show them all.
            @showHidden()
            
            # Remove extra whitespace, trim, keep only unique words
            query = _.uniq( $.trim( query.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase() ).split(' ') )

            unless root.Utils.arrayEql query, @query
                # Do the actual filtering.
                @query = query

                # Split query on spaces, join on pipe, make into RegExp.
                re = new RegExp(( "#{part}.*" for part in query ).join('|'), 'i')

                # Actual hiding filter.
                for view in @views
                    if view.keywords.match(re) then $(view.el).show()
                    else $(view.el).hide()

            # Is there anything left?
            if @views.length isnt 0
                @noActions.hide()
                for view in @views
                    return if $(view.el).is(':visible')
                @noActions.show()

        ), 0

    # Show hidden tools.
    showHidden: (e) =>
        if e then $(e.target).remove()
        else $(@el).find('.show').remove()
        $(@el).find('.hidden').removeClass('hidden')