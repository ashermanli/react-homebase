import React from 'react'

const Notification = ({notification}) =>{

  return(
    <div className={notification == null? '': notification.notification ? 'notification': notification.error? 'error':''}>
      {notification == null? '': notification.notification ? notification.notification : notification.error? notification.error:''}
    </div>
  )
}

export default Notification