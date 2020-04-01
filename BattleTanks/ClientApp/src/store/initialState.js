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
        ctx: null,
        players: {
            isPending: true,
            isError: false,
            isSuccess: false,
            data: []
        }, 
        map: {
            isPending: true,
            isError: false,
            isSuccess: false,
            data: null
        }
    }, 
    tanks:{
        isPending: true,
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
    },
    maps: {
        isPending: true,
        isError: false,
        isSuccess: false,
        data: null 
    },
    findGame: {
        isPending: true,
        isError: false,
        isSuccess: false,
        data: null 
    },
    infoStatus: {
        isPending: false,
        isError: false,
        isSuccess: false,
        data: null
    },
    hub: null
}

export default initialState;