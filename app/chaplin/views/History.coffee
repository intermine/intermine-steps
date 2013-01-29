Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

View = require 'chaplin/lib/View'

HistoryToolView = require 'chaplin/views/HistoryTool'

Tool = require 'chaplin/models/Tool'

module.exports = class HistoryView extends View

    'container':       '#history'
    'containerMethod': 'html'
    'autoRender':      true

    getTemplateFunction: -> require 'chaplin/templates/history'

    initialize: ->
        super

        # Store all step Views here to garbage dump.
        @views = []

        # Number of rows & columns we have in the table grid.
        @rows = 0
        @cols = 0

        # Store the table grid DOM here for easy append of elements.
        @grid = []

        # Current state we are in.
        @current =
            'row': 0
            'col': -1

        # Add a step to the history, we need to resolve its position in the grid.
        Mediator.subscribe 'history:add', (model) =>
            assert @collection, "Do not have a `window.History` collection on view `#{@cid}`"

            # Is the current model locked?
            if model.get 'locked'
                # Reset the whole shebang.
                @resetTable()

                # For all models underneath us, set push them off by 1 row.
                @collection.each (model) =>
                    # Is the row below us?
                    if (row = model.get('row')) > @current.row
                        # Off by 1.
                        model.set 'row', row + 1
                    
                    # Need to move parent as well?
                    parent = model.get('parent')
                    if parent and parent.row > @current.row
                        parent.row += 1
                        model.set 'parent', parent
                    
                    # Render it back.
                    @addTool model

                # Set us "underneath" the parent (the first available row).
                model.set 'row': @current.row + 1, 'col': @current.col
            else
                # Continue in the same row.
                model.set 'row': @current.row, 'col': @current.col + 1
                # Link to parent?
                if @current.col >= 0
                    # Get the model @ the current step.
                    current = (@collection.where(@current)).pop()
                    assert current, 'We do not have a current step'
                    model.set 'parent':
                        'col': current.get('col')
                        'row': current.get('row')

            # Add to collection.
            @collection.add model

            # Update the collection on the server.
            Backbone.sync 'update', @collection

            # Add to view.
            @addTool model

            # Activate.
            Mediator.publish 'step:activate', model
        , @

        # Listen to step activations to update where we are.
        Mediator.subscribe 'step:activate', (row, col) =>
            @current.col = row
            @current.row = col
        , @

        # Deactivate the currently active step.
        Mediator.subscribe 'step:deactivate', =>
            @current =
                'row': @rows
                'col': -1
        , @

        # Toggle the view.
        Mediator.subscribe 'history:toggle', =>
            $('div#whiteout').toggle()
            $(@el).parent().slideToggle()
        , @

    afterRender: ->
        super

        # Hide by default and set width to how much space we have on screen. Add a class.
        $(@el).css('width', $(window).width() - $('footer#bottom').outerWidth()).addClass('container')

        @tools = $(@el).find('#tools')

        # Set the height of the tools based on the height of the viewport.
        do height = => @tools.css 'height', ($(window).height() * .5) - 67

        # On window resize, update height again.
        $(window).resize height

        # Add any tools if they exist.
        @collection.each @addTool

        @

    # Reset the history view.
    resetTable: =>
        @rows = 0 ; @cols = 0
        d3.select($(@el).find('svg.canvas')[0]).selectAll('*').remove()
        $(@el).find('table.grid').html('')

    # Add a row in DOM (with appropriate number of columns) so we can inject content.
    addRow: ->
        table = $(@el).find('table.grid')

        # First the row.
        row = $ '<tr/>', 'data-row': @rows
        # Now for the columns.
        for i in [0...@cols]
            # ...append to the row.
            row.append el = $ '<td/>', 'data-row': @rows, 'data-col': i
            # Save the el into grid.
            @grid[i] ?= [] # init column?
            @grid[i][@rows] = el
        
        # Finally append to table.
        table.append row

        # Increase the row 'height'.
        @rows += 1

    # Add a column in DOM (into all existing rows) so we can inject content.
    addCol: ->
        table = $(@el).find('table.grid')

        # For each row (0 indexed)...
        for i in [0...@rows]
            # ...append to the table.
            table.find("tr[data-row=#{i}]").append el = $ '<td/>', 'data-col': @cols
            # Save the el into grid.
            @grid[@cols] ?= [] # init column?
            @grid[@cols][i] = el

        # Increase the column 'width'.
        @cols += 1

    # Update the View rendering the Tools that have been used in the current session.
    addTool: (model) =>
        # Create the View.
        @views.push step = new HistoryToolView 'model': model
        # Where do we go?
        row = model.get('row') ; col = model.get('col')

        # Add rows if need be.
        dist = 1 + row - @rows # 0 indexed
        if dist > 0 then ( @addRow() for i in [0...dist] )
        # Add columns if need be.
        dist = 1 + col - @cols # 0 indexed
        if dist > 0 then ( @addCol() for i in [0...dist] )

        # Finally add the element.
        assert @grid[col] and @grid[col][row], 'Grid does not have an element to save tool in'
        @grid[col][row].append step.el

        # Update the width of the table.
        $(@el).find('#tools table.grid').css('width', 180 * @cols)

        # Draw connector.
        @drawConnector model.get('parent'), { 'col': col, 'row': row }

        # We have added a tool, hide the info message.
        $(@el).find('p.message').hide()

    # Draw a connector line between a parent and its child.
    drawConnector: (a, b) ->
        # Box dimensions (history el is hidden so cannot get dimensions live).
        width = 180 ; height = 98

        # Skip very first element.
        return unless a

        # Calculate centre point of any grid element.
        pos = (col, row) ->
            x = ( (col + 1) * width ) - (width / 2) # from left
            y = ( (row + 1) * height ) - (height / 2) + 10 # from top
            [ x, y ]

        [ x1, y1 ] = pos a.col, a.row
        [ x2, y2 ] = pos b.col, b.row

        # Select the canvas.
        svg = d3.select $(@el).find('svg.canvas')[0]

        # Add the line.
        svg.append('svg:line')
        .attr('class', 'connector')
        .attr('x1', x1)
        .attr('x2', x2)
        .attr('y1', y1)
        .attr('y2', y2)

        # Get the higher of the two.
        a = y1
        if y2 > y1 then a = y2

        # Update the height?
        if (b = parseInt(svg.attr('height'))) < a or !b
            svg.attr('height', a + 'px')