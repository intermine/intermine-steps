#(Technical) Tool Requirements

#Important

1. URI needs to change between input/result stage so that these two stages can be saved to browser history and back button works.
1. One needs to be able to have a URI that instantiates a Tool as it was in a point in time.
1. Links that continue from a previous Tool to a new one need to be able to work in new a browser window (new tab).
1. There is a difference between calling a new Tool and continuing to a Tool. The latter passes args and skips the input state to go straight to results. Example: Clicking a List Enrichment link from a list skips choosing a list. This is interesting because `Chaplin` does not allow you to Controller redirect synchronously when you are still rendering your tool. There needs to be either a timeout of 0, `process.nextTick` or the redirect needs to happen after a user has done some action. On a related note, maybe this is not the way to do things. Because, if a user then tries to use the back button they are taken to the input stage of the List Widgets for a split second and the tool finding it is "set" takes you straught to where you were - the Output. So the requirement is: take the user to results, but save input stage into browser history.
1. Tool URIs can accept extra parameters and even custom parameters from the current Tool. Example: `/tool/report/pparg` showing up if I have just created a list that has a `pparg` Gene.
1. If I am on List Upload and click List Upload tool again, need to start again. Chaplin will for example not call a Controller:Action again if you are on the same URI as where you want to go next. This might require update to Chaplin.

#Maybe

1. Be able to not use iframes in a tool.
