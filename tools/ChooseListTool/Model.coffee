Tool = require '/steps/client/src/models/Tool'

module.exports = class ChooseListTool extends Tool

    defaults:
        'slug': 'choose-list-tool'
        'name': 'ChooseListTool'
        'title': 'Choose a List'
        'description': 'Use an existing list'
        'type': 'goldentainoi'