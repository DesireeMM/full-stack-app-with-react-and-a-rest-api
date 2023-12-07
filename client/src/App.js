import './styles/reset.css';
import './styles/global.css';
import { Route, Routes } from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/signin" element={<UserSignIn />} />
      <Route path="/signout" element={<UserSignOut />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
      </Route>
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/error" element={<UnhandledError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;