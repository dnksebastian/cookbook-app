import './Alert.css';

const Alert = ({ isOpen, onClose, title, description, confirmBtnLabel, onConfirm }) => {
  
  if (!isOpen) {
    return null
  }

  return (
    <div className='alert-wrap'>
        <h2 className="alert-title">{ title || 'Confirm action?' }</h2>
        <p className="alert-desc">{description || 'Do you want to proceed?'}</p>
        <div className="alert-controls">
            <button onClick={onClose} className='alert-cancel'>Cancel</button>
            <button onClick={onConfirm} className='alert-confirm'>{confirmBtnLabel || 'OK'}</button>
        </div>
    </div>
  )
}

export default Alert