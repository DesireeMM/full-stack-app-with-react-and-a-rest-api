import './styles/global.css';
import { Route, Routes } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/signin" element={<UserSignIn />} />
    </Routes>
    </>
  );
}

export default App;
