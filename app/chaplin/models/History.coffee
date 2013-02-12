Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

Tool = require 'chaplin/models/Tool'

module.exports = class History extends Chaplin.Collection

    'model': Tool

    'url': '/api/history'

    initialize: ->
        super

        # Add a user's model to our collection.
        Mediator.subscribe 'history:add', @addTool, @
        # Make sure that we have a globally accessible current step.
        Mediator.subscribe 'history:activate', @setCurrent, @
        # New step in history.
        Mediator.subscribe 'history:reset', @resetCurrent, @

    # Reset the current tool when we start anew.
    resetCurrent: (@current = null) =>

    # Make sure we store the current step guid on a global object.
    setCurrent: (@current) =>

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
        else
            # Otherwise set the current uid as the parent.
            if @current then model.set 'parent', @current

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
        # Delete our UID just to make sure.
        delete obj.guid
        # Require the Model.
        Clazz = require "tools/models/#{obj.name}"
        # Init the Model again.
        new Clazz obj