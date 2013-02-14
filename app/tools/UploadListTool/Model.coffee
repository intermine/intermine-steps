Tool = require 'chaplin/models/Tool'

module.exports = class UploadListTool extends Tool

    defaults:
        'slug': 'upload-list-tool'
        'name': 'UploadListTool'
        'title': 'Upload a List'
        'description': 'Upload a list of identifiers'
        'type': 'deyork'
        'steps': [ 'Input Identifiers', 'See Result' ]