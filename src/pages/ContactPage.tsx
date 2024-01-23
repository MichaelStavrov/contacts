import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { store } from 'src/store';

export const ContactPage: FC = observer(() => {
  const { foundContact } = store;

  if (!foundContact) return <Empty />;

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        <ContactCard contact={foundContact} />
      </Col>
    </Row>
  );
});
