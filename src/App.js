import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = { loading: true, msg: undefined }
	}
	componentDidMount() {
		fetch('/.netlify/functions/hello')
			.then(response => {
				console.log(response.body)
				// return response.json()
				return response.text()
				// return response ? response.json() : 'nothing'
			})
			.then(json => {
				console.log(json)
				this.setState({ loading: false, msg: json })
			})
		// fetch('https://randomuser.me/api/?results=10')
		// .then(res => res.json())
		// .then(json => console.log('results!', json))
	}
  render() {
    return this.state.loading ? 'Still loading...' : (
      <div className="App">
        <header className="App-header">
					<h1>{this.state.msg}</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
