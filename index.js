//servidor e rotas
const express = require('express');
const petshop = require('./petshop');
const app = express();

app.use(express.json());

const pets = [];

//LISTAR PETS
app.get('/pets', (request, response) => {
    return response.send(petshop.listarPets());
});

//ADICIONA PETS
app.post('/pets', (request, response) => {
    const { 
        nome, 
        tipo, 
        idade, 
        raca, 
        peso, 
        tutor, 
        contato, 
    } = request.body;
    
    const adicionarPet = { nome, tipo, idade, raca, peso, tutor, contato}

    pets.push(petshop.adicionarPets());

    return response.json(adicionarPet); 
});


app.listen(3000, () => {
    console.log('Servidor rodando 🚀');
});


