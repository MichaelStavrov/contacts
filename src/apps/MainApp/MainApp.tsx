import React, { useEffect } from 'react';
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
import { store } from 'src/store';

export const MainApp = () => {
  const { getContatcs, getGroups } = store;

  useEffect(() => {
    getContatcs();
    getGroups();
  }, [getContatcs, getGroups]);

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
