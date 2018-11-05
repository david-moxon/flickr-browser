import propTypes from 'prop-types'

export const photo = propTypes.shape({
	id: propTypes.any.isRequired,
	server: propTypes.any.isRequired,
	farm: propTypes.any.isRequired,
	secret: propTypes.any.isRequired,
})
