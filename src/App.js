import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Landingpage from './Landing Page/landingpage';
import Searching from './Searching Page/searching';
import Accounts_homepage from './Accounts Page/accounts_homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
      <Routes>
        <Route path="/search" element={<Searching />} />
      </Routes>
      <Routes>
        <Route path="/my-account" element={<Accounts_homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
