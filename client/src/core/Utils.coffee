@.Utils =
    # Is input an integer?
    'isInt': (input) -> typeof input is 'number' and input % 1 is 0

    # Generate a pseudo-GUID by concatenating random hexadecimal.
    'guid': ->
        s4 = -> (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1
        [ s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4() ].join('')

    # hyphen-notation to PascalCase.
    'hyphenToPascal': (text) ->
        ( x.charAt(0).toUpperCase() + x.slice(1) for x in text.split('-') ).join('')

    # Array equality.
    'arrayEql': (a, b) ->
        return false if not a or not b
        not (a < b or b < a)

    # Callback when window comes back to focus.
    'inFocus': (cb) ->
        hidden = false

        onchange = (evt=window.event) ->        
            switch evt.type
                # Everyone but standards.
                when 'focus', 'focusin' then hidden = false
                when 'blur', 'focusout' then hidden = true
                # Standards.
                else hidden = !hidden

            cb() unless hidden

        # Standards.
        props = [
            [ 'hidden', 'visibilitychange' ]
            [ 'mozHidden', 'mozvisibilitychange' ]
            [ 'webkitHidden', 'webkitvisibilitychange' ]
            [ 'msHidden', 'msvisibilitychange' ]
        ]
        for [ prop, change ] in props
            if prop of document
                return document.addEventListener change, onchange

        # <= IE 9.
        if 'onfocusin' of document then return document.onfocusin = document.onfocusout = onchange
        
        # Everyone else.
        window.onfocus = window.onblur = onchange

    # Deep clone.
    'cloneDeep': (val) -> JSON.parse JSON.stringify val