import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import * as vega from 'vega';
import * as vl from 'vega-lite';

const getVersion = (mode) => {
  return mode === 'vega' ? vega.version : vl.version;
}

export default class Toolbar extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    renderer: PropTypes.string,
    autoParse: PropTypes.bool,
    tooltip: PropTypes.bool
  }

  showErrorAndWarnings() {
    if (this.props.error) {
      return (
        <div className='error-indicator' onClick={(e) => this.props.showErrorPane()}>
          Error
        </div>
      );
    } else if (this.props.warningsLogger.warns.length > 0) {
      return (
        <div className='warning-indicator' onClick={(e) => this.props.showErrorPane()}>
          Warning
        </div>
      );
    }
  }

  render() {
    return (
      <div className='toolbar'>
        {this.showErrorAndWarnings()}
        <div className='status'>
          {
            `${this.props.mode} version ${getVersion(this.props.mode)}`
          }
        </div>
        <div className='autoParse' onClick={this.props.toggleAutoParse}>
          {
            this.props.autoParse ? 'Parse: auto' : 'Parse: manual'
          }
        </div>
        <div className='tooltip-toggle' onClick={this.props.showTooltip}>
           {this.props.tooltip ? 'Tooltips' : 'No Tooltips'}
        </div>
        <div className='renderer-toggle' onClick={this.props.cycleRenderer}>
          {
            `Renderer: ${this.props.renderer}`
          }
        </div>
        <div className='export-rendered' onClick={this.props.downloadRendered}>
          Export
        </div>
      </div>
    );
  }
}
