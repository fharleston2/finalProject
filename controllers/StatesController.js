
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data; }
};


const getAllStates = (req, res) => {
        res.json(data.states);
    } 

const getState = (req, res) => {
        const stateCode = req.params.state.toUpperCase();
        const allStateCodes = data.states.map(state => state.code.toUpperCase());
        const state = data.states.find(state => state.code.toUpperCase() === stateCode);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(state);

        /* const state = data.states.find(state => state.code === req.params.state);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(state); */
    }


    module.exports ={
        getAllStates,
        getState
    }