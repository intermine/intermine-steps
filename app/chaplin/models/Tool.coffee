Chaplin = require 'chaplin'

module.exports = class Tool extends Chaplin.Model

    defaults:
        'locked': false # unlocked, can be edited
        'tool': null # linked to nothing, root node