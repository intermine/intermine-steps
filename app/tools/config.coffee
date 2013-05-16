# Core configuration.
exports.config =
    # Root URL for all mine requests (for now we only work with 1 mine).
    'mine': 'http://beta.flymine.org/beta'
    # A token so we can be creating lists in the background (throwaway account).
    'token': 'x1P35eUaqcr9pcDdCaCe'

# Tool configuration based on the user logged in.
exports.registry = [
    {
        'slug': 'upload-list-tool'
        'help': 'Upload & resolve a list of identifiers'
        'labels': [
            {
                'label': 'Upload a list'
                'weight': 10
                'place': 'header'
                'keywords': [ 'list' ]
            }, {
                'label': 'Upload a list'
                'weight': 10
                'place': 'home'
                'keywords': [ 'list' ]
            }
        ]
    }, {
        'slug': 'results-table-tool'
        'labels': [
            {
                'label': 'Show in a table'
                'weight': 10
                'context': [ 'have:list' ]
                'place': 'right'
                'keywords': [ 'results' ]
            }
        ]
    }
]