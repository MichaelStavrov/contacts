import { ContactDto } from 'src/types/dto/ContactDto';

export const updateFavoriteContacts = (
  contacts: ContactDto[],
  id: ContactDto['id']
) => {
  return contacts.map((contact) =>
    contact.id === id ? { ...contact, favorite: true } : contact
  );
};
