import { RAISED } from '../utils/constants';

export const getRequests = () => {
  return fetch('/requests')
    .then(response => {
      return response.text();
    })
}

export const getNextRequest = () => {
  return fetch('/nextRequest')
    .then(response => {
      return response.text();
    })
}

export const createRequest = (title, location) => {
  const status = RAISED;
  return fetch('/requests', {
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
  return fetch('/requests', {
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
