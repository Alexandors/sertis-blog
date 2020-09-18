import React from 'react';
import { Card } from 'react-bootstrap';

const BlogCard = ({name, content, author, key}) => {
  return (
    <Card key={key} className="article-card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{content}</Card.Text>
        {author}
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
