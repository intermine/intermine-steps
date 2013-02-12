Mediator = require 'chaplin/core/Mediator'

View = require 'chaplin/core/View'

module.exports = class LeftSidebarView extends View

    container:       '#modal'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/modal'

    initialize: ->
        super

        # Show us on these calls.
        Mediator.subscribe 'modal:render', @show, @

        @

    afterRender: ->
        super

        $(@el).addClass 'reveal-modal'

        @

    # Show the modal.
    show: ({ title, text, code }) =>
        el = $(@el)

        # Populate with content.
        if title then el.find('.title').html(title)
        if code
            el.find('.code').html(code.src).attr('data-language', code.lang)
            Rainbow.color()

        # Foundation Reveal.
        el.reveal()

        # Adjust the height of the whole shebang.
        el.find('.scroll').css 'height': $(window).height() / 2