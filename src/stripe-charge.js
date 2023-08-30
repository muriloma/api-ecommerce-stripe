const instanciaAxios = require("./api");
const qs = require("qs");

const cobrar = async (amount, token) => {
    const dadosCobranca = qs.stringify({
        amount,
        currency: 'brl',
        source: token
    });

    const { data: cobranca } = await instanciaAxios.post('/charges', dadosCobranca)
    return cobranca
};

module.exports = {
    cobrar,
}