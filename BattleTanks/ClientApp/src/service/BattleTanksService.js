
export default class BattleTanksService{

    _baseUrl = 'api/'


    //Get methods

    getMap = async (id) => {
        return await this.getResource('map/get?id='+id);
    }

    getResource = async (url) => {
        const res = await fetch(this._baseUrl + url, {
            method: "get",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
        });
        if (!res.ok) {
            return {
                error:
                {
                    ErrorCode: res.status,
                    massage: await res.statusText
                }
            }
        }
        return await res.json();
    }



    //Set methods

    //#region Auth

    setLogin = async (data) => {
        const res = await this.setResource('authentication/login', data);
        if (!res.ok) {
            return { error: await res.text() };
        }
        return await res.json();
    }

    setRegister = async (data) => {
        const res = await this.setResource('authentication/register', data);
        if (!res.ok) {
            return { error: await res.text() };
        }
        return res;
    }

    setConfirmEmail = async (data) =>{
        const res = await this.setResource(`authentication/verify/${data.id}/${data.token}`);
        if (!res.ok) {
            return { error: await res.text() };
        }
        return await res.json();
    }

    //#endregion

    setResource = (url, data) => fetch(
        this._baseUrl + url,
        {
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
            body: JSON.stringify(data)
        }
    );

    setResourceWithData = (url, data) => fetch(
        this._baseUrl + url,
        {
            method: "post",
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }),
            body: data
        }
    );

    addMap = async (data) => {
    console.log(data);
    let file = new FormData();
    
    if(data.image != null){
    file.append('Photo', data.image.file);
    }
    file.append('Coordinates', data.coordinates);
   
    const res = await this.setResourceWithData('map/add', file);
    if (!res.ok) {
        return { error: await res.text() };
    }
    return res;
    }
}