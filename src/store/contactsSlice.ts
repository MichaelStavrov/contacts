import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
  contacts: [],
  filteredContacts: [],
  groups: [],
  foundContact: null,
  favoriteContacts: [],
  foundGroup: null,
  foundGroupContacts: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<{ data: ContactDto[] }>) {
      state.contacts = action.payload.data;
      state.filteredContacts = action.payload.data;
    },

    setGroups(state, action: PayloadAction<{ data: GroupContactsDto[] }>) {
      state.groups = action.payload.data;
    },

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
  extraReducers(builder) {
    builder.addMatcher(
      contactsApiSlice.endpoints.getContacts.matchFulfilled,
      (state, action) => {
        state.contacts = action.payload;
        state.filteredContacts = action.payload;
      }
    );

    builder.addMatcher(
      groupsApiSlice.endpoints.getGroups.matchFulfilled,
      (state, action) => {
        state.groups = action.payload;
      }
    );
  },
});

export const contactsApiSlice = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mocki.io/v1',
  }),
  endpoints: (builder) => {
    return {
      getContacts: builder.query<ContactDto[], void>({
        query: () => ({ url: '/28d70659-c0aa-4b9c-ba07-da5923a0f8bd' }),
      }),
    };
  },
});

export const groupsApiSlice = createApi({
  reducerPath: 'groupsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mocki.io/v1',
  }),
  endpoints: (builder) => {
    return {
      getGroups: builder.query<GroupContactsDto[], void>({
        query: () => ({ url: '/b1530e5d-6c52-4f52-bd70-c36510854ab3' }),
      }),
    };
  },
});

export const {
  setContacts,
  setGroups,
  filterContacts,
  findContact,
  addToFavorite,
  removeFromFavorite,
  findGroupContatcs,
} = contactsSlice.actions;

export const { useGetContactsQuery } = contactsApiSlice;
export const { useGetGroupsQuery } = groupsApiSlice;
