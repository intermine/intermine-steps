Tool = require 'chaplin/models/Tool'

module.exports = class LinkoutTool extends Tool

    defaults:
        'slug': 'linkout-tool'
        'name': 'LinkoutTool'
        'title': 'Linking out'
        'type': 'goldentainoi'
        'steps': [ 'Please standby ...' ]