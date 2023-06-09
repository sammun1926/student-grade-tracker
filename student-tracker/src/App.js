import './components/App.css';
import StudentDetails from './components/StudentDetails';
import { Routes,Route } from "react-router-dom";
import Students from './components/Students';
import AddStudent from './components/AddStudent';
function App() {
  return (
    <div className="App">
      
      <AddStudent/>
     
      <Routes>
        <Route path={`/student/:id`} element={<StudentDetails />} />
        <Route path={`/`} element={<Students />} />
        </Routes>
    </div>
  );
}



export default App