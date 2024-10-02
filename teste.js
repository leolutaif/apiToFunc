const fs = require('fs');
const path = require('path');
const axios = require('axios');

function calcular({

}){

    let resultado;

    AnoExercicio1 = 2023;
    AnoExercicio2 = 2024;
    AnoExercicio3 = null;
    AnoExercicio4 = null;
    AnoExercicio5 = null;

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
    
    resultado = TaxaSelic1;

    return resultado;
}

module.exports = { calcular };

