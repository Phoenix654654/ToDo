import React from 'react';
import styles from './StatusBlock.module.css';
import {Button, } from 'react-bootstrap'

function StatusBlock({ tasks, setStatus, }) {
  return (
    <div className={styles.status}>
      <Button variant="primary" onClick={() => setStatus('Total')}>Total: {tasks.length}</Button>
      <Button variant="success" onClick={() => setStatus('Success')}>Success: {tasks.filter((item) => item.success).length}</Button>
      <Button variant="warning" onClick={() => setStatus('Pending')}>Pending: {tasks.filter((item) => item.pending).length}</Button>
    </div>
  )
}

export default StatusBlock