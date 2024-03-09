import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e:any) => {
    e.preventDefault();
      const response = await fetch('http://localhost:3333/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });   

    if (response.ok) {
      router.push('/');
    } else {
      toast.error(`Erro ao registrar usuário`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
  };
  return (
    <main className='flex flex-1 flex-col h-screen w-screen justify-center items-center bg-background-900'>
      <p className='font-sans text-2xl text-fontColor-900'>CADASTRE-SE</p>
      <div className='flex flex-1 flex-col max-h-[45vh] w-[80vw] justify-center items-center bg-background-800'>
        <p className='font-sans text-1xl text-fontColor-900'>Digite um nome de usuário</p>
        <input 
          className='font-sans text-lg text-fontColor-900 bg-background-900 border border-fontColor-900 rounded-xl p-2 w-5/6' 
          type="text"
          placeholder="" 
          onChange={(e) => setName(e.target.value)}/>
        <p className='font-sans mt-2 text-1xl text-fontColor-900'>Digite sua senha</p>
        <input 
          className='font-sans text-lg text-fontColor-900 bg-background-900 border border-fontColor-900 rounded-xl p-2 w-5/6' 
          type="password"
          placeholder="" 
          onChange={(e) => setPassword(e.target.value)}/>
        <div className="flex flex-1 flex-row mt-2 w-[40%]  max-h-12 ml-auto mr-auto justify-between items-center">
          <Link href="/" className='w-32 mt-2 font-sans p-2 text-center bg-background-900 border-[2px] border-fontColor-900 rounded-xl hover:opacity-80'>VOLTAR</Link>
          <button disabled={(password == '' || name == '')} className='w-32 mt-2 font-sans text-center p-2 bg-fontColor-900 rounded-xl hover:opacity-80' onClick={handleLogin}>CONFIRMAR</button>
        </div>        
      </div>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"          
          transition={Bounce}
          />
    </main>
  );
}