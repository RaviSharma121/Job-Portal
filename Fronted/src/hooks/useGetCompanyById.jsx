import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
            const token = localStorage.getItem('authToken'); // Ensure the token is stored securely

                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}` // Include Bearer token
                        },
                        withCredentials:true
                });
                console.log(res.data.company);
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 401) {
                    // Optional: Clear jobs or handle unauthorized case
                    dispatch(setSingleCompany(null)); // Clear jobs if unauthorized
                } else {
                    console.error("Failed to fetch jobs:", error);
                }
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch , user , useSelector])
}

export default useGetCompanyById