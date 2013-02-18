View = require 'chaplin/core/View'

root = @

module.exports = class ActionView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'li'

    getTemplateFunction: -> require 'chaplin/templates/action'

    # Custom data prep.
    getTemplateData: -> _.extend root.Utils.dupe(@options), 'label': @markup @options.label

    afterRender: ->
        super

        # Apply class that corresponds to the type of the tool.
        $(@el).addClass @options.type

        # Create an index of words associated with this tool label.
        @keywords = (_.uniq(@options.label.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase().split(' '))).join(' ')

    # Convert markup with HTML.
    markup: (text) ->
        # Strong.
        text = text.replace /(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"
        # Emphasis.
        text = text.replace /(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"