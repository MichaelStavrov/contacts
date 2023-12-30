import { ContactDto } from 'src/types/dto/ContactDto';

export const updateFavoriteContactsAfterRomve = (
  contacts: ContactDto[],
  id: ContactDto['id']
) => {
  return contacts.map((contact) =>
    contact.id === id ? { ...contact, favorite: false } : contact
  );
};
