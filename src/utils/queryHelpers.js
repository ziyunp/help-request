export const getRequests = () => {
  return fetch('http://localhost:3001')
    .then(response => {
      return response.text();
    })
}

export const createRequest = (title, location) => {
  const status = 'raised';
  fetch('http://localhost:3001/requests', {
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
      // getRequest();
    });
}
