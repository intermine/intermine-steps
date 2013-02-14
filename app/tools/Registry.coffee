categories =
    'query':    'Query/Search'
    'analysis': 'Analysis'
    'export': 'Export'
    'viz': 'Visualization'
    'set': 'Set Operations'
    'out': 'Linkout'
    'in': 'Import'
    'inter': 'Interoperation'

config =
    'i:onHomepage': [
        {
            'slug': 'templates-list-tool'
            'label': 'Queries (a list of templates)'
            'category': categories.query
        }, {
            'slug': 'region-search-tool'
            'label': 'Region search'
            'category': categories.query
        }, {
            'slug': 'blast-search-tool'
            'label': 'BLAST (Concordia University)'
            'category': categories.query
        }, {
            'slug': 'enrichment-tool'
            'label': 'GO Enrichment'
            'extra': 'go'
            'category': categories.analysis
        }, {
            'slug': 'enrichment-tool'
            'label': 'Publications Enrichment'
            'extra': 'publications'
            'category': categories.analysis
        }, {
            'slug': 'enrichment-tool'
            'label': 'Pathways Enrichment'
            'extra': 'pathways'
            'category': categories.analysis
        }, {
            'slug': 'graph-viz-tool'
            'label': 'Expression graph widget'
            'extra': 'expression'
            'category': categories.viz
        }, {
            'slug': 'graph-viz-tool'
            'label': 'Chromosome distribution widget'
            'extra': 'chromosome-distribution'
            'category': categories.viz
        }, {
            'slug': 'network-viz-tool'
            'label': 'Cytoscape network diagram'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'Publications for a Gene'
            'extra': 'publications-displayer'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'SPELL YeastMine Histogram'
            'extra': 'spell'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'Mouse Phenotype Dendrogram Clustering'
            'extra': 'mouse-phenotype-dendrogram'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'Pathways from other mines'
            'extra': 'pathways'
            'category': categories.viz
        }, {
            'slug': 'set-operations-tool'
            'label': 'Intersect lists'
            'extra': 'intersect'
            'category': categories.set
        }, {
            'slug': 'set-operations-tool'
            'label': 'Do a list union'
            'extra': 'union'
            'category': categories.set
        }, {
            'slug': 'set-operations-tool'
            'label': 'Subtract lists'
            'extra': 'subtract'
            'category': categories.set
        }, {
            'slug': 'upload-list-tool'
            'label': 'Upload a new list'
            'category': categories.in
        }, {
            'slug': 'import-query-tool'
            'label': 'Import a query/template'
            'category': categories.in
        }, {
            'slug': 'import-tags-tool'
            'label': 'Import tags'
            'category': categories.in
        }
    ]
    'i:haveGene': [
        {
            'slug': 'suggest-query-tool'
            'label': 'View all pathways for this gene'
            'extra': 'pathways'
            'category': categories.query
        }, {
            'slug': 'suggest-query-tool'
            'label': 'View all protein domains for this gene'
            'extra': 'protein-domains'
            'category': categories.query
        }, {
            'slug': 'linkout-tool'
            'label': 'FlyBase'
            'extra': 'flybase'
            'category': categories.out
        }
    ]
    'i:haveProtein': [
        {
            'slug': 'linkout-tool'
            'label': 'UniProt'
            'extra': 'uniprot'
            'category': categories.out
        }
    ]
    'i:haveOne': [
        {
            'slug': 'convert-type-tool'
            'label': 'Convert this item to another type'
            'category': categories.query
        }
    ]
    'i:haveList': [
        {
            'slug': 'export-tool'
            'label': 'Export to Galaxy'
            'extra': 'galaxy'
            'category': categories.export
        }, {
            'slug': 'export-tool'
            'label': 'Export to GenomeSpace'
            'extra': 'genome-space'
            'category': categories.export
        }, {
            'slug': 'export-tool'
            'label': 'Export to Comma Separated Values (CSV)'
            'extra': 'csv'
            'category': categories.export
        }, {
            'slug': 'export-tool'
            'label': 'Export to R'
            'extra': 'r'
            'category': categories.export
        }, {
            'slug': 'export-tool'
            'label': 'Export to Tab Separated file (TAB)'
            'extra': 'tab'
            'category': categories.export
        }, {
            'slug': 'export-tool'
            'label': 'Export to FASTA format'
            'extra': 'fasta'
            'category': categories.export
        }, {
            'slug': 'export-tool'
            'label': 'Export to RDF format'
            'extra': 'rdf'
            'category': categories.export
        }, {
            'slug': 'graph-viz-tool'
            'label': 'Expression graph widget for this list'
            'extra': 'expression'
            'category': categories.viz
        }, {
            'slug': 'graph-viz-tool'
            'label': 'Chromosome distribution for this list'
            'extra': 'chromosome-distribution'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'Render a custom graph for this list'
            'extra': 'custom-graph'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'Render a heat map for this list'
            'extra': 'custom-heatmap'
            'category': categories.viz
        }, {
            'slug': 'report-widget-tool'
            'label': 'Render a cluster diagram for this list'
            'extra': 'custom-cluster'
            'category': categories.viz
        }, {
            'slug': 'set-operations-tool'
            'label': 'Intersect with other lists'
            'extra': 'intersect'
            'category': categories.set
        }, {
            'slug': 'set-operations-tool'
            'label': 'List union with other lists'
            'extra': 'union'
            'category': categories.set
        }, {
            'slug': 'set-operations-tool'
            'label': 'Subtract lists'
            'extra': 'subtract'
            'category': categories.set
        }, {
            'slug': 'orthologues-tool'
            'label': 'Convert to orthologues in YeastMine'
            'extra': 'yeastmine'
            'category': categories.inter
        }, {
            'slug': 'orthologues-tool'
            'label': 'Convert to orthologues in RatMine'
            'extra': 'ratmine'
            'category': categories.inter
        }, {
            'slug': 'orthologues-tool'
            'label': 'Convert to orthologues in this mine'
            'category': categories.inter
        }
    ]

# Dupe for now.
config['i:onLeft'] = config['i:onHomepage']

module.exports = config