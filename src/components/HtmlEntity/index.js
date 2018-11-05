import React from 'react'
import propTypes from 'prop-types'

const HtmlEntity = props => <span dangerouslySetInnerHTML={{__html: props.children }} />

HtmlEntity.propTypes = {
	children: propTypes.string.isRequired,
}

export default HtmlEntity