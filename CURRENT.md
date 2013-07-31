#Current State

There are 3 tools (below) configured. All 3 use an `<iframe/>` for rendering stuff. This allows us to use a different mix of libraries.

##Tools

###Choose a List

Appears on the homepage and in the title bar. Chooses a List. The Output is a **Results Table**.

###Upload a List/Resolve Identifiers

Appears on the homepage and in the title bar. Creates a List behind the scenes. This List has a name of the current timestamp and has extra tags to distinguish it from a "normal" Lists. The Output is a **Results Table**.

###List Widgets

Only appear when someone says that a Gene List has been selected/created. When a Tool says so, we skip straight to Output which shows **List Widgets**. If we click on Input step we see an app much like on *Choose a List* Tool.

##Q&A

###Why are apps not loading after a deploy to `ukraine`? Because the Apps/A middleware probably has not come online yet. Give it a moment.

###Where are the apps served from?


The config points to the git repo `intermine-apps-a`. Any changes to these apps and a subsequent deploy to `ukraine` of this branch will fetch these latest versions.
