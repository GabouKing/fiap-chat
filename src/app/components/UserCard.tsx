import { MessageSquareMore } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const UserCard = ({ data }: { data: any }) => {  
  const [userName, setUserName] = useState('');
  const [id, setId] = useState(0);
  const router = useRouter()
  useEffect(() => {
    const getCookieValue = (name:any) => (
      document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1]
    );
    setUserName(getCookieValue('userName')?? '');
    setId(parseInt(getCookieValue('id')??''));
    }, []);
  const handleClick = () => {
    router.push({
    pathname: `/chat/${data.name}`,
    query: { recipientId: data.id, senderId: id, senderName: userName },
    });
  };
  return(
    <div className='flex flex-1 flex-row font-sans justify-around items-center bg-background-800 w-3/4 max-h-10 mt-2 mb-2 rounded-xl hover:opacity-80 cursor-pointer' 
    onClick={handleClick}>
      <span className='flex flex-1 ml-10 w-2/4'>{data.name}</span>
      <div className="flex flex-1 justify-center  w-2/4">        
        <MessageSquareMore className='h-8 w-8 text-fontColor-900'/>
      </div>
    </div>
  )
}