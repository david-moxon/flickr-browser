import React from 'react'
import propTypes from 'prop-types'
import * as shapes from 'helpers/shapes'
import { connect } from 'react-redux'
import PhotoFrame from 'components/PhotoFrame'
import Loader from 'components/Loader'
import { PHOTO_FORMAT } from 'helpers/flickr'
import styles from './PhotosView.scss'
import * as photoActions from 'actions/photos'
import VisibilityTrigger from 'react-visibility-sensor'

class PhotosView extends React.Component {
	addTag = (tag) => {
		const { tags, onLoad } = this.props
		onLoad(null, [ ...tags, tag ])
	}
	endIsVisible = (visible) => {
		const { search, tags, page, pages, photos, onLoad } = this.props
		if (photos.length && visible && page < pages) onLoad(search, tags, page + 1)
	}
	getPhoto = (photo) => <PhotoFrame key={photo.id} photo={photo} format={this.props.format} onSelectTag={this.addTag} />
	render() {
		const { photos, loading } = this.props
		return (
			<div className={styles.container}>
				<div className={styles.photos}>
					{photos.map(this.getPhoto)}
				</div>
				{loading ? <Loader /> : null}
				<VisibilityTrigger partialVisibility intervalCheck={false} scrollCheck scrollThrottle={1} onChange={this.endIsVisible}>
					<div className={styles.endTrigger}>&nbsp;</div>
				</VisibilityTrigger>
			</div>
		)
	}
}

PhotosView.propTypes = {
	format: propTypes.oneOf(Object.values(PHOTO_FORMAT)),

	// Provided by connect
	photos: propTypes.arrayOf(shapes.photo).isRequired,
	loading: propTypes.bool.isRequired,
	search: propTypes.string,
	tags: propTypes.array,
	page: propTypes.number,
	pages: propTypes.number,
	onLoad: propTypes.func.isRequired,
}

PhotosView.defaultProps = {
	format: PHOTO_FORMAT.SMALL_240,
}

const mapStateToProps = (state) => {
	const { data, loading, search, tags, page, pages } = state.data.photos
	return {
		photos: data,
		loading,
		tags,
		search,
		page,
		pages,
	}
}

const mapDispatchToProps = (dispatch) => ({
	onLoad: (search, tags, page) => dispatch(photoActions.load(search, tags, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosView)
