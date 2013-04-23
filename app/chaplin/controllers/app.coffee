Controller = require 'chaplin/core/Controller'

module.exports = class AppController extends Controller

    # Reset the database.
    reset: (params) ->
        collection = window.History
        # LocalStorage.
        collection.storage.reset()
        # Collection itself.
        collection.reset()

        setTimeout =>
            @redirectToRoute 'landing'
        , 0