const { get } = require('mongoose');

const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data; }
};


const getAllStates = (req, res) => {
        res.json(data.states);
    } 

const getState = (req, res) => {
    const allStateCodes = data.states.map(state => state.code.toUpperCase());
   
    const stateCode = req.params.state.toUpperCase();
        
    const state = data.states.find(state => state.code.toUpperCase() === stateCode);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(state);

        
    }

const getContigStates = (req, res) => {
       
    const contigStates = data.states.filter(state => !['HI', 'AK'].includes(state.code));
    res.json(contigStates);
    }

const getNonContigStates = (req, res) => {
        const nonContigStates = data.states.filter(state => ['HI', 'AK'].includes(state.code));
        res.json(nonContigStates);
    }   

 const getStateCapital = (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = data.states.find(state => state.code.toUpperCase() === stateCode);
        if (!state) {
            return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
        }
        res.json({ 
            state: state.state,
            capital: state.capital_city });
    }

const getStateNickname = (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = data.states.find(state => state.code.toUpperCase() === stateCode);
    if (!state) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }
    res.json({ 
        state: state.state,
        nickname: state.nickname });
}

const getStatePopulation = (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = data.states.find(state => state.code.toUpperCase() === stateCode);
    if (!state) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }
    const formatedPop = state.population.toLocaleString();
    res.json({ 
        state: state.state,
        population: formatedPop });
    }
const getStateAdmission = (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = data.states.find(state => state.code.toUpperCase() === stateCode);
    if (!state) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }
    res.json({ 
        state: state.state,
        admission: state.admission_date });
    }


    module.exports ={
        getAllStates,
        getState,
        getContigStates,
        getNonContigStates,
        getStateCapital,
        getStateNickname,
        getStatePopulation,
        getStateAdmission
    }