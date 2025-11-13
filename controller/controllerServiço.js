/*****************************************************************************************
 * Objetivo --> Controller responsavel pela manipulação dos dados referentes a serviços
 * Data --> 06/11/2024
 * Autor --> Sistema de Agendamentos
 ****************************************************************************************/

const servicoDAO = require('../dao/servicosDAO.js');
const message = require('../config/config.js');
const { parseDuracao, parsePreco } = require('../utils'); 

// ====================== POST ======================
const createServico = async function (dadosBody, contentType) {
    let status = false;
    let status_code;
    let mensagem = {};

    // Verificar se o tipo de conteúdo é JSON
    if (contentType === 'application/json') {
        // Verificar se o campo nome_servico está presente
        if (dadosBody.nome_servico == '' || dadosBody.nome_servico == undefined) {
            status_code = 400;  // Bad Request
            mensagem.message = 'Campos obrigatórios faltando.';
        } else {
            // Conversão de 'duracao' para minutos e 'preco' para número
            const duracaoConvertida = parseDuracao(dadosBody.duracao);
            const precoConvertido = parsePreco(dadosBody.preco);

            // Preparar os dados para enviar para a DAO
            const dadosServico = {
                nome_servico: dadosBody.nome_servico,
                descricao: dadosBody.descricao,
                duracao: duracaoConvertida,  // Duração convertida para minutos
                preco: precoConvertido       // Preço convertido para número
            };

            // Inserção do serviço na DAO
            let novoServico = await servicoDAO.insertServico(dadosServico);

            if (novoServico) {
                status = true;
                status_code = 201;  // Created
                mensagem.message = 'Serviço criado com sucesso!';
                mensagem.servico = novoServico;
            } else {
                status_code = 500;  // Internal Server Error
                mensagem.message = 'Erro interno ao criar o serviço.';
            }
        }
    } else {
        status_code = 415;  // Unsupported Media Type
        mensagem.message = 'Tipo de conteúdo incorreto. Por favor, envie dados no formato JSON.';
    }

    return {
        status: status,
        status_code: status_code,
        message: mensagem.message,
        servico: mensagem.servico
    };
};


// ====================== PUT ======================
const updateServico = async function (dadosBody, contentType) {
    let status = false;
    let status_code;
    let mensagem = {};

    if (contentType === 'application/json') {
        if (
            dadosBody.id == '' || dadosBody.id == undefined ||
            dadosBody.nome_servico == '' || dadosBody.nome_servico == undefined
        ) {
            status_code = 400;
            mensagem.message = message.ERROR_REQUIRED_FIELDS;
        } else {
            let resultado = await servicoDAO.updateServico(dadosBody);

            if (resultado) {
                status = true;
                status_code = 200;
                mensagem.message = message.SUCCESS_UPDATED_ITEM;
            } else {
                status_code = 500;
                mensagem.message = message.ERROR_INTERNAL_SERVER;
            }
        }
    } else {
        status_code = 415;
        mensagem.message = message.ERROR_INCORRECT_CONTENT_TYPE;
    }

    return {
        status: status,
        status_code: status_code,
        message: mensagem.message
    };
}

// ====================== DELETE ======================
const deleteServico = async function (id) {
    let status = false;
    let status_code;
    let mensagem = {};

    if (id == '' || id == undefined || isNaN(id)) {
        status_code = 400;
        mensagem.message = message.ERROR_INVALID_ID;
    } else {
        let resultado = await servicoDAO.deleteServico(id);

        if (resultado) {
            status = true;
            status_code = 200;
            mensagem.message = message.SUCCESS_DELETED_ITEM;
        } else {
            status_code = 400;
            mensagem.message = "Não é possível excluir um serviço que possui agendamentos associados";
        }
    }

    return {
        status: status,
        status_code: status_code,
        message: mensagem.message
    };
}

// ====================== GET ======================
const getServicos = async function () {
    let status = false;
    let status_code;
    let mensagem = {};

    let dados = await servicoDAO.selectAllServicos();

    if (dados) {
        if (dados.length > 0) {
            status = true;
            status_code = 200;
            mensagem = dados;
        } else {
            status_code = 404;
            mensagem.message = message.ERROR_NOT_FOUND;
        }
    } else {
        status_code = 500;
        mensagem.message = message.ERROR_INTERNAL_SERVER;
    }

    return {
        status: status,
        status_code: status_code,
        servicos: mensagem.length ? mensagem : null,
        message: mensagem.message || null
    };
}

const getServicoById = async function (id) {
    let status = false;
    let status_code;
    let mensagem = {};

    if (id == '' || id == undefined || isNaN(id)) {
        status_code = 400;
        mensagem.message = message.ERROR_INVALID_ID;
    } else {
        let dados = await servicoDAO.selectServicoById(id);

        if (dados) {
            if (dados.length > 0) {
                status = true;
                status_code = 200;
                mensagem = dados;
            } else {
                status_code = 404;
                mensagem.message = message.ERROR_NOT_FOUND;
            }
        } else {
            status_code = 500;
            mensagem.message = message.ERROR_INTERNAL_SERVER;
        }
    }

    return {
        status: status,
        status_code: status_code,
        servico: mensagem.length ? mensagem[0] : null,
        message: mensagem.message || null
    };
}

module.exports = {
    createServico,
    updateServico,
    deleteServico,
    getServicos,
    getServicoById
}
