import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from 'react-query';

import Routes from 'routes';

import { queryClient } from 'services/api';

import GlobalStyles from 'styles/global';
import theme from 'styles/theme';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes />
          <GlobalStyles />
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
