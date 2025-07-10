import { resourceTypes } from './resourceTypes';

export const getRandomResourceType = () => {
  const types = ['food', 'medical', 'clothing'];
  return types[Math.floor(Math.random() * types.length)];
};