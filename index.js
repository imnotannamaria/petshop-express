//servidor e rotas
const express = require('express');
const petshop = require('./petshop');
const app = express();

app.use(express.json());

//LISTAR PETS
app.get('/pets', (request, response) => {
    return response.send(petshop.listarPets());
});

//ADICIONA PETS
// app.post('/pets', (request, response) => {
//     const { 
//         nome, 
//         tipo, 
//         idade, 
//         raca, 
//         peso, 
//         tutor, 
//         contato, 
//     } = request.body;
    
//     const adicionarPet = { nome, tipo, idade, raca, peso, tutor, contato}

//     // pets.push(petshop.adicionarPets());
//     petshop.adicionarPet(pet);

//     return response.json(adicionarPet); 
// });

app.post('/pets', (request, response) => {
    const { nome, tipo, idade, raca, peso, tutor, contato } = request.body;
    const pet = {
      nome,
      tipo,
      idade,
      raca,
      peso,
      tutor,
      contato,
      vacinado: false,
      servicos: [],
    };

    petshop.adicionarPets(pet);
    return response.json(pet);
  });

app.listen(3000, () => {
    console.log('Servidor rodando 🚀');
});


