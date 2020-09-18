import React from 'react';
import _ from 'lodash';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getFormattedDate } from 'utils/date-utils';
import classNames from 'classnames';
import { PencilSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const BlogCard = ({
  id, name, content, author, lastModified, status, onEdit, category,
}) => {
  const currentUser = useSelector((state) => state.getIn(['app', 'currentUser']));

  return (
    <Card className="article-card">
      <Card.Body>
        <Card.Title>
          <div>{category}</div>
          <div>
            { _.get(currentUser, '_id') === _.get(author, '_id')
            && (<PencilSquare className="edit-icon" onClick={() => onEdit(id)}/>)
            }
            <div className={classNames('dot status', { Published: status === 'Published' })} ></div>
          </div>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
        <Card.Text>
          <div>{content}</div>
        </Card.Text>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="footer">
            <span>{_.get(author, 'username')}</span>
            <span>{getFormattedDate(lastModified)}</span>
          </ListGroupItem>
        </ListGroup>

      </Card.Body>
    </Card>
  );
};

export default BlogCard;
