Chaplin = require 'chaplin'

utils = require 'chaplin/lib/utils'

module.exports = class Dispatcher extends Chaplin.Dispatcher

    # After Controller startup.
    controllerLoaded: (controllerName, action, params, options, ControllerConstructor) ->
        super

        # Initialize the new controller.
        controller = new ControllerConstructor params, options

        afterActions = []
        args = arguments

        for acts in utils.getAllPropertyVersions controller, 'afterAction'
            # Iterate over the before actions in search for a matching
            # name with the arguments’ action name.
            for name, afterAction of acts
                # Do not add this object more than once.
                if name is action or RegExp("^#{name}$").test(action)
                    if typeof afterAction is 'string'
                        afterAction = controller[afterAction]
                    if typeof afterAction isnt 'function'
                        throw new Error 'Controller#executeAfterActions: ' +
                            "#{afterAction} is not a valid afterAction method for #{name}."
                    # Save the before action.
                    afterActions.push afterAction

        # Save returned value and also immediately return in case the value is false.
        next = (method, previous = null) =>
            # Stop if the action triggered a redirect.
            return if controller.redirected

            # We are done.
            return unless method

            previous = method.call controller, params, options, previous

            # Detect a CommonJS promise in order to use pipelining below,
            # otherwise execute next method directly.
            if previous and typeof previous.then is 'function'
                previous.then (data) =>
                    # Execute as long as the currentController is
                    # the callee for this promise.
                    if not @currentController or controller is @currentController
                        next afterActions.shift(), data
            else
                next afterActions.shift(), previous

        # Start afterAction execution chain.
        next afterActions.shift()