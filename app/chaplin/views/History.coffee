Chaplin = require 'chaplin'

HistoryToolView = require 'chaplin/views/HistoryTool'

module.exports = class HistoryView extends Chaplin.View

    'container':       '#history'
    'containerMethod': 'html'
    'autoRender':      true

    # Store all step Views here to garbage dump.
    views: []

    # Number of rows & columns we have in the table grid.
    rows: 0
    cols: 0

    # Store the table grid DOM here for easy append of elements.
    grid: []

    # Current state we are in.
    current:
        'row': 0
        'col': -1 # we are 'nowhere'

    getTemplateFunction: -> require 'chaplin/templates/history'

    afterRender: ->
        super

        # Hide by default and set width to how much space we have on screen. Add a class.
        $(@el).css('width', $(window).width() - $('footer#bottom').outerWidth()).addClass('container')

        @tools = $(@el).find('#tools')

        # Set the height of the tools based on the height of the viewport.
        do height = => @tools.css 'height', ($(window).height() * .8) - 81

        # On window resize, update height again.
        $(window).resize height

        # Render the table.
        @renderTable()

        # Add a tool.
        Chaplin.mediator.subscribe 'history:add', (tool) =>
            # Make sure we actually operate on Models not say JSON objects.
            assert tool.cid, 'Need to pass in a Model'

            # Is the next column taken? Check on DOM.
            if @grid[@current.col + 1] and @grid[@current.col + 1][@current.row].children().length isnt 0
                @current.row = @rows # rows are 0 indexed!
            else
                @current.col += 1

            # Set the col and row for this tool.
            tool.set @current

            # Save on Collection.
            @collection.add tool
            @addTool tool

        # Toggle the view.
        Chaplin.mediator.subscribe 'history:toggle', =>
            $('div#whiteout').toggle()
            $(@el).parent().slideToggle()

        # Update our current position.
        Chaplin.mediator.subscribe 'step:activate', (model) =>
            @current.row = model.get('row') or @current.row
            @current.col = model.get('col') or @current.col

        @

    # Add a row in DOM (with appropriate number of columns) so we can inject content.
    addRow: ->
        # console.log 'Add row'
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
        # console.log 'Add col'
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

    # Render the table grid populating it with tools.
    renderTable: ->
        # Show/hide info message if no tools used.
        if @collection.length is 0
            $(@el).find('p.message').show()
        else
            $(@el).find('p.message').hide()

        # Add all steps.
        @collection.each @addTool

    # Update the View rendering the Tools that have been used in the current session.
    addTool: (model) =>
        # Create the View.
        @views.push step = new HistoryToolView 'model': model
        # Where do we go?
        row = model.get('row') ; col = model.get('col')

        # console.log 'Add:', row, col

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