import { ADDRESSED } from '../utils/constants';

export const isActive = request => {
  return request.status !== ADDRESSED;
}

export const createData = request => {
  const { id, title, location, status } = request;
  return { id, title, location, status };
}