Tool = require 'chaplin/models/Tool'

module.exports = class UploadListTool extends Tool

    defaults:
        'slug': 'upload-tool'
        'name': 'UploadTool'
        'title': 'Upload a List'
        'description': 'Upload a list of identifiers'
        'type': 'deyork'
        'steps': [ 'Input Identifiers', 'Resolve Identifiers', 'See Results' ]