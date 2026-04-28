
import { Button } from '../components/ui/button.jsx';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminJobsTable from './AdminJobsTable';
const AdminJobs = () => {
  const [search,setSearch]= useState("");
  const navigate=useNavigate();
  return (
    <div>
    <div className='px-4 md:px-8 lg:px-14 py-10 '>
       <div className='flex justify-between pb-4'>
     <input  
     placeholder='search for jobs'
     className='border border-gray-300 rounded-md px-4 py-2'
     onChange={(e)=>setSearch(e.target.value)}
     value={search}
     />
     <Button onClick={()=>navigate("/admin/createJob")}>Create Job</Button>
       </div>
        <AdminJobsTable search={search}/>
    </div>
    
    </div>
  )
}

export default AdminJobs