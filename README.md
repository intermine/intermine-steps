# InterMine Steps

InterMine 2.0 Prototype preserving history of Steps

![image](https://raw.github.com/intermine/intermine-steps/master/example.png)

##Install

###Required Packages###

####NPM

Make sure you have [node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) installed which installs its package manager, [npm](https://npmjs.org/), too.

`node.js` version v0.6.19, currently supported on Ubuntu, is too old for `npm` to work. You have two options:

You can upgrade to the last release using npm itself (see [this page](http://davidwalsh.name/upgrade-nodejs))

```bash
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable
```

Alternatively, install `node.js` [from sources](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#debian-lmde).

####Bower (optional)

You can skip this step if you just want to start an instance of Steps without making changes to it.

The app fetches a bunch of tools and their vendor dependencies, do so by using [Bower](http://bower.io/):

```bash
$ sudo npm install -g bower
$ bower install
```

It fetches libraries defined in the `bower.json` file. So, whenever you make changes to this file, you need to re-run the `bower install` command and the `grunt` command which we will discuss next.

####Grunt (optional)

You can skip this step if you just want to start an instance of Steps without making changes to it.

Another tool we are using is [Grunt](http://gruntjs.com/) that builds Steps and munges the different tools and its deps into single builds. To [install Grunt](http://gruntjs.com/getting-started) and make a build:

```bash
$ sudo npm install -g grunt-cli
$ grunt
```

The build steps are defined in the file `Gruntfile.coffee`. Whever you make changes to this file, or whenever you make changes to the `/src` or `/tools` directory, you need to run a new build using the `grunt` command.

When you are developing, it is recommended that you watch the default Grunt task like so:

```bash
$ watch --color grunt
```
###Steps###

Clone this repository

`
git clone git@github.com:intermine/intermine-steps.git my-steps-directory
`

and install the app dependencies:

```bash
$ cd my-steps-directory
$ npm install
```


##Startup

Now we can startup Steps on a custom port and visit it in the browser.

From your <em>steps</em> directory

```bash
$ PORT=4444 coffee server/server.coffee
```

If you need to get CoffeeScript `coffee` command, do the following step:

```bash
$ sudo npm install coffee-script -g
```

If you need to install the module `flatiron`

```bash
$ sudo npm install flatiron -g
```


##Configuration

The default tools configuration is in `tools/config.coffee`.
<!--

To change the application to point to your InterMine of interest, please edit line #4 of the file

```
     'mine': 'http://www.flymine.org/'
```
-->

#### Registry of tools labels ####

You will also find a registry of tool labels that will show up in various scenarios.

For example:

```coffeescript
{
    'label': 'mRNA subcellular localisation (fly-FISH)'
    'weight': 10
    'context': [ 'have:list', 'type:Gene' ]
    'place': 'right'
    'category': [ 'Category 1' ]
    'extra': [ 'chart', 'flyfish' ]
}
```

with

<table>
    <tr>
        <th>label</th>
        <td>This is the label that will show up in a menu. All the text from this label is
        searchable.</td>
    </tr>
    <tr>
        <th>weight</th>
        <td>Will determine the order in which labels will show. Higher number means higher
        position. Labels below <em>10</em> do not initially show in a menuand one needs to
        click a button to expand the menu and show these.</td>
    </tr>
    <tr>
        <th>context</th>
        <td>This label will show up when all of the context rules are met. The rules are just
        messages triggered by currently running tools.</td>
    </tr>
    <tr>
        <th>place</th>
        <td>In which menu is this label to appear?</td>
    </tr>
    <tr>
        <th>category</th>
        <td>An array allowing you to create a nested structure where your label will appear.</td>
    </tr>
    <tr>
        <th>extra<th>
        <td>Parameters passed to a tool to differentiate between variants of it.</td>
    </tr>
</table>