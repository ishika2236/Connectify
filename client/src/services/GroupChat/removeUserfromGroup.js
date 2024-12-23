const token = localStorage.getItem('token');
const url = import.meta.env.VITE_API_URL;

const removeUserFromGroup = async (chatId, userId) => {

    
    const response = await fetch(`${url}/api/chat/group/removeMember`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({chatId, userId}),
        mode: 'cors',
    });
    console.log(response);
    

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error || 'Failed to remove user from group'}`);
    }
    const data = await response.json();
   

    return data;
};

export default removeUserFromGroup;
