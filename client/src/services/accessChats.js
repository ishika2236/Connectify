const url = import.meta.env.VITE_API_URL;

const accessChats = async( userId) =>
{
    
    try {
        const token = localStorage.getItem('token');
        // console.log(`${url}/api/chats/`);
        const response = await fetch(`${url}/api/chat`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: userId })
        });
        return response.json();
        
    } catch (error) {
        console.log("error occured in fetching contacts", error);
        
    }
    
}
export default accessChats;
