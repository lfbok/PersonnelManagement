
export default {
    namespace : "home",
    state     : {
        login : null, //0不触发，1为成功，-1为失败
        smile : '' ,  //表情包
        my    : {}
    },
    reducers  :{
        login_c(state,{data}){
            if(data.result==-1){
                return {
                    ...state,
                    login:-1,
                    smile:"frown"
                }
            }else if(data.result==1){
                return {
                    ...state,
                    login:1,
                    smile:"smile",
                    my   : data.data
                }
            }
        }
    },
    effects   :{
        login:function*({values},{put}){
            var data = yield fetch('/login',{
                "method": "POST",
                credentials: 'include',
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(values)
            }).then((data)=> data.json())
           yield put({'type':'login_c',data})
        }
    }


}