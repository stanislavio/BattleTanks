const initialState = {
    user: {
        id: null
    },
    login:{
        isPending: null,
        isError: null,
        isSuccess: null
    },
    register: {
        isPending: null,
        isError: null,
        isSuccess: null
    }, 
    game: {
        ctx: null,
        player: null
    }
}

export default initialState;