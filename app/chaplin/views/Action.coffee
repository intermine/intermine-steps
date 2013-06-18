View = require 'chaplin/core/View'
Mediator = require 'chaplin/core/Mediator'

root = @

module.exports = class ActionView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'li'

    getTemplateFunction: -> require 'chaplin/templates/action'

    # Custom data prep.
    getTemplateData: -> _.extend root.Utils.cloneDeep(@options), 'label': @markup @options.label

    attach: ->
        super

        $(@el).addClass =>
            # Apply class that corresponds to the type of the tool.
            classes = [ @options.type, @options.labelClass, 'new' ]
            # Do we hide it?
            if @options.weight < 10 then classes.push 'hidden'
            classes.join(' ')

        # Create an index of words associated with this tool label.
        words = @options.label.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase().split(' ')
        
        # Beef up with extra keywords.
        @keywords = _.uniq( words.concat(@options.keywords) ).join(' ')

        # Capture help clicks.
        @delegate 'click', '.help', @showHelp

        # Trigger a new element effect.
        setTimeout =>
            $(@el).removeClass 'new'
        , 100

    # Convert markup with HTML.
    markup: (text) ->
        # Strong.
        text = text.replace /(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"
        # Emphasis.
        text = text.replace /(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"

    showHelp: =>
        assert @options.help, 'Help content is not provided'

        console.log
            'title': @markup @options.label
            'text':  @options.help