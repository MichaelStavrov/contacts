import React from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { store } from 'src/store';

export const ContactListPage = observer(() => {
  const { filteredContacts } = store;

  return (
    <Row xxl={1}>
      <Col className='mb-3'>
        <FilterForm />
      </Col>
      <Col>
        <Row xxl={4} className='g-4'>
          {filteredContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
});
