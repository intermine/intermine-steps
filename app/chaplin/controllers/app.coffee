Controller = require 'chaplin/core/Controller'

module.exports = class AppController extends Controller

    afterAction:
        # If we have executed db reset...
        'reset': ->
            # ... redirect back to the landing page
            @redirectToRoute 'landing'

    # Reset the database.
    reset: (params) ->
        collection = window.History
        # LocalStorage.
        collection.storage.reset()
        # Collection itself.
        collection.reset()