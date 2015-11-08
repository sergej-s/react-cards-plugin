'use strict';

var React = require('react');
var Card = require('./card');

var Cards = React.createClass({
    propTypes: {
        cardsData: React.PropTypes.array.isRequired,
        settings: React.PropTypes.object.isRequired
    },

    //Obtain count of cards columns depending on window width
    getColumnsCount: function() {
        var windowWidth = window.innerWidth,
            widths = this.props.settings.widths;

        if (windowWidth >= widths.bigScreen) {
            return 4;
        } else if (windowWidth < widths.bigScreen && windowWidth >= widths.middleScreen) {
            return 2;
        } else {
            return 1;
        }
    },

    //State is changed on window resize
    getInitialState: function() {
        return {columnsCount: this.getColumnsCount()};
    },

    render: function() {
        var cardsData = this.props.cardsData,
            cardsDataLength = cardsData.length,
            cssClasses = this.props.settings.cssClasses;

        function generateCardsList(cardsData) {
            return (
                <ul className='cards-column'>
                    {cardsData.map(function(cardData) {
                        return (<li><Card key={cardData.id}
                                      data={cardData}
                                /></li>);
                    })}
                </ul>
            );
        }

        //Split initial array of cards into columns depending on window size.
        //It is necessary to keep first cards from array at a top of the columns.
        switch (this.state.columnsCount) {
            case 4:
                var cardsColumns = [[], [], [], []],
                    i = 0;

                while (i < cardsDataLength) {
                    cardsColumns[0].push(cardsData[i++]);
                    i < cardsDataLength ? cardsColumns[1].push(cardsData[i++]) : null;
                    i < cardsDataLength ? cardsColumns[2].push(cardsData[i++]) : null;
                    i < cardsDataLength ? cardsColumns[3].push(cardsData[i++]) : null;
                }
                break;
            case 2:
                var cardsColumns = [[], []],
                    i = 0;

                while (i < cardsDataLength) {
                    cardsColumns[0].push(cardsData[i++]);
                    i < cardsDataLength ? cardsColumns[1].push(cardsData[i++]) : null;
                }
                break;
            case 1:
                var cardsColumns = [cardsData];
                break;
            default:

        }

        //Add css framework classes to handle columns styles
        var cssColumnsClass = '';
        switch (cardsColumns.length) {
            case 4:
                cssColumnsClass = cssClasses.bigScreen
                break;
            case 2:
                cssColumnsClass = cssClasses.middleScreen
                break;
            default:
        }

        return (
            <div className={cssClasses.container + ' cards'}>
                {cardsColumns.map(function(cardsColumn){
                    return (<div className={cssColumnsClass}>{generateCardsList(cardsColumn)}</div>)
                })}
            </div>
        );
    },

    //Change state (columns count) in accordance to window size
    handleResize: function(e) {
        var newColumnsCount = this.getColumnsCount();
        if (this.state.columnsCount !== newColumnsCount) {
            this.setState({columnsCount: newColumnsCount});
        }
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
});

module.exports = Cards;
