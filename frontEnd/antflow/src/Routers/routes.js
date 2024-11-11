import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNewEmployee from "../Pages/AddNewEmployee"; 
import LoginForm from '../Pages/LoginPage';
import SignUpForm from '../Pages/SignupPage';
import AntFlowHomePage from '../Pages/HomePage';
import AddNewProjectForm from '../Pages/AddNewProject';
import EmployeeList from '../Pages/EmployeeList';
import ProjectList from '../Pages/ProjectList'; 
import AntFlow from '../Pages/Antflow';
import Ai from '../Pages/Ai';

const AppRoute = () => { 
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<AntFlow/>}/>
        <Route path='/home' element={<AntFlowHomePage />} /> 
        <Route path='/log-in' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/add-new-employee' element={<AddNewEmployee />} />
        <Route path='/add-new-project' element={<AddNewProjectForm />} />
        <Route exact path='/employee-list' element={<EmployeeList/>} />
        <Route exact path='/project-list' element={<ProjectList/>} />
        <Route exact path='/ai' element={<Ai />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
