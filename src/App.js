import './App.css';
import Router from './components/Routes';

import { TransactionProvider } from './context/Transaction';


function App() {
  return (
    <TransactionProvider>
        <Router />
    </TransactionProvider>
  );
}

export default App;
