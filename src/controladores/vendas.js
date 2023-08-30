const pool = require('../conexao');
const { cobrar } = require('../stripe-charge');

const venda = async (req, res) => {
    const { cliente_id, produto_id, quantidade, token } = req.body

    try {
        const cliente = await pool.query('SELECT * FROM clientes WHERE id = $1', [cliente_id])

        if (cliente.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Cliente não localizado.' })
        }

        const produto = await pool.query('SELECT * FROM produtos WHERE id = $1', [produto_id])

        if (produto.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Produto não localizado.' })
        }

        if (quantidade < 1) {
            return res.status(400).json({ mensagem: 'A quantidade deve ser maior que zero.' })
        }

        const valorVenda = produto.rows[0].valor * quantidade

        const cobranca = await cobrar(valorVenda, token)// card)

        const { rows: vendaRealizada } = await pool.query({
            text: `INSERT INTO vendas (cliente_id, produto_id, quantidade, transacao_id)
                values ($1, $2, $3, $4) RETURNING *`,
            values: [cliente_id, produto_id, quantidade, cobranca.id]
        });
        return res.status(201).json(vendaRealizada[0])
    } catch (error) {
        if (error.response) {
            return res.status(500).json({ erro: error.response.data.error.message })
        }
        return res.status(500).json({ erro: error.message })
    }
};

module.exports = { venda }