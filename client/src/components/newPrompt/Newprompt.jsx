import React, { useEffect, useRef, useState } from 'react'
import "../../components/newPrompt/Newprompt.scss"
import Upload from '../upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from "../../lib/gemini"
import Markdown from "react-markdown"
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Newprompt = ({data}) => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData:{},
    aiData:{},
  });

  const chat = model.startChat({
    history:[
      {
        role:"user",
        parts: [{text: "hello"}],
      },
      {
        role:"model",
        parts: [{text: "great"}],
      },
    ],
    generationConfig:{
      // maxOutputTokens:100,
    },
  });

  const endRef = useRef(null)
  const formRef = useRef(null)
  const chatContainerRef = useRef(null)

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
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () =>{

       return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method:"PUT",
        credentials:"include",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res)=>res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }). then(() =>{
        setQuestion("");
        setAnswer("");
        formRef.current.reset();
        setImg(
          {
            isLoading: false,
            error: "",
            dbData:{},
            aiData:{},
          }
        );
      });
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const add = async (text, isInitial) => {

    if (!isInitial) setQuestion(text);

    try{

      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer (accumulatedText);
      }

      mutation.mutate();

    }catch(err){
      console.error(err);
    }

  };


  const handleSubmit =  async (e) => {
    e.preventDefault()

    const text = e.target.text.value;
    if (!text) return;

    add(text, false)

  };

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
       if (data?.history?.length === 1){
      add(data.history[0].parts[0].text, true);
    }
  }
  hasRun.current = true;
  },[]);

  return (

    <div className='newprompt'>
      {img.isLoading && <div className=''>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
         urlEndpoint = {import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
         path= {img.dbData?.filePath}
         width="300"
         transformation={[{width:300}]}
        />
      )}
      {question && <div className='message user'>{question}</div>}
      {answer && <div className='message'><Markdown>{answer}</Markdown></div>}
      {/* ADD NEW CHAT */}
      <div className="endChat" ref={endRef}></div>
      <form className='newForm' onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg}/>
        <input id='file' type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder='Ask me anithing...'/>
        <button>
          <img className='image' src="/arrow.png" alt="" />
        </button>
      </form>
    </div>
  )
}

export default Newprompt
