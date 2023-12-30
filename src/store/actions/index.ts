import { FilterFormValues } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const FILTER_CONTACTS = 'FILTER_CONTACTS';
export const FIND_CONTACT = 'FIND_CONTACT';
export const FIND_GROUP_CONTACTS = 'FIND_GROUP_CONTACTS';
export const RESET_CONTACT = 'RESET_CONTACT';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';

interface FilterContactsAction {
  type: typeof FILTER_CONTACTS;
  payload: Partial<FilterFormValues>;
}

interface FindContactAction {
  type: typeof FIND_CONTACT;
  payload: { id: ContactDto['id'] };
}

interface FindGroupContactsAction {
  type: typeof FIND_GROUP_CONTACTS;
  payload: { groupId: GroupContactsDto['id'] };
}

interface ResetContactAction {
  type: typeof RESET_CONTACT;
}

interface AddToFavoriteAction {
  type: typeof ADD_TO_FAVORITE;
  payload: { id: ContactDto['id'] };
}

interface RemoveFromFavoriteAction {
  type: typeof REMOVE_FROM_FAVORITE;
  payload: { id: ContactDto['id'] };
}

export const filterContactsActionCreator = (
  fv: Partial<FilterFormValues>
): FilterContactsAction => {
  return { type: FILTER_CONTACTS, payload: fv };
};

export const findContactActionCreator = (
  id: ContactDto['id']
): FindContactAction => {
  return { type: FIND_CONTACT, payload: { id } };
};

export const findGroupContactsActionCreator = (
  groupId: GroupContactsDto['id']
): FindGroupContactsAction => {
  return { type: FIND_GROUP_CONTACTS, payload: { groupId } };
};

export const resetContactActionCreator = (): ResetContactAction => {
  return { type: RESET_CONTACT };
};

export const addToFavoriteActionCreator = (
  id: ContactDto['id']
): AddToFavoriteAction => {
  return {
    type: ADD_TO_FAVORITE,
    payload: { id },
  };
};

export const removeFromFavoriteActionCreator = (
  id: ContactDto['id']
): RemoveFromFavoriteAction => {
  return {
    type: REMOVE_FROM_FAVORITE,
    payload: { id },
  };
};

export type ProjectActions =
  | FilterContactsAction
  | FindContactAction
  | ResetContactAction
  | AddToFavoriteAction
  | RemoveFromFavoriteAction
  | FindGroupContactsAction;
