import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Routes from 'routes';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes />
        <GlobalStyles />
      </ThemeProvider>
    </Router>
  );
};

export default App;
