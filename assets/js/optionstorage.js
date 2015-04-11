window.EditorOptions = {};

EditorOptions.LocalStorageHelper = function() {};

EditorOptions.LocalStorageHelper.prototype = {
    initialize: function(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.lastSavedStorageKey = 'LastSavedSnippet';
        this.snippetsTemplate = '#snippetsTemplate';
        this.eleToAttachTemplates = '#snippet-container';
        this.snippetsWrapper = '#snippets-wrapper';
        this.clearSnippetsBtn = '#clearSnippets';
        this.arrayOfOptions = [];

        this.loadLastSaved();
    },

    loadLastSaved: function(){
        $(document).ready(function(){
            editor.getSession().setValue(localStorage.getItem(this.lastSavedStorageKey) ? localStorage.getItem(this.lastSavedStorageKey) : '');
        });
    },

    getArrayOfStorage: function(){
        return (this.getLocalStorage()) ? JSON.parse(this.getLocalStorage()) : [];
    },

    getLocalStorage: function(){
        return (localStorage.getItem(this.localStorageKey)) ? localStorage.getItem(this.localStorageKey) : false;
    },

    setLocalStorage: function(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.arrayOfOptions));
    },

    getUrlParam: function(name){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return (results != null) ? results[1] : 'Gobal';
    },

};
