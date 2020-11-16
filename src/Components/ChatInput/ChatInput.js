import { Button } from '@material-ui/core';
import { useState } from 'react';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './ChatInput.css';
import firebase from 'firebase';

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
        userImage: user.photoURL,
      });
      setInput('');
    }
  };

  return (
    <div className='chatInput'>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
