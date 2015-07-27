/**
 * @package     Blueacorn${1:functionName}
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function DropDowns(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

    DropDowns.prototype = {
        init: function (options) {
            this.settings = {
                'debug': false
            };

            // Overrides the default settings
            this.overrideSettings(options);
            this.setupSelects();
        },

        overrideSettings: function (options) {
            if (typeof options === 'object') {
                this.settings = $.extend(this.settings, options);
            }
        },

        setupSelects: function() {
            var self = this,
                selectTruncate = 36;

            $.each($('select'), function(idx, selectElement) {

                $(selectElement).addClass('custom-dropdown');

                if($(selectElement).attr('title')){
                    selectTitle = $(selectElement).attr('title');
                }

                if($(selectElement).prev().length > 0 && (!$(selectElement).parent().hasClass('input-box') || !$(selectElement).parent().hasClass('v-fix'))){
                        $(selectElement).wrap('<div class="input-box"></div>');
                    }

                $(selectElement).parent().addClass('dropdown-container');

                if($(selectElement).prop('disabled')){
                    $(selectElement).parent().addClass('disabled');
                }else{
                    $(selectElement).parent().removeClass('disabled');
                }

                selectTitle = $(selectElement).children().first().html();

                selectedOptions = $(selectElement).children('option:selected').text();

                if(selectedOptions.length > 0){
                    selectTitle = selectedOptions;
                }

                if($(selectElement).siblings('.dropdown-shiv').length === 0){
                    var selectSize = '';
                    $(selectElement).before('<span class="dropdown-shiv">' + selectTitle + '<i class="fa fa-chevron-down"></i></span>');
                }

                $(selectElement).on('change', self.updateShivs.bind(self));
                $(selectElement).on('mouseover', function(){
                    $(selectElement).siblings('.dropdown-shiv').addClass('hover');
                });
                $(selectElement).on('mouseout', function(){
                    $(selectElement).siblings('.dropdown-shiv').removeClass('hover');
                });

                self.updateDropdowns();

            });
        },

        updateDropdowns: function() {
            var selectShivs = $('.dropdown-shiv');

            $(selectShivs).each(function(){
                if($(this).siblings('select').css('display') === 'none'){
                    $(this).css('display','none');
                }else{
                    $(this).css('display','');
                }

                $(this).parent('.select-container').removeClass('disabled');

                if($(this).siblings('select').prop('disabled')){
                    $(this).parent('.select-container').addClass('disabled');
                }
            });
        },

        updateShivs: function(){
            var selectShivs = $('.dropdown-shiv');

            $(selectShivs).each(function(){
                var selectElement, optionValue, truncateOption;

                selectElement = $(this).siblings('select');
                optionValue = $(selectElement).children('option:selected').text();

                $(this).html(optionValue + '<i class="fa fa-chevron-down"></i>');
            });
        },

    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    var appDropdowns = new DropDowns({"debug":false});

});