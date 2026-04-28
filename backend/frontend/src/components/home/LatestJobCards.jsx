import React from 'react'

const LatestJobCards = ({ job, onClick }) => {
  if (!job) return null;

  return (
    <div
      onClick={onClick}
      
      className='p-6 rounded-xl shadow-xl hover:shadow-2xl border border-gray-300 transition cursor-pointer w-[350px]'
    >
      <h3 className='text-2xl font-semibold'>{job.title}</h3>
      <p className='text-sm text-gray-500'>{job.description?.slice(0, 80)}...</p>

      <p className='mt-3 text-lg font-medium text-purple-600'>{job.company?.name || 'Unknown Company'}</p>

      <p className='text-sm text-gray-500 mt-1'>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}</p>

      <div className='grid grid-cols-3 mt-2 font-medium'>
        <p>{job.location || 'Remote'}</p>
        <p className='text-orange-400'>{job.salary || 'N/A'}</p>
        <p>{job.jobType || 'N/A'}</p>
      </div>
    </div>
  )
}

export default LatestJobCards