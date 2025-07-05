import { resourceTypes } from './resourceTypes';

export function getRandomResourceType() {
  const index = Math.floor(Math.random() * resourceTypes.length);
  return resourceTypes[index];
}
