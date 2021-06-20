import React from 'react'

const Notification = ({notification}) =>{

  return(
    <div className={notification == null? '': notification.notification ? 'border-2 border-green-500': notification.error? 'border-2 border-red-500 text-red-500':''}>
      {notification == null? '': notification.notification ? notification.notification : notification.error? notification.error:''}
    </div>
  )
}

export default Notification