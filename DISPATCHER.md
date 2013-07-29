Dispatcher
==============

The dispatcher is the fundamental mechanism for inter-tool communication within
the steps application. It serves the same purpose as the intent mechanism in the
Android platform: to perform late-runtime binding of commands to actions, and
dependency injection.

The process:
--------------------

The dispatcher is aware of a number of tools (the tool-set). The currently
active tool may indicate that it has produced something that another tool may be
able to handle. The dispatcher queries each of the tools in its tool-set if they
can handle the output of the tool; if they can they expose a function that
accepts the output and instantiates a tool.

ie:

     +-------------+       +--------------+      +-------------+
     | active tool |       | Dispatcher   |      | tool-set    |
     +-------------+       +--------------+      +-------------+
           |                      |                     |
           |-----[has output]---->|                     |
           |                      |                     |
           |                      |---[can handle?]---->|
           |                      |                     |
           |                      |<----[fns]-----------|
           |                      |                     |
           |<---[replaces]--------|                     |


The output message:
--------------------

Tools indicate that they have data that may need handling by invoking the
`output` method on the dispatcher, which has a signature of:

    (data: DataMessage) -> ()

Where the `DataMessage` interface is as follows:

    {
        "mimetype": string,
        "uri": string?,
        "data": object?
    }

A data message must have *either* a uri, *or* a data property.

The mimetype indicates what kind of data has been produced, and should
convey not just the data format, but the semantic meaning of the data. Examples
include:
 * `application/vnd-intermine-list`
 * `application/vnd-intermine-query`
 * `application/vnd-bio-region`

These are defined by convention, and producers and consumers of mimetypes should
agree on the meaning of these terms. It is expected that over time a small but
stable set of core minetypes will develop.

The data may be present either in a data object, or as a URI. Which is used is
entirely the choice of the tools; if a URI is used then it must either
semantically encode all the necessary data, or it must be resolveable to a
sufficient data respresentation.

For example if a tool produces a list (either by making it, selecting it,
editing it, etc). then it would announce this either as:

  {
    "mimetype": "application/vnd-intermine-list",
    "uri": "http://www.somemine.org/query/service/lists?name=list-name&token=me"
  }

Or:

  {
    "mimetype": "application/vnd-intermine-list",
    "data": {
        "service": {
            "root": "http://www.somemine.org/query/service",
            "token": "me"
        },
        "name": "list-name",
        "description": "one of my lists",
        "type": "Gene",
        "size": 23
    }
  }

The offer to handle:
--------------------

Each tool the dispatcher is aware of must provide a function of the following
signature:

    (mimetype: string) -> ToolFactory
    
Where `ToolFactory` is of the form:

    {
        "create": (output: DataMessage) -> Promise<Tool>
        "describe": (output: DataMessage, locale: string) -> Promise<ToolText>
    }

Where `ToolText` is a simple struct for:

   {
        "name": string,
        "description": string,
        "origin": string
   }

It is this function that is registered with the dispatcher (not a class or
object with methods). The implementation is entirely undefined - as long as the
function produces a factory that produces a promise for a tool, it does
not matter what the final type of the tool is. This means a single tool can
produce slightly different implementations based on different input.

The create function as defined above is allowed to be asynchronous, by defining
the expected return type as a promise for a tool. If the tool-factory may
produce a tool directly - this should be detected as a resolved value and
handled gracefully by the dispatcher.

The describe function is used to describe to the user what the tool _would_ do
if and when it is instantiated, by providing localised textual description of
the tool. The origin property of the tool-text is meant to indicate who provided
the tool - the author/publisher/service. This may be useful if two tools provide
similar (or identical functionality) but are provided by different groups, or
using different services (eg. blast).

Letting the user choose:
------------------------------

Once all factory-functions have been collected, the user may then choose which
one to use. The user will be presented with the names and descriptions of each
tool, and if they so choose, the "create" function will be invoked with the
output. The tool that results from this action will then be inserted into the
main panel of the interface, and become the current tool, and the output as
encoded in the `DataMessage` will be inserted into the current history with a
reference to the tool name.
