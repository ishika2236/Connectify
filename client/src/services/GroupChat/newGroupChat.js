const token = localStorage.getItem('token');
const url = import.meta.env.VITE_API_URL;

const newGroupChat = async (formData) => {
    const response = await fetch(`${url}/api/chat/group/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
        mode: 'cors',
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.message}`);
    }

    return response.json(); 
};

export default newGroupChat;
