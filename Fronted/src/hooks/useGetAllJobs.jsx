import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    const { user } = useSelector(store => store.auth);

    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
            const token = localStorage.getItem('authToken'); // Ensure the token is stored securely
            console.log(token);

                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}` // Include Bearer token
                        },
                        withCredentials:true
                }
                );
                // console.log(token);
                // console.log(res);
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 401) {
                    // Optional: Clear jobs or handle unauthorized case
                    dispatch(setAllJobs([])); // Clear jobs if unauthorized
                } else {
                    console.error("Failed to fetch jobs:", error);
                }
            }
        }
        fetchAllJobs();
    },[user])
}

export default useGetAllJobs