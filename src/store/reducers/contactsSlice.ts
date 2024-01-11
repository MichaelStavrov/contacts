import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { updateFavoriteContacts } from 'src/utils/updateFavoriteContacts';
import { updateFavoriteContactsAfterRomve } from 'src/utils/updateFavoriteContactsAfterRomve';

interface ContactsState {
  contacts: ContactDto[];
  groups: GroupContactsDto[];
  filteredContacts: ContactDto[];
  foundContact: ContactDto | null;
  favoriteContacts: ContactDto[];
  foundGroup: GroupContactsDto | null;
  foundGroupContacts: ContactDto[];
}

const initialState: ContactsState = {
  contacts: DATA_CONTACT,
  filteredContacts: DATA_CONTACT,
  groups: DATA_GROUP_CONTACT,
  foundContact: null,
  favoriteContacts: [],
  foundGroup: null,
  foundGroupContacts: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterContacts(
      state,
      action: PayloadAction<{ name?: string; groupId?: GroupContactsDto['id'] }>
    ) {
      const { name, groupId } = action.payload;

      const filterByName = (name: string) => {
        const fvName = name.toLowerCase();
        state.filteredContacts = state.contacts.filter(({ name }) =>
          name.toLowerCase().includes(fvName)
        );
      };

      if (name !== undefined && !groupId) {
        filterByName(name);
      } else if (groupId !== undefined) {
        const groupContacts = state.groups.find(({ id }) => id === groupId);

        if (groupContacts) {
          state.filteredContacts = state.contacts.filter(({ id }) =>
            groupContacts.contactIds.includes(id)
          );
        }

        if (name) {
          filterByName(name);
        }
      }
    },

    findContact(state, action: PayloadAction<{ id: ContactDto['id'] }>) {
      state.foundContact =
        state.contacts.find(({ id }) => id === action.payload.id) ?? null;
    },

    addToFavorite(state, action: PayloadAction<{ id: ContactDto['id'] }>) {
      const favoriteContact = state.contacts.find(
        ({ id }) => id === action.payload.id
      );

      if (favoriteContact) {
        state.favoriteContacts.push({ ...favoriteContact, favorite: true });
      }

      const [newContacts, newFilteredContacts, foundGroupContacts] = [
        state.contacts,
        state.filteredContacts,
        state.foundGroupContacts,
      ].map((data) => updateFavoriteContacts(data, action.payload.id));

      state.contacts = newContacts;
      state.filteredContacts = newFilteredContacts;
      state.foundGroupContacts = foundGroupContacts;
    },

    removeFromFavorite(state, action: PayloadAction<{ id: ContactDto['id'] }>) {
      const newFavoriteContacts = state.favoriteContacts.filter(
        ({ id }) => id !== action.payload.id
      );

      const [filteredContactsNew, contactsNew, foundGroupContactsNew] = [
        state.filteredContacts,
        state.contacts,
        state.foundGroupContacts,
      ].map((data) =>
        updateFavoriteContactsAfterRomve(data, action.payload.id)
      );

      state.filteredContacts = filteredContactsNew;
      state.contacts = contactsNew;
      state.foundGroupContacts = foundGroupContactsNew;
      state.favoriteContacts = newFavoriteContacts;
    },

    findGroupContatcs(
      state,
      action: PayloadAction<{ groupId: GroupContactsDto['id'] }>
    ) {
      const foundGroup =
        state.groups.find(({ id }) => id === action.payload.groupId) ?? null;

      if (foundGroup) {
        state.foundGroupContacts = state.contacts.filter(({ id }) =>
          foundGroup.contactIds.includes(id)
        );
      }

      state.foundGroup = foundGroup;
    },
  },
});

export const {
  filterContacts,
  findContact,
  addToFavorite,
  removeFromFavorite,
  findGroupContatcs,
} = contactsSlice.actions;
