const token = localStorage.getItem('token');
const url = import.meta.env.VITE_API_URL;

const deleteChat = async (chatId) => {
    console.log(chatId);
    
    const response = await fetch(`${url}/api/chat/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({chatId}),
        mode: 'cors',
    });
    console.log(response);
    

    if (!response.ok) {
        throw new Error(`Error: ${response.message}`);
    }
    const data = await response.json();
   

    return data;
};

export default deleteChat;
