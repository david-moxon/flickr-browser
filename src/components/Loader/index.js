import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

class Loader extends React.Component {
	render() {
		return <CircularProgress size={50} />
	}
}

export default Loader