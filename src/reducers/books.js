export default (state = [], action) => {
    switch(action.type) {
        case 'ADD_BOOK':
            return [
                ...state,
                action.id
            ]
        case 'CLEAR_BOOKS':
            return []
        default:
            return state
    }
}