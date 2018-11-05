import { createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import blue from '@material-ui/core/colors/blue'

export default createMuiTheme({
	palette: {
		primary: pink,
		secondary: blue,
	},
	typography: {
		useNextVariants: true,
	},
})
