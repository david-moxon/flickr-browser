import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { Provider } from 'react-redux'
import store from './store'
import theme from 'theme'
import { MuiThemeProvider } from '@material-ui/core/styles'

/**
 * TO DO:
 * - Progressive Loading
 * - Fav Icon
 * - Unit Testing
 * - Larger size preview on hover?
 * - Ability to choose size of photos in results?
*/

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById("index")
)