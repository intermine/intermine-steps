Chaplin = require 'chaplin'

HistoryToolView = require 'chaplin/views/HistoryTool'

module.exports = class HistoryView extends Chaplin.View

    'container':       '#history'
    'containerMethod': 'html'
    'autoRender':      true

    # Store all step Views here to garbage dump.
    views: []

    getTemplateFunction: -> require 'chaplin/templates/history'

    afterRender: ->
        super

        # Hide by default and set width to how much space we have on screen. Add a class.
        $(@el).css('width', $(window).width() - $('footer#bottom').outerWidth()).addClass('container')

        @tools = $(@el).find('#tools')

        # Set the height of the tools based on the height of the viewport.
        do height = => @tools.css 'height', ($(window).height() / 2) - 52

        # On window resize, update height again.
        $(window).resize height

        # Add a tool.
        Chaplin.mediator.subscribe 'history:add', (tool) =>
            # Update the tool's order (push on stack).
            tool.set 'order', @collection.length
            # Save on Collection.
            @collection.add tool
            @updateView()

        # Toggle the view.
        Chaplin.mediator.subscribe 'history:toggle', =>
            $('div#whiteout').toggle()
            $(@el).parent().slideToggle()
            @updateView()

        # Call initial view update.
        @updateView()

        @

    # Scroll to the last tool.
    scrollToLast: =>
        assert @tools, 'We do not have #tools captured'

        # Only when we are visible.
        if @tools.is(':visible')
            # Scroll to the new point.
            @tools.animate
                'scrollLeft': @tools.find('div.inner').width()
            , 0

    # Update the View rendering the Tools that have been used in the current session.
    updateView: ->
        # Show/hide info message if no tools used.
        if @collection.length is 0
            $(@el).find('p.message').show()
        else
            $(@el).find('p.message').hide()
        
        # Remove any and all step views.
        ( view.dispose() for view in @views )
        # Clear all of the tools inside and reset width.
        (tools = $(@el).find('#tools .inner')).html('')#.css('width', 0)

        # # Populate with separate step views, on order they have set.
        # @collection.each (model) =>
        #     @views.push step = new HistoryToolView 'model': model
        #     tools.append step.el
        #     # Update the width of the container.
        #     tools.css 'width', $(step.el).width() + tools.width()

        # Number of rows & columns we have.
        rows = 0 ; cols = 0

        # Add a row in DOM (with appropriate number of columns) so we can inject content.
        addRow = ->
            # First the row.
            row = $ '<tr/>', 'data-row': ++rows
            # Now for the columns.
            for i in [0...cols]
                row.append $ '<td/>', 'data-row': rows, 'data-col': cols
            # Finally append to table.
            tools.append row

        # Add a column in DOM (into all existing rows) so we can inject content.
        addCol = ->
            # Increase the column 'width'.
            cols += 1
            # For each row (1 indexed)...
            for i in [1...rows + 1]
                # ...append to the table.
                tools.find("tr[data-row=#{i}]").append $ '<td/>', 'data-row': i, 'data-col': cols

        # Add all steps.
        @collection.each (model) =>
            # Create the View.
            @views.push step = new HistoryToolView 'model': model
            # Where do we go?
            row = model.get('row') ; col = model.get('col')
            
            # Add rows if need be.
            dist = row - rows
            if dist > 0 then ( addRow() for i in [0...dist] )
            # Add columns if need be.
            dist = col - cols
            if dist > 0 then ( addCol() for i in [0...dist] )
            
            # Finally add the element.
            tools.find("tr[data-row=#{row}] td[data-col=#{col}]").append step.el

        # Update the width of the table.
        tools.css 'width', 180 * cols

        # Move to the last point. (Will need to update it when we have different histories).
        # @scrollToLast()