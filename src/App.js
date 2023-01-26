import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

//custom components
import Login from './views/Login';
import Profile from './views/Profile';
import Translations from './views/Translations';
import Navbar from './components/Navbar/Navbar';

/*const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/translations', element: <Translations /> },
  { path: '/profile', element: <Profile /> },
]);*/

function App() {
  //console.log(process.env.REACT_APP_API_KEY);
  /*<RouterProvider router={router} />*/
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/translations' element={<Translations />}/>
          <Route path='/profile'element={<Profile />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
