import { GlobalStyle } from "./GlobalStyle";
import { Section } from "./Section/Section";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter";
import { useEffect, useState } from "react";

const localStorageKey = 'contacts'

const getContacts = () => {
      const savedContacts = localStorage.getItem(localStorageKey)

      if (savedContacts !== null) {
         return JSON.parse(savedContacts)
      }
      return [];
}
   
export const App = () => {
   const [filter, setFilter] = useState('')
   const [contacts, setContact] = useState(getContacts)

// Запис  контакту в locale storage 
   useEffect(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(contacts))
   }, [contacts ])

   const addContact = newName => {
      if (
         contacts.map(contact => contact.name).includes(newName.name)
      ) {
         alert(`${newName.name} is already in contacts`);
      } else {
         setContact(prevState => [...prevState, newName])
      }
  };
const changeFilter = newFilter => {
    setFilter(newFilter);
  };
   const deleteContact = id => {
    setContact(prevState => prevState.filter(contact => contact.id !== id))
  };

   const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <GlobalStyle />

        <Section title="Phonebook">
          <ContactForm addContact={addContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDelete={deleteContact}
          />
        </Section>
      </div>
    );
  }
