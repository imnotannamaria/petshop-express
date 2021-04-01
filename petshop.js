const moment = require('moment');
const fs = require('fs');

let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
    atualizarBanco : () => {
        //conversão de objeto javascript para JSON
        let petsAtualizado = JSON.stringify(bancoDados, null, 2);
        //atualização do arquivo bancoDados.json
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8');
    },

    listarPets : () => {
        let textoListaPets = "PETSHOP \n";
        bancoDados.pets.forEach((pet) => {
            
            textoListaPets += (`${pet.nome}, ${pet.idade} anos, ${pet.tipo}, ${pet.tutor}, ${pet.raca}, ${(pet.vacinado) ? 'vacinado': 'não vacinado'} \n`);
    
            pet.servicos.forEach((servico) => {
                textoListaPets += (`${servico.data} - ${servico.nome}`);
            })
        })

        return textoListaPets;
    },

    vacinarPet : pet => {
        let {nome, vacinado} = pet;
        if (!vacinado) {
            vacinado = true;
            atualizarBanco();
            console.log(`${nome} foi vacinado com sucesso!`);
        } else {
            console.log(`Ops, ${nome} já está vacinado!`);
        }
    },

    campanhaVacina : () => {
        console.log("Campanha de vacina 2021");
        console.log("vacinando...");
    
        let petVacinadosCampanha = 0;
    
        bancoDados.pets = bancoDados.pets.map((pet) => {
            let {vacinado} = pet;
            if (!vacinado) {
                vacinarPet(pet);
                petVacinadosCampanha++;
            }
    
            return pet;
        });
    
        // atualizarBanco();
        console.log(`${petVacinadosCampanha} pets foram vaciados nessa campanha!`);
    },

    // adicionarPet : novoPet => {
    //     bancoDados.pets.push(novoPet);
    //     atualizarBanco();
    //     textoAdicionaPets += (`${novoPet.nome} foi adicionado com sucesso!`);
    // },
    adicionarPets: (...novospets) => {
        let textoAddPets = "Adicionando PET";
        novospets.forEach((novopet) => {
          dadospet.pets.push(novopet);
        });
    
        //attbancopets();
        novospets.forEach((pet) => {
            textoAddPets += (`${pet.nome} foi adicionado com sucesso!`);
        });
    },

    darBanhoPet : pet => {
        let {nome} = pet;
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${nome} está de banho tomado!`);
    },

    tosarPet : pet => {
        let {nome} = pet;
        pet.servicos.push({
            'nome':'tosa',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${nome} está com cabelinho na régua :)`);
    },

    apararUnhasPet : pet => {
        let {nome} = pet;
        pet.servicos.push({
            'nome':'corte de unhas',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${nome} está de unhas aparadas!`);
    },

    atenderCliente : (pet, servico) => {
        let {nome} = pet;
        console.log(`Olá, ${nome}`);
        servico(pet);
        console.log('Até mais!');
    },

    buscarPet : (nomePet) => {

        let petEncontrado = bancoDados.pets.find((pet) => {
            let {nome} = pet;
            return nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    },

    filtrarTipoPet : (tipoPet) => {
        // && E - AND
        // || OU - OR
        // == verifica valores iguais
        // === verifica valores e tipos iguais
        let petsEncontrados = bancoDados.pets.filter((pet) => {
            let {tipo} = pet;
            return tipo == tipoPet;
        });
    
        return petsEncontrados;
    },

    clientePremium : (pet) => {
        let { nome } = pet;
        let nServicos = pet.servicos.length;
    
        if (nServicos > 5) {
            console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
        }
    },

    contatoTutor : (pet) => {
        let {nome, tutor, contato} = pet;
         
        return `Tutor: ${tutor} | Contato: ${contato} | Pet: ${nome}`
    },

    filtrarTutor : (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            let {tutor} = pet;
            return tutor == nomeTutor;
        })
        console.log(`Pets do tutor ${nomeTutor}`);
        petsTutor.forEach((pet) => {
            let {nome, tipo} = pet;
            console.log(`${nome} - ${tipo}`);
        })
    }  

}

module.exports = petshop;