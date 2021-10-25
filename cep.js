'use strict';



// const aluno ={
//     nome: "Maria",
//     // nota:8,
//     notas:{
//         PWFE:8,
//         PWBE:9,
//         BCD:3,
//     },
//     semestre: 3,
//     email: 'maria@gmail.com',
// }

// const nome = aluno.nota;
// const email = aluno.email;

// const{nota,email} = aluno;

// console.log(notas);



const pesquisarCep = async (cep) =>{ // 6 passo - criando a função para ver o que ta chegando
  
    const url = `https://viacep.com.br/ws/${cep}/json/` // 9 passo
//    console.log( await fetch(url)) //8 passo - // fetch() - faz um requisição como se fosse um navegador, para receber os dados
    const response = await fetch(url); // 10 passo
    const data = await response.json() //11 passo- não quer saber as outras informações, somente o json()
//    console.log(data);
    return data; // 12 passo
// return `Teste pesquisa CEP ${cep}`; //7 passo
};



//15 passo- criar a funcao cep falso,REGEX serve para validação, expressao regular entre //
//test() é para ver se ta igual o conforme
const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const limparFormulario = () =>{ // 16 passo- para limpar as caixar, caso de erro
    document.querySelector("#endereco").value = '';
    document.querySelector("#bairro").value = '';
    document.querySelector("#cidade").value = '';
    document.querySelector("#estado").value = '';
}




// 2 passo- criar a função 
const peencherFormulario = async (evento) => {
    // console.log('teste'); // 3 passo - dar um console para ver se está chegando, tem que clicar no cep e mudar para outro, para ver se está funcionando
    // const cep = document.querySelector('#cep').value // 4 passo - primeira opção de capturar o cep
    // console.log(cep);
    limparFormulario();
    // segunda opcao de receber os dados
    const cep = evento.target.value.replace('-', '') //target o alvo, forma mais facil de receber os dados do cep
    // console.log(cep);
    // console.log(cep);
    
   
    // 14 passo - antes de fazer uma requisição
    if(cepValido(cep)){
        const infoCep = await pesquisarCep(cep); // 5 passo, criar uma função que retorna o endereco tudo
        // console.log(infoCep);

         if(infoCep.erro){ // 17 passo
            document.querySelector("#endereco").value = 'CEP não encontrado';
         }else{
                //13 passo - colocar na caixa de texto os dados
            document.querySelector("#endereco").value = infoCep.logradouro;
            document.querySelector("#bairro").value = infoCep.bairro;
             document.querySelector("#cidade").value = infoCep.localidade;
             document.querySelector("#estado").value = infoCep.uf;
         }

    }else{
        document.querySelector("#endereco").value = 'CEP incorreto!!!';
    }

    
    // console.log(infoCep); // para saber o que estou recebendo

};


//1 passo - capturar o evento, focuso - prestar atenção em algo
document.querySelector('#cep')
        .addEventListener('focusout', peencherFormulario);

        // quando chama uma função, chama de invocar,