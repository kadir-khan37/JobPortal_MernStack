import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/utils/axios";
import { Jobs_API_Endpoint } from "../utils/constant";
import { setSearchedJobs } from "../redux/jobSlice";

const UseGetSearchJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // ✅ Correct selector
  const searchQuery = useSelector(
    (state) => state.jobs.searchQuery
  );

  useEffect(() => {
    if (!searchQuery) {
      dispatch(setSearchedJobs([]));
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${Jobs_API_Endpoint}/search?keyword=${searchQuery}`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          dispatch(setSearchedJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, dispatch]);

  return loading;
};

export default UseGetSearchJobs;
