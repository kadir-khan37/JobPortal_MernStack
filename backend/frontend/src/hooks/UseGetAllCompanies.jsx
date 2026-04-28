import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "@/utils/axios";
import { Company_API_Endpoint } from "../utils/constant";
import { setCompanies } from "../../redux/companyslice";

const useGetAllCompanies = (user) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Company_API_Endpoint}/get`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setCompanies(res.data.companies || []));
        }
      } catch (error) {
        console.error("Failed to fetch companies", error);
      } finally {
        setLoading(false);
      }
    };

    // only fetch when user is available
    if (user) fetchCompanies();
  }, [user, dispatch]);

  return loading;
};

export default useGetAllCompanies;