import { Component } from 'react';
import './_Header.scss';

export default class Header extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <header className='app-header'>
        <div>
          <div className='ah-right'>
            <h1>Slice</h1>
            <p>A new sprint planning viz</p>
          </div>
          <div className='ah-left'>
            <button>Try me</button>
          </div>
        </div>
      </header>
    )
  }
}
