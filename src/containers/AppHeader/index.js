import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Refresh from '@material-ui/icons/Refresh'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import styles from './AppHeader.scss'
import * as photoActions from 'actions/photos'

const muiStyles = () => ({
	button: {
		color: 'white',
	},
})

class AppHeader extends React.Component {
	state = {
		drawerOpen: false,
	}
	refresh = () => {
		const { onLoad, search, tags } = this.props
		onLoad(search, tags)
	}
	openDrawer = () => {
		this.setState({ drawerOpen: true })
	}
	closeDrawer = () => {
		this.setState({ drawerOpen: false })
	}
	render() {
		const { classes } = this.props
		const { drawerOpen } = this.state
		return (
			<div className={styles.container}>
				<AppBar>
					<Toolbar>
						<IconButton onClick={this.openDrawer}>
							<MenuIcon className={classes.button} />
						</IconButton>
						<div className={styles.title}><b>Flickr-Browser</b> by David Moxon</div>
						<IconButton onClick={this.refresh} aria-label="Refresh">
							<Refresh className={classes.button} />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer open={drawerOpen} onClose={this.closeDrawer}>
					<div className={styles.drawer}>
						<div>Flickr-Browser is developed by <a href="https://github.com/david-moxon" target="_blank" rel="noopener noreferrer">David Moxon</a></div>
						<div>Please visit the <a href="https://github.com/david-moxon/flickr-browser" target="_blank" rel="noopener noreferrer">GitHub repository</a> for more information</div>
					</div>
				</Drawer>
			</div>
		)
	}
}

AppHeader.propTypes = {
	// Provided by connect/withStyles
	classes: propTypes.object.isRequired,
	search: propTypes.string,
	tags: propTypes.array,
	onLoad: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	search: state.data.photos.search,
	tags: state.data.photos.tags,
})

const mapDispatchToProps = (dispatch) => ({
	onLoad: (search, tags) => dispatch(photoActions.load(search, tags)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(muiStyles)(AppHeader))
