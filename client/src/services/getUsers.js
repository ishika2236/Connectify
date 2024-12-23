const url = import.meta.env.VITE_API_URL;

const getUsers = async(search) =>
{
    try {
        const token = localStorage.getItem('token');
        console.log(`${url}/api/user/getUsers`);
        const response = await fetch(`${url}/api/user/getUsers?search=${search}`,{
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
            console.log("contacts fetched successfully", contactsData);
            return contactsData;
        }
        
    } catch (error) {
        console.log("error occured in fetching contacts", error);
        
    }
    
}
export default getUsers;
