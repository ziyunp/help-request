import { RAISED, API } from '../utils/constants';

export const getRequests = () => {
  return fetch(API + '/requests')
    .then(response => {
      return response.text();
    })
}

export const getNextRequest = () => {
  return fetch(API + '/nextRequest')
    .then(response => {
      return response.text();
    })
}

export const createRequest = (title, location) => {
  const status = RAISED;
  return fetch(API + '/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title, location, status})
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      return getRequests();
    })
}

export const updateRequest = (id, status) => {
  return fetch(API + '/requests', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, status})
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      return getRequests();
    });
}
