import './Notification.css';

import { useNotificationContext } from '../../hooks/useNotification';
import { useRef } from 'react';

const Notification = () => {

  const notificationControl = useNotificationContext();
  const notificationType = notificationControl.notification.type;

  const timer = useRef(0);

  // console.log('here');

  if (timer.current !== 0) {
    clearTimeout(timer.current)
  }

  if (notificationControl.notification.message) {
    timer.current = setTimeout(() => {
      notificationControl.displayNotification({
        type: '',
        message: ''
      })
    }, 5000);
  }

  
    return (
    <div className={`notification-box ${notificationType}`}>
        {notificationControl.notification.message}
    </div>
  )
}

export default Notification