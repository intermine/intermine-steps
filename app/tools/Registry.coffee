module.exports =
    # Upload a list.
    'upload-list-tool':
        'name': 'UploadListTool'
        'title': 'Upload a List'
        'description': 'Upload a list of identifiers'
        'type': 'deyork'
        # Our internal steps.
        'steps': [ 'Input Identifiers', 'See Result' ]
        # What are the next steps?
        'next':
            # Show in a Results Table
            'ResultsTableTool':
                # Show in a second step...
                'step': 2
                # ...with this text
                'text': 'Show in a table'

    # A Results Table.
    'results-table-tool':
        'name': 'ResultsTableTool'
        'title': 'Results Table'
        'description': 'Show a table of results'
        'type': 'curiousblue'
        # Our internal steps.
        'steps': [ 'See Table' ]
        # You cannot see me unless you go from a diff step.
        'hidden': true
        # What are the next steps?
        'next':
            # Show a list enrichment.
            'EnrichListTool':
                # Show in the first step...
                'step': 1
                # ...with this text
                'text': 'See list enrichment'

    # Enrich a list.
    'enrich-list-tool':
        'name': 'EnrichListTool'
        'title': 'Enrich a List'
        'description': 'Show a list enrichment chart'
        'type': 'crail'
        # Our internal steps.
        'steps': [ 'Choose a list', 'See Chart' ]