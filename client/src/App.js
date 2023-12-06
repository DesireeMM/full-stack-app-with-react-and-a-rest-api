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

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/courses/:id/update" element={<CreateCourse />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/signin" element={<UserSignIn />} />
      <Route path="/signout" element={<UserSignOut />} />
    </Routes>
    </>
  );
}

export default App;


//TODO:
// add CreateCourse component
// add UpdateCourse component
// consider refactoring to create a helper function for api calls
// configure protected routes for /courses/create and /courses/:id/update
// restrict access to updating and deleting courses
// add validation errors
// add support for rendering markdown formatted text

//NOTES:
// after successfully validating the user's credentials, persist the user record
// and user password in the global state (using context for this)
// this will allow for adding the appropriate authorization header on future
// REST API requests that require authentication
