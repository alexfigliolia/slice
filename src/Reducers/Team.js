import Update from 'immutability-helper';

const initialState = {
  members: {
    1: {
      id: 1,
      name: 'Alex Figliolia',
      capacity: 8
    },
    2: {
      id: 2,
      name: 'Belinda Rose',
      capacity: 6
    },
    3: {
      id: 3,
      name: 'Olga Gabris',
      capacity: 8
    },
  },
  cardActive: false,
  cardData: {},
  mouseX: 0,
  mouseY: 0,
  assigned: []
}

const Team = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_TEAM_MEMBER_CAPACITY': {
      const { id, capacity } = action;
      return Object.assign({}, state, { members: Update(state.members, { [id]: { capacity: { $set: Math.max(0, capacity) } } }) });
    }
    case 'ON_SHARD_HOVER': {
      const { x, y, data } = action;
      return Object.assign({}, state, { cardActive: true, mouseX: x, mouseY: y, cardData: data });
    }
    case 'ON_SHARD_LEAVE':
      return Object.assign({}, state, { cardActive: false });
    default:
      return state;
  }
}

export default Team;