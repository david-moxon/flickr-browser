import React from 'react'
import propTypes from 'prop-types'
import * as shapes from 'helpers/shapes'
import Photo from 'components/Photo'
import HtmlEntity from 'components/HtmlEntity'
import Paper from '@material-ui/core/Paper'
import { PHOTO_FORMAT, getPhotoTags, getPhotoPageUrl, getPhotoOwnerUrl } from 'helpers/flickr'
import styles from './PhotoFrame.scss'

const MAX_TITLE_LENGTH = 50
const MAX_TAGS = 10

const Tag = ({ tag, ...otherProps }) => <span className={styles.tag} {...otherProps}> #{tag}</span>
Tag.propTypes = {
	tag: propTypes.string.isRequired,
}

const Label = ({ children, length, raw = false}) => {
	let ret = children
	if (length && ret.length > length) ret = ret.substring(0, length - 3) + "..."
	if (raw) return <HtmlEntity>{ret}</HtmlEntity>
	return ret
}
Label.propTypes = {
	children: propTypes.string.isRequired,
	length: propTypes.number,
	raw: propTypes.bool,
}

class PhotoFrame extends React.Component {
	state = {
		previewVisible: false,
	}
	showPreview = () => {
		this.timer = setTimeout(() => {
			this.setState({ previewVisible: true })
		}, 500)
	}
	hidePreview = () => {
		clearTimeout(this.timer)
		this.setState({ previewVisible: false })
	}
	cancelPreview = () => {
		clearTimeout(this.timer)
	}
	render() {
		const { photo, format, onSelectTag } = this.props
		const { previewVisible } = this.state

		let tags = getPhotoTags(photo)
		const desc = photo.description._content

		let descEl, tagsEl
		if (desc) descEl = <div className={styles.description}><Label raw>{desc}</Label></div>
		if (tags.length) {
			if (tags.length > MAX_TAGS) tags = tags.slice(0, MAX_TAGS)
			tagsEl = <div className={styles.tags}>{tags.map((tag, i) => <Tag key={i} tag={tag} title="Click to search this tag" onClick={() => onSelectTag ? onSelectTag(tag) : null} />)}</div>
		}

		return (
			<Paper className={styles.container}>
				<Photo photo={photo} format={format} onMouseOver={this.showPreview} onMouseOut={this.cancelPreview} />
				<div className={styles.titles}>
					<a href={getPhotoPageUrl(photo)} target="_blank" rel="noopener noreferrer" className={styles.title}><Label length={MAX_TITLE_LENGTH}>{photo.title}</Label></a> by <a href={getPhotoOwnerUrl(photo)} target="_blank" rel="noopener noreferrer" className={styles.owner}>{photo.ownername}</a>
				</div>
				{descEl}
				{tagsEl}
				<Paper elevation={12} className={previewVisible ? styles.previewVisible : styles.previewInvisible} onMouseOver={this.showPreview} onMouseOut={this.hidePreview}>
					<Photo photo={photo} format={PHOTO_FORMAT.MEDIUM_640} />
				</Paper>
			</Paper>
		)
	}
}

PhotoFrame.propTypes = {
	photo: shapes.photo,
	format: propTypes.oneOf(Object.values(PHOTO_FORMAT)),
	onSelectTag: propTypes.func,
}

PhotoFrame.defaultProps = {
	format: PHOTO_FORMAT.SMALL_240,
}

export default PhotoFrame
