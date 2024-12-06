import { parse } from "postcss";

const url = import.meta.env.VITE_API_URL;

const getUserInfo = async(token)=>{
    const response = await fetch(`${url}/api/user/userInfo`, {
        method: 'GET',
        mode: 'cors',
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    const parsedResponse = await response.json();
    // console.log(parsedResponse);
    
    return parsedResponse;
}
export default getUserInfo;