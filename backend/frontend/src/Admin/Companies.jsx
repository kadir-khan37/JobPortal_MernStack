import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import CompaniesTable from './CompaniesTable.jsx'
const Companies = () => {
  const navigate=useNavigate();
  const [search, setSearch] = useState("");
  return (
    <div className='px-4 md:p-10 lg:p-15 py-6'>
      <div className='flex justify-between mb-4'>
      <input
        placeholder="Search companies..."
        className='border border-gray-300 rounded-md px-4 py-2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={() => navigate("/admin/companies/create")}> New Company</Button>
     </div>
      <CompaniesTable search={search} />
    </div>
  )
}

export default Companies 