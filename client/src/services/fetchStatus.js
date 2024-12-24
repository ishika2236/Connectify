const url = import.meta.env.VITE_API_URL;

const fetchStatus = async () => {
    try {
        const token = localStorage.getItem('token');

        
        const response = await fetch(`${url}/api/status/fetch`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`, 
                
            },
        });

      
        return response.json();
    } catch (error) {
        console.log("Error occurred while adding status", error);
    }
};

export default fetchStatus;
