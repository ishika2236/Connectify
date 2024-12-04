import React from 'react'
import { useEffect, useState } from 'react'
import { Popover, PopoverRoot } from '@chakra-ui/react'
import {
    PopoverBody,
    PopoverContent,
    PopoverTitle,
    PopoverTrigger,
  } from "./../ui/popover"
import { Input, Button } from '@chakra-ui/react'
import { Toaster, toaster } from "../ui/toaster"
import getUsers from '../../services/getContacts'
import { div, title } from 'framer-motion/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faRocketchat } from '@fortawesome/free-brands-svg-icons'
const SearchContact = () => {
  const [contacts, setContacts] = useState([]);
  // useEffect(async () => {
  //   const contactsList = await getContact();
  //   // setContacts(contactsList.users);

  // },[])
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState("");
  const [loadingChat, setLoadingChat] = useState("");
  // const toast = useToast();
  const handleSearch =async ()=>{
    if(!search)
    {
      toaster.create(
        {
          description: "Please enter something in search.",
          type: "warning",
        }
      );
      return;
    }
    try {
      setLoading(true);
      const contactsData = await getUsers(search);
      setContacts(contactsData);
    } catch (error) {
      console.log(`Error incurred in fetching users `, error);
    }
  }
  return (

    <div>
      <Toaster />
        <PopoverContent className="bg-gray-medium border border-2 text-sm w-96 border-pink/75 rounded-lg z-10" >
            <PopoverBody>
                <PopoverTitle className='flex justify-items-center items-center'>
                  <div className="searchTitle pb-3 text-lg">
                    Search Contact
                  </div>
                   
                </PopoverTitle>
                <div className="searchContactInput flex pb-4" >
                  <Input 
                  placeholder='Search by name or email.'
                  mr={2}
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  className='p-2 border border-pink hover:border-blue'
                  />
                  <Button
                  onClick = {handleSearch}
                  className='text-md bg-pink'
                  >
                    Go
                  </Button>
                </div>
                {contacts.length > 0 ? (
                  contacts.map((contact, index)=> (
                    <div className="contact-section flex justify-between border border-pink mb-3 p-2 items-center rounded-md bg-gradient-to-r from-pink/75 to-blue/75"  key={index} >
                      <div className="name text-white">
                        {contact.name}
                      </div>
                      <div className="text-md p-1 px-2 rounded-full z-15 bg-pink/75 hover:bg-gray-light border-2 border-slate-500 hover:border-pink "> <FontAwesomeIcon icon={faPlus} /></div>
                    </div>
                  ))

                ): (
                  <div className='text-md'>No contacts found</div>
                )}
                
            </PopoverBody>
        </PopoverContent>
        
    </div>
  )
}

export default SearchContact