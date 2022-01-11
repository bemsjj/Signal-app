const initState = {
    posts : [],
    isAuth : false,
    user : null,
    users : null,
}

const rootReducer = (state = initState,action) => {
    if(action.type == "SET_SESSIONS"){
        state.isAuth = action.value;
    }

    if(action.type == "SET_USER_DATA"){
        state.user = action.value;
    }

    if(action.type == "SET_USER_LISTS"){
        state.users = action.value;
    }

    return state;
}

export default rootReducer;