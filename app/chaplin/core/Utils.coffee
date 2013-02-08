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
