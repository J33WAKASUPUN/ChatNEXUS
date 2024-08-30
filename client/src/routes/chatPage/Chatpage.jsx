import {useEffect, useRef} from 'react'
import NewPrompt from '../../components/newPrompt/Newprompt'
import '../chatPage/Chatpage.scss'
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
import { useAuth } from '@clerk/clerk-react';

function ChatPage() {

  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });


  const endRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className='chatpage'>
      <div className="wrapper" ref={chatContainerRef}>
        <div className='chat'>
          {isPending
            ? "Loading..."
            : error
              ? "Something went wrong!"
              : data?.history?.map((message, i) => (
                <>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }} />
                  )}
                  <div
                    className={message.role === "user" ? "message user" : "message"}
                    key={i}>
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}

             {data && <NewPrompt data={data} />}

          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage
