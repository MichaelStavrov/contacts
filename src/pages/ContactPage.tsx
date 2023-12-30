import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useAppSelector } from 'src/store/hooks';

export const ContactPage: FC = () => {
  const { foundContact } = useAppSelector((state) => state.allContacts);

  if (!foundContact) return <Empty />;

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        <ContactCard contact={foundContact} />
      </Col>
    </Row>
  );
};
