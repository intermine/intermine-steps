config = [
    {
        'slug': 'enrich-list-tool'
        'help': 'Contrary to popular belief, <em>Lorem Ipsum</em> is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
        'labels': [
            {
                'label': '**Enrich** an existing list'
                'category': [ 'Category 1', 'Subcategory 1' ]
                'weight': 15
                'keywords': [ 'chart', 'widget', 'graph' ]
                'context': [ 'bar', 'homepage' ]
            }
        ]
    }, {
        'slug': 'blast-search-tool'
        'labels': [
            {
                'label': '**BLAST** search'
                'category': [ 'Category 1' ]
                'weight': 20
                'keywords': [ 'search' ]
                'context': [ 'homepage' ]
            }
        ]
    }, {
        'slug': 'report-widget-tool'
        'labels': [
            {
                'label': '**Publications** for a *Gene*'
                'category': [ 'Category 1' ]
                'extra': 'publications-displayer'
                'weight': 11
                'context': [ 'homepage' ]
            }
        ]
    }, {
        'slug': 'upload-list-tool'
        'help': 'Contrary to popular belief, <em>Lorem Ipsum</em> is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
        'labels': [
            {
                'label': '**Upload** a new list'
                'category': [ 'Category 1', 'Subcategory 2', ]
                'weight': 18
                'context': [ 'homepage' ]
            }, {
                'label': '**Upload** a new list'
                'context': [ 'header' ]
            }
        ]
    }, {
        'slug': 'results-table-tool'
        'help': 'Nothing much to say really'
        'labels': [
            {
                'label': 'See list in a **table**'
                'category': [ 'Visualization &amp; Display' ]
                'weight': 15
                'keywords': [ 'results' ]
                'context': [ 'iHaveList' ]
            }
        ]
    }, {
        'slug': 'enrich-list-tool'
        'labels': [
            {
                'label': '**Enrich** this list'
                'category': [ 'Enrichment' ]
                'weight': 11
                'keywords': [ 'chart', 'widget' ]
                'context': [ 'iHaveList' ]
            }
        ]
    }, {
        'slug': 'export-tool'
        'labels': [
            {
                'label': 'Export to **Galaxy**'
                'category': [ 'Data Export' ]
                'extra': 'galaxy'
                'weight': 20
                'keywords': [ 'output', 'dump' ]
                'context': [ 'iHaveList' ]
            }, {
                'label': 'Export to a **CSV** file'
                'category': [ 'Data Export' ]
                'extra': 'csv'
                'weight': 18
                'keywords': [ 'spreadsheet', 'tab', 'excel' ]
                'context': [ 'iHaveList' ]
            }
        ]
    }
]

module.exports = config