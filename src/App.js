import React, {useState, useEffect} from 'react';
function App() {
  const [requests, setRequests] = useState(false);
  useEffect(() => {
    getRequest();
  }, []);
  function getRequest() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setRequests(data);
      });
  }
  function createRequest() {
    let title = prompt('Enter request title');
    let location = prompt('Enter location');
    let status = 'raised';
    fetch('http://localhost:3001/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, location, status}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRequest();
      });
  }
  function deleteRequest() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/requests/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRequest();
      });
  }
  return (
    <div>
      {requests ? requests : 'There is no request data available'}
      <br />
      <button onClick={createRequest}>Create request</button>
      <br />
      <button onClick={deleteRequest}>Delete request</button>
    </div>
  );
}
export default App;

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       greeting: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ name: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
//       .then(response => response.json())
//       .then(state => this.setState(state));
//   }
//   render () {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <form onSubmit={this.handleSubmit}>
//             <label htmlFor="name">Enter your name: </label>
//             <input
//               id="name"
//               type="text"
//               value={this.state.name}
//               onChange={this.handleChange}
//             />
//             <button type="submit">Submit</button>
//           </form>
//           <p>{this.state.greeting}</p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
