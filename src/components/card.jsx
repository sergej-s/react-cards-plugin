'use strict';

var React = require('react');

var Card= React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        mouseOverHandler: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {isOverlayed: false};
    },

    render: function () {
        var data = this.props.data,
            cardStyle = {
                background: 'url(' + data.img.src + ') no-repeat',
                backgroundSize: data.width,
                color: data.img.color,
                height: data.img.height,
                position: 'relative'
            },
            overlayStyle = {
                height: data.img.height,
                width: '100%',
                top: 0,
                position: 'absolute'
            }

        //Add overlay on mouse over
        var overlay = '';
        if (this.state.isOverlayed) {
            overlay = (
                <div style={overlayStyle}
                    className='card-overlay'
                    onMouseLeave={this.mouseLeaveHandler}>
                    <ul>
                        <li><a>Open</a></li>
                        <li><a>Print</a></li>
                        <li><a>Delete</a></li>
                    </ul>
                </div>
            );
        }

        return (
            <div style={cardStyle}
                onMouseOver={this.mouseOverHandler}
                onMouseLeave={this.mouseLeaveHandler}>
                <div className='card-caption'>
                    <img src={data.icon} />
                    <h1 className='card-header'>{data.title}</h1>
                    <p className='card-description'>{data.description}</p>
                </div>
                {overlay}
            </div>
        );

    },

    mouseOverHandler: function (event) {
        event.preventDefault();
        if (this.state.isOverlayed === false) {
            this.setState({isOverlayed: true});
        }
    },

    mouseLeaveHandler: function (event) {
        event.preventDefault();
        if (this.state.isOverlayed === true) {
            this.setState({isOverlayed: false});
        }
    },
});

module.exports = Card;
