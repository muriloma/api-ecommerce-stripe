const instanciaAxios = require('../api');
const pool = require('../conexao')

const venda = async (req, res) => {
    const { cliente_id, produto_id, quantidade } = req.body

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

        const { rows: vendaRealizada } = await pool.query({
            text: `INSERT INTO vendas (cliente_id, produto_id, quantidade)
                values ($1, $2, $3) RETURNING *`,
            values: [cliente_id, produto_id, quantidade]
        });

        return res.status(201).json(vendaRealizada[0])
    } catch (error) {
        return res.send(500).json({ erro: error.message })
    }
};

module.exports = { venda }