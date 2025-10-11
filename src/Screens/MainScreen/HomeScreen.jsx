import React from 'react'
import Messages from '../../Components/Messages/Messages';
import FormMessage from '../../Components/Form/FormMessages';

export default function HomeScreen() {
  return (
    <div className='app'>
      <h2>Chat</h2>
      <Messages />
      <FormMessage />
    </div>
  );
}
