const url = import.meta.env.VITE_API_URL;

const getContact = async() =>
{
    try {
        const token = localStorage.getItem('token');
        console.log(`${url}/api/user/getContacts`);
        const response = await fetch(`${url}/api/user/getContacts`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
        if(response.ok)
        {
            const contactsData = response.json();
            // console.log("contacts fetched successfully", contactsData);
            return contactsData;
        }
        
    } catch (error) {
        console.log("error occured in fetching contacts", error);
        
    }
    
}
export default getContact;
