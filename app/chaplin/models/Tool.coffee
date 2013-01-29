Chaplin = require 'chaplin'

module.exports = class Tool extends Chaplin.Model

    initialize: ->
        super

        # Set a slug?
        unless @get('slug') then @set 'slug', @get('name').replace(/([A-Z])/g, '-$1').toLowerCase()[1...]