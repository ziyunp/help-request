import { RAISED, WITH_HELPER, ADDRESSED } from '../utils/constants';

export const isPending = request => {
  return request.status === RAISED;
}

export const isWithHelper = request => {
  return request.status === WITH_HELPER;
}

export const isAddressed = request => {
  return request.status === ADDRESSED;
}

export const createData = (pos, request) => {
  pos = pos.toString();
  const { title, location, status } = request;
  return { pos, title, location, status };
}