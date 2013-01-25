Chaplin = require 'chaplin'

module.exports = class Tool extends Chaplin.Model

    initialize: ->
        super

        # Do we need to set the creation date?
        unless @get 'created' then @set 'created', new Date()

        @