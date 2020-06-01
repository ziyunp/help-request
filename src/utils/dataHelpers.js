import { ADDRESSED, RAISED, WITH_HELPER, CANCELLED } from '../utils/constants';

export const isActive = request => {
  const { status } = request;
  return status === RAISED || status === WITH_HELPER;
}

export const createData = (pos, isNext, request) => {
  pos = pos.toString();
  const { id, title, location, status, created_at } = request;
  return { pos, isNext, id, title, location, status, created_at };
}

export const formatStatusString = (status) => {
  switch(status) {
    case RAISED: return "Raised";
    case WITH_HELPER: return "With Helper";
    case ADDRESSED: return "Addressed";
    case CANCELLED: return "Cancelled";
    default: return "";
  }
}

export const formatDateString = (ISODate) => {
  const date = new Date(ISODate);
  return date.toLocaleString();
}