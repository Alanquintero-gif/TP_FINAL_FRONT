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
              },
              {
                id: 5,
                name: 'Alejandra Pizarnik',
                last_time_connected: '16:01',
                img: "https://www.cultura.gob.ar/media/uploads/alejandra-pizarnik.jpeg",
                last_message: {
                  id: 5,
                  text: 'Yo moriría por vos. Vos, ¿vivirías por mi?'
                },
                unread_messages: 0
              },
              {
                id: 6,
                name: 'Rodolfo Walsh',
                last_time_connected: '12:33',
                img: "https://www.unter.org.ar/wp-content/uploads/2019/01/50133383_10155677221257691_8654150791231176704_n.jpg",
                last_message: {
                  id: 6,
                  text: 'Sólo un débil mental puede no desear la paz'
                },
                unread_messages: 3
              },
              {
                id: 7,
                name: 'José Hernández',
                last_time_connected: '11:11',
                img: "https://upload.wikimedia.org/wikipedia/commons/2/22/Jos%C3%A9_Hern%C3%A1ndez_restored.jpg",
                last_message: {
                  id: 7,
                  text: 'Los hermanos sean unidos...'
                },
                unread_messages: 0
              },
              {
                id: 8,
                name: 'Sarmiento',
                last_time_connected: '19:45',
                img: "https://www.vallemaria.gob.ar/sites/default/files/styles/imagen_destacada/public/sarmiento_01.jpg?itok=CWm3qQ3v",
                last_message: {
                  id: 8,
                  text: 'Todos los problemas son problemas de educación. '
                },
                unread_messages: 1
              },
              {
                id: 9,
                name: 'Oliverio Girondo',
                last_time_connected: '10:02',
                img: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Oliverio_girondo.jpg",
                last_message: {
                  id: 9,
                  text: 'la costumbre nos teje diariamente una telaraña en las pupilas.'
                },
                unread_messages: 2
              },
              
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