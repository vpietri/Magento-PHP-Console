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
            this.appOptionsMenuOrientation();
            this.appOptionsMenu();
            this.appSnippetsMenu();
            this.appHelpMenu();
            this.setEditorHeights();
            this.setObservers();
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
            var self = this;
            $('.editor-option-fontsize').on('change', function (e) {
                e.preventDefault();
                var newFontSize = $(this).val();

                document.getElementById('editor').style.fontSize= newFontSize + 'px';

                EditorOptions.LocalStorageHelper.optionsObject.fontSize = newFontSize;
                EditorOptions.LocalStorageHelper.setLocalStorage();
                self.toggleMenu();
            });
        },

        appOptionsMenuOutput: function() {
            var self = this;
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

        appOptionsMenuOrientation: function() {
            var self = this;
            $('.options-editor').on('change', function(e){
                e.preventDefault();
                var selection = $(this).val();

                if($(this).val() === "vert"){
                    $('body').removeClass('vert hor').addClass('vert');
                }else{
                    $('body').removeClass('vert hor').addClass('hor');
                }

                EditorOptions.LocalStorageHelper.optionsObject.orientation = selection;
                EditorOptions.LocalStorageHelper.setLocalStorage();
                self.setEditorHeights();
                self.toggleMenu();
            });
        },

        appOptionsMenuProjects: function() {
            $('.options-projects').on('change', function(){
                window.location = $(this).val();
            });
        },

        appOptionsMenu: function() {
            var self = this;
            $('.options-menu-icon').on('click', function(evt){
                self.toggleMenu();
            });
        },

        appSnippetsMenu: function() {
            $('.options-snippets-icon').on('click', function(evt){
                $(this).toggleClass('active');
                $('.options-snippets').toggleClass('active');
            });
        },

        appHelpMenu: function() {
            $('.btn-help').on('click', function(evt){
                evt.preventDefault();
                $('.help-container').toggleClass('active');
            });
        },

        setEditorHeights: function() {
            var windowHeight = $(window).height(),
                windowWidth = $(window).width();

            $('.vert .output-container').height(windowHeight - 32).width(windowWidth/2);
            $('.vert .editor-container').height(windowHeight - 64).width(windowWidth/2);

            $('.hor .output-container').height((windowHeight/2)-32).width(windowWidth);
            $('.hor .editor-container').height((windowHeight/2)-64).width(windowWidth);
        },

        setObservers: function() {
            var self = this;

            $(window).on('resize load', function(){
                self.setEditorHeights();
            });

        },

        toggleMenu: function() {
            $('.options-menu-icon').toggleClass('active');
            $('.options-menu').toggleClass('active');
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