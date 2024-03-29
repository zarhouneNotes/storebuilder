import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/AuthComponents/LoginForm';
import SignUpForm from './components/AuthComponents/SignUpForm';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import { useAuth } from './Firebase';
import {useMediaQuery} from 'usehooks-ts'
  // const isMobile = useMediaQuery('max-width("460px")')

function App() {

  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/storeId=:id/*' element={<Store  />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
