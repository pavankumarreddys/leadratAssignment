import { createStore } from 'redux';

const initialState = {
    totalTickets: 200,
    ticketType: '',
    ticketQty: '',
}

function reduxReducer(state = initialState, action) {
    switch (action.type) {
        case "totalTickets":
            return { ...state, totalTickets: state.totalTickets - -action.payload };
        case "ticketType":
            return { ...state, ticketType: action.payload }
        case "ticketQty":
            return { ...state, ticketQty: parseInt(action.payload) }
        default:
            return state
    }
}

const store = createStore(reduxReducer);
export default store;
