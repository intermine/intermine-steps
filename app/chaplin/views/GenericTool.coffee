View = require 'chaplin/core/View'

# Be it in the main View or in the History, store generic functionality here.
module.exports = class GenericToolView extends View

    # Update our "time ago" and call again if we change often.
    updateTime: (el) =>
        assert @model, 'Model is not set'

        # The creation date.
        created = new Date @model.get 'created'

        # Skip on new tools that we are using now.
        # if not created or isNaN(created.getTime())

        # Previous time.
        c = null
        # Init timeout for fib sequence.
        [a, b] = [0, 1]
        # Run this now for the first time.
        do queue = ->
            # If we do not exist anymore, fold...

            # What is the time difference?
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