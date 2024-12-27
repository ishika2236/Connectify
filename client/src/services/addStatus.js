const url = import.meta.env.VITE_API_URL;

const addStatus = async (mediaCaptions) => {
  try {
    console.log('media captions: ', mediaCaptions);
    
    const token = localStorage.getItem('token');
    const formData = new FormData();


    mediaCaptions.forEach((item, index) => {
      formData.append(`captions`, item.caption);
    //   item.media.forEach((file, fileIndex) => {
        formData.append(`files`, item.file); 
    //   });
    });

    
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
    throw error;
  }
};

export default addStatus;
