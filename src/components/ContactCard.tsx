import React, { memo } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as FavoriteIcon } from 'src/assets/icons/favorite-icon.svg';
import { store } from 'src/store';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export const ContactCard = memo<ContactCardProps>(
  ({
    contact: { photo, id, name, phone, birthday, address, favorite },
    withLink,
  }) => {
    const { removeFromFavorite, addToFavorite, findContact } = store;

    const handleIconClick = () => {
      if (favorite) {
        removeFromFavorite(id);
      } else {
        addToFavorite(id);
      }
    };

    return (
      <Card key={id}>
        <Card.Img variant='top' src={photo} />
        <Card.Body>
          <Card.Title>
            {withLink ? (
              <Link to={`/contact/${id}`} onClick={() => findContact(id)}>
                {name}
              </Link>
            ) : (
              name
            )}
            <FavoriteIcon
              fill={favorite ? 'red' : 'black'}
              style={{ cursor: 'pointer' }}
              onClick={handleIconClick}
            />
          </Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <Link to={`tel:${phone}`} target='_blank'>
                  {phone}
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  }
);
