const url = import.meta.env.VITE_API_URL
const sendMessage = async(content, chatId, file) => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('content', content);
        formData.append('chatId', chatId);
        if (file) {
            formData.append('file', file);
            formData.append('mediaType', file.type);
        }

        const response = await fetch(`${url}/api/message`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        const result = await response.json()
        console.log(result);
        return result;

    } catch (error) {
        console.log("Error occurred in fetching contacts", error);
    }
};
export default sendMessage;
