import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ChatOverlay.css';
import { setMessages, setOverlay } from '../store/slices/blockchain';
import agent from '../agent';
import { marked } from 'marked';

const ChatOverlay = () => {
  const chat = useSelector((state: any) => state.blockchain.chat);
  const overlayRef = React.useRef<any>(null);
  const containerRef = React.useRef<any>(null);
  const messageContainerRef = React.useRef<any>(null);

  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const dispatch = useDispatch();

  const messages = useSelector((state: any) => state.blockchain.chat.messages);

  const selectedNode = useSelector((state: any) => state.common.selected);

  const submitHandler = (e: any) => {
    e.preventDefault();

    console.log(e.target.message.value);
    console.log(selectedNode.nodeInfo);
    agent.blockchain
      .postChat(
        e.target.message.value,
        structuredClone(selectedNode.nodeInfo.id),
      )
      .then((res) => {
        setInputValue('');
        if (res.data.status === 'success') {
          agent.blockchain.getChat(selectedNode.nodeInfo.id).then((res) => {
            console.log(res.data.messages);
            dispatch(setMessages(res.data.messages));
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const containerClass = chat.overlay
    ? 'chat-container visible'
    : 'chat-container hidden';

  const overlayClass = chat.overlay ? 'chat-overlay visible' : 'chat-overlay';

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function handleClickOutside(event: { target: any }) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        containerRef.current.classList.add('hidden');
        containerRef.current.classList.remove('visible');

        overlayRef.current.classList.add('hidden');
        overlayRef.current.classList.remove('visible');

        timeoutId = setTimeout(() => {
          dispatch(setOverlay(false));
        }, 300);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [chat.overlay, dispatch]);

  React.useEffect(() => {
    if (messageContainerRef.current) {
      const messageContainer = messageContainerRef.current;
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]); // Dependency array includes messages, so this runs when messages change

  return (
    <>
      {chat.overlay ? (
        <div className={overlayClass} ref={overlayRef}>
          <div className={containerClass} ref={containerRef}>
            <h5>Node Bot</h5>
            <ul className="chat__message-container" ref={messageContainerRef}>
              {messages !== undefined &&
                messages
                  .slice()
                  .reverse()
                  .map((message: any) => {
                    return (
                      <li>
                        <span>{message.role}</span>
                        <p
                          style={
                            message.role === 'user'
                              ? {
                                  color: '#6a6a6a',
                                }
                              : {}
                          }
                          dangerouslySetInnerHTML={{
                            __html: marked(message.content),
                          }}
                        ></p>
                      </li>
                    );
                  })}
            </ul>
            <form className="chat__text-bar" onSubmit={submitHandler}>
              <input
                type="text"
                name="message"
                placeholder="Ask Node Bot..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <input type="submit" style={{ display: 'none' }} />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChatOverlay;
