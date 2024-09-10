import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
            const token = localStorage.getItem('authToken'); // Ensure the token is stored securely
                    // console.log(token);
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}` // Include Bearer token
                        },
                        withCredentials:true
                }
                );
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 401) {
                    // Optional: Clear jobs or handle unauthorized case
                    dispatch(setAllAdminJobs([])); // Clear jobs if unauthorized
                } else {
                    console.error("Failed to fetch jobs:", error);
                }
            }
        }
        fetchAllAdminJobs();
    },[user])
}

export default useGetAllAdminJobs