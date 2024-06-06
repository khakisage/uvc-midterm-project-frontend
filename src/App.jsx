import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import Router from './Router';
// import './reset.css';
import './App.css';
import Header from '@components/common/Header';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Header />
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
