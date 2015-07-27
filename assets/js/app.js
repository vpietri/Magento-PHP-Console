function PhpConsoleApp(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

    PhpConsoleApp.prototype = {
        init: function (options) {
            this.settings = {
                'debug': false
            };

            // Overrides the default settings
            this.overrideSettings(options);

            // Start the debugger
            if (this.settings.debug === true) {
                this.setupDebugging();
            }

            this.setObservers();

            this.appInit();
            this.appOptionsMenuFont();
            this.appOptionsMenuOutput();
            this.appOptionsMenuProjects();
            this.appOptionsMenu();
        },

        setObservers: function() {

            $(window).on('load', function() {
                prettyPrint();
            });

        },

        appInit: function() {
            var localStorageKey = 'PhpSnippets';

            TFSN.LocalStorageHelper = new TFSN.LocalStorageHelper();
            TFSN.LocalStorageHelper.initialize(localStorageKey);

            EditorOptions.LocalStorageHelper = new EditorOptions.LocalStorageHelper();
            EditorOptions.LocalStorageHelper.initialize('EditorOptions');

            editorOptions = EditorOptions.LocalStorageHelper.getArrayOfStorage();
            EditorOptions.LocalStorageHelper.optionsObject = editorOptions;
        },

        appOptionsMenuFont: function() {
            $('.editor-option-fontsize').on('change', function (e) {
                e.preventDefault();
                var newFontSize = $(this).val();

                document.getElementById('editor').style.fontSize= newFontSize + 'px';

                EditorOptions.LocalStorageHelper.optionsObject.fontSize = newFontSize;
                EditorOptions.LocalStorageHelper.setLocalStorage();
            });
        },

        appOptionsMenuOutput: function() {
            $('#output_select').on('change', function (e) {
                e.preventDefault();
                var selection = $(this).val();

                if ($(this).val() == "html") {
                    $('.output.pre').show();
                    $('.output.xmp').hide();
                } else {
                    $('.output.pre').hide();
                    $('.output.xmp').show();
                }

                EditorOptions.LocalStorageHelper.optionsObject.output = selection;
                EditorOptions.LocalStorageHelper.setLocalStorage();
            });
        },

        appOptionsMenuProjects: function() {
            $('.options-projects').on('change', function(){
                window.location = $(this).val();
            });
        },

        appOptionsMenu: function() {
            $('.options-menu-icon').on('click', function(evt){
                $(this).toggleClass('active');
                $('.options-menu').toggleClass('active');
            });
        },

        /**
         * Takes default settings in object scope, and
         * merges the optional object passed in on initiation
         * of the class.
         */
        overrideSettings: function (options) {
            if (typeof options === 'object') {
                this.settings = $.extend(this.settings, options);
            }
        },

    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    var phpConsoleApp = new PhpConsoleApp({"debug":false});

});

// $(document).ready(function() {
    // $('#slideToggle').click(function() {
    //     $('#expandable').slideToggle();
    //     $('#expand-icon').toggleClass('icon-minus-sign');
    // });

    // $('#slideToggleSnippets').click(function() {
    //     $('#expandable-snippets').slideToggle();
    //     $('#expand-snippets-icon').toggleClass('icon-minus-sign');
    // });

    // $('.dropdown-toggle').dropdown();
// });