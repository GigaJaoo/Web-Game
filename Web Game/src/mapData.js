const tileTypes = {
  EMPTY: 'empty',
  CENTER: 'center',
  PLAYER: 'player',
  RESOURCE: 'resource',
  CAUSE: 'cause',
  OBSTACLE: 'obstacle',
  MOUNTAIN: 'mountain',
  LAKE: 'lake',
  FOREST: 'forest'
};

const initialMap = [
  ['resource','resource','obstacle','resource','resource','obstacle','resource','resource','resource','resource','resource','resource','resource','obstacle','obstacle','resource','resource','obstacle','obstacle','obstacle','obstacle'],
  ['resource','obstacle','obstacle','resource','resource','resource','resource','obstacle','resource','resource','forest'  ,'resource','obstacle','obstacle','resource','resource','resource','resource','obstacle','obstacle','obstacle'],
  ['resource','resource','obstacle','forest'  ,'resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','empty'   ,'empty'   ,'empty'   ,'resource','obstacle','obstacle'],
  ['resource','resource','resource','resource','resource','obstacle','resource','resource','resource','resource','resource','lake'    ,'lake'    ,'resource','resource','empty'   ,'cause'   ,'empty'   ,'resource','obstacle','resource'],
  ['resource','resource','empty'   ,'empty'   ,'obstacle','obstacle','resource','lake'    ,'lake'    ,'lake'    ,'resource','lake'    ,'resource','resource','resource','empty'   ,'empty'   ,'empty'   ,'resource','resource','resource'],
  ['resource','resource','empty'   ,'cause'   ,'empty'   ,'obstacle','resource','resource','lake'    ,'lake'    ,'resource','lake'    ,'lake'    ,'resource','resource','resource','resource','resource','resource','lake'    ,'resource'],
  ['resource','lake'    ,'empty'   ,'empty'   ,'empty'   ,'resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','resource','forest'  ,'resource','resource','resource','resource'],
  ['resource','resource','resource','obstacle','resource','forest'  ,'resource','resource','resource','obstacle','resource','resource','resource','forest'  ,'resource','resource','resource','resource','resource','resource','obstacle'],
  ['resource','resource','resource','resource','resource','resource','forest'  ,'forest'  ,'empty'   ,'empty'   ,'empty'   ,'empty'   ,'empty'   ,'resource','lake'    ,'lake'    ,'resource','resource','resource','resource','obstacle'],
  ['resource','obstacle','resource','resource','resource','resource','resource','forest'  ,'forest'  ,'empty'   ,'empty'   ,'empty'   ,'empty'   ,'resource','lake'    ,'resource','resource','resource','obstacle','obstacle','obstacle'],
  ['resource','resource','resource','resource','lake'    ,'resource','resource','resource','empty'   ,'empty'   ,'center'  ,'empty'   ,'empty'   ,'resource','resource','resource','resource','resource','resource','obstacle','obstacle'],
  ['resource','resource','lake'    ,'lake'    ,'lake'    ,'resource','resource','resource','empty'   ,'empty'   ,'empty'   ,'empty'   ,'obstacle','resource','resource','resource','empty'   ,'empty'   ,'empty'   ,'resource','obstacle'],
  ['resource','resource','lake'    ,'lake'    ,'lake'    ,'lake'    ,'resource','resource','empty'   ,'empty'   ,'empty'   ,'empty'   ,'empty'   ,'resource','resource','resource','empty'   ,'cause'   ,'empty'   ,'resource','resource'],
  ['resource','resource','resource','resource','resource','resource','resource','resource','resource','obstacle','resource','resource','resource','resource','forest'  ,'resource','empty'   ,'empty'   ,'empty'   ,'resource','resource'],
  ['resource','resource','lake'    ,'lake'    ,'lake'    ,'lake'    ,'resource','resource','resource','resource','resource','obstacle','resource','resource','forest'  ,'resource','resource','resource','obstacle','resource','resource'],
  ['resource','lake'    ,'lake'    ,'lake'    ,'resource','resource','resource','resource','forest'  ,'resource','resource','resource','resource','resource','resource','resource','resource','obstacle','resource','resource','resource'],
  ['resource','resource','resource','resource','resource','resource','obstacle','resource','resource','resource','resource','resource','lake'    ,'lake'    ,'resource','resource','resource','resource','resource','obstacle','resource'],
  ['resource','resource','resource','forest'  ,'resource','empty'   ,'empty'   ,'empty'   ,'resource','obstacle','resource','resource','resource','resource','resource','resource','lake'    ,'resource','resource','obstacle','resource'],
  ['obstacle','obstacle','resource','resource','resource','empty'   ,'cause'   ,'empty'   ,'resource','resource','resource','forest'  ,'forest'  ,'resource','resource','resource','resource','resource','obstacle','obstacle','resource'],
  ['obstacle','resource','resource','resource','resource','empty'   ,'empty'   ,'empty'   ,'resource','resource','resource','resource','forest'  ,'forest'  ,'resource','resource','resource','resource','obstacle','obstacle','resource'],
  ['obstacle','obstacle','obstacle','resource','resource','lake'    ,'resource','resource','resource','obstacle','resource','resource','forest'  ,'resource','resource','resource','obstacle','obstacle','obstacle','obstacle','obstacle']
];

export { initialMap, tileTypes };