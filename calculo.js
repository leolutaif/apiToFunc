const fs = require('fs');
const path = require('path');
const axios = require('axios');

function carregarIndices() {
    const dataPath = path.join(__dirname, 'indice.json');
    try {
        const jsonData = fs.readFileSync(dataPath);
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error.message);
        throw new Error('Falha ao carregar os índices.');
    }
}

function carregarTabela() {
    const dataPath = path.join(__dirname, 'tabelaIRRF.json');
    try {
        const jsonData = fs.readFileSync(dataPath);
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error.message);
        throw new Error('Falha ao carregar os índices.');
    }
}

function encontrarIndicePorData(dataConsultada, indices) {

    if (!dataConsultada) {
        return 0;
    }

    const indiceEncontrado = indices.find(indice => indice.data === dataConsultada);

    return indiceEncontrado ? indiceEncontrado.indice : null;
}

function formatarDataParaConsulta(data) {
    const partes = data.split('/');
    return `${partes[1]}/${partes[2]}`;
}

async function calcular({
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
}) {

    const indices = carregarIndices();

    const tabelaIRRF = carregarTabela();

    const calcularIndiceSeValido = (valor, data) => {
        if (valor && data) {
            const dataFormatada = formatarDataParaConsulta(data);
            return encontrarIndicePorData(dataFormatada, indices);
        }
        return 1;
    };

    const Indice1 = calcularIndiceSeValido(ValorAlvara1, DataAlvara1);
    const Indice2 = calcularIndiceSeValido(ValorAlvara2, DataAlvara2);
    const Indice3 = calcularIndiceSeValido(ValorAlvara3, DataAlvara3);
    const Indice4 = calcularIndiceSeValido(ValorAlvara4, DataAlvara4);
    const Indice5 = calcularIndiceSeValido(ValorAlvara5, DataAlvara5);
    const Indice6 = calcularIndiceSeValido(ValorAlvara6, DataAlvara6);
    const Indice7 = calcularIndiceSeValido(ValorAlvara7, DataAlvara7);
    const Indice8 = calcularIndiceSeValido(ValorAlvara8, DataAlvara8);
    const Indice9 = calcularIndiceSeValido(ValorAlvara9, DataAlvara9);
    const Indice10 = calcularIndiceSeValido(ValorAlvara10, DataAlvara10);

    let resultado;

    if (alvaraType === true) {
        AlvaraCorrigido1 = (ValorAlvara1 * Indice1);
        AlvaraCorrigido2 = (ValorAlvara2 * Indice2);
        AlvaraCorrigido3 = (ValorAlvara3 * Indice3);
        AlvaraCorrigido4 = (ValorAlvara4 * Indice4);
        AlvaraCorrigido5 = (ValorAlvara5 * Indice5);
        AlvaraCorrigido6 = (ValorAlvara6 * Indice6);
        AlvaraCorrigido7 = (ValorAlvara7 * Indice7);
        AlvaraCorrigido8 = (ValorAlvara8 * Indice8);
        AlvaraCorrigido9 = (ValorAlvara9 * Indice9);
        AlvaraCorrigido10 = (ValorAlvara10 * Indice10);
    } else {
        AlvaraCorrigido1 = ValorAlvara1;
        AlvaraCorrigido2 = ValorAlvara2;
        AlvaraCorrigido3 = ValorAlvara3;
        AlvaraCorrigido4 = ValorAlvara4;
        AlvaraCorrigido5 = ValorAlvara5;
        AlvaraCorrigido6 = ValorAlvara6;
        AlvaraCorrigido7 = ValorAlvara7;
        AlvaraCorrigido8 = ValorAlvara8;
        AlvaraCorrigido9 = ValorAlvara9;
        AlvaraCorrigido10 = ValorAlvara10;
    }

    SomaDarf =
        (parseFloat(ValorDarf1) || 0) +
        (parseFloat(ValorDarf2) || 0) +
        (parseFloat(ValorDarf3) || 0) +
        (parseFloat(ValorDarf4) || 0) +
        (parseFloat(ValorDarf5) || 0) +
        (parseFloat(ValorDarf6) || 0) +
        (parseFloat(ValorDarf7) || 0) +
        (parseFloat(ValorDarf8) || 0) +
        (parseFloat(ValorDarf9) || 0) +
        (parseFloat(ValorDarf10) || 0);

    SomaAlvaraCorrigido =
        (parseFloat(AlvaraCorrigido1) || 0) +
        (parseFloat(AlvaraCorrigido2) || 0) +
        (parseFloat(AlvaraCorrigido3) || 0) +
        (parseFloat(AlvaraCorrigido4) || 0) +
        (parseFloat(AlvaraCorrigido5) || 0) +
        (parseFloat(AlvaraCorrigido6) || 0) +
        (parseFloat(AlvaraCorrigido7) || 0) +
        (parseFloat(AlvaraCorrigido8) || 0) +
        (parseFloat(AlvaraCorrigido9) || 0) +
        (parseFloat(AlvaraCorrigido10) || 0);

    DarfCorrigido1 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido1) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice1);
    DarfCorrigido2 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido2) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice2);
    DarfCorrigido3 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido3) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice3);
    DarfCorrigido4 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido4) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice4);
    DarfCorrigido5 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido5) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice5);
    DarfCorrigido6 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido6) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice6);
    DarfCorrigido7 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido7) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice7);
    DarfCorrigido8 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido8) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice8);
    DarfCorrigido9 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido9) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice9);
    DarfCorrigido10 = (parseFloat(SomaDarf) * (parseFloat(AlvaraCorrigido10) / parseFloat(SomaAlvaraCorrigido))) / parseFloat(Indice10);

    RazaoMes1 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido1) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes2 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido2) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes3 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido3) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes4 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido4) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes5 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido5) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes6 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido6) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes7 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido7) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes8 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido8) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes9 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido9) / parseFloat(SomaAlvaraCorrigido)))
    RazaoMes10 = parseFloat(NumeroDeMeses) * (parseFloat(parseFloat(AlvaraCorrigido10) / parseFloat(SomaAlvaraCorrigido)))

    RendTribAlvara1 = (parseFloat(ValorAlvara1) + parseFloat(DarfCorrigido1)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara2 = (parseFloat(ValorAlvara2) + parseFloat(DarfCorrigido2)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara3 = (parseFloat(ValorAlvara3) + parseFloat(DarfCorrigido3)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara4 = (parseFloat(ValorAlvara4) + parseFloat(DarfCorrigido4)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara5 = (parseFloat(ValorAlvara5) + parseFloat(DarfCorrigido5)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara6 = (parseFloat(ValorAlvara6) + parseFloat(DarfCorrigido6)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara7 = (parseFloat(ValorAlvara7) + parseFloat(DarfCorrigido7)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara8 = (parseFloat(ValorAlvara8) + parseFloat(DarfCorrigido8)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara9 = (parseFloat(ValorAlvara9) + parseFloat(DarfCorrigido9)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribAlvara10 = (parseFloat(ValorAlvara10) + parseFloat(DarfCorrigido10)) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))

    RendTribHonorarios1 = parseFloat(ValorHonorarios1) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios2 = parseFloat(ValorHonorarios2) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios3 = parseFloat(ValorHonorarios3) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios4 = parseFloat(ValorHonorarios4) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios5 = parseFloat(ValorHonorarios5) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios6 = parseFloat(ValorHonorarios6) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios7 = parseFloat(ValorHonorarios7) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios8 = parseFloat(ValorHonorarios8) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios9 = parseFloat(ValorHonorarios9) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))
    RendTribHonorarios10 = parseFloat(ValorHonorarios10) * (parseFloat(TributavelHomologado) / parseFloat(BrutoHomologado))

    RendIsentoAlvara1 = (ValorAlvara1 + DarfCorrigido1) - RendTribAlvara1
    RendIsentoAlvara2 = (ValorAlvara2 + DarfCorrigido2) - RendTribAlvara2
    RendIsentoAlvara3 = (ValorAlvara3 + DarfCorrigido3) - RendTribAlvara3
    RendIsentoAlvara4 = (ValorAlvara4 + DarfCorrigido4) - RendTribAlvara4
    RendIsentoAlvara5 = (ValorAlvara5 + DarfCorrigido5) - RendTribAlvara5
    RendIsentoAlvara6 = (ValorAlvara6 + DarfCorrigido6) - RendTribAlvara6
    RendIsentoAlvara7 = (ValorAlvara7 + DarfCorrigido7) - RendTribAlvara7
    RendIsentoAlvara8 = (ValorAlvara8 + DarfCorrigido8) - RendTribAlvara8
    RendIsentoAlvara9 = (ValorAlvara9 + DarfCorrigido9) - RendTribAlvara9
    RendIsentoAlvara10 = (ValorAlvara10 + DarfCorrigido10) - RendTribAlvara10

    let dataAlvaras = {
        DataAlvara1,
        DataAlvara2,
        DataAlvara3,
        DataAlvara4,
        DataAlvara5,
        DataAlvara6,
        DataAlvara7,
        DataAlvara8,
        DataAlvara9,
        DataAlvara10
    };

    let dataHonorarios = {
        DataHonorarios1,
        DataHonorarios2,
        DataHonorarios3,
        DataHonorarios4,
        DataHonorarios5,
        DataHonorarios6,
        DataHonorarios7,
        DataHonorarios8,
        DataHonorarios9,
        DataHonorarios10
    };

    let rendTribAlvaras = {
        RendTribAlvara1,
        RendTribAlvara2,
        RendTribAlvara3,
        RendTribAlvara4,
        RendTribAlvara5,
        RendTribAlvara6,
        RendTribAlvara7,
        RendTribAlvara8,
        RendTribAlvara9,
        RendTribAlvara10
    };

    let darfCorrigidos = {
        DarfCorrigido1,
        DarfCorrigido2,
        DarfCorrigido3,
        DarfCorrigido4,
        DarfCorrigido5,
        DarfCorrigido6,
        DarfCorrigido7,
        DarfCorrigido8,
        DarfCorrigido9,
        DarfCorrigido10
    };

    let rendTribHonorarios = {
        RendTribHonorarios1,
        RendTribHonorarios2,
        RendTribHonorarios3,
        RendTribHonorarios4,
        RendTribHonorarios5,
        RendTribHonorarios6,
        RendTribHonorarios7,
        RendTribHonorarios8,
        RendTribHonorarios9,
        RendTribHonorarios10
    };

    let razaoMeses = {
        RazaoMes1,
        RazaoMes2,
        RazaoMes3,
        RazaoMes4,
        RazaoMes5,
        RazaoMes6,
        RazaoMes7,
        RazaoMes8,
        RazaoMes9,
        RazaoMes10
    };

    const extrairAno = (data) => {
        return data.split('/')[2];
    };

    let anos = Object.values(dataAlvaras).map(data => extrairAno(data));

    let anosUnicosOrdenados = [...new Set(anos)].sort((a, b) => a - b);

    let AnoExercicio1 = parseFloat(anosUnicosOrdenados[0]) + 1 || null;
    let AnoExercicio2 = parseFloat(anosUnicosOrdenados[1]) + 1 || null;
    let AnoExercicio3 = parseFloat(anosUnicosOrdenados[2]) + 1 || null;
    let AnoExercicio4 = parseFloat(anosUnicosOrdenados[3]) + 1 || null;
    let AnoExercicio5 = parseFloat(anosUnicosOrdenados[4]) + 1 || null;

    let somasRendimentosAlvara = {};

    Object.keys(dataAlvaras).forEach((key, index) => {
        let ano = extrairAno(dataAlvaras[key]);
        let rendimento = rendTribAlvaras[`RendTribAlvara${index + 1}`];

        if (somasRendimentosAlvara[ano]) {
            somasRendimentosAlvara[ano] += rendimento;
        } else {
            somasRendimentosAlvara[ano] = rendimento;
        }
    });

    let SumRendTribAlvara1 = somasRendimentosAlvara[anosUnicosOrdenados[0]] || 0;
    let SumRendTribAlvara2 = somasRendimentosAlvara[anosUnicosOrdenados[1]] || 0;
    let SumRendTribAlvara3 = somasRendimentosAlvara[anosUnicosOrdenados[2]] || 0;
    let SumRendTribAlvara4 = somasRendimentosAlvara[anosUnicosOrdenados[3]] || 0;
    let SumRendTribAlvara5 = somasRendimentosAlvara[anosUnicosOrdenados[4]] || 0;

    const extrairAnoHonorarios = (data) => {
        if (!data || data === null) return null;
        return data;
    };

    let anosHonorarios = Object.values(dataHonorarios)
        .map(data => extrairAnoHonorarios(data))
        .filter(ano => ano !== null);

    let anosUnicosHonorarios = [...new Set(anosHonorarios)].sort((a, b) => a - b);

    let somaRendTribHonorariosPorAno = {};

    Object.keys(dataHonorarios).forEach((key, index) => {
        let ano = extrairAnoHonorarios(dataHonorarios[key]);
        let rendimento = rendTribHonorarios[`RendTribHonorarios${index + 1}`] || 0;

        if (ano) {
            if (!somaRendTribHonorariosPorAno[ano]) {
                somaRendTribHonorariosPorAno[ano] = 0;
            }
            somaRendTribHonorariosPorAno[ano] += rendimento;
        }
    });

    let SumRendTribHonorarios1 = somaRendTribHonorariosPorAno[anosUnicosHonorarios[0]] || 0;
    let SumRendTribHonorarios2 = somaRendTribHonorariosPorAno[anosUnicosHonorarios[1]] || 0;
    let SumRendTribHonorarios3 = anosUnicosHonorarios[2] ? somaRendTribHonorariosPorAno[anosUnicosHonorarios[2]] || 0 : null;
    let SumRendTribHonorarios4 = anosUnicosHonorarios[3] ? somaRendTribHonorariosPorAno[anosUnicosHonorarios[3]] || 0 : null;
    let SumRendTribHonorarios5 = anosUnicosHonorarios[4] ? somaRendTribHonorariosPorAno[anosUnicosHonorarios[4]] || 0 : null;

    RT1 = SumRendTribAlvara1 - SumRendTribHonorarios1
    RT2 = SumRendTribAlvara2 - SumRendTribHonorarios2
    RT3 = SumRendTribAlvara3 - SumRendTribHonorarios3
    RT4 = SumRendTribAlvara4 - SumRendTribHonorarios4
    RT5 = SumRendTribAlvara5 - SumRendTribHonorarios5


    let somasIRRF = {};

    Object.keys(dataAlvaras).forEach((key, index) => {
        let ano = extrairAno(dataAlvaras[key]);
        let rendimento = darfCorrigidos[`DarfCorrigido${index + 1}`];

        if (somasIRRF[ano]) {
            somasIRRF[ano] += rendimento;
        } else {
            somasIRRF[ano] = rendimento;
        }
    });

    let IRRF1 = somasIRRF[anosUnicosOrdenados[0]] || 0;
    let IRRF2 = somasIRRF[anosUnicosOrdenados[1]] || 0;
    let IRRF3 = somasIRRF[anosUnicosOrdenados[2]] || 0;
    let IRRF4 = somasIRRF[anosUnicosOrdenados[3]] || 0;
    let IRRF5 = somasIRRF[anosUnicosOrdenados[4]] || 0;

    let somasRazaoMes = {};

    Object.keys(dataAlvaras).forEach((key, index) => {
        let ano = extrairAno(dataAlvaras[key]);
        let rendimento = razaoMeses[`RazaoMes${index + 1}`];

        if (somasRazaoMes[ano]) {
            somasRazaoMes[ano] += rendimento;
        } else {
            somasRazaoMes[ano] = rendimento;
        }
    });

    let SumRazaoMes1 = somasRazaoMes[anosUnicosOrdenados[0]] || 0;
    let SumRazaoMes2 = somasRazaoMes[anosUnicosOrdenados[1]] || 0;
    let SumRazaoMes3 = somasRazaoMes[anosUnicosOrdenados[2]] || 0;
    let SumRazaoMes4 = somasRazaoMes[anosUnicosOrdenados[3]] || 0;
    let SumRazaoMes5 = somasRazaoMes[anosUnicosOrdenados[4]] || 0;

    const calcularIRPF = (ano, rt, razaoByAno, irrf) => {
        if (ano && rt && razaoByAno && irrf) {
            const faixa = tabelaIRRF[ano].find(f => rt >= f.faixa.inicio && rt <= f.faixa.fim);

            if (faixa) {
                const step1 = rt / razaoByAno;
                const step2 = step1 * (faixa.aliquota / 100);
                const step3 = step2 - faixa.deducao;
                const step4 = step3 * razaoByAno;

                return parseFloat(irrf) - parseFloat(step4);
            }
        }
        return null;
    };

    const IRPF1 = calcularIRPF(AnoExercicio1, RT1, SumRazaoMes1, IRRF1);
    const IRPF2 = calcularIRPF(AnoExercicio2, RT2, SumRazaoMes2, IRRF2);
    const IRPF3 = calcularIRPF(AnoExercicio3, RT3, SumRazaoMes3, IRRF3);
    const IRPF4 = calcularIRPF(AnoExercicio4, RT4, SumRazaoMes4, IRRF4);
    const IRPF5 = calcularIRPF(AnoExercicio5, RT5, SumRazaoMes5, IRRF5);

    const fetchSelicData = async (AnoExercicio1, AnoExercicio2, AnoExercicio3, AnoExercicio4, AnoExercicio5) => {
        try {
            const response = await axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados?formato=json');
            const data = response.data;

            data.sort((a, b) => new Date(b.data.split('/').reverse().join('-')) - new Date(a.data.split('/').reverse().join('-')));

            let acumulado = 1;
            const acumulados = data.map(item => {
                acumulado += parseFloat(item.valor);
                return { ...item, acumulado };
            });

            const findSelicByYear = (year) => acumulados.find(item => item.data.includes(`06/${year}`))?.acumulado || null;

            const TaxaSelic1 = findSelicByYear(AnoExercicio1);
            const TaxaSelic2 = findSelicByYear(AnoExercicio2);
            const TaxaSelic3 = findSelicByYear(AnoExercicio3);
            const TaxaSelic4 = findSelicByYear(AnoExercicio4);
            const TaxaSelic5 = findSelicByYear(AnoExercicio5);

            return {
                TaxaSelic1,
                TaxaSelic2,
                TaxaSelic3,
                TaxaSelic4,
                TaxaSelic5,
            };

        } catch (error) {
            console.error('Erro ao buscar os dados da API', error);
            throw error;
        }
    };

    

    try {
        const selicData = await fetchSelicData(AnoExercicio1, AnoExercicio2, AnoExercicio3, AnoExercicio4, AnoExercicio5);
        
        ValorRestituir1 = IRPF1 + (IRPF1 * (selicData.TaxaSelic1 / 100))
        ValorRestituir2 = IRPF2 + (IRPF2 * (selicData.TaxaSelic2 / 100))
        ValorRestituir3 = IRPF3 + (IRPF3 * (selicData.TaxaSelic3 / 100))
        ValorRestituir4 = IRPF4 + (IRPF4 * (selicData.TaxaSelic4 / 100))
        ValorRestituir5 = IRPF5 + (IRPF5 * (selicData.TaxaSelic5 / 100))
        
        resultado = ValorRestituir1 + ValorRestituir2 + ValorRestituir3 + ValorRestituir4 + ValorRestituir5;
    
    } catch (error) {
        console.error('Erro ao calcular a Taxa Selic', error);
    }

    return resultado;
}

module.exports = { calcular };
