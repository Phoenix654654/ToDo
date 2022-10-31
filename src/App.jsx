import React, { useEffect, useState, } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, } from 'react-bootstrap'
import StatusBlock from './components/StatusBlock/StatusBlock';
import FormBlock from './components/FormBlock/FormBlock';
import ListBlock from './components/ListBlock/ListBlock';
import MyVerticallyCenteredModal from './components/Popup/Popup';


function App() {
  const [modalShow, setModalShow] = useState(false); // это открытие моего окно попап
  const [modalShowObj, setModalShowObj] = useState({    // объект который я показываю в попапе
    id: null,
    title: '',
    success: null,
    pending: null,
    date: null,
    description: '',
    priority: '',
    tags: [],
  })
  const [tasks, setTasks] = useState([     // вся наша коллекция
    {
      id: 1,
      title: 'Hello',
      date: '19 jul',
      priority: 'Medium',
      success: false,
      pending: true,
      description: 'HELLO',
      tags: ['Home']
    },
  ]);
  const clearAll = () => { // очистка всех задач
    setTasks([])
  }
  const [status, setStatus] = useState('Total');  //статус отабражения коллекции
  const [checkPriority, setCheckPriority] = useState(''); //приоритет в попапе
  const [isTitleChange, setIsTitleChange] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [action, setAction] = useState('');   // отображение приорити и тегов
  const [checkTags, setCheckTags] = useState([]);  //приоритет в попапе тегов
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  return (
    <div className="app">
      <div className="container">
        <div className="app__content">
          <h1 className="title">TODO-LIST</h1>

          <StatusBlock tasks={tasks} setStatus={setStatus} />
          <FormBlock tasks={tasks} setTasks={setTasks} />

          {
            tasks.length === 0 && status === 'Total' ? <h2>Список задач пуст</h2> 
            : tasks.filter(el => el.pending).length === 0 && status === 'Pending' ? <h2>Список Pending пуст</h2> 
            : tasks.filter(el => el.success).length === 0 && status === 'Success' ? <h2>Список Success пуст</h2> 
            : <>
                <ListBlock setCheckTags={setCheckTags} setModalShowObj={setModalShowObj} tasks={tasks} setTasks={setTasks} status={status} modalShow={modalShow} setModalShow={setModalShow} setCheckPriority={setCheckPriority} />
                <Button className='app__clear' variant="dark" onClick={clearAll}>Clear All</Button>
              </>
          }
        </div>
      </div>
      <MyVerticallyCenteredModal
        tasks={tasks}
        setTasks={setTasks}
        modalShowObj={modalShowObj}
        show={modalShow}
        checkPriority={checkPriority}
        setCheckPriority={setCheckPriority}
        isTitleChange={isTitleChange}
        setIsTitleChange={setIsTitleChange}
        isDescription={isDescription}
        setIsDescription={setIsDescription}
        action={action}
        setAction={setAction}
        checkTags={checkTags}
        setCheckTags={setCheckTags}
        onHide={() => {
          setIsTitleChange(false);
          setModalShow(false);
          setIsDescription(false)
        }}
      />
    </div>
  );
}

export default App;
