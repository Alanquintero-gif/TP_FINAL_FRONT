import React, { useContext } from 'react'
import { ContactContext } from '../../Context/ContactContext'
import ContactsList from '../../Components/ContactList/ContactsList'

export default function ContactScreen() {
    const {contacts} = useContext(ContactContext)
    
    return (
        <div>
            <ContactsList/>
        </div>
    )
}