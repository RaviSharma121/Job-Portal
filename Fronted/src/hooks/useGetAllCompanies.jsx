import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
            const token = localStorage.getItem('authToken'); // Ensure the token is stored securely

                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,
                    {
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}` // Include Bearer token
                        },
                        withCredentials:true
                }
                );
                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                // console.log(error);
                if (error.response && error.response.status === 401) {
                    // Optional: Clear jobs or handle unauthorized case
                    dispatch(setCompanies([])); // Clear jobs if unauthorized
                } else {
                    console.error("Failed to fetch jobs:", error);
                }
            }
        }
        fetchCompanies();
    },[user])
}

export default useGetAllCompanies