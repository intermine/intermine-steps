Chaplin = require 'chaplin'

module.exports =
    # Show templates in the system.
    'QueriesTool':
        'title': 'Queries Tool aka Templates'
        'description': 'Chooses a template'
        'type': 'seagreen'
        # Our internal steps.
        'steps': [ 'Choose a template', 'See Template' ]
        # What are the next steps?
        'output':
            # Show in a Results Table
            'ResultsTableTool':
                'text': 'Show in a table'
    
    # A Results Table.
    'ResultsTableTool':
        'title': 'Results Table'
        'description': 'Shows a table of results'
        'type': 'curiousblue'
        # Our internal steps.
        'steps': [ 'Choose a query to begin with', 'See Table' ]
        # How can we get here?
        'input':
            # From a queries listing.
            'QueriesTool':
                'text': 'Choose an input query'
                # Pass these parameters in.
                'params': [ 'pathQuery' ]

    # Upload a list.
    'UploadListTool':
        'title': 'Upload a List'
        'description': 'Upload a list of identifiers'
        'type': 'deyork'
        # Our internal steps.
        'steps': [ 'Input Identifiers', 'See Result' ]
        # What are the next steps?
        'output':
            # Show in a Results Table
            'ResultsTableTool':
                'text': 'Show in a table'