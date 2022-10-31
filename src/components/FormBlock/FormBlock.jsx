import React, { useState, } from 'react';
import styles from './FormBlock.module.css';
import {InputGroup, Form, Button} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

function FormBlock({ tasks, setTasks, }) {
  const [title, setTitle] = useState('')     //поучение input value

  const toDate = (date) => {        //получение даты
    return new Intl.DateTimeFormat('en-En', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(date))
  };
  const addTasks = () => {       //добавление форм в form block от кнопки
    if(title.trim().length) {
      setTasks([...tasks, {
        id: uuidv4(),
        title: title,
        date: toDate(new Date()),
        priority: 'None',
        success: false,
        pending: true,
        description: '',
        tags: []
      },]);
      setTitle('');
    }
  };
  const addTasks2 = (e) => {       //добавление форм в form block от нажатия Enter
    if(e.key === 'Enter' && title.trim().length) {
      setTasks([...tasks, {
        id: uuidv4(),
        title: title,
        date: toDate(new Date()),
        priority: 'None',
        success: false,
        pending: true,
        description: '',
        tags: []
      },]);
      setTitle('');
    }
  };

  return (
    <div className={styles.form}>
      <InputGroup className="mb-3">
        <Form.Control
          onKeyPress={addTasks2}
          value={title}
          placeholder="Enter new TODO"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => {setTitle(e.target.value)}}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={() => addTasks()} >
          Button
        </Button>
      </InputGroup>
    </div>
  )
}

export default FormBlock