import { makeAutoObservable } from 'mobx';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { api } from './api';
import { updateFavoriteContacts } from 'src/utils/updateFavoriteContacts';
import { updateFavoriteContactsAfterRomve } from 'src/utils/updateFavoriteContactsAfterRomve';

interface Store {
  contacts: ContactDto[];
  getContatcs: () => void;
  groups: GroupContactsDto[];
  getGroups: () => void;
  filteredContacts: ContactDto[];
  filterContacts: (data: {
    name?: string;
    groupId?: GroupContactsDto['id'];
  }) => void;
  findContact: (id: string) => void;
  foundContact: ContactDto | null;
  addToFavorite: (id: string) => void;
  favoriteContacts: ContactDto[];
  foundGroup: GroupContactsDto | null;
  foundGroupContacts: ContactDto[];
  removeFromFavorite: (id: string) => void;
  findGroupContatcs: (id: string) => void;
}

export const store = makeAutoObservable<Store>({
  contacts: [],
  groups: [],
  filteredContacts: [],
  foundContact: null,
  favoriteContacts: [],
  foundGroup: null,
  foundGroupContacts: [],
  *getContatcs() {
    const data: ContactDto[] = yield api.fetchContatcs();

    store.contacts = data;
    store.filteredContacts = data;
  },
  *getGroups() {
    const data: GroupContactsDto[] = yield api.fetchGroups();

    store.groups = data;
  },

  filterContacts({
    name,
    groupId,
  }: {
    name?: string;
    groupId?: GroupContactsDto['id'];
  }) {
    const filterByName = (name: string) => {
      const fvName = name.toLowerCase();
      store.filteredContacts = store.contacts.filter(({ name }) =>
        name.toLowerCase().includes(fvName)
      );
    };

    if (name !== undefined && !groupId) {
      filterByName(name);
    } else if (groupId !== undefined) {
      const groupContacts = store.groups.find(({ id }) => id === groupId);

      if (groupContacts) {
        store.filteredContacts = store.contacts.filter(({ id }) =>
          groupContacts.contactIds.includes(id)
        );
      }

      if (name) {
        filterByName(name);
      }
    }
  },

  findContact(id: string) {
    store.foundContact =
      store.contacts.find((contact) => contact.id === id) ?? null;
  },

  addToFavorite(id: string) {
    const favoriteContact = store.contacts.find((contact) => contact.id === id);

    if (favoriteContact) {
      store.favoriteContacts.push({ ...favoriteContact, favorite: true });
    }

    const [newContacts, newFilteredContacts, foundGroupContacts] = [
      store.contacts,
      store.filteredContacts,
      store.foundGroupContacts,
    ].map((data) => updateFavoriteContacts(data, id));

    store.contacts = newContacts;
    store.filteredContacts = newFilteredContacts;
    store.foundGroupContacts = foundGroupContacts;
  },

  removeFromFavorite(id: string) {
    const newFavoriteContacts = store.favoriteContacts.filter(
      (contact) => contact.id !== id
    );

    const [filteredContactsNew, contactsNew, foundGroupContactsNew] = [
      store.filteredContacts,
      store.contacts,
      store.foundGroupContacts,
    ].map((data) => updateFavoriteContactsAfterRomve(data, id));

    store.filteredContacts = filteredContactsNew;
    store.contacts = contactsNew;
    store.foundGroupContacts = foundGroupContactsNew;
    store.favoriteContacts = newFavoriteContacts;
  },

  findGroupContatcs(groupId: string) {
    const foundGroup = store.groups.find(({ id }) => id === groupId) ?? null;

    if (foundGroup) {
      store.foundGroupContacts = store.contacts.filter(({ id }) =>
        foundGroup.contactIds.includes(id)
      );
    }

    store.foundGroup = foundGroup;
  },
});
