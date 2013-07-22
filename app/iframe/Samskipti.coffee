root = this

# My name is Skipti... Sam Skipti.
module.exports = class Samskipti

    constructor: (opts) ->
        self = @

        # Build an internal channel.
        @channel = root.Channel.build opts

        self.invoke = {}
        self.listenOn = {}

        # We know these functions...
        for fn in [ 'apps' ] then do (fn) ->
            # We can invoke them.
            self.invoke[fn] = (opts...) ->
                self.channel.call
                    'method': fn
                    'params': opts
                    'success': ->

            # We listen to them.
            self.channel.bind fn, (trans, args) ->
                return self.listenOn[fn].apply(null, args) if self.listenOn[fn] and typeof self.listenOn[fn] is 'function'

                console.log "Why u no define `#{fn}`?"