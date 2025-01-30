
import './App.css';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Login from './pages/Login';
import NominationForm from './pages/NominationForm';
import AdminSetting1 from './pages/AdminSetting1';
import AdminSetting2 from './pages/AdminSetting2';
import AdminSetting3 from './pages/AdminSetting3';
import AdminSetting4 from './pages/AdminSetting4';
import AdminSetting5 from './pages/AdminSetting5';
import AdminSupport from './pages/AdminSupport';
import ApproverSupport from './pages/ApproverSupport';
import NominatorSupport from './pages/NominatorSupport';
import Nomination from './pages/Nomination';
import Approver from './pages/Approver';
import Announcement1 from './pages/Announcement1';
import Approvement from './pages/Approvement';
import Report from './pages/Report';
import Announcement2 from './pages/Announcement2';
import Ant from './pages/ant';
import Caurol from './pages/Caurol';
import UpdateInfo from './components/UpdateInfo';


function App() {
  return (
   
       <Router>
     
          <Routes>
            
            <Route path='/' element={ <Login/>}/>
            <Route path='/ant' element={ <Ant/>}/>
            <Route path='/slider' element={ <Caurol/>}/>
            <Route path='/update' element={ <UpdateInfo/>}/>
            <Route path='/admin/setting1' element={<AdminSetting1/>}/>
            <Route path='/admin/setting2' element={<AdminSetting2/>}/>
            <Route path='/admin/setting3' element={<AdminSetting3/>}/>
            <Route path='/admin/setting4' element={<AdminSetting4/>}/>
            <Route path='/admin/setting5' element={<AdminSetting5/>}/>
            <Route path='/admin/report' element={<Report/>}/>
            <Route path='/admin/support' element={<AdminSupport/>}/>
            <Route path='/approvement/support' element={<ApproverSupport/>}/>
            <Route path='/nominator/support' element={<NominatorSupport/>}/>
            <Route path='/nomination' element={<Nomination/>}/>
            <Route path='/nomination/form' element={<NominationForm/>}/>
            <Route path='/nomination/announcement' element={<Announcement1/>}/>
            <Route path='/approvement/announcement' element={<Announcement2/>}/>
            <Route path='/approvement' element={<Approvement/>}/>
            <Route path='/approver' element={<Approver/>}/>
            

          </Routes>
         
        </Router>  
       
     
     
   

  );
}

export default App;

 
