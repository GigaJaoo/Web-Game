const tileTypes = {
  EMPTY: 'empty',
  CENTER: 'center',
  PLAYER: 'player',
  RESOURCE: 'resource',
  CAUSE: 'cause',
  OBSTACLE: 'obstacle'
};

const initialMap = [
  ['resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','obstacle','resource','resource'],
  ['resource','obstacle','resource','resource','resource','resource','resource','resource','resource','obstacle','resource','resource','empty','empty','empty'],
  ['resource','resource','resource','obstacle','resource','resource','resource','resource','resource','obstacle','resource','resource','empty','cause','empty'],
  ['resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','empty','empty','empty'],
  ['resource','resource','obstacle','resource','resource','resource','resource','obstacle','resource','resource','resource','resource','resource','resource','resource'],
  ['resource','empty','empty','empty','resource','empty','empty','empty','empty','empty','resource','obstacle','obstacle','resource','resource'],
  ['resource','empty','cause','empty','obstacle','empty','empty','empty','empty','empty','resource','obstacle','resource','resource','resource'],
  ['resource','empty','empty','empty','resource','empty','empty','center','empty','empty','resource','resource','resource','resource','resource'],
  ['resource','obstacle','resource','resource','resource','empty','empty','empty','empty','obstacle','resource','resource','resource','resource','resource'],
  ['resource','resource','resource','resource','resource','empty','empty','empty','empty','empty','resource','resource','resource','resource','resource'],
  ['resource','resource','resource','resource','resource','resource','obstacle','resource','resource','resource','resource','obstacle','resource','resource','resource'],
  ['resource','obstacle','obstacle','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','obstacle'],
  ['resource','resource','empty','empty','empty','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource'],
  ['resource','resource','empty','cause','empty','resource','resource','resource','resource','obstacle','obstacle','resource','resource','resource','resource'],
  ['resource','resource','empty','empty','empty','resource','obstacle','resource','resource','resource','resource','resource','resource','resource','resource']
];

export { initialMap, tileTypes };