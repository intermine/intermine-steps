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

        (el = $(@el)).addClass 'reveal-modal'

        # Add links to our components.
        @title = el.find('.title')
        @code  = el.find('.code')
        @text  = el.find('.text')

        @

    # Show the modal.
    show: ({ title, text, code }) =>
        el = $(@el)

        # Populate with content.
        if title then @title.html(title) else @title.html('')
        if code
            @code.html(code.src).attr('data-language', code.lang)
            Rainbow.color()
        else
            @code.html('')
        if text then @text.html(text) else @text.html('')

        # Foundation Reveal.
        el.reveal()

        scroll = el.find('.scroll')
        # Go back to auto scrollbar height.
        scroll.css 'height': 'auto'
        # Is our height a bit too large?
        if el.outerHeight() > 500
            # Adjust the height of the whole shebang using scrollbar.
            scroll.css 'height': $(window).height() / 2