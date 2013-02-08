View = require 'chaplin/core/View'

module.exports = class NextStepsView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'ul'

    getTemplateFunction: ->

    # Add a link to a tool from its model.
    add: (slug, label) =>
        assert @method, 'We do not know which linking `method` to use'

        $(@el).append $('<li/>').append $ '<a/>',
            'text': label
            'href': "/tool/#{slug}/#{@method}"