import { ADDRESSED, RAISED, WITH_HELPER } from '../utils/constants';

export const isActive = request => {
  return request.status !== ADDRESSED;
}

export const createData = (pos, isNext, request) => {
  pos = pos.toString();
  const { id, title, location, status } = request;
  return { pos, isNext, id, title, location, status };
}

export const formatStatusString = (status) => {
  switch(status) {
    case RAISED: return "Raised";
    case WITH_HELPER: return "With Helper";
    case ADDRESSED: return "Addressed";
    default: return "";
  }
}