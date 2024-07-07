import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase_config';
import { useAuth } from '../auth/AuthProvider';

const ChatComponent = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users except the current user
    const usersQuery = query(collection(db, 'users'), where('uid', '!=', currentUser.uid));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribeUsers();
  }, [currentUser]);

  useEffect(() => {
    if (selectedUser) {
      // Fetch messages where the current user is a participant
      const messagesQuery = query(
        collection(db, 'messages'),
        where('participants', 'array-contains', currentUser.uid),
        orderBy('createdAt')
      );
      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => doc.data());
        // Filter messages to only those between the current user and the selected user
        const filteredMessages = fetchedMessages.filter(msg =>
          msg.participants.includes(selectedUser)
        );
        setMessages(filteredMessages);
      });

      return () => unsubscribeMessages();
    } else {
      setMessages([]);
    }
  }, [currentUser, selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: new Date(),
        uid: currentUser.uid,
        participants: [currentUser.uid, selectedUser],
      });
      setNewMessage('');
    }
  };

  return (
    <div className="container card p-4 mt-4 shadow-lg">
      <div className="row">
        <div className="col-md-4">
          <h5>Users</h5>
          <ul className="list-group">
            {users.map(user => (
              <li
                key={user.id}
                className={`list-group-item shadow-sm ${selectedUser === user.id ? 'active' : ''}`}
                onClick={() => setSelectedUser(user.id)}
              >
                {user.displayName}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <h5>Messages</h5>
          <div className="border p-3 mb-3" style={{ height: '300px', overflowY: 'scroll' }}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`my-2 p-2 ${msg.uid === currentUser.uid ? 'bg-primary text-light text-end' : 'bg-light text-start border'}`}
                style={{ borderRadius: '15px', maxWidth: '100%', alignSelf: msg.uid === currentUser.uid ? 'flex-end' : 'flex-start' }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
