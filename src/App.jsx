import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'jotai';
// import Header from '@components/common/Header';
import Router from './Router';
// import './reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
