import { RAISED } from '../utils/constants';

export const getRequests = () => {
  return fetch('http://localhost:3001')
    .then(response => {
      return response.text();
    })
}

export const getNextRequest = () => {
  return fetch('http://localhost:3001/nextRequest')
    .then(response => {
      return response.text();
    })
}

export const createRequest = (title, location) => {
  const status = RAISED;
  return fetch('http://localhost:3001/requests', {
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
      alert(data);
      return getRequests();
    })
}

export const updateRequest = (id, status) => {
  return fetch('http://localhost:3001/requests', {
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
      alert(data);
      return getRequests();
    });
}

export const deleteRequest = (id) => {
  return fetch(`http://localhost:3001/requests/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      return response.text();
    })
    .then(data => {
      alert(data);
      return getRequests();
    });
}