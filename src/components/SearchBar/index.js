import React from 'react'
import propTypes from 'prop-types'
import styles from './SearchBar.scss'
import SearchIcon from '@material-ui/icons/Search'

class SearchBar extends React.Component {
	state = {
		value: this.props.value || [],
	}
	componentDidUpdate(prevProps) {
		const { value } = this.props
		if (prevProps.value !== value) this.setState({ value: value || '' })
	}
	keyDown = (e) => {
		const { onSearch } = this.props
		const { value } = this.state

		switch (e.keyCode) {
		case 13:
			onSearch(value)
			break
		case 27:
			this.setState({ value: '' })
			onSearch(null)
			break
		}
	}
	change = (e) => {
		this.setState({ value: e.currentTarget.value })
	}
	focus = () => {
		this.input.focus()
	}
	render() {
		const { placeholder } = this.props
		const { value } = this.state
		return (
			<div className={styles.container}>
				<input placeholder={placeholder} ref={e => this.input = e} value={value} onChange={this.change} onKeyDown={this.keyDown} />
				<SearchIcon fontSize="large" color="inherit" className={styles.icon} onClick={this.focus} />
			</div>
		)
	}
}

SearchBar.propTypes = {
	value: propTypes.string,
	placeholder: propTypes.string,
	onSearch: propTypes.func.isRequired,
}

SearchBar.defaultProps = {
	placeholder: 'Search'
}

export default SearchBar
