import './styles/global.css';
import { Route, Routes } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/signin" element={<UserSignIn />} />
      <Route path="/signout" element={<UserSignOut />} />
    </Routes>
    </>
  );
}

export default App;
