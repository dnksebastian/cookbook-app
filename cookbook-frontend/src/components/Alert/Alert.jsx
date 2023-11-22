import './Alert.css';

import { createPortal } from 'react-dom'

const Alert = ({ isOpen, onClose, title, description, confirmBtnLabel, onConfirm }) => {
  
  if (!isOpen) {
    return null
  }

  return (
    <>
    {createPortal(
    <div className='alert-wrap'>
        <h2 className="alert-title">{ title || 'Confirm action?' }</h2>
        <p className="alert-desc">{description || 'Do you want to proceed?'}</p>
        <div className="alert-controls">
            <button onClick={onClose} className='alert-cancel'>Cancel</button>
            <button onClick={onConfirm} className='alert-confirm'>{confirmBtnLabel || 'OK'}</button>
        </div>
    </div>, document.body)}
    </>
  )
}

export default Alert