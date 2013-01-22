module.exports =
    # Show templates in the system.
    'QueriesTool':
        'name': 'QueriesTool'
        'title': 'Queries Tool aka Templates'
        'description': 'Choose a template'
        'type': 'seagreen'
        # Our internal steps.
        'steps': [ 'Choose a template', 'See Template' ]
        # What are the next steps?
        'output':
            # Show in a Results Table
            'ResultsTableTool':
                # Show in a second step...
                'step': 2
                # ...with this text
                'text': 'Show in a table'
    
    # A Results Table.
    'ResultsTableTool':
        'name': 'ResultsTableTool'
        'title': 'Results Table'
        'description': 'Show a table of results'
        'type': 'curiousblue'
        # Our internal steps.
        'steps': [ 'See Table' ]
        # You cannot see me unless you go from a diff step.
        'hidden': true

    # Upload a list.
    'UploadListTool':
        'name': 'UploadListTool'
        'title': 'Upload a List'
        'description': 'Upload a list of identifiers'
        'type': 'deyork'
        # Our internal steps.
        'steps': [ 'Input Identifiers', 'See Result' ]
        # What are the next steps?
        'output':
            # Show in a Results Table
            'ResultsTableTool':
                # Show in a second step...
                'step': 2
                # ...with this text
                'text': 'Show in a table'