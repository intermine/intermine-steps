config =
    'i:onHomepage': [
        {
            'slug': 'enrich-list-tool'
            'label': '**Enrich** an existing list'
            'category': 'Category 1'
            'keywords': [ 'chart', 'widget' ]
            'weight': 15
        }, {
            'slug': 'blast-search-tool'
            'label': '**BLAST** search'
            'category': 'Category 1'
            'keywords': [ 'search' ]
            'weight': 20
        }, {
            'slug': 'report-widget-tool'
            'label': '**Publications** for a *Gene*'
            'extra': 'publications-displayer'
            'category': 'Category 1'
            'weight': 2
        }, {
            'slug': 'upload-list-tool'
            'label': '**Upload** a new list'
            'category': 'Category 1'
            'weight': 7
        }
    ]
    'i:haveList': [
        {
            'slug': 'results-table-tool'
            'label': 'See list in a **table**'
            'category': 'Category 1'
            'keywords': [ 'results' ]
            'weight': 5
        }, {
            'slug': 'enrich-list-tool'
            'label': '**Enrich** this list'
            'category': 'Category 1'
            'keywords': [ 'chart', 'widget' ]
            'weight': 9
        }
    ]
    'i:canExport': [
        {
            'slug': 'export-tool'
            'label': 'Export to **Galaxy**'
            'extra': 'galaxy'
            'category': 'Data Export'
            'keywords': [ 'output', 'dump' ]
            'weight': 2
        }, {
            'slug': 'export-tool'
            'label': 'Export to a **CSV** file'
            'extra': 'csv'
            'category': 'Data Export'
            'keywords': [ 'spreadsheet', 'tab', 'excel' ]
            'weight': 1
        }
    ]

# Dupe for now.
config['i:onLeft'] = config['i:onHomepage']

module.exports = config