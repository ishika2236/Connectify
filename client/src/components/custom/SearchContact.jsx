import React from 'react'
import { useEffect, useState } from 'react'
import { Popover, PopoverRoot } from '@chakra-ui/react'
import {
    PopoverBody,
    PopoverContent,
    PopoverTitle,
    PopoverTrigger,
  } from "./../ui/popover"
import { Input } from '@chakra-ui/react'
import getContact from '../../services/getContacts'
import { div } from 'framer-motion/client'

const SearchContact = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(async () => {
    const contactsList = await getContact();
    setContacts(contactsList.users);

  },[])
  
  return (
    <div>
        <PopoverContent>
            <PopoverBody>
                <PopoverTitle className='flex justify-items-center items-center'>
                  <div className="searchTitle">
                    Search Contact
                  </div>
                   
                </PopoverTitle>
                <div className="searchContactInput">
                  <Input placeholder='name...'/>

                </div>
                {contacts.length > 0 ? (
                  contacts.map((contact, index)=> (
                    <div className="contact-section flex justify-between"  key={index} >
                      <div className="name">
                        {contact.username}
                      </div>
                      <div className="+">+</div>
                    </div>
                  ))

                ): (
                  <div>No contacts found</div>
                )}
                
            </PopoverBody>
        </PopoverContent>
        
    </div>
  )
}

export default SearchContact