/*
    Rotina para usar buscar dados de endereço a partir de um cep.
    Bibliografia: https://www.youtube.com/watch?v=imk6Y0viabg&ab_channel=FernandoLeonid
    início; 25/08/21
*/

'use strict';

const limpaFormulario = (endereco) =>{
    /*
        limpa as caixas de endereço para escrever novo cep
    */

    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
const preenche_endereco=(array_endereco)=>{
    /*
        Funçao recebe array do enderço
        Coloca informações nas caixas de input do formulário
        As chaves do array estão descritas na API
    */
    document.getElementById('estado').value=array_endereco.uf;
    document.getElementById('cidade').value=array_endereco.localidade;
    document.getElementById('endereco').value=array_endereco.logradouro;
    document.getElementById('bairro').value=array_endereco.bairro;
    
}

const valida_cep=(cep_val) => {

    /*
        Funçao verifica se cep digitado tem 8 elementos numéricos
    */

    if (cep_val.length==8 && /^[0-9]+$/.test(numero))
    {
        return true;
         /*
            ^ significa que o primeiro intem tem de ser número entre 0 e 9
            $ significa que o último intem tem de ser número entre 0 e 9
            + indica que precisa ter um caracter ou mais
        */
    }
    return false;
    

}

const pesquisaCep = async () =>{

    limpaFormulario();
    /*
    Função que chama a API para achar endereço de um CEP
    Chama função para preencher os campos de endereço
*/

    const cep_val=document.getElementById('cep').value; // Toma valor cep digitado
    const url_api_cep= `http://viacep.com.br/ws/${cep_val}/json/`; //url da api 
    /*
        Deixou apenas http para evitar eventuais problemas de segurança
        Usou acentos graves para poder fazer a concatenação de forma fluida
    */ 

if(valida_cep(cep_val)) // Verifica se foi digitado corretamente
{
    const dados=await fetch(url_api_cep);//Retorna todos dos dados
    /*
        await faz a resposta da requisição chegar mais rápido?
        Fech retorna uma promessa, que fica pendente
    */
    const dados_endereco=await dados.json();// Array apenas com os valores de interesse

    //  Verifica se o CEP existe e coloca mensagem de erro
    if(dados_endereco.hasOwnProperty('erro'))
    {
        document.getElementById('endereco').value = 'CEP não encontrado!';
    }
    else{
        preenche_endereco(dados_endereco);  //Chama função que preenche
    }
}
  

else { document.getElementById('endereco').value = 'CEP incorreto!';
}
}

document.getElementById('cep').addEventListener('focusout',pesquisaCep);