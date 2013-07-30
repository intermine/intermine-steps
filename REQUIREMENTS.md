#(Technical) Tool Requirements

#Important

1. URI needs to change between input/result stage so that these two stages can be saved to browser history and back button works.
1. One needs to be able to have a URI that instantiates a Tool as it was in a point in time.
1. Links that continue from a previous Tool to a new one need to be able to work in new a browser window (new tab).
1. There is a difference between calling a new Tool and continuing to a Tool. The latter passes args and skips the input state to go straight to results. Example: Clicking a List Enrichment link from a list skips choosing a list. This is interesting because `Chaplin` does not allow you to Controller redirect synchronously when you are still rendering your tool. There needs to be either a timeout of 0, `process.nextTick` or the redirect needs to happen after a user has done some action.
1. Tool URIs can accept extra parameters and even custom parameters from the current Tool. Example: `/tool/report/pparg` showing up if I have just created a list that has a `pparg` Gene.
1. If I am on List Upload and click List Upload tool again, need to start again. Chaplin will for example not call a Controller:Action again if you are on the same URI as where you want to go next. This might require update to Chaplin.

#Maybe

1. Be able to not use iframes in a tool.
