import { ADDRESSED } from '../utils/constants';

export const isActive = request => {
  return request.status !== ADDRESSED;
}

export const createData = (pos, request) => {
  pos = pos.toString();
  const { id, title, location, status } = request;
  return { pos, id, title, location, status };
}