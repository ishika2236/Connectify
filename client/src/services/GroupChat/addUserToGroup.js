const token = localStorage.getItem('token');
const url = import.meta.env.VITE_API_URL;

const addUserToGroup = async (chatId, userIds) => {
    console.log(chatId, userIds);
    
    const response = await fetch(`${url}/api/chat/group/addMember`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({chatId, userIds}),
        mode: 'cors',
    });
    console.log(response);
    

    if (!response.ok) {
        throw new Error(`Error: ${response.message}`);
    }
    const data = await response.json();
   

    return data;
};

export default addUserToGroup;
