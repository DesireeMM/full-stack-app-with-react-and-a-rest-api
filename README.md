# Treehouse FSJS Techdegree Unit 10 Project

Learn more about the developer on [LinkedIn](https://www.linkedin.com/in/desiree-morimoto-9470481b0/)

## Table of Contents
- [Project Description](#overview)
- [Technologies Used](#technologiesused)
- [Required Features](#requiredfeatures)
- [Additional Features](#extrafeatures)

## Project Information

#### <a name="overview"></a>Description
This project involved creating the client side of a full stack application representing a school course database. The server side REST API was completed in the [Unit 9 project](https://github.com/DesireeMM/rest-api-project-9). Anyone may view the courses in the database, but users can create an account in order to access additional functionality. This application uses Basic Authentication to allow users to sign in, granting them the ability to create, edit, and delete courses they own.

#### <a name="technologiesused"></a>Technologies Used
- JavaScript
- React
  - JSX modeled after markup examples provided by Treehouse
- CSS
- HTML
##### REST API
- JavaScript
  - Express
    - [cors] (https://expressjs.com/en/resources/middleware/cors.html)
    - [bcrypt](https://www.npmjs.com/package/bcrypt)
- Sequelize
- SQLite

#### <a name="requiredfeatures"></a>Required Features
- Set up project and its dependencies with npm
  - [create-react-app](https://create-react-app.dev/)
  - [js-cookie](https://www.npmjs.com/package/js-cookie)
- Use the REST API created in Unit 9
- Create React Components to render data fetched from the REST API
- Utilize React Router to map my user interface to the URL
- Protect the Routes used to create, update, and delete courses
  - Use Basic Authentication to authenticate application users
  - Send encoded user credentials through the Authorization header in my requests when needed

#### <a name="extrafeatures"></a>Additional Features to Enhance User Experience
- Created components that render user-friendly error messages
  - When a user is not authorized to access a resource
  - When a requested resource doesn't exist
  - When an internal server error occurs
- Persisted user credentials using an HTTP cookie
- When a user attempts to access a protected route, they are redirected to sign in. Upon signing in, they are redirected to the resource they were originally trying to visit
  - Achieved by using the location object