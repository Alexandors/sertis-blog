import React, {Fragment, useState} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import _ from 'lodash';

const BlogForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  return (
    <Form>
      <Form.Group >
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Form.Group>
    </Form>
    );
}


export default BlogForm;
