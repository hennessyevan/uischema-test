import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { App } from './App'
import en from './translations.json'

const app = document.getElementById('app')
ReactDOM.render(
  <IntlProvider messages={en} locale="en">
    <App />
  </IntlProvider>,
  app
)
