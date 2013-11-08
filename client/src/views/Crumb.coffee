View     = require '../core/View'

template = require '../templates/crumb'

# One breadcrumb item.
module.exports = class CrumbView extends View

    containerMethod: 'html'
    autoRender:      true
    tagName:         'li'

    getTemplateFunction: -> template