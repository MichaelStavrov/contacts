import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import {
  ADD_TO_FAVORITE,
  FILTER_CONTACTS,
  FIND_CONTACT,
  FIND_GROUP_CONTACTS,
  REMOVE_FROM_FAVORITE,
  RESET_CONTACT,
} from '../actions';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { ProjectActions } from '../actions';
import { updateFavoriteContactsAfterRomve } from 'src/utils/updateFavoriteContactsAfterRomve';
import { updateFavoriteContacts } from 'src/utils/updateFavoriteContacts';

interface AllContactsState {
  contacts: ContactDto[];
  groups: GroupContactsDto[];
  filteredContacts: ContactDto[];
  foundContact: ContactDto | null;
  favoriteContacts: ContactDto[];
  foundGroup: GroupContactsDto | null;
  foundGroupContacts: ContactDto[];
}

const initialState: AllContactsState = {
  contacts: DATA_CONTACT,
  filteredContacts: DATA_CONTACT,
  groups: DATA_GROUP_CONTACT,
  foundContact: null,
  favoriteContacts: [],
  foundGroup: null,
  foundGroupContacts: [],
};

export const allContactsReducer = (
  state = initialState,
  action: ProjectActions
): AllContactsState => {
  switch (action.type) {
    case FILTER_CONTACTS:
      const { name, groupId } = action.payload;

      let filteredContacts: ContactDto[] = state.contacts;

      if (name) {
        const fvName = name.toLowerCase();
        filteredContacts = filteredContacts.filter(({ name }) =>
          name.toLowerCase().includes(fvName)
        );
      }

      if (groupId) {
        const groupContacts = state.groups.find(({ id }) => id === groupId);

        if (groupContacts) {
          filteredContacts = filteredContacts.filter(({ id }) =>
            groupContacts.contactIds.includes(id)
          );
        }
      }

      return {
        ...state,
        filteredContacts,
      };

    case FIND_CONTACT:
      const foundContact =
        state.contacts.find(({ id }) => id === action.payload.id) ?? null;

      return {
        ...state,
        foundContact,
      };

    case RESET_CONTACT:
      return {
        ...state,
        foundContact: null,
      };

    case ADD_TO_FAVORITE:
      let favoriteContacts = state.favoriteContacts;
      const favoriteContact = state.contacts.find(
        ({ id }) => id === action.payload.id
      );

      if (favoriteContact) {
        favoriteContacts.push({ ...favoriteContact, favorite: true });
      }

      const [newContacts, newFilteredContacts, foundGroupContacts] = [
        state.contacts,
        state.filteredContacts,
        state.foundGroupContacts,
      ].map((data) => updateFavoriteContacts(data, action.payload.id));

      return {
        ...state,
        contacts: newContacts,
        filteredContacts: newFilteredContacts,
        favoriteContacts,
        foundGroupContacts,
      };

    case REMOVE_FROM_FAVORITE:
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

      return {
        ...state,
        contacts: contactsNew,
        filteredContacts: filteredContactsNew,
        favoriteContacts: newFavoriteContacts,
        foundGroupContacts: foundGroupContactsNew,
      };

    case FIND_GROUP_CONTACTS:
      const foundGroup =
        state.groups.find(({ id }) => id === action.payload.groupId) ?? null;
      let newFoundGroupContacts = state.foundGroupContacts;

      if (foundGroup) {
        newFoundGroupContacts = state.contacts.filter(({ id }) =>
          foundGroup.contactIds.includes(id)
        );
      }

      return {
        ...state,
        foundGroup,
        foundGroupContacts: newFoundGroupContacts,
      };

    default:
      break;
  }

  return state;
};
