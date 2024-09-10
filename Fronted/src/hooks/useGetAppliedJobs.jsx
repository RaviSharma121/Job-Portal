import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch , useSelector} from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);


    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
            const token = localStorage.getItem('authToken'); // Ensure the token is stored securely

                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, 
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}` // Include Bearer token
                        },
                        withCredentials:true
                }
                );
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 401) {
                    // Optional: Clear jobs or handle unauthorized case
                    dispatch(setAllAppliedJobs([])); // Clear jobs if unauthorized
                } else {
                    console.error("Failed to fetch jobs:", error);
                }
            }
        }
        fetchAppliedJobs();
    },[user])
};
export default useGetAppliedJobs;