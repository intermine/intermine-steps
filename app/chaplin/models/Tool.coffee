Chaplin = require 'chaplin'

module.exports = class Tool extends Chaplin.Model

    # By default the Model is unlocked and free for editing.
    defaults:
        'locked': false

    initialize: (opts) ->
        super

        # Timestamp of creation date.
        @set 'created', Date.now() unless opts.created