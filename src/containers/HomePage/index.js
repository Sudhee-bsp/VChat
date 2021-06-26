import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers, updateMessage, getRealtimeConversations } from '../../actions';
import chatLogo from './chatlogo.png'

const User = (props) => {
  const {user, onClick} = props;

  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
          <img src="https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg" alt=""  />
      </div>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
          <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
      </div>
    </div>
  );
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [status, setStatus] = useState(false);
  const [lastSeen, setlastSeen] = useState('');
  const [message, setMessage] = useState('');
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  useEffect(() => {

    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
      return unsubscribe;
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  //console.log(user);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then(f => f()).catch(error => console.log(error));
    }
  }, []);


  const initChat = (user) => {

    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setStatus(user.isOnline);
    setlastSeen(user.lastSeen);
    setUserUid(user.uid);
    console.log(user);
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  }


  const submitMessage = (e) => {

    e.preventDefault();
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }

    // if (e.keyCode === 13) {
      if(message !== ""){
        dispatch(updateMessage(msgObj))
        .then(() => {
          setMessage('')
        });
      }
    // }
    //console.log(msgObj);
  }

  const handleKeypress = e => {
    // e.preventDefault();
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      submitMessage();
    }
  };

  return (
    <Layout>
      <section className="container">

        <div className="listOfUsers">
          <div>Your group: {user.users.length}</div>
          {
            user.users.length > 0 ?
            user.users.map(user => {
              return (
                <User 
                  onClick={initChat}
                  key={user.uid} 
                  user={user} 
                  />
              );
            }) : null
          }
        </div>

        <div className="chatArea">
          
          <div className="chatHeader"> 
            {
              chatStarted ? 
              <div className="displayName">
                <div className="displayPic">
                  <img src="https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg" alt=""  />
                </div>
                {chatUser} &emsp;
                <div class="status" style={{ float: 'right', textAlign: 'right', fontSize: '18px' }}>
                  ({status? 'online': 'last seen on '+lastSeen})
                </div>
              </div> 
              : 'WELCOME to V-Chat!'
            }
          </div>
          
          <div className="messageSections">
            {
              chatStarted ? 
              user.conversations.map(con =>
                <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                <p className="messageStyle" >{con.message}</p>
              </div> )
              : <img className="chatLogo" src={chatLogo} alt="Logo" />
            }
          </div>
          
          {
            chatStarted ? 
            <div className="chatControls">
              <form>
                <input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Write message to `+chatUser}
                  onKeyPress={handleKeypress}
                /> 
                <button class="fas fa-paper-plane" onClick={submitMessage} type="submit"></button>
              </form>
            </div> : null
          }

        </div>
      </section>

    </Layout>
  );
}

export default HomePage;