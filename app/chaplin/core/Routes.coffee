module.exports = (match) ->
    match '',                                  'landing#index' # landing page
    match 'tool/:slug',                        'tools#index'   # new tools
    match 'tool/:slug/history/:row/step/:col', 'tools#index'   # historical tools