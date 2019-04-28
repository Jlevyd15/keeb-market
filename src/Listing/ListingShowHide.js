import React from 'react'
import { markdown } from 'markdown'

const ListingShowHide = ({data}) => (
	<details className="App-section-content">
		<summary>{data.title}</summary>
		<p><span dangerouslySetInnerHTML={{ __html: markdown.toHTML(data.selftext) }} /></p>
		<hr />
		<a href={data.url} target="_blank" rel="noopener noreferrer">Original Post</a>
	</details>
)

export default ListingShowHide