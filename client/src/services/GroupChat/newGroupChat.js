const token = localStorage.getItem('token');
const url = import.meta.env.VITE_API_URL;

const newGroupChat = async (form) => {
    const formData = new FormData();
    console.log("form: ", form);
    
    formData.append('name', form.name);
    formData.append('users', JSON.stringify(form.users)); 
    formData.append('description', form.description);
    if (form.picUrl) {
        formData.append('picUrl', form.picUrl); 
    }
    console.log('formData: ', formData);
    
    const response = await fetch(`${url}/api/chat/group/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
        mode: 'cors',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    return response.json(); 
};




export default newGroupChat;
