import React, { Fragment, Component } from 'react';
import { markdown } from 'markdown'
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = { 
			loading: true, 
			msg: undefined,
			after: '',
			before: ''
		}
	}
	componentDidMount() {
		this.fetchData()
	}

	setPage = (page = 'after') => {
		this.setState(state => {
			const {after, before} = state.msg.data
			return {
				[page]: page === 'after' ? after : before
			}
		})
	}

	handleNext = () => {
		console.log("make an api call - next")
		this.setPage()
		this.fetchData()
	}

	handleBack = () => {
		console.log("make an api call - back")
		this.setPage('back')
		this.fetchData('back')
	}

	fetchData = (page = 'after') => {
		const nextPage = page === 'after' ? `after=${this.state.after}` : `before=${this.state.before}`
		const url = `/.netlify/functions/reddit?${nextPage}`
		fetch(url)
			.then(response => response.text())
			.then(json => {
				const msg = JSON.parse(json).data
				const {after, before} = msg.data
				this.setState({ loading: false, msg, after, before })
			})
	}
	
	render() {
		return (
			<div className="App">
				{this.state.loading ? <h3>Still loading...</h3> : (
					<>
						<header className="App-header">Keeb Mart</header>
						<section>
							{this.state.msg.data.children.map(({data}) => (
								<Fragment key={data.id}>
									<details  className="App-section-content">
										<summary>{data.title}</summary>
										<p><span dangerouslySetInnerHTML={{ __html: markdown.toHTML(data.selftext) }} /></p>
										<hr />
										<a href={data.url} target="_blank" rel="noopener noreferrer">Original Post</a>
									</details>
								</Fragment>
							))}
						</section>
						<button onClick={this.handleBack}>Previous</button>
						<button onClick={this.handleNext}>Next</button>
					</>
				)}
			</div>
		)
	}
}

export default App;
