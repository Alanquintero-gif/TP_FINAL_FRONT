import { createContext, useState } from "react";



export const ContactContext = createContext({
    contacts: []
})

const ContactContextProvider = ({children}) => {
    const [contacts, setContacts] = useState(
        [
            {
                id: 1,
                name: 'Jorge Luis Borges',
                last_time_connected: '14:19',
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Borges_1921.jpg/250px-Borges_1921.jpg",
                last_message: {
                  id: 1,
                  text: 'Uno no es lo que es por lo que escribe, sino por lo que ha leído.'
                },
                unread_messages: 2
              },
              {
                id: 2,
                name: 'Julio Cortázar',
                last_time_connected: '15:03',
                img: "https://upload.wikimedia.org/wikipedia/commons/1/19/Cort%C3%A1zar.jpg",
                last_message: {
                  id: 2,
                  text: 'Lo malo es eso que llaman despertarse.'
                },
                unread_messages: 0
              },
              {
                id: 3,
                name: 'Alfonsina Storni',
                last_time_connected: '13:22',
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMnkSL3ekHD60UEJRtOryF3vZeRKJYz3v7aQ&s",
                last_message: {
                  id: 3,
                  text: 'Hombre pequeñito...'
                },
                unread_messages: 4
              },
              {
                id: 4,
                name: 'Roberto Arlt',
                last_time_connected: '18:47',
                img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/RobertoArlt.jpg",
                last_message: {
                  id: 4,
                  text: 'El futuro es nuestro por prepotencia de trabajo.'
                },
                unread_messages: 1
              }
              
        ]
    )


    return (
        <ContactContext.Provider
            value={
                {
                    contacts: contacts
                }
            }
        >
            {children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider