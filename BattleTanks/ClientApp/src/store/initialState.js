const initialState = {
    user: {
        id: null
    },
    loading:{
      info: []  
    },
    login:{
        isPending: false,
        isError: false,
        isSuccess: false
    },
    register: {
        isPending: false,
        isError: false,
        isSuccess: false
    }, 
    game: {
        isPending: true,
        isError: false,
        isSuccess: false,
        ctx: null,
        player: null, 
        map: null
    }, 
    tanks:{
        isPending: false,
        isError: false,
        isSuccess: false, 
        data: null
    },
    admin:{
        isPending: false,
        isError: false,
        isSuccess: false, 
        maps: null
    },
    users: {
        isPending: true,
        isError: false,
        isSuccess: false,
        data: null 
    }
}

export default initialState;