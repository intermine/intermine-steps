config =
    'i:onHomepage': [
        {
            'slug': 'enrich-list-tool'
            'label': '**Enrich** an existing list'
            'category': 'Category 1'
        }, {
            'slug': 'blast-search-tool'
            'label': '**BLAST** (Concordia University)'
            'category': 'Category 1'
        }, {
            'slug': 'report-widget-tool'
            'label': '**Publications** for a Gene'
            'extra': 'publications-displayer'
            'category': 'Category 1'
        }, {
            'slug': 'upload-list-tool'
            'label': '**Upload** a new list'
            'category': 'Category 1'
        }
    ]
    'i:haveList': [
        {
            'slug': 'export-tool'
            'label': 'Export to **Galaxy**'
            'extra': 'galaxy'
            'category': 'Category 1'
        }, {
            'slug': 'results-table-tool'
            'label': 'See list in a **table**'
            'category': 'Category 1'
        }, {
            'slug': 'enrich-list-tool'
            'label': '**Enrich** this list'
            'category': 'Category 1'
        }
    ]

# Dupe for now.
config['i:onLeft'] = config['i:onHomepage']

module.exports = config