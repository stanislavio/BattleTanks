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
        player: null, 
        map: null
    }, 
    admin:{
        isPending: null,
        isError: null,
        isSuccess: null, 
        maps: null
    }
}

export default initialState;