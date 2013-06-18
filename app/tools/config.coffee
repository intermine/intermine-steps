# Core configuration.
exports.config =
    # Root URL for all mine requests (for now we only work with 1 mine).
    'mine': 'http://beta.flymine.org/beta'
    # A token so we can be creating lists in the background (throwaway account).
    'token': 'T153WfD21eK7C20fb95f'

# Tool configuration based on the user logged in.
exports.registry = [
    {
        'slug': 'use-list-tool'
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
        'slug': 'ontology-graph-tool'
        'labels': [
            {
                'label': 'Ontology Graph for a Gene'
                'weight': 10
                'context': [ 'have:list', 'have:one', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 2' ]
            }
        ]
    }, {
        'slug': 'list-widget-tool'
        'labels': [
            {
                'label': 'Gene Expression in the Fly (FlyAtlas)'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'chart', 'flyatlas_for_gene' ]
            }, {
                'label': 'mRNA subcellular localisation (fly-FISH)'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'chart', 'flyfish' ]
            }, {
                'label': 'BDGP expression patterns'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'chart', 'bdgp' ]
            }, {
                'label': 'MiRNA Enrichment'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'enrichment', 'miranda_enrichment' ]
            }, {
                'label': 'Gene Ontology Enrichment'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'enrichment', 'go_enrichment_for_gene' ]
            }, {
                'label': 'Protein Domain Enrichment'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'enrichment', 'prot_dom_enrichment_for_gene' ]
            }, {
                'label': 'BDGP Enrichment'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'enrichment', 'bdgp_enrichment' ]
            }, {
                'label': 'Publication Enrichment'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'enrichment', 'publication_enrichment' ]
            }, {
                'label': 'Pathway Enrichment'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'enrichment', 'pathway_enrichment' ]
            }, {
                'label': 'Orthologues'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'table', 'orthologues' ]
            }, {
                'label': 'Chromosome Distribution'
                'weight': 10
                'context': [ 'have:list', 'type:Gene' ]
                'place': 'right'
                'category': [ 'Category 1' ]
                'extra': [ 'chart', 'chromosome_distribution_for_gene' ]
            }
        ]
    }
]