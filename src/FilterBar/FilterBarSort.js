import React, {useState} from 'react'

const FilterBarSort = ({updateFilterType}) => {
	const [type, setType] = useState('All')
	// // console.log('type is', type);
	
	// // when the data changes, check the TYPE and sort by the data by that value
	// useEffect(() => {
	// 	const filteredData = data.filter(({ data: { link_flair_css_class: listingType } }) => listingType === type)
	// 	// console.log(data)
	// 	console.log(filteredData)
	// 	updateData({ combinedResults: filteredData })
	// }, data)

	const handleTypeChange = ({target}) => {
		setType(target.value)
		updateFilterType(target.value)
	}

	return (
		<div>
			<span>Sort By Type: </span>
			<select value={type} onChange={handleTypeChange}>
				<option>All</option>
				<option>Selling</option>
				<option>Buying</option>
				<option>Trading</option>
				<option>Group Buy</option>
				<option>Vendor</option>
				<option>Interest Check</option>
				<option>Artisan</option>
				<option>Sold</option>
				<option>Purchased</option>
				<option>Meta</option>
			</select>
		</div>
	)
}

export default FilterBarSort