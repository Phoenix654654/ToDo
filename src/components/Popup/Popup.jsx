import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import styles from './Popup.module.css'
import { BsTagsFill, } from 'react-icons/bs'
import { FiEdit, } from 'react-icons/fi'

const MyVerticallyCenteredModal = (props) => {
  const priority = ['High', 'Medium', 'Low', 'None', ];     // приорити тегс 
  const saveChangesHandler = (id) => {
    props.setTasks(props.tasks.map((item) => {   // изменение и сохранение приорити у таска
      if (id === item.id) {
        return {...item, priority: props.checkPriority, title: title.length ? title : item.title, description: description.length ? description : item.description, tags: props.checkTags, }
      } else {
        return item
      }
    }));
    props.onHide()
  }
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['Work', 'Home', 'Personal']);
  const [addTag, setAddTag] = useState('') // добавление тега в попапе
  const createTag = (e) => {
    if (e.key === 'Enter' && addTag.trim().length) {
      if (tags.includes(addTag)) {
        alert('Такой тег ужу есть')
      } else {
        setTags([...tags, addTag]);
      }
      e.target.value = '';
      setAddTag();
    } 
  }
  const delTag = (name) => {
    setTags(tags.filter((el) => el !== name))
  }
  const checkTagsHandler = (tag) => {
    if (props.checkTags.includes(tag)) {
      props.setCheckTags(props.checkTags.filter((el) => {
        return el !== tag
      }))
    } else {
      props.setCheckTags([...props.checkTags, tag])
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.titleBlock}> 
          {
            props.isTitleChange ? <input type="text" defaultValue={props.modalShowObj.title} onChange={(e) => setTitle(e.target.value)} className={styles.titleInput} /> 
            : <>
              <h4 className={styles.title}>{props.modalShowObj.title}</h4>
              <span onClick={() => props.setIsTitleChange(true)} className={styles.btn}>
                <FiEdit/>
              </span>
            </>
          }
        </div>
        <div className={styles.descriptionBlock}>
          {
            props.isDescription ? <textarea className={styles.textarea} onChange={(e) => setDescription(e.target.value)} defaultValue={props.modalShowObj.description}/> : <div className={styles.descriptionContent}>
              <p>
                {props.modalShowObj.description}
              </p>
              <span className={styles.addDescr} onClick={() => props.setIsDescription(true)} >{props.modalShowObj.description.lenght ? 'Edit ' : 'Add '} description </span>
            </div>
          }
        </div>
        <div className={styles.buttons}>
          <Button style={{width: '40%', }} className={props.action === 'priority' ? 'active' : ''} variant="outline-info" onClick={() => props.setAction('priority')}>!!! Priority</Button>
          <Button style={{ width: '40%', }} className={props.action === 'tags' ? 'active' : ''} variant="outline-info" onClick={() => props.setAction('tags')}><span><BsTagsFill /></span> Tag</Button>
        </div>
        <div className={styles.priority}>
          {
            props.action === 'priority' ? 
            priority.map((item) => ( 
              <Form.Check type='radio' id={`check-api-${item}`} style={{ display: 'flex', alignItems: 'center', columnGap: '10px', }}>
                <Form.Check.Input checked={item === props.checkPriority} onChange={() => props.setCheckPriority(item)} name='priority' type='radio' isValid />
                <Form.Check.Label style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{color: item === 'High' ? 'red' : item === 'Medium' ? 'gold' : item === 'Low' ? 'blue' : 'black',
                  width: '30px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', 
                  }}>
                    {`${item === 'High' || item === 'None' ? '!!!' : item === 'Medium' ? '!!' : '!'}`}
                  </span>{`${item} priority`}</Form.Check.Label>
              </Form.Check>
            ))
            : props.action === 'tags' ? 
            <>
              <Form.Control type="text" placeholder='Create Tag' value={addTag} onChange={(e) => setAddTag(e.target.value)} onKeyPress={createTag} />
              {
              tags.map((item) => (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <div>
                    <BsTagsFill/>
                    <span style={{marginLeft: '10px', fontSize: '22px', }}>{item}</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', }}>
                    <input checked={props.checkTags.includes(item)} onChange={() => checkTagsHandler(item)} type="checkbox" style={{width: '25px', height: '25px'}} />
                    <span style={{marginLeft: '10px', cursor: 'pointer', alignSelf: 'center', }} onClick={() => delTag(item)}>X</span>
                  </div>
                </div>
              ))
              }
            </>
            
            
            
            : ''
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondery' onClick={props.onHide}>Close</Button>
        <Button variant="outline-primary" onClick={() => saveChangesHandler(props.modalShowObj.id)}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;