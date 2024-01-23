import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { store } from 'src/store';
import { observer } from 'mobx-react-lite';

export const GroupPage = observer(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { foundGroup, foundGroupContacts, findGroupContatcs } = store;

  useEffect(() => {
    if (groupId) {
      findGroupContatcs(groupId);
    }
  }, [findGroupContatcs, groupId]);

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
});
