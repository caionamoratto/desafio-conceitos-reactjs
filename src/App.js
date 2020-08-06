import React , {useState, useEffect} from "react";

import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] =useState([]);

  useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
        });
  }, []);
  
  async function handleAddRepository() {
      const response = await api.post('/repositories', {
        title: `Novo repositorio ${Date.now()}`,
        url : "https://github.com/caionamoratto/desafio-conceitos-node",
	      techs : ["Node.js","React Native"]
    });
    
    const repository = response.data;

    setRepositories([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
    

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    

    await api.delete(`/repositories/${id}`, id);

    repositories.splice(repositoryIndex, 1);
    console.log(repositories);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map( repository =>  
      
      <li key={repository.id}> 
      
        {repository.title} 
        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
        </button>
      
      </li> )}
      </ul>

      <button type= "button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
