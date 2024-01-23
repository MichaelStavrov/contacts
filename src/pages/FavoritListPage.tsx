import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { store } from 'src/store';

export const FavoritListPage = observer(() => {
  const { favoriteContacts } = store;

  return (
    <Row xxl={4} className='g-4'>
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
