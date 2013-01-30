Chaplin = require 'chaplin'

View = require 'chaplin/core/View'

module.exports = class RightSidebarView extends View

    container:       'aside#right'
    containerMethod: 'html'
    autoRender:      true

    getTemplateFunction: -> require 'chaplin/templates/sidebar-right'