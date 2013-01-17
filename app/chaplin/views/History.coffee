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
        do height = => @tools.css 'height', ($(window).height() / 2) - 52

        # On window resize, update height again.
        $(window).resize height

        # Render the table.
        @renderTable()

        # Add a tool.
        Chaplin.mediator.subscribe 'history:add', (tool) =>
            # Move to a future current state.
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

        @

    # Add a row in DOM (with appropriate number of columns) so we can inject content.
    addRow: ->
        table = $(@el).find('table.grid')

        # First the row.
        row = $ '<tr/>', 'data-row': @rows
        # Now for the columns.
        for i in [0...@cols]
            row.append $ '<td/>', 'data-row': @rows, 'data-col': @cols
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

        # Add rows if need be.
        dist = row - @rows + 1 # 0 indexed
        if dist > 0 then ( @addRow() for i in [0...dist] )
        # Add columns if need be.
        dist = col - @cols + 1 # 0 indexed
        if dist > 0 then ( @addCol() for i in [0...dist] )

        # Finally add the element.
        assert @grid[col] and @grid[col][row], 'Grid does not have an element to save tool in'
        @grid[col][row].append step.el

        # Update the width of the table.
        $(@el).find('#tools table.grid').css('width', 180 * @cols)