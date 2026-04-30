import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { jobs, searchQuery } = useSelector((store) => store.jobs);
  const [filterJobs, setFilterJobs] = useState(jobs);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      // Salary filter
      if (searchQuery?.startsWith("{")) {
        try {
          const salaryRange = JSON.parse(searchQuery);
          if (job.salary < salaryRange.min || job.salary > salaryRange.max)
            return false;
        } catch (err) {
          console.error("Invalid salary JSON", err);
        }
      }

      // Text search
      if (
        searchQuery &&
        !searchQuery.startsWith("{") &&
        !(
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });

    setFilterJobs(filteredJobs);
  }, [jobs, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-5">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <FilterCard />
        </aside>

        {/* Job List */}
        <main className="w-full lg:w-3/4">
          {filterJobs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Job Not Found
            </p>
          ) : (
            <div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                xl:grid-cols-3 
                gap-4
              "
            >
              {filterJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Jobs;
