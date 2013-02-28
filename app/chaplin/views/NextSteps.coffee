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

    attach: ->
        super

        # Filter the tool labels.
        Mediator.subscribe 'app:search', @filterLabels, @

        # Show hidden tools.
        @delegate 'click', '.show', @showHidden

    # Add a link to a tool from its model.
    add: ({ slug, label, category, type, guid, extra, keywords, weight, help }) =>
        assert @method, 'We do not know which linking `method` to use'

        # Show the input filter.
        $(@el).find('input.filter').show()

        # Get the current tool guid?
        suffix = ''
        if @method is 'continue'
            assert guid, 'Have not provided `guid` parameter, who my daddy?'
            suffix = "/#{guid}"

        # Do we have this category?
        unless @list[category]
            target = $(@el).find('.tools')
            # Create the title.
            target.append $ '<h4/>', 'text': category
            # Add a list saving it under our category.
            target.append @list[category] = $('<ul/>', 'class': 'alternating')

        # Do we already have this label?
        unless ( (views) ->
            for view in views
                if view.options.label is label then return true
            false
        ) @views
            # Render the View for this action.
            @views.push view = new Action
                'slug':     slug
                'type':     type
                'label':    label
                'method':   @method
                'suffix':   suffix
                'extra':    extra
                'weight':   weight
                'help':     help
                'keywords': keywords or []

            # Append the link to an existing category.
            @list[category].append view.el

            # Do we have a hidden label now?
            if weight < 10
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
        ), 500

    # Show hidden tools.
    showHidden: (e) =>
        if e then $(e.target).remove()
        else $(@el).find('.show').remove()
        $(@el).find('.hidden').removeClass('hidden')