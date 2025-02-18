import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SplashPage from './pages/splashPage'
import Home from './pages/home';

const App: React.FC= () =>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<SplashPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;