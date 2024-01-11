import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { findGroupContatcs } from 'src/store/contactsSlice';

export const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const { foundGroup, foundGroupContacts } = useAppSelector(
    (state) => state.allContacts
  );

  useEffect(() => {
    if (groupId) {
      dispatch(findGroupContatcs({ groupId }));
    }
  }, [dispatch, groupId]);

  return (
    <Row className='g-4'>
      {foundGroup ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className='mx-auto'>
                <GroupContactsCard groupContacts={foundGroup} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className='g-4'>
              {foundGroupContacts.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
};
