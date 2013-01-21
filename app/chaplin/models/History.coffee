Chaplin = require 'chaplin'

Tool = require 'chaplin/models/Tool'

module.exports = class History extends Chaplin.Collection

    'model': Tool

    initialize: ->
        super

        # Init some fake data.
        @add new Tool 'row': 0, 'col': 0, 'created': 1358515000000, 'description': 'A', 'name': 'UploadListTool', 'type': 'deyork', 'locked': true, 'parent': null
        @add new Tool 'row': 0, 'col': 1, 'created': 1358516000000, 'description': 'B', 'name': 'QueriesTool', 'type': 'curiousblue', 'locked': true, 'parent': { 'row': 0, 'col': 0 }
        @add new Tool 'row': 0, 'col': 2, 'created': 1358517000000, 'description': 'C', 'name': 'ResultsTableTool', 'type': 'seagreen', 'locked': true, 'parent': { 'row': 0, 'col': 1 }
        @add new Tool 'row': 1, 'col': 1, 'created': 1358518000000, 'description': 'D', 'name': 'QueriesTool', 'type': 'curiousblue', 'locked': true, 'parent': { 'row': 0, 'col': 0 }
        @add new Tool 'row': 1, 'col': 2, 'created': 1358519000000, 'description': 'E', 'name': 'UploadListTool', 'type': 'deyork', 'locked': true, 'parent': { 'row': 1, 'col': 1 }
        @add new Tool 'row': 1, 'col': 3, 'created': 1358520000000, 'description': 'F', 'name': 'ResultsTableTool', 'type': 'seagreen', 'locked': true, 'parent': { 'row': 1, 'col': 2 }
        @add new Tool 'row': 2, 'col': 0, 'created': 1358521000000, 'description': 'G', 'name': 'UploadListTool', 'type': 'deyork', 'locked': true, 'parent': null
        @add new Tool 'row': 2, 'col': 1, 'created': 1358522000000, 'description': 'H', 'name': 'ResultsTableTool', 'type': 'seagreen', 'locked': true, 'parent': { 'row': 2, 'col': 0 }

        @