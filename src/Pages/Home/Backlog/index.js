import { Component } from 'react';
import List from './List';

export default class Backlog extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className='viz backlog'>
        <h2>Your Backlog</h2>
        <List />
      </div>
    )
  }
}
