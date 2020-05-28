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

export const createData = request => {
  const { id, title, location, status } = request;
  return { id, title, location, status };
}