const url = import.meta.env.VITE_API_URL;

const fetchChats = async( userId) =>
{
    
    try {
        const token = localStorage.getItem('token');
        // console.log(`${url}/api/chats/`);
        const response = await fetch(`${url}/api/chat`,{
            method: 'GET',
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
export default fetchChats;
