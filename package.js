Package.describe({
	name: 'bespintech:meteor-codemirror',
	summary: "CodeMirror editor for Meteor >= 1.0",
	version: "1.2.9",
	git: "https://10.1.10.38/honeyb-devs/meteor-codemirror.git"
});

// Before Meteor 0.9?
if(!Package.onUse) Package.onUse = Package.on_use;

Package.onUse(function (api) {
	if(api.versionsFrom) {
		api.versionsFrom('METEOR@0.9.0');
	}


	// dependencies

	api.use("templating");
	api.use("underscore");

	//    required by:  'lib/codemirror/addon/link/yaml-lint.js'
	//    reference:    https://github.com/nodeca/js-yaml
	api.use("pntbr:js-yaml-client@0.0.1", "client");

	// code
	api.add_files('lib/codemirror/lib/codemirror.css', "client");
	api.add_files('lib/codemirror/lib/codemirror.js', "client");
	api.add_files('lib/codemirror/addon/mode/simple.js', "client");
	api.export('CodeMirror', "client");

	// common keywords
	api.add_files('lib/codemirror/mode/irule/irule-words.js', "client");
	api.export('keywords', "client");
	api.export('f5keywords', "client");
	api.export('f5SpecialWords', "client");
	api.export('functions', "client");
	api.export('allKeywordsRe', "client");
	api.export('allSpecialWords', "client");
	api.export('allFunctionsWords', "client");
	api.export('tclKeywords', "client");
	api.export('functionWords', "client");
	api.export('eventList', "client");

	// component
	api.add_files('lib/component/component.html', "client");
	api.add_files('lib/component/component.js', "client");

	api.add_files('lib/codemirror/addon/fold/brace-fold.js', "client");
	api.add_files('lib/codemirror/addon/fold/comment-fold.js', "client");
	api.add_files('lib/codemirror/addon/fold/foldcode.js', "client");
	api.add_files('lib/codemirror/addon/fold/foldgutter.css', "client");
	api.add_files('lib/codemirror/addon/fold/foldgutter.js', "client");
	api.add_files('lib/codemirror/addon/fold/indent-fold.js', "client");
	api.add_files('lib/codemirror/addon/fold/markdown-fold.js', "client");
	api.add_files('lib/codemirror/addon/fold/xml-fold.js', "client");

	// lints
	api.add_files('lib/codemirror/addon/lint/irule-lint.js', "client");
	api.export('lintError', "client");
	api.export('lintWarning', "client");
	api.export('iruleLint', "client");

	api.add_files('lib/codemirror/addon/lint/lint.css', "client");
	api.add_files('lib/codemirror/addon/lint/lint.js', "client");
	api.add_files('lib/codemirror/addon/lint/json-lint.js', "client");
	api.add_files('lib/codemirror/addon/lint/javascript-lint.js', "client");


	// active line mode
	api.add_files('lib/codemirror/addon/selection/active-line.js', "client");

	// search/replace
	api.add_files('lib/codemirror/addon/search/search.js', "client");
	api.add_files('lib/codemirror/addon/search/searchcursor.js', "client");
	api.add_files('lib/codemirror/addon/dialog/dialog.js', "client");
	api.add_files('lib/codemirror/addon/dialog/dialog.css', "client");

	// overlay: required by `gfm.js`
	api.add_files('lib/codemirror/addon/mode/overlay.js', "client");

	// markdown list continuation; nice complement for gfm
	api.add_files('lib/codemirror/addon/edit/continuelist.js', "client");

	// modes
	api.add_files('lib/codemirror/mode/htmlembedded/htmlembedded.js', "client");
	api.add_files('lib/codemirror/mode/htmlmixed/htmlmixed.js', "client");
	api.add_files('lib/codemirror/mode/http/http.js', "client");
	api.add_files('lib/codemirror/mode/irule/irule-simple.js', "client");
	api.add_files('lib/codemirror/mode/javascript/javascript.js', "client");
	api.add_files('lib/codemirror/mode/perl/perl.js', "client");
	api.add_files('lib/codemirror/mode/php/php.js', "client");
	api.add_files('lib/codemirror/mode/python/python.js', "client");
	api.add_files('lib/codemirror/mode/ruby/ruby.js', "client");
	api.add_files('lib/codemirror/mode/sass/sass.js', "client");
	api.add_files('lib/codemirror/mode/shell/shell.js', "client");
	api.add_files('lib/codemirror/mode/tcl/tcl.js', "client");
	api.add_files('lib/codemirror/mode/xml/xml.js', "client");
	api.add_files('lib/codemirror/mode/yaml/yaml.js', "client");


	api.add_files('lib/codemirror/addon/hint/show-hint.css', "client");
	api.add_files('lib/codemirror/addon/hint/show-hint.js', "client");
	api.add_files('lib/codemirror/addon/hint/irule-hint.js', "client");

	// themes
	api.add_files('lib/codemirror/theme/3024-day.css', "client");
	api.add_files('lib/codemirror/theme/3024-night.css', "client");
	api.add_files('lib/codemirror/theme/ambiance-mobile.css', "client");
	api.add_files('lib/codemirror/theme/ambiance.css', "client");
	api.add_files('lib/codemirror/theme/base16-dark.css', "client");
	api.add_files('lib/codemirror/theme/base16-light.css', "client");
	api.add_files('lib/codemirror/theme/bespin.css', "client");
	api.add_files('lib/codemirror/theme/blackboard.css', "client");
	api.add_files('lib/codemirror/theme/cobalt.css', "client");
	api.add_files('lib/codemirror/theme/eclipse.css', "client");
	api.add_files('lib/codemirror/theme/elegant.css', "client");
	api.add_files('lib/codemirror/theme/erlang-dark.css', "client");
	api.add_files('lib/codemirror/theme/lesser-dark.css', "client");
	api.add_files('lib/codemirror/theme/mbo.css', "client");
	api.add_files('lib/codemirror/theme/mdn-like.css', "client");
	api.add_files('lib/codemirror/theme/midnight.css', "client");
	api.add_files('lib/codemirror/theme/monokai.css', "client");
	api.add_files('lib/codemirror/theme/neat.css', "client");
	api.add_files('lib/codemirror/theme/neo.css', "client");
	api.add_files('lib/codemirror/theme/night.css', "client");
	api.add_files('lib/codemirror/theme/paraiso-dark.css', "client");
	api.add_files('lib/codemirror/theme/paraiso-light.css', "client");
	api.add_files('lib/codemirror/theme/pastel-on-dark.css', "client");
	api.add_files('lib/codemirror/theme/rubyblue.css', "client");
	api.add_files('lib/codemirror/theme/solarized.css', "client");
	api.add_files('lib/codemirror/theme/the-matrix.css', "client");
	api.add_files('lib/codemirror/theme/tomorrow-night-eighties.css', "client");
	api.add_files('lib/codemirror/theme/twilight.css', "client");
	api.add_files('lib/codemirror/theme/vibrant-ink.css', "client");
	api.add_files('lib/codemirror/theme/xq-dark.css', "client");
	api.add_files('lib/codemirror/theme/xq-light.css', "client");


	// key bindings
	api.add_files('lib/codemirror/keymap/emacs.js', "client");
	api.add_files('lib/codemirror/keymap/sublime.js', "client");
	api.add_files('lib/codemirror/keymap/vim.js', "client");

});
