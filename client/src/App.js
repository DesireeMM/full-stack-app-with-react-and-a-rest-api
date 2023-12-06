import './styles/global.css';
import { Route, Routes } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Courses />} />
    </Routes>
    </>
  );
}

export default App;
