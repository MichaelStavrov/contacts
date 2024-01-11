import React from 'react';
import './MainApp.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import {
  ContactListPage,
  GroupPage,
  ContactPage,
  FavoritListPage,
  GroupListPage,
} from 'src/pages';
import {
  useGetContactsQuery,
  useGetGroupsQuery,
} from 'src/store/contactsSlice';

export const MainApp = () => {
  useGetContactsQuery();
  useGetGroupsQuery();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ContactListPage />} />
          <Route path='contact'>
            <Route index element={<ContactListPage />} />
            <Route path=':contactId' element={<ContactPage />} />
          </Route>
          <Route path='groups'>
            <Route index element={<GroupListPage />} />
            <Route path=':groupId' element={<GroupPage />} />
          </Route>
          <Route path='favorit' element={<FavoritListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
