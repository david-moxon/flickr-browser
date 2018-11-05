import React from 'react'
import propTypes from 'prop-types'
import PhotosView from 'containers/PhotosView'
import AppHeader from 'containers/AppHeader'
import Header from 'containers/Header'
import { connect } from 'react-redux'

class App extends React.Component {
	componentDidMount() {
		this.props.onLoad()
	}

	render() {
		return [
			<AppHeader key="app_header" />,
			<Header key="header" />,
			<PhotosView key="photos" />,
		]
	}
}

App.propTypes = {
	onLoad: propTypes.func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({
	onLoad: () => { },	// nothing at present
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
