import React from "react";

import { 
  NotificationsProvider, 
  showNotification, 
  updateNotification, 
  cleanNotifications 
} from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

// import Button from '@/comps/button/button';
import Button from 'comps/button/button';

// ==============================================

export default function Notify() {

  // --------------------------------------------


  // --------------------------------------------

  

  // --------------------------------------------

  return ( 
    <>
      <NotificationsProvider />

      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
      }}>
        <Button
          onClick={() => {
            showNotification({
              id: 'load-data',
              loading: true,
              title: 'Authenticating...',
              message: 'Logging you in',
              autoClose: false,
              disallowClose: true,
            });
          }}
          >
          Raise Notification
        </Button>
            
        <Button
          classes="ml-4"
          onClick={() => {
            updateNotification({
              id: 'load-data',
              color: 'teal',
              title: 'Success!',
              message: 'You are now logged in',
              // icon: <IconCheck size={16} />,
              autoClose: 1000,
              onClose: () => { console.log('close'); }
            });
            
          }}
          >
          (Update) Success Notification
        </Button>

        <Button
          classes="ml-4"
          onClick={() => {
            updateNotification({
              id: 'load-data',
              color: 'red',
              title: 'Error!',
              message: 'TODO: List error message returned from backend',
              // icon: <IconX size={16} />,
              autoClose: 2000,
            });
      
            
          }}
          >
          (Update) Fail Notification
        </Button>

      </div>
    </>
  );

}