Chaplin = require 'chaplin'

# Be it in the main View or in the History, store generic functionality here.
module.exports = class GenericToolView extends Chaplin.View

    # Update our "time ago" and call again if we change often.
    updateTime: =>
        assert @model, 'Model is not set'

        # Element to update.
        el = $(@el).find('em.ago')
        # The creation date.
        created = new Date @model.get 'created'

        assert created, 'Creation date for Tool not set'

        # Previous time.
        c = null
        # Init timeout for fib sequence.
        [a, b] = [0, 1]
        # Run this now for the first time.
        do queue = ->
            d = moment(created).fromNow()
            # Call again?
            if c isnt d
                # Reset fib.
                [a, b] = [0, 1]
                # Save and show value.
                el.text c = d
            # Call later.
            else
                # Delay update by calling fib.
                [a, b] = [b, a + b]

            # Call us in this time.
            setTimeout queue, b * 1000