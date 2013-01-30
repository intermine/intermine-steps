# Console visible?
@.console = @.console or { 'log': -> }
@.console.red   = (text) -> console.log "%c#{text}", 'color: #FFF; background: #c60f13'
@.console.blue  = (text) -> console.log "%c#{text}", 'color: #FFF; background: #2ba6cb'
@.console.grey  = (text) -> console.log "%c#{text}", 'color: #505050; background: #e9e9e9'
@.console.green = (text) -> console.log "%c#{text}", 'color: #FFF; background: #5da423'