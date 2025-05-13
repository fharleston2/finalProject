const { get } = require('mongoose');
const mongooseData = require('../model/states');
const State = mongooseData.model('State', mongooseData.stateSchema);

const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data; }
};


const getAllStates = async (req, res) => {
    let result = [];
    let match = false;
    const statesMongo = await State.find().exec();
    
        for (let i of data.states) {
            for (let j of statesMongo) {
                if (i.code === j.code) {
                    let stateWithFunFact = {
                        ...i,
                        funfacts: j.funfacts
                    }
    
         result.push(stateWithFunFact); 
         match = true;   
                } else {
                    match = false;
                }     
                      
            }
            if (!match) {
            result.push(i);}
            
        }
    console.log(result.length);
        res.json(result);
}

const getState = async (req, res) => {
    const allStateCodes = data.states.map(state => state.code.toUpperCase());
   
    const stateCode = req.params.state.toUpperCase();
        
    const state = data.states.find(state => state.code.toUpperCase() === stateCode);
        if (!state) {
            return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
        }
        const stateMongo = await State.findOne({ code: stateCode }).exec();
        if (!stateMongo) {
            return res.json(state);
        }else {
        const stateFunFact = stateMongo.funfacts;
        const stateWithFunFact = {
            ...state,
            funfacts: stateFunFact
        }   
        res.json(stateWithFunFact);
    }

        
    }

    const getStateFunFact = async (req, res) => {
        const stateCode = req.params.state.toUpperCase();
    
        const state = await State.findOne({ code: stateCode }).exec();
        if (!state) {
            return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
        } else {
            if (state.funfacts.length === 0) {
                return res.status(404).json({ message: 'No fun facts found for this state' });
            }
            res.json({ 
                
                funfacts: state.funfacts });
        }
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
        admitted: state.admission_date });
    }

const createStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const funFact = req.body.funfacts;
  

    if (!funFact) {
        return res.status(400).json({ message: 'State fun facts value required' });
    }
    if (!Array.isArray(funFact)) {
        return res.status(400).json({ message: 'State fun facts value must be an array' });
    }
    
    const state = await State.findOne({ code: stateCode }).exec();
    if (!state) {
        const newState = await State.create({
             code: stateCode,
             funfacts: funFact 
            });
        console.log('State created successfully');
        await newState.save();
        res.status(200).json({ 
            _id: newState._id,
            stateCode: newState.code,
            funfacts: newState.funfacts,
            __v: newState.__v });
    }
    else {
        for (let i of funFact) {
            console.log(i);
            console.log(typeof i);
            state.funfacts.push(i);    
        };
        //state.funfact.push(funFact);
        await state.save();
        console.log('Fun fact added successfully');
        res.status(200).json({ 
            _id: state._id,
            stateCode: state.code,
            funfacts: state.funfacts,
             __v: state.__v });
    }
    

    

    
}

const updateStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const funFact = req.body.funfact;
    let index = req.body.index;
    index = index - 1;
    console.log(index);
    if (!index) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }
    if (!funFact || !(typeof funFact == "string")) {
        return res.status(400).json({ message: 'State fun fact value required' });
    }
    const state = await State.findOne({ code: stateCode }).exec();
    if (!state) {
        const stateLocal = data.states.find(state => state.code.toUpperCase() === stateCode);
        return res.status(404).json({ message: 'No Fun Facts found for ' + stateLocal.state});
    }
    
    if (index < 0 || index >= state.funfacts.length || !state.funfacts[index]) {
        const stateLocal = data.states.find(state => state.code.toUpperCase() === stateCode);
        return res.status(404).json({ message: 'No Fun Fact found at the index for ' + stateLocal.state});
    }
    if (!state.funfacts) {
        return res.status(404).json({ message: 'No Fun Facts found for ' + state.state});
    }
    state.funfacts[index] = funFact;
    await state.save();
    res.status(200).json(state);

   
}

const deleteStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase(); 
    let index = req.body.index;
    index = index - 1;
    if (!index) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }
    const state = await State.findOne({ code: stateCode }).exec();
    if (!state.funfacts) {
        const stateLocal = data.states.find(state => state.code.toUpperCase() === stateCode);
        return res.status(404).json({ message: 'No Fun Facts found for ' + stateLocal.state});
    }
    if (index < 0 || index >= state.funfacts.length || !state.funfacts[index]) {
        const stateLocal = data.states.find(state => state.code.toUpperCase() === stateCode);
        return res.status(404).json({ message: 'No Fun Fact found at the index for ' + stateLocal.state});
    }
    state.funfacts.splice(index, 1);
    await state.save();
    res.status(200).json(state);
}
    module.exports ={
        getAllStates,
        getState,
        getContigStates,
        getNonContigStates,
        getStateCapital,
        getStateNickname,
        getStatePopulation,
        getStateAdmission,
        createStateFunFact,
        getStateFunFact,
        updateStateFunFact,
        deleteStateFunFact
    }