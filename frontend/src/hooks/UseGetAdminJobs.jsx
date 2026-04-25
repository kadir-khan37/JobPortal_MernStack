import { Jobs_API_Endpoint } from "../Utils/constant.js";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { setAdminJobs } from "../../redux/AdminJobSlice.js";
import { useDispatch } from "react-redux";

const UseGetAdminJobs = (user) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${Jobs_API_Endpoint}/getadminjobs`,
          { withCredentials: true }
        );

        if (isMounted) {
          dispatch(setAdminJobs(response?.data?.jobs || []));
        }
      } catch (error) {
        console.error("Failed to fetch AdminJobs", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [user, dispatch]);

  return loading;
};

export default UseGetAdminJobs;
