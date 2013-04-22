Mediator = require 'chaplin/core/Mediator'

ToolView = require 'chaplin/views/Tool'

module.exports = class LinkoutToolView extends ToolView

    attach: ->
        super

        switch @options.extra
            when 'arrayexpress'
                console.log 'http://www.ebi.ac.uk/gxa/gene/<%= @id %>'
            when 'unigene'
                console.log 'http://www.ncbi.nlm.nih.gov/sites/entrez?db=unigene&cmd=search&term=<%= @symbol %>+AND+<%= @taxon %>[orgn]'
            when 'flyexpress'
                console.log 'http://www.flyexpress.net/search.php?type=image&search=<%= @id %>'
            when 'flybase'
                console.log 'http://www.flybase.org/.bin/fbidq.html?<%= @id %>'
            when 'genomernai'
                console.log 'http://genomernai.de/GenomeRNAi/genedetails/<%= @id %>'
            when 'ensembl'
                console.log 'http://www.ensembl.org/Drosophila_melanogaster/geneview?db=core&gene=<%= @id %>'
            when 'bdgp'
                console.log 'http://www.fruitfly.org/cgi-bin/ex/bquery.pl?qtype=report&find=<%= @id %>&searchfield=CG'
            when 'entrez'
                console.log 'http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene&cmd=Retrieve&dopt=full_report&list_uids=<%= @id %>'
            when 'flyatlas'
                console.log 'http://flyatlas.org/atlas.cgi?name=<%= @id %>'
            when 'homologene'
                console.log 'http://www.ncbi.nlm.nih.gov/sites/entrez?Db=homologene&cmd=detailssearch&term=<%= @taxon %>[orgn]+<%= @symbol %>[Gene]'
            when 'biogrid'
                console.log 'http://thebiogrid.org/search.php?search=<%= @id %>&organism=<%= @organism %>'