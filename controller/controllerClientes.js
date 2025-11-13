/*****************************************************************************************
 * Objetivo --> Controller responsavel pela manipulação dos dados referentes a clientes
 * Data --> 06/11/2024
 * Autor --> Sistema de Agendamentos

 ****************************************************************************************/

const clienteDAO = require('../dao/clienteDAO.js');
const message = require('../config/config.js');

// ====================== POST ======================
const createCliente = async function (dadosBody, contentType) {
    let status = false;
    let status_code;
    let mensagem = {};

    if (contentType === 'application/json') {
        if (dadosBody.nome == '' || dadosBody.nome == undefined) {
            status_code = 400;
            mensagem.message = message.ERROR_REQUIRED_FIELDS;
        } else {
            let novoCliente = await clienteDAO.insertCliente(dadosBody);

            if (novoCliente) {
                status = true;
                status_code = 201;
                mensagem.message = message.SUCCESS_CREATED_ITEM;
                mensagem.cliente = novoCliente;
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
        message: mensagem.message,
        cliente: mensagem.cliente
    };
}

// ====================== PUT ======================
const updateCliente = async function (dadosBody, contentType) {
    let status = false;
    let status_code;
    let mensagem = {};

    if (contentType === 'application/json') {
        if (
            dadosBody.id == '' || dadosBody.id == undefined ||
            dadosBody.nome == '' || dadosBody.nome == undefined
        ) {
            status_code = 400;
            mensagem.message = message.ERROR_REQUIRED_FIELDS;
        } else {
            let resultado = await clienteDAO.updateCliente(dadosBody);

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
const deleteCliente = async function (id) {
    let status = false;
    let status_code;
    let mensagem = {};

    if (id == '' || id == undefined || isNaN(id)) {
        status_code = 400;
        mensagem.message = message.ERROR_INVALID_ID;
    } else {
        let resultado = await clienteDAO.deleteCliente(id);

        if (resultado) {
            status = true;
            status_code = 200;
            mensagem.message = message.SUCCESS_DELETED_ITEM;
        } else {
            status_code = 400;
            mensagem.message = "Não é possível excluir um cliente que possui agendamentos associados";
        }
    }

    return {
        status: status,
        status_code: status_code,
        message: mensagem.message
    };
}

// ====================== GET ======================
const getClientes = async function () {
    let status = false;
    let status_code;
    let mensagem = {};

    let dados = await clienteDAO.selectAllClientes();

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
        clientes: mensagem.length ? mensagem : null,
        message: mensagem.message || null
    };
}

const getClienteById = async function (id) {
    console.log(id)
    let status = false;
    let status_code;
    let mensagem = {};

    if (id == '' || id == undefined || isNaN(id)) {
        status_code = 400;
        mensagem.message = message.ERROR_INVALID_ID;
    } else {
        let dados = await clienteDAO.selectClienteById(id);

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
        cliente: mensagem.length ? mensagem[0] : null,
        message: mensagem.message || null
    };
}

const getClientesComAgendamentos = async function () {
    let status = false;
    let status_code;
    let mensagem = {};

    let dados = await clienteDAO.selectClientesComAgendamentos();

    // Função para substituir BigInt por String
    const convertBigIntToString = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(convertBigIntToString); // Aplica recursivamente em arrays
        } else if (obj !== null && typeof obj === 'object') {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [
                    key,
                    typeof value === 'bigint' ? value.toString() : convertBigIntToString(value),
                ])
            );
        }
        return obj;
    };

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

    // Convertendo os dados para garantir que BigInt seja transformado em String
    mensagem = convertBigIntToString(mensagem);

    return {
        status: status,
        status_code: status_code,
        clientes: mensagem.length ? mensagem : null,
        message: mensagem.message || null
    };
}


const getClienteComAgendamentosById = async function (id) {
    let status = false;
    let status_code;
    let mensagem = {};

    // Validação do ID
    if (id == '' || id == undefined || isNaN(id)) {
        status_code = 400;
        mensagem.message = message.ERROR_INVALID_ID;
    } else {
        let dados = await clienteDAO.selectClienteComAgendamentosById(id);

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

    // Função para substituir BigInt por String
    const convertBigIntToString = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(convertBigIntToString); // Aplica recursivamente em arrays
        } else if (obj !== null && typeof obj === 'object') {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [
                    key,
                    typeof value === 'bigint' ? value.toString() : convertBigIntToString(value),
                ])
            );
        }
        return obj;
    };

    // Convertendo os dados de mensagem para garantir que BigInt seja transformado em String
    mensagem = convertBigIntToString(mensagem);

    return {
        status: status,
        status_code: status_code,
        cliente: mensagem.length ? mensagem[0] : null,
        message: mensagem.message || null
    };
}


module.exports = {
    createCliente,
    updateCliente,
    deleteCliente,
    getClientes,
    getClienteById,
    getClientesComAgendamentos,
    getClienteComAgendamentosById
}