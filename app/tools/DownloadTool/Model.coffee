Tool = require 'chaplin/models/Tool'

module.exports = class DownloadTool extends Tool

    defaults:
        'slug': 'download-tool'
        'name': 'DownloadTool'
        'type': 'turq'
        'steps': [ 'Choose export format', 'Download exported data' ]