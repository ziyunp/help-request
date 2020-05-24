export const createRequest = () => {
  let title = prompt('Enter request title');
  let location = prompt('Enter location');
  let status = 'raised';
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
