import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
// import Header from '@components/common/Header';
import Router from './Router';
// import './reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
