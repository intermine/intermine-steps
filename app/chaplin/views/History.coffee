Mediator = require 'chaplin/core/Mediator'
View = require 'chaplin/core/View'

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

        # A dict of all guids so we can quickly position elements.
        @guids = {}

        # Add a step to the history, we need to resolve its position in the grid.
        Mediator.subscribe 'history:render', @renderTool, @

        # Toggle the view.
        Mediator.subscribe 'history:toggle', @toggleHistory, @

    afterRender: ->
        super

        # Hide by default and set width to how much space we have on screen. Add a class.
        $(@el).css('width', $(window).width() - $('footer#bottom').outerWidth()).addClass('container')

        @tools = $(@el).find('#tools')

        # Set the height of the tools based on the height of the viewport.
        do height = => @tools.css 'height', ($(window).height() * .5) - 67

        # On window resize, update height again.
        $(window).resize height

        # Start checking for tools to add.
        @checkCollection()

        # Capture serialization requests.
        @delegate 'click', '#serialize', @serializeHistory

        @

    # Check for models in Collection.
    checkCollection: =>
        @collection.each (model) =>
            guid = model.get('guid')
            # Do we have this guid?
            unless @guids[guid] then @renderTool model
        # Check again later on.
        @timeouts.push setTimeout @checkCollection, 1000

    # Toggle the view.
    toggleHistory: =>
        $('div#whiteout').toggle()
        $(@el).parent().slideToggle()

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
            row.append el = $ '<td/>', 'data-col': i
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
    renderTool: (model) =>
        # Create the View.
        @views.push step = new HistoryToolView 'model': model

        # Do we have a parent?
        if parent = model.get 'parent'
            # We better have already rendered the parent. (singly linked list to the parent)
            assert pos = @guids[parent], "Parent element `#{parent}` is not rendered first"

            # Do we have as many columns?
            if pos.col + 1 >= @cols
                # Add a new column.
                @addCol()
                # Render next to the parent.
                @grid[col = pos.col + 1][row = pos.row].append step.el
            else
                # Maybe our column in this row is not taken?
                unless (temp = @grid[col = pos.col + 1][row = pos.row]).children().length
                    temp.append step.el
                else
                    # Use the first available row and column directly underneath.
                    @addRow()
                    @grid[col = pos.col + 1][row = @rows - 1].append step.el

            # Draw connector.
            @drawConnector pos, { 'col': col, 'row': row }
        
        else
            # A new row and column?
            @addRow()
            if @cols < 1 then @addCol()
            # Use the first available row and 0th column to place this tool.
            @grid[col = 0][row = @rows - 1].append step.el
        
        # Save the guid in a list.
        @guids[model.get('guid')] = 'col': col, 'row': row

        # Update the width of the table.
        $(@el).find('#tools table.grid').css('width', 180 * @cols)

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

        assert x1 and y1 and x2 and y2, 'We do not have element position for all elements'

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

    # Serialize History models into JSON and show in modal.
    serializeHistory: ->
        # Call the modal with a serialized History collection.
        Mediator.publish 'modal:render',
            'code':
                'src': JSON.stringify(window.History.models, null, 4)
                'lang': 'json'