const url = import.meta.env.VITE_API_URL;

const addStatus = async (media, caption) => {
    try {
        const token = localStorage.getItem('token');
        
        
        const formData = new FormData();
        
        
        formData.append('caption', caption);
        media.forEach(file => formData.append('files', file));

        
        const response = await fetch(`${url}/api/status/add`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`, 
                
            },
            body: formData, 
        });

      
        return response.json();
    } catch (error) {
        console.log("Error occurred while adding status", error);
    }
};

export default addStatus;
