import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import ChatInput from '../ChatInput/ChatInput';
import Message from '../Message/Message';
import './Chat.css';

const Chat = () => {
  const { roomId } = useParams();

  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) =>
          setRoomDetails({ id: snapshot.id, ...snapshot.data() })
        );
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setRoomMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
    }
  }, [roomId]);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__headerLeft'>
          <h4 className='chat__channelName'>
            <strong># {roomDetails?.name}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className='chat__headerRight'>
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>

      <div className='chat_messages'>
        {roomMessages.map(({ id, message, timestamp, username, userImage }) => (
          <Message
            key={id}
            message={message}
            timestamp={timestamp}
            username={username}
            userImage={userImage}
          />
        ))}
      </div>

      <ChatInput channelName={roomDetails?.name} channelId={roomDetails?.id} />
    </div>
  );
};

export default Chat;
