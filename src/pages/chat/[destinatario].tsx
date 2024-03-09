
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Send } from 'lucide-react';
import useSocket from '@/hooks/useSocket';
import { Message } from '@/app/components/Message';

interface IMessage {
  name: string;
  content: string;
  idRemetente: number; 
  idDestinatario: number;
}

export async function getServerSideProps(concontent) {
  const { params, query } = concontent ;
  const recipientId = query.recipientId;
  const senderId = query.senderId;
  const senderName = query.senderName;
  try {
    const response = await fetch(`http://localhost:3333/api/users/id?id=${recipientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const userSender = await response.json();
      return { props: { userSender, senderId, senderName } };
    } else {
      return { props: { userSender:'' } };
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return { props: { userSender: null } };
  }
}

export default function ChatPage({userSender, senderId, senderName}) {
  const router = useRouter();
  const { recipientId } = router.query;  
  const [id, setId] = useState(senderId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { socketInstance } = useSocket(senderId);
  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageContainer.current?.scrollTo(
      0,
      messageContainer.current.scrollHeight
    );
  }, [messages]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const newMessage: IMessage = {
      content: input,
      name: senderName,
      idRemetente: parseInt(id) as number,
      idDestinatario: userSender?.id as number,
    };
  
    console.log('Enviando mensagem:', newMessage);
  
    setInput('');
    socketInstance.emit('message', newMessage);
    setMessages((previous) => [...previous, newMessage]);
  };  
   useEffect(() => {
    socketInstance?.on('message', (message: IMessage) => {
        console.log('Mensagem recebida:', message);
        if (message.idDestinatario === userSender?.id) {
            setMessages((previous) => [...previous, message]);
        }
    });
}, [socketInstance, userSender]);

    useEffect(() => {
      function onMessageEvent(value: IMessage) {
        setMessages((previous) => [...previous, value]);
      }
      
      function onNotificationEvent(value: IMessage) {
        console.log("hello");
      }
  
      socketInstance.on("notification", onNotificationEvent);
      socketInstance.on("message", onMessageEvent);
      console.log('BUCETA DO CARALHO')
      return () => {
        socketInstance.off("message", onMessageEvent);
        socketInstance.off("notification", onNotificationEvent);
      };
    }, [socketInstance]);
  
    useEffect(() => {
      if (id !== null) {
        socketInstance.emit('historicoMensagens', {
          idRemetente: parseInt(id) as number,
          idDestinatario: userSender?.id as number,
        });
  
        socketInstance.on('historicoMensagens', (historyMessages) => {
          setMessages(historyMessages);
        });
      }
    }, []);   

  return (
    <main className="content-area w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-background-900">
      <h6 className='font-sans text-2xl text-fontColor-900'>Chat com: {userSender?.name}</h6>
      <div ref={messageContainer} className='flex h-[50rem] w-[60rem] flex-col overflow-auto px-5 pt-14 bg-background-800'>
      {messages.map((message,index) => (
              <Message
                key={index}
                message={message.content}
                isOwner={(message.idRemetente === parseInt(id)) ? true : false}
                data={message}
              />
            ))}
    </div>
      <form
      onSubmit={handleSubmit}
      className="flex justify-between border border-fontColor-900 rounded-xl w-[60rem] bg-background-800"
      >
      <input
        type="text"
        placeholder='Digite sua mensagem'
        onChange={(event) => setInput(event.target.value)}
        value={input}
        className="h-10 w-full rounded-bl-[9px] rounded-tl-[10px] bg-background-800 px-4 py-1 text-3xl text-fontColor-900 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-br-[9px] rounded-tr-[10px] bg-background-800 px-4 py-1"
      >
        <Send  className="h-8 w-8 text-fontColor-900 hover:text-white-1" size={34} />
      </button>
    </form>
    </main>
  );
}
