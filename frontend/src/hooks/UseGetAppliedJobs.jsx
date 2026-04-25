import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAppliedJobs } from "../../redux/jobSlice.js";
import { Application_API_Endpoint } from "../Utils/constant.js";

const UseGetAppliedJobs = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${Application_API_Endpoint}/get`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          dispatch(setAppliedJobs(res.data.application));
          console.log(res.data.application);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

     fetchApplications();
  }, [ dispatch]);

  return loading;
};

export default UseGetAppliedJobs;
