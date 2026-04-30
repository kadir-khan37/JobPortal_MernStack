import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/utils/axios";
import { Jobs_API_Endpoint } from "../utils/constant";
import { setJobs } from "../redux/jobSlice";

const useGetAllJobs = (user) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Jobs_API_Endpoint}/get`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user, dispatch]);

  return loading;
};

export default useGetAllJobs;
