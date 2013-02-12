# A Class for saving to localStorage.
module.exports = class LocalStorage

    # Name of the store.
    constructor: (@name) -> @refreshKeys()

    # Get the latest set of keys from LocalStorage.
    refreshKeys: ->
        item = window.localStorage.getItem @name
        @keys = (item and item.split(',')) or []

    # Destroy all entries.
    reset: ->
        # Remove the object.
        ( window.localStorage.removeItem(@name + '-' + key) for key in @keys )
        # Remove keys.
        @keys = []
        # Save new state.
        @save()

    # Add a Model.
    add: (model) ->
        # Do we have guid on us?
        assert model.guid, 'Model `guid` not provided'

        # Add to storage.
        window.localStorage.setItem @name + '-' + model.guid, JSON.stringify model
        # Save the key.
        key = model.guid.toString()
        @keys.push key unless key in @keys
        @save()

    # Save the local `@keys` into localStorage.
    save: -> window.localStorage.setItem @name, @keys.join(',')

    # Remove the Model.
    remove: (model) ->
        # Object.
        window.localStorage.removeItem @name + '-' + model.guid
        # Keys.
        @keys.splice @keys.indexOf(model.guid), 1
        @save()

    # Return all items.
    findAll: ->
        @refreshKeys()
        ( JSON.parse(window.localStorage.getItem(@name + '-' + key)) for key in @keys )