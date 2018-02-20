## jshadow

A tiny CSS Javascript CSS-selector engine to search in browser through Shadow DOM boundaries

Search across ther Shadow DOM boundaries by a CSS selector.
Made to allow fast access to shadowed nodes for testing purposes.

## Installation

```bash
$ npm install jshadow
```

Installation of jshadow is quite simple. Just add a script tag to your page or use as a helper in console

  <script src="path/to/jshadow.js"></script>

## Usage

Use global jshadow variable or its alias to select DOM nodes

```js
const list = await jshadow('paper-input')

console.log(list)
// => "  [paper-input#email, paper-input#password, paper-input#name]"

await _$('paper-tab')
// => "[paper-tab, paper-tab, paper-tab]"
```

MIT License