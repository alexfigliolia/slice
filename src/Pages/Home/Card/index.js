import { Component } from 'react';
import { connect } from 'react-redux';
import './_Card.scss';

class Card extends Component {

  shouldComponentUpdate({ cardActive, mouseX, mouseY, cardData, remaining }) {
    const curProps = this.props;
    if (mouseX !== curProps.mouseX) return true;
    else if (mouseY !== curProps.mouseY) return true;
    else if (cardActive !== curProps.cardActive) return true;
    else if (cardData.id !== curProps.cardData.id) return true;
    else if (remaining !== curProps.remaining) return true;
    return false;
  }

  render() {
    const { mouseX, mouseY, cardActive, cardData, remaining } = this.props;
    const { name = '', capacity = 0 } = cardData;
    return (
      <div
        className={`hover-card${cardActive ? ' visible' : ''}`}
        style={{
          top: mouseY,
          left: mouseX
        }}>
        <h4>{name}</h4>
        <div className='hc-cap'>
          <div>Total Capacity:</div>
          <div>{capacity}</div>
        </div>
        <div className='hc-cap'>
          <div>Remaining Capacity:</div>
          <div>{remaining}</div>
        </div>
      </div>
    )
  }
}

const mSTP = ({ Team }) => {
  const { mouseX, mouseY, cardActive, cardData, assignments } = Team;
  const { id, capacity } = (cardData || {});
  const capacityUsed = (assignments?.[id] ?? []).reduce((acc, next) => acc + next.points, 0);
  return { mouseX, mouseY, cardActive, cardData: cardData || {}, remaining: capacity - capacityUsed };
}

export default connect(mSTP)(Card);
