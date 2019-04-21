import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

const render = () => {
	ReactDom.render(
		<App/>,
		document.getElementById('root')
	)
}
	
render()

if (module.hot) {
	module.hot.accept('./App', function () {
		render()
	})
}