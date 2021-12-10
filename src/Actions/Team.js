export const editTeamMemberCapacity = (id, capacity) => {
  return { type: 'EDIT_TEAM_MEMBER_CAPACITY', id, capacity };
}

export const onShardHover = (x, y, data) => {
  return { type: 'ON_SHARD_HOVER', x, y, data };
}

export const onShardLeave = () => {
  return { type: 'ON_SHARD_LEAVE' };
}