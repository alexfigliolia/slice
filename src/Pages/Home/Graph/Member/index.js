import { Component } from 'react';
import { connect } from 'react-redux';
import './_Member.scss';

export default class Member extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { name, capacity, color } = this.props;
    return (
      <div className='viz-member'>
        <div className='viz-name'>
          <div
            className='viz-color'
            style={{ backgroundColor: color }} />
          {name}
        </div>
        <div className='viz-cap'>{capacity} points</div>
      </div>
    )
  }
}