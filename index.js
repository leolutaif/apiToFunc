const express = require('express');
const cors = require('cors');
const { calcular } = require('./calculo');

const app = express();
const port = 3000;

// Configuração do CORS para permitir apenas o domínio específico
const allowedOrigins = ['https://erestituicaoconsulta.netlify.app', 'http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

// Middleware para permitir requisições apenas da origem permitida
app.use(cors(corsOptions));
app.use(express.json());

// Mock de dados em memória (poderia ser substituído por um banco de dados real)
let dados = [];

// GET - Retorna todos os dados
app.get('/calculos', (req, res) => {
    res.json(dados);
});

// POST - Recebe os dados e faz o cálculo
app.post('/calcular', async (req, res) => {
    const {
        alvaraType,
        BrutoHomologado,
        TributavelHomologado,
        NumeroDeMeses,
        ValorAlvara1, DataAlvara1, ValorAlvara2, DataAlvara2, ValorAlvara3, DataAlvara3, ValorAlvara4, DataAlvara4,
        ValorAlvara5, DataAlvara5, ValorAlvara6, DataAlvara6, ValorAlvara7, DataAlvara7, ValorAlvara8, DataAlvara8,
        ValorAlvara9, DataAlvara9, ValorAlvara10, DataAlvara10,
        ValorDarf1, DataDarf1, ValorDarf2, DataDarf2, ValorDarf3, DataDarf3, ValorDarf4, DataDarf4,
        ValorDarf5, DataDarf5, ValorDarf6, DataDarf6, ValorDarf7, DataDarf7, ValorDarf8, DataDarf8,
        ValorDarf9, DataDarf9, ValorDarf10, DataDarf10,
        ValorHonorarios1, DataHonorarios1, ValorHonorarios2, DataHonorarios2, ValorHonorarios3, DataHonorarios3,
        ValorHonorarios4, DataHonorarios4, ValorHonorarios5, DataHonorarios5, ValorHonorarios6, DataHonorarios6,
        ValorHonorarios7, DataHonorarios7, ValorHonorarios8, DataHonorarios8, ValorHonorarios9, DataHonorarios9,
        ValorHonorarios10, DataHonorarios10
    } = req.body;

    try {
        // Realizar o cálculo de forma assíncrona
        const resultado = await calcular({
            alvaraType,
            BrutoHomologado,
            TributavelHomologado,
            NumeroDeMeses,
            ValorAlvara1,
            DataAlvara1,
            ValorAlvara2,
            DataAlvara2,
            ValorAlvara3,
            DataAlvara3,
            ValorAlvara4,
            DataAlvara4,
            ValorAlvara5,
            DataAlvara5,
            ValorAlvara6,
            DataAlvara6,
            ValorAlvara7,
            DataAlvara7,
            ValorAlvara8,
            DataAlvara8,
            ValorAlvara9,
            DataAlvara9,
            ValorAlvara10,
            DataAlvara10,
            ValorDarf1,
            DataDarf1,
            ValorDarf2,
            DataDarf2,
            ValorDarf3,
            DataDarf3,
            ValorDarf4,
            DataDarf4,
            ValorDarf5,
            DataDarf5,
            ValorDarf6,
            DataDarf6,
            ValorDarf7,
            DataDarf7,
            ValorDarf8,
            DataDarf8,
            ValorDarf9,
            DataDarf9,
            ValorDarf10,
            DataDarf10,
            ValorHonorarios1,
            DataHonorarios1,
            ValorHonorarios2,
            DataHonorarios2,
            ValorHonorarios3,
            DataHonorarios3,
            ValorHonorarios4,
            DataHonorarios4,
            ValorHonorarios5,
            DataHonorarios5,
            ValorHonorarios6,
            DataHonorarios6,
            ValorHonorarios7,
            DataHonorarios7,
            ValorHonorarios8,
            DataHonorarios8,
            ValorHonorarios9,
            DataHonorarios9,
            ValorHonorarios10,
            DataHonorarios10
        });

        // Salvar os dados com o resultado
        const novoDado = { id: dados.length + 1, ...req.body, resultado };
        dados.push(novoDado);

        res.json({
            sucesso: true,
            resultado: resultado
        });
    } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao realizar o cálculo',
            erro: error.message
        });
    }
});

// PUT - Atualiza um cálculo existente
app.put('/calculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = dados.findIndex(item => item.id === id);

    if (index !== -1) {
        dados[index] = { id, ...req.body };
        res.json({ sucesso: true, mensagem: 'Cálculo atualizado.' });
    } else {
        res.status(404).json({ sucesso: false, mensagem: 'Cálculo não encontrado.' });
    }
});

// DELETE - Remove um cálculo
app.delete('/calculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = dados.findIndex(item => item.id === id);

    if (index !== -1) {
        dados.splice(index, 1);
        res.json({ sucesso: true, mensagem: 'Cálculo removido.' });
    } else {
        res.status(404).json({ sucesso: false, mensagem: 'Cálculo não encontrado.' });
    }
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
