import Title from './components/titleBar';
import News from './components/news';
import Pagination from './components/pagination';
import Search from './components/search';
import './App.css';
import { Route, Routes } from 'react-router-dom';

// const AppInsider = () => {
//   return {
//      routes = useRoutes([
//       {path: "/", element: <News/>},
//     ]),
//     return routes;
//   }
// };

function App() {
  return (
    <div className="App">
        <Title />
        <Routes>
          <Route exact path='/' element={<News/>}/>
          <Route exact path='/search' element={<Search/>}/>
        </Routes>
    </div>
  );
}

export default App;
