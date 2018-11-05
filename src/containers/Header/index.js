import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import SearchBar from 'components/SearchBar'
import * as photoActions from 'actions/photos'
import styles from "./Header.scss"

class Header extends React.Component {
	removeTag = (tag) => {
		const { tags, onLoad } = this.props
		onLoad(null, tags.filter(t => t !== tag))
	}
	render() {
		const { search, tags, total, onLoad } = this.props
		const searchBar = (
			<div key="search" className={styles.search}>
				<SearchBar placeholder="Search Photos" value={search} onSearch={s => onLoad(s)} />
			</div>
		)

		if (search) {
			return (
				<div className={styles.container}>
					{searchBar}
					<div className={styles.label}>{`Showing ${total || ''} photos relating to "${search}"`}</div>
					<div className={styles.subLabel}>{`Scroll down to see more, or try clicking on a photo's tag`}</div>
				</div>
			)
		}
		if (tags && tags.length) {
			return (
				<div className={styles.container}>
					{searchBar}
					<div className={styles.label}>
						Showing {total || ''} photos with tags
						{tags.map((tag, i) => <span key={i} className={styles.tag} title="Click to remove" onClick={() => this.removeTag(tag)}> #{tag}</span>)}
					</div>
					<div className={styles.subLabel}>{`You can click another photo tag to refine your results`}</div>
				</div>
			)
		}
		return (
			<div className={styles.container}>
				<div className={styles.labelInitial}>Start by searching photos on Flickr</div>
				<div className={styles.subLabel}>Try <a href="#" onClick={() => onLoad('cute puppy')}>cute puppy</a> or <a href="#" onClick={() => onLoad('wildlife scene')}>wildlife scene</a></div>
				{searchBar}
			</div>
		)
	}
}

Header.propTypes = {
	search: propTypes.string,
	tags: propTypes.array,
	total: propTypes.any,
	onLoad: propTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	const { search, tags, total } = state.data.photos
	return { search, tags, total }
}

const mapDispatchToProps = (dispatch) => ({
	onLoad: (search, tags) => dispatch(photoActions.load(search, tags)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
