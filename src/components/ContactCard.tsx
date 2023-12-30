import React, { memo } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/store/hooks';
import {
  removeFromFavoriteActionCreator,
  findContactActionCreator,
} from 'src/store/actions';
import { ReactComponent as FavoriteIcon } from 'src/assets/icons/favorite-icon.svg';
import { addToFavoriteActionCreator } from 'src/store/actions';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export const ContactCard = memo<ContactCardProps>(
  ({
    contact: { photo, id, name, phone, birthday, address, favorite },
    withLink,
  }) => {
    const dispatch = useAppDispatch();
    const handleIconClick = () => {
      if (favorite) {
        dispatch(removeFromFavoriteActionCreator(id));
      } else {
        dispatch(addToFavoriteActionCreator(id));
      }
    };

    return (
      <Card key={id}>
        <Card.Img variant='top' src={photo} />
        <Card.Body>
          <Card.Title>
            {withLink ? (
              <Link
                to={`/contact/${id}`}
                onClick={() => dispatch(findContactActionCreator(id))}
              >
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
