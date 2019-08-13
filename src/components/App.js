import React from 'react'

import Books from './Books'
import Summary from './Summary'

const App = () => (
  <table style={{display: 'inline-block'}}>
    <Books />
    
    <Summary />
  </table>
)

export default App
