View = require 'chaplin/core/View'

module.exports = class CrumbView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'li'

    getTemplateFunction: -> require 'chaplin/templates/crumb'