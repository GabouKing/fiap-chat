import { MessageSquareMore } from 'lucide-react';

interface IMessageProps {
  message: any;
  data:any
  isOwner?: boolean;
}
export const Message = ({ message, isOwner = false,data }: IMessageProps) => {  
const positionTriangle = isOwner ? "after:right-[-6px] rounded-br-[0px]" : "after:left-[-6px] rounded-bl-[0px]";
const MessageParagraph = (
  <p
    className={`triangle relative h-fit rounded-xl bg-fontColor-900 px-6 py-2 after:bottom-0 ${positionTriangle}`}
  >
    {message}
  </p>
);

return (
  <div className={`m-2 flex ${isOwner && "self-end"}`}>
    {isOwner && MessageParagraph}
    <div className="m-4 flex flex-col items-center">
    </div>
    {!isOwner && MessageParagraph}
  </div>
);
}