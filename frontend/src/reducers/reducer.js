const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "INIT_USER":
            return action.payload
        default:
            return state
    }
}
export {userReducer}