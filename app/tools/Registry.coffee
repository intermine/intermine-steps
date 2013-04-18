config = [
    {
        'slug': 'upload-tool'
        'help': 'On first step choose between list, template, region search that changes the form on step 1'
        'labels': [
            {
                'label': 'Upload'
                'weight': 10
                'place': 'header'
                'keywords': [ 'list', 'template', 'region' ]
            }, {
                'label': 'Upload list, template or a region'
                'weight': 10
                'place': 'home'
                'keywords': [ 'list', 'template', 'region' ]
            }
        ]
    }, {
        'slug': 'search-tool'
        'help': 'Filter tools on the page & run quick search on the server'
        'labels': [
            {
                'label': 'Search'
                'weight': 10
                'place': 'header'
                'keywords': [ 'filter' ]
            }
        ]
    }, {
        'slug': 'query-builder-tool'
        'help': 'A query builder or a tool that suggest a query based on your input'
        'labels': [
            {
                'label': 'Build some stuff'
                'weight': 10
                'place': 'right'
                'category': [ 'Start again' ]
                'keywords': [ 'query', 'builder', 'suggest' ]
            }
        ]
    }, {
        'slug': 'blast-tool'
        'help': 'Concordia example tool'
        'labels': [
            {
                'label': 'BLAST from the past'
                'weight': 10
                'place': 'right'
                'category': [ 'Start again' ]
                'keywords': [ 'concordia' ]
            }
        ]
    }, {
        'slug': 'set-operations-tool'
        'help': 'You can always do set operations on a list'
        'labels': [
            {
                'label': 'Do set operations'
                'weight': 10
                'place': 'right'
                'category': [ 'Start again' ]
                'keywords': [ 'union', 'intersection', 'subtraction' ]
            }, {
                'label': 'List union'
                'weight': 10
                'context': [ 'have:list' ]
                'place': 'right'
                'category': [ 'Set operations' ]
                'extra': 'union'
            }, {
                'label': 'List intersection'
                'weight': 10
                'context': [ 'have:list' ]
                'place': 'right'
                'category': [ 'Set operations' ]
                'extra': 'intersection'
            }, {
                'label': 'List subtraction'
                'weight': 10
                'context': [ 'have:list' ]
                'place': 'right'
                'category': [ 'Set operations' ]
                'extra': 'subtraction'
            }
        ]
    }, {
        'slug': 'download-tool'
        'help': 'tab, csv, sequence (fasta), gff3, xml, json, bed'
        'labels': [
            {
                'label': 'Download in TAB format'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'tab'
                'keywords': [ 'export' ]
            }, {
                'label': 'Download in CSV format'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'csv'
                'keywords': [ 'export' ]
            }, {
                'label': 'Download in sequence format (FASTA)'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'fasta'
                'keywords': [ 'export' ]
            }, {
                'label': 'Download in GFF3 format'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'gff3'
                'keywords': [ 'export' ]
            }, {
                'label': 'Download in XML format'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'xml'
                'keywords': [ 'export' ]
            }, {
                'label': 'Download in JSON format'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'json'
                'keywords': [ 'export' ]
            }, {
                'label': 'Download in BED format'
                'weight': 10
                'context': [ 'can:download' ]
                'place': 'right'
                'category': [ 'Download' ]
                'extra': 'bed'
                'keywords': [ 'export' ]
            }
        ]
    }, {
        'slug': 'save-tool'
        'help': 'when something is saveable, usually it will be a list'
        'labels': [
            {
                'label': 'Save'
                'weight': 10
                'context': [ 'can:save' ]
                'place': 'right'
                'category': [ 'Save' ]
                'keywords': [ 'list' ]
            }
        ]
    }, {
        'slug': 'generate-code-tool'
        'help': 'python, js, ruby, java, perl'
        'labels': [
            {
                'label': 'Generate code in Python'
                'weight': 10
                'context': [ 'can:code' ]
                'place': 'right'
                'category': [ 'Code' ]
                'extra': 'python'
            }, {
                'label': 'Generate code in JavaScript'
                'weight': 10
                'context': [ 'can:code' ]
                'place': 'right'
                'category': [ 'Code' ]
                'extra': 'js'
            }, {
                'label': 'Generate code in Ruby'
                'weight': 10
                'context': [ 'can:code' ]
                'place': 'right'
                'category': [ 'Code' ]
                'extra': 'ruby'
            }, {
                'label': 'Generate code in Java'
                'weight': 10
                'context': [ 'can:code' ]
                'place': 'right'
                'category': [ 'Code' ]
                'extra': 'java'
            }, {
                'label': 'Generate code in Perl'
                'weight': 10
                'context': [ 'can:code' ]
                'place': 'right'
                'category': [ 'Code' ]
                'extra': 'perl'
            }
        ]
    }, {
        'slug': 'linkout-tool'
        'help': 'not a tool per se, a link is one provided by config; has an icon to show this fact'
        'labels': [
            {
                'label': 'ArrayExpress Atlas'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.ebi.ac.uk/gxa/gene/<%= @id %>'
                'keywords': [ 'ebi' ]
            }, {
                'label': 'UniGene'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.ncbi.nlm.nih.gov/sites/entrez?db=unigene&cmd=search&term=<%= @symbol %>+AND+<%= @taxon %>[orgn]'
                'keywords': [ 'ncbi', 'entrez' ]
            }, {
                'label': 'FlyExpress'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.flyexpress.net/search.php?type=image&search=<%= @id %>'
            }, {
                'label': 'FlyBase'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.flybase.org/.bin/fbidq.html?<%= @id %>'
            }, {
                'label': 'GenomeRNAi'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://genomernai.de/GenomeRNAi/genedetails/<%= @id %>'
            }, {
                'label': 'ensembl'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.ensembl.org/Drosophila_melanogaster/geneview?db=core&gene=<%= @id %>'
                'keywords': [ 'drosophila' ]
            }, {
                'label': 'BDGP in situ'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.fruitfly.org/cgi-bin/ex/bquery.pl?qtype=report&find=<%= @id %>&searchfield=CG'
                'keywords': [ 'fruitfly' ]
            }, {
                'label': 'Entrez Gene'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene&cmd=Retrieve&dopt=full_report&list_uids=<%= @id %>'
                'keywords': [ 'ncbi', 'entrez' ]
            }, {
                'label': 'FlyAtlas'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://flyatlas.org/atlas.cgi?name=<%= @id %>'
            }, {
                'label': 'Homologene'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://www.ncbi.nlm.nih.gov/sites/entrez?Db=homologene&cmd=detailssearch&term=<%= @taxon %>[orgn]+<%= @symbol %>[Gene]'
                'keywords': [ 'ncbi' ]
            }, {
                'label': 'BioGRID'
                'weight': 10
                'context': [ 'can:linkout' ]
                'place': 'linkout'
                'category': [ 'Linkouts' ]
                'href': 'http://thebiogrid.org/search.php?search=<%= @id %>&organism=<%= @organism %>'
            }
        ]
    }, {
        'slug': 'list-widget-tool'
        'help': 'List Widgets'
        'labels': [
            {
                'label': 'Enrichment'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Gene ontology' ]
                'extra': 'enrichment'
                'keywords': [ 'gene', 'ontology', 'enrich', 'widget' ]
            }, {
                'label': 'Visualization'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Gene ontology' ]
                'extra': 'chart'
                'keywords': [ 'gene', 'ontology', 'chart', 'graph', 'widget' ]
            }, {
                'label': 'Enrichment'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Pathways' ]
                'extra': 'enrichment'
                'keywords': [ 'pathways', 'enrich', 'widget' ]
            }, {
                'label': 'Visualization'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Pathways' ]
                'extra': 'chart'
                'keywords': [ 'pathways', 'chart', 'graph', 'widget' ]
            }, {
                'label': 'Enrichment'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Literature' ]
                'extra': 'enrichment'
                'keywords': [ 'literature', 'publications', 'enrich', 'widget' ]
            }, {
                'label': 'Enrichment'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'fly-FISH expression experiment' ]
                'extra': 'enrichment'
                'keywords': [ 'flyfish', 'expression', 'enrich', 'widget' ]
            }, {
                'label': 'Visualization'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'fly-FISH expression experiment' ]
                'extra': 'chart'
                'keywords': [ 'flyfish', 'expression', 'chart', 'graph', 'widget' ]
            }, {
                'label': 'Enrichment'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'BDGP' ]
                'extra': 'enrichment'
                'keywords': [ 'bdgp', 'enrich', 'widget' ]
            }, {
                'label': 'Visualization'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'BDGP' ]
                'extra': 'chart'
                'keywords': [ 'bdgp', 'chart', 'graph', 'widget' ]
            }, {
                'label': 'Visualization'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Homologue' ]
                'extra': 'chart'
                'keywords': [ 'homologue', 'chart', 'graph', 'widget' ]
            }, {
                'label': 'Chromosome distribution'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Genes' ]
                'extra': 'chart'
                'keywords': [ 'gene', 'chart', 'graph', 'widget' ]
            }, {
                'label': 'Chromosome distribution'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Sequence Features' ]
                'extra': 'chart'
                'keywords': [ 'sequence', 'chart', 'graph', 'widget' ]
            }
        ]
    }, {
        'slug': 'query-tool'
        'labels': [
            {
                'label': 'Query'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Gene ontology' ]
                'keywords': [ 'gene', 'ontology' ]
            }
        ]
    }, {
        'slug': 'report-tool'
        'labels': [
            {
                'label': 'Show gene summary'
                'weight': 10
                'context': [ 'type:gene', 'n:1' ]
                'place': 'right'
                'category': [ 'Genes' ]
                'keywords': [ 'report' ]
            }, {
                'label': 'Show gene summary'
                'weight': 10
                'context': [ 'type:gene', 'n:1' ]
                'place': 'right'
                'category': [ 'Sequence Features' ]
                'keywords': [ 'report' ]
            }
        ]
    }, {
        'slug': 'report-widget-tool'
        'labels': [
            {
                'label': 'Cytoscape network'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Interactions' ]
                'keywords': [ 'report', 'widget' ]
            }, {
                'label': 'Visualization'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Regulation' ]
                'keywords': [ 'report', 'widget', 'regulation' ]
            }, {
                'label': 'Rat diseases'
                'weight': 10
                'context': [ 'type:gene' ]
                'place': 'right'
                'category': [ 'Diseases' ]
                'keywords': [ 'report', 'widget', 'disease' ]
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

module.exports = config