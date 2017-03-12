import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CANVAS_RESOLUTION, CANVAS_SCALE_FACTOR, LABELS_COLORS} from '../constants';
import {changeLabel} from '../actions/index';

class ChooseLabel extends Component {
    constructor(props) {
        super(props);
    }

    renderColorButton(color, idx) {
        return (
            <div key={idx} style={{backgroundColor: color, marginBottom: 5 }}
                 className={`choose-label-element${this.props.activeLabel === idx ? ' choose-label-element-active' : ''}`}
                 onClick={() => this.onLabelClick(idx)}
            />
        );
    }

    onLabelClick(idx) {
        console.log('on label click');
        if(this.props.activeLabel !== idx) {
            this.props.changeLabel(idx);
        }
    }

    render() {
        console.log(this.props.style)
        return (
            <div style={this.props.style}>
                <div style={{width: this.props.width}}>
                    <div className="choose-label-container">
                        {LABELS_COLORS.map(this.renderColorButton.bind(this))}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        width: CANVAS_RESOLUTION[state.style.currentBreakpoint] * CANVAS_SCALE_FACTOR[state.style.currentBreakpoint],
        activeLabel: state.SVCPoints.present.currentLabel
    }
}

export default connect(mapStateToProps, {changeLabel})(ChooseLabel);