import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = { loading: true, msg: undefined }
	}
	componentDidMount() {
		fetch('/.netlify/functions/reddit')
			.then(response => response.text())
			.then(json => {
				this.setState({ loading: false, msg: JSON.parse(json).data })
			})
	}
  render() {
    return this.state.loading ? 'Still loading...' : (
      <div className="App">
        <header className="App-header">
					{this.state.msg.data.children.map(item => (
							<>
								<details>
									<summary><h2>{item.data.title}</h2></summary>
									<p>{item.data.selftext}</p>
								</details>
							</>
						)
					)}
        </header>
      </div>
    );
  }
}

export default App;
