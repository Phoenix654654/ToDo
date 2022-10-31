import React, {useState} from 'react';
import styles from './ListBlock.module.css';
import { BsFillTrashFill, BsTagsFill, } from "react-icons/bs";


function ListBlock({ tasks, setTasks, status, modalShow, setModalShow, setModalShowObj, setCheckPriority, setCheckTags,  }) {
  const successHandler = (id) => {    //выполнено task или нет 
    setTasks(tasks.map((el) => {
      if (el.id === id) {
        return { ...el, success: !el.success, pending: !el.pending, }
      } else {
        return el
      }
    }))
  };
  const delTask = (id) => {     //удаление елемента
    setTasks(tasks.filter((elem) => {
      return elem.id !== id
    }))
  };
  const [isTagOpen, setIsTagOpen] = useState(false)

  return (
    <div className={styles.list}>
      {tasks.filter((item) => {
        if (status === 'Pending') {
          return item.pending
        } else if (status === 'Success') {
          return item.success
        } else {
          return item
        }
      }).map((item) => (
        <div style={{ opacity: item.success ? '50%' : '100%', cursor: 'pointer', position: 'relative', }} className={styles.content} key={item.id} onClick={() => {
          setModalShowObj(item);
          setCheckPriority(item.priority);
          setCheckTags(item.tags);
          setModalShow(true);
        }}>
          <div className={styles.left}>
            <p style={{ textDecoration: item.success ? 'green line-through' : 'none', }} className={styles.text}>{item.title}</p>
          </div>
          <div className={styles.right}>
            <div className={styles.priority}>
              <div style={{background: item.priority === 'High' ? 'red' : item.priority === 'Medium' ? 'gold' : item.priority === 'Low' ? 'blue' : 'black', }} className={styles.circle}></div>
              <span className={styles.prior}>{item.priority}</span>
            </div>
            <div className={styles.priority}>
              <span className={styles.icon} onClick={(e) => {
                e.stopPropagation();
                setIsTagOpen(!isTagOpen)
              }}><BsTagsFill /></span>
              <span className={styles.date}>{item.date}</span>
            </div>
            <div className={styles.priority} onClick={(e) => e.stopPropagation()}>
              <input type="checkbox" className={styles.input} checked={item.success} onChange={(e) => successHandler(item.id)} />
              <span className={styles.trash} onClick={(e) => delTask(item.id)} ><BsFillTrashFill /></span>
            </div>
          </div>
          <div className={styles.tagsPopup} onClick={(e) => {
            e.stopPropagation();
            setIsTagOpen(false);
          }} style={{display: isTagOpen ? 'block' : 'none', }}>
            <div className={styles.tagsPopupTop}>
              <span><BsTagsFill /></span>
              <h4>Tags</h4>
            </div>
            {
              item.tags.length ? <ul>
                {item.tags.map((item) => (
                  <li>{item}</li>
                ))}
              </ul> : <p style={{marginTop: '12px'}}>No tags attached</p>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListBlock