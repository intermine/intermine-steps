Collection = require 'chaplin/core/Collection'
Mediator = require 'chaplin/core/Mediator'
LocalStorage = require 'chaplin/core/LocalStorage'

Tool = require 'chaplin/models/Tool'

module.exports = class History extends Collection

    'model': Tool

    'url': '/api/history'

    initialize: ->
        super

        # Associate a LocalStorage collection with us.
        @storage = new LocalStorage 'Steps'

        # Add a user's model to our collection.
        Mediator.subscribe 'history:add', @addTool, @

    # The initial fetch either from LocalStorage or, if empty, from the server.
    bootup: (cb) ->
        # Do we have data in LocalStorage?
        data = @storage.findAll()
        if data.length is 0
            # Call Backbone then.
            @fetch
                'error': (coll, res) -> assert false, res.responseText
                'success': (coll, res) =>
                    # Save in LocalStorage.
                    coll.each (model) => @storage.add model.toJSON()
                    # Start checking storage.
                    @checkStorage()
                    # Callback.
                    cb coll
        else
            # Save the models on us then.
            ( @add(obj) for obj in data )
            # Start checking storage.
            @checkStorage()
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

        # Check again later on.
        @timeouts.push setTimeout @checkStorage, 1000

    # Add a tool to our collection (following a user action).
    addTool: (model) =>
        # Is this model locked?
        if model.get('locked')?
            # Change the window location. Not great as router did not know about this.
            # window.history.pushState {}, 'Staða', "/tool/#{model.get('slug')}/continue"
            # Do we have parent?
            if parent = model.get('parent')
                window.App.router.changeURL "/tool/#{model.get('slug')}/continue/#{parent}"
            else
                window.App.router.changeURL "/tool/#{model.get('slug')}/new"

        # Set the creation time.
        model.set 'created', new Date()

        # Generate unused guid.
        notfound = true
        while notfound
            guid = window.Utils.guid()
            # Check not in our collection already.
            if @where({ 'guid': guid }).length is 0 then notfound = false
        # Set our uid.
        model.set 'guid': guid

        # It is now a "locked" object.
        model.set 'locked': true

        # Add to the collection.
        @add model
        # Further, save this model into a LocalStorage collection.
        @storage.add model.toJSON()

        # Say the View needs to update.
        Mediator.publish 'history:render', model
        # 'Activate' this model (will bolden the box in History).
        Mediator.publish 'history:activate', guid
        # Now do the sync.
        Backbone.sync 'update', @

    # Duplicate a model.
    dupe: (model) ->
        # Get JSON repr.
        obj = model.toJSON()
        # Delete our UID and creation time just to make sure.
        ( delete obj[key] for key in [ 'guid', 'created' ] )
        # Require the Model.
        Clazz = require "tools/models/#{obj.name}"
        # Init the Model again.
        new Clazz obj