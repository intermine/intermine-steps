Chaplin = require 'chaplin'

Tool = require 'chaplin/models/Tool'

module.exports = class History extends Chaplin.Collection

    'model': Tool

    'url': '/api/history'