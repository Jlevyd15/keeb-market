import React, { useState, useEffect, Fragment } from 'react';
import mockData from './test/redditMockData'
import './App.css';

import ListingShowHide from './Listing/ListingShowHide'
import FilterBarSort from './FilterBar/FilterBarSort'

const App = () => {
	const [loading, updateLoading] = useState(true) 
	const [msg, updateMsg] = useState({}) 
	const [after, updateAfter] = useState('') 
	const [before, updaetBefore] = useState('') 
	const [filter, updateFilter] = useState('All') 
	const [error, setError] = useState()
	const [filteredListings, updatefilteredListings] = useState([])

	useEffect(() => {
		fetchData()
		// fetchCraigsData()
	},[])

	// TODO - fix the filtered data bug
	useEffect(() => {
		console.log('filter chnaged', filter);
		if (msg.data) {
			const filteredData = filterData(msg.data.children)
			console.log(filteredData)
			updatefilteredListings([...filteredData])
		}
	}, [filter])

	const setFilter = type => {
		updateFilter(type)
	}

	const filterData = data => {
		if (filter !== 'All') {
			return data.filter(
				({ data: { link_flair_text: listingType } }) => listingType === filter)
		}
		return data
	}

	// const updateListings = data => {
	// 	updateMsg({
	// 		...msg,
	// 		...newMsg,
	// 		data: { children: filteredData }
	// 	})
	// }

	const setData = ({ msg: newMsg = msg } = {}) => {
		const { after: newAfter, before: newBefore, children } = newMsg.data
		// // filter the data if a filter is applied
		const filteredData = filterData(children)
		updatefilteredListings([...filteredData])
		// update eveything in our state
		const combinedMsg = {
			...msg,
			...newMsg
		}
		updateMsg({
			combinedMsg,
			data: { children: filteredData }
		})
		updateAfter(newAfter)
		updaetBefore(newBefore)
		updateLoading(false)
	}

	const setPage = (page = 'after') => {
		if (page === 'before') {
			updaetBefore(before)
		} else {
			updateAfter(after)
		}
	}

	// TODO - set loading indicator on clicks
	const handleNext = () => {		
		setPage()
		fetchData()
	}

	const handleBack = () => {
		setPage('back')
		fetchData('back')
	}

	// TODO - next data set
	// const fetchCraigsData = () => {
	// 	const url = `/.netlify/functions/criagslist`
	// 	fetch(url)
	// 		.then(response => response.text())
	// 		.then(json => {
	// 			// console.log('json', json)
	// 			const result = JSON.parse(json).data
	// 			console.log('results are', result)
	// 		})
	// }

	const fetchData = (page = 'after') => {
		const nextPage = page === 'after' ? `after=${after}` : `before=${before}`
		const url = `/.netlify/functions/reddit?${nextPage}`

		let result
		if (process.env.NODE_ENV === 'development') {
			result = mockData.data
			// this will combine the current list of results with the new ones
			const currentList = msg.data && msg.data.children
			const combinedResults = currentList ? 
				[...currentList, ...result.data.children] : [...result.data.children]

			const msgWithCombinedResults = {
				...msg.data || result,
				data: { 
					...result.data,
					children: combinedResults
				}
			}
			// store the data in state	
			setData({ msg: msgWithCombinedResults })
		} else {
			fetch(url)
				.then(response => response.text())
				.then(json => {
					const result = JSON.parse(json).data
					if (result.error) {
						setError(result)
						// TODO - uncomment this and prevent rendering child components when error is defined
						// updateLoading(false)
					} else {
						const { after, before } = result.data
						// this will combine the current list of results with the new ones
						const currentList = msg.data && msg.data.children
						const combinedResults = currentList ? 
							[...currentList, ...result.data.children] : [...result.data.children]
						// store the data in state	
						const msgWithCombinedResults = {
							...msg.data || result,
							data: {
								...result.data,
								children: combinedResults
							}
						}
						// store the data in state	
						setData({ msg: msgWithCombinedResults })
					}
				})
			}
	}
	
	return (
		<div className="App">
			{error && <h3>Error: {error.message}</h3>}
			{loading ? <h3>Still loading...</h3> : (
				<>
					<header className="App-header">Keeb Mart</header>
					<FilterBarSort updateFilterType={setFilter} />
					<section>
						{filteredListings.map(({data}) => (
							<Fragment key={data.id}>
								<span>{data.link_flair_text}</span>
								<ListingShowHide data={data} />
							</Fragment>
						))}
					</section>
					<button onClick={handleBack}>Previous</button>
					<button onClick={handleNext}>Next</button>
				</>
			)}
		</div>
	)
}

export default App;
