const { get } = require('mongoose');
const mongooseData = require('../model/states');
const State = mongooseData.model('State', mongooseData.stateSchema);

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
            return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
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

const createStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const funFact = req.body.funfact;
    

    if (!funFact || !Array.isArray(funFact)) {
        return res.status(400).json({ message: 'State fun facts must be an array' });
    }
    
    const state = await State.findOne({ code: stateCode }).exec();
    if (!state) {
        const newState = await State.create({
             code: stateCode,
             funfact: funFact 
            });
        console.log('State created successfully');
        res.status(201).json({ newState });
    }
    else {
        for (let i of funFact) {
        state.funfact.push(i);    
        };
        //state.funfact.push(funFact);
        await state.save();
        console.log('Fun fact added successfully');
        res.status(201).json({ state });
    }
    

    

    
}

   
//}

    module.exports ={
        getAllStates,
        getState,
        getContigStates,
        getNonContigStates,
        getStateCapital,
        getStateNickname,
        getStatePopulation,
        getStateAdmission,
        createStateFunFact
    }