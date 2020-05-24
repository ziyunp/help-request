export const isActive = request => {
  return request.status !== 'addressed';
}

export const createData = request => {
  const { id, title, location, status } = request;
  return { id, title, location, status };
}