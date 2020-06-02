import { ADDRESSED, RAISED, WITH_HELPER, CANCELLED } from '../utils/constants';

export const isActive = request => {
  const { status } = request;
  return status === RAISED || status === WITH_HELPER;
}

export const createData = (pos, isNext, request) => {
  pos = pos.toString();
  const { id, title, location, status, created_at, updated_at } = request;
  return { pos, isNext, id, title, location, status, created_at, updated_at };
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

export const isDate = (date) => {
  const regExp  = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
  return regExp.test(date);
}