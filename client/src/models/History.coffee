Collection = require '../core/Collection'
Mediator = require '../core/Mediator'
LocalStorage = require '../core/LocalStorage'
Controller = require '../core/Controller'

Tool = require './Tool'

root = @

module.exports = class History extends Collection

    'model': Tool

    initialize: ->
        super

        # Associate a LocalStorage collection with us.
        @storage = new LocalStorage 'Steps'

        # Add a user's model to our collection.
        Mediator.subscribe 'history:add', @addTool, @

        # Our own little controller for redirection purposes.
        @controller = new Controller()

    # The initial fetch either from LocalStorage or, if empty, from the server.
    bootup: (cb) ->
        # Do we have data in LocalStorage?
        data = @storage.findAll()
        # Save the models on us.
        ( @add(obj) for obj in data )
        # Start checking storage.
        root.Utils.inFocus @checkStorage
        # Return us.
        cb @

    # Monitor LocalStorage for changes, adding models to our Collection.
    checkStorage: =>
        # Get all objects from LocalStorage and check we have them all.
        for obj in @storage.findAll()
            guid = obj.guid
            assert guid, 'LocalStorage object has no `guid`'

            switch @where({ 'guid': guid }).length
                when 0
                    console.log "Adding `#{guid}`"
                    @add obj
                when 1
                else
                    assert false, 'Cannot have more than 1 object with the same `guid`'

    # Add a tool to our collection (following a user action).
    addTool: (model, redirect=true) =>
        # Generate unused guid.
        notfound = true
        while notfound
            guid = root.Utils.guid()
            # Check not in our collection already.
            if @where({ 'guid': guid }).length is 0 then notfound = false
        # Set our uid.
        model.set 'guid': guid

        # Was this model locked?
        locked = model.get('locked')

        # It is now a "locked" object.
        model.set 'locked': true

        # Set the creation time.
        model.set 'created', new Date()

        # Add to the collection.
        @add model
        # Further, save this model into a LocalStorage collection.
        @storage.add model.toJSON()

        Chaplin.helpers.redirectTo('results', { 'slug': model.get('slug'), guid }) if redirect?

    # Duplicate a model, preserve data about "us" though!
    dupe: (model) ->
        # Get JSON repr.
        obj = model.toJSON()
        # Require the Model.
        Clazz = require "/steps/tools/#{obj.name}/Model"
        # Init the Model again.
        new Clazz obj