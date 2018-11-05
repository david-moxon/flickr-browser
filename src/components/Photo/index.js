import React from 'react'
import propTypes from 'prop-types'
import * as shapes from 'helpers/shapes'
import styles from "./Photo.scss"
import { getPhotoUrl, PHOTO_FORMAT } from 'helpers/flickr'

class Photo extends React.Component {
	render() {
		const { photo, format, ...otherProps } = this.props
		return <img {...otherProps} style={styles.container} src={getPhotoUrl(photo, format)}/>
	}
}

Photo.propTypes = {
	photo: shapes.photo,
	format: propTypes.oneOf(Object.values(PHOTO_FORMAT)),
}

Photo.defaultProps = {
	format: PHOTO_FORMAT.THUMBNAIL,
}

export default Photo
