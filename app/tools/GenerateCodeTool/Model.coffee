Tool = require 'chaplin/models/Tool'

module.exports = class GenerateCodeTool extends Tool

    defaults:
        'slug': 'generate-code-tool'
        'name': 'GenerateCodeTool'
        'type': 'deyork'
        'steps': [ 'Choose input', 'See code' ]