// pages/persons.js
import { UserCard } from "../../app/components/UserCard";

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3333/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const listaUsuarios = await response.json();
      return { props: { listaUsuarios } };
    } else {
      return { props: { listaUsuarios: [] } };
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return { props: { listaUsuarios: [] } };
  }
}

export default function Persons({ listaUsuarios }) {
  return (
    <main className='flex flex-1 flex-col h-screen w-screen justify-center items-center bg-background-900'>
      <p className='font-sans text-2xl text-fontColor-900'>listar as pessoas</p>
      {listaUsuarios.map((item:any) => (
        <UserCard key={item.id} data={item}/>
      ))}
    </main>
  );
}
