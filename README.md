# InterMine Steps

InterMine 2.0 Prototype preserving history of Steps

![image](https://raw.github.com/radekstepan/intermine-steps/master/example.png)

## Getting Started

```bash
$ npm install -d
$ npm start
```

Visit ``127.0.0.1:9034``

## Features

1. Automatic compilation of source files into target JavaScript files (Chaplin on Brunch).
1. Use of mediator to move between tools and steps of these tools.
1. Dynamically loading an appropriate tool and its sidebar template.
1. Serialization of steps taken into `localStorage`.
1. Automatic sizing of History view.
1. Automatic update of time since last use of a tool.
1. Tools are ready to be reordered and/or removed.
1. A grid for History steps is being dynamically built, updated and populated with tools.
1. Multiple streams of History supported, being able to move between their Tool steps.