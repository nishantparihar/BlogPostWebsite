import React from 'react';
import Context from '../context/context';


const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <Context>
      <Component {...pageProps} />
    </Context>
  </React.Fragment>
);

export default App;
