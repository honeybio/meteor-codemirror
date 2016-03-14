Meteor CodeMirror package
=========================

<a href="http://codemirror.net/" target="_blank">CodeMirror</a> packaged for Meteor. **CodeMirror** is a versatile text editor implemented in JavaScript for the browser.


Usage
-----

Put somewhere in your template:

```
<template name="EditorPage">

	{{> CodeMirror id="some-id" name="someName" options=editorOptions code=editorCode reactiveVar="varName"}}

</template>
```

Parameters:

- `id` will be set to internal textarea element

- `name` will be set to internal textarea element (useful in form submit)

- `options` is CodeMirror options object

- `code` is code to show in editor

- `reactiveVar` optional name of Session variable, which is a reactive source of code

And provide helpers that returns CodeMirror options and content:

```
Template.EditorPage.helpers({

	"editorOptions": function() {
		return {
			lineNumbers: true,
			mode: "javascript"
		}
	},

	"editorCode": function() {
		return "Code to show in editor";
	}

});
```

To get value from editor, just read value from the internal textarea:

```
Template.EditorPage.events({

	"some event": function(e, t) {
		var code = t.find("#some-id").value;
		alert(code);
	}

});

```

Or, if you provided `reactiveVar` you can read session variable:

```
Template.EditorPage.helpers({
	"getEditorText": function() {
		return Session.get("varName"); // "varName" is variable name you provided to reactiveVar
	}
});

```


Or, using raw html/javascript
-----------------------------

Create textarea somewhere in your html template:

```
<template name="EditorPage">

	<textarea id="myTextarea"></textarea>

</template>
```

Initialize CodeMirror somewhere from your js:

```
Template.EditorPage.rendered = function() {
	var editor = CodeMirror.fromTextArea(this.find("#myTextarea"), {
		lineNumbers: true,
		mode: "javascript" // set any of supported language modes here
	});
}
```

Deal with textarea as you normaly do with textarea, with exception that you cannot directly style `textarea` element - so, wrap it into `div` (that's because your textarea will be hidden and replaced by CodeMirror's own markup).


Supported modes
---------------
```
javascript
tcl
```


Supported themes
----------------
```
bespin
```

Supported key bindings
----------------------

```
emacs
sublime
vim
```

Supported "lints"
-----------------

```
irule
```
