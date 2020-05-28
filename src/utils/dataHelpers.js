import { ADDRESSED } from '../utils/constants';

export const isActive = request => {
  return request.status !== ADDRESSED;
}

export const createData = (pos, isNext, request) => {
  pos = pos.toString();
  const { id, title, location, status } = request;
  return { pos, isNext, id, title, location, status };
}