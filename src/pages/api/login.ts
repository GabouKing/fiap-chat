export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, password } = req.body;
      const response = await fetch('http://localhost:3333/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return res.status(200).json(data);
      } else {
        return res.status(response.status).json(data);
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro ao conectar com a API de terceiros." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
