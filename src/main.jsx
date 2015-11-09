'use strict';

var React = require('react');
var Cards = require('./components/cards.jsx');

if (typeof jQuery !== 'undefined') {
    (function($) {
        //Create jQuery plugin

        var pluginName = "transformToCards",
            defaults = {};

        function Plugin(element, options) {
            this.element = element;
            this.settings = $.extend({}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        $.extend(Plugin.prototype, {
            init: function() {
                var data = [];

                //Interate over all li elements and populate data object with
                //card's information
                $(this.element).find('li').each(function(ind) {
                    var card = $(this),
                        $icon = $(card.find('img')[0]),
                        $img = $(card.find('img')[1]);

                    var cardData = {
                        id: ind,
                        icon: $icon.attr('src'),
                        title: card.find('h1').text(),
                        description: card.find('p').text(),
                        width: 220,
                        img: {
                            src: $img.attr('src'),
                            color: $img.attr('data-color'),
                            height: Math.floor($img.height()/2.0),
                            width: Math.floor($img.width()/2.0)
                        }
                    };
                    data.push(cardData);
                });

                //Render react cards component with collected data and
                //predetermined settings
                this.component = React.render(
                     <Cards cardsData={data} settings={this.settings}/>,
                     this.element
                );
                return this;
            },
        });

        $.fn[pluginName] = function(options) {
            return this.map(function() {
                if (!$.data(this, 'plugin_'+pluginName)) {
                    $.data(this, 'plugin_'+pluginName, new Plugin(this, options));
                }
                return $.data(this, 'plugin_'+pluginName);
            });
        };
    })(jQuery);
}
