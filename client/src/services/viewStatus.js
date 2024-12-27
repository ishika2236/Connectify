const url = import.meta.env.VITE_API_URL;

const viewStatus = async( statusId) =>
{
    
    try {
        const token = localStorage.getItem('token');
       
        const response = await fetch(`${url}/api/status/viewStatus/${statusId}`,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            
        });
        return response.json();
        
    } catch (error) {
        console.log("error occured in fetching contacts", error);
        
    }
    
}
export default viewStatus;
