Tool = require 'chaplin/models/Tool'

module.exports = class OntologyGraphTool extends Tool

    defaults:
        'slug': 'ontology-graph-tool'
        'name': 'OntologyGraphTool'
        'title': 'Ontology Graph'
        'description': 'Show an Ontology Graph for a Gene'
        'type': 'goldentainoi'
        'steps': [ 'Choose a Gene', 'Convert Gene to a Symbol', 'See the Graph' ]