export default {
    namespace: "core",
    state: {
        protagonist: {},//admin
        staff: [],//当前页的数据
        page :null,//当前页
        pagesize :null,//每页多少条
        search:{},//搜索条件
        staffAll:1,//数据库总条数
        Staffdetails:{},//当前角色-edit
        todolist: [{
                entry: '入职确认',
                numberofpeople: 10,
                day: 7
            },
            {
                entry: '参保确认',
                numberofpeople: 3,
                day: 7
            },
            {
                entry: '转正确认',
                numberofpeople: 5,
                day: 7
            },
            {
                entry: '调薪确认',
                numberofpeople: 2,
                day: 7
            },
            {
                entry: '离职确认',
                numberofpeople: 1,
                day: 7
            },
            {
                entry: '退保确认',
                numberofpeople: 1,
                day: 7
            }
        ],
        modification: [{
                entry: '本月入职',
                numberofpeople: 2000
            },
            {
                entry: '待加入社保',
                numberofpeople: 2000
            },
            {
                entry: '待加入计薪',
                numberofpeople: 2000
            },
            {
                entry: '待退出计薪',
                numberofpeople: 1
            },
            {
                entry: '本月离职',
                numberofpeople: 1
            },
            {
                entry: '待退出社保',
                numberofpeople: 1
            }
        ],
        organizationalstructure: {
            "value": "本公司",
            "label": "本公司",
            'children': [{
                    "value": "IT部",
                    "label": "IT部",
                    'children': [{
                        "value": "金融事业",
                        "label": "金融事业",
                        'children': [{
                            "value": "事业子级",
                            "label": "事业子级"
                        }]
                    }]
                },
                {
                    "value": "业务",
                    "label": "业务",
                    'children': [{
                        "value": "业务子级",
                        "label": "业务子级",
                        'children': [{
                            "value": "业务下",
                            "label": "业务下"
                        }]
                    }]
                }
            ]
        },
        monthactivity: [],//日历活动

    },
    reducers: {
        addmonthactivity_c(state, list) {
            if (!list.list.date) {
                return state
            }
            return {
                ...state,
                monthactivity: [
                    ...state.monthactivity,
                    {
                        date: list.list.date,
                        listData: [
                            { 'type': list.list.mold, 'content': list.list.substance }
                        ]

                    }
                ]
            }
        },
        getmonthactivity_c(state, {data}) {
            return {
                ...state,
                monthactivity: data
            }
        },
        getAlluser_c(state,data){
            return{
                ...state,
                staffAll:data.data.allLength,
                staff:data.data.result,
                page :data.parameter.page,
                pagesize :data.parameter.pagesize
            }
        },
        sou_c(state,{data,sub}){
            return{
                ...state,
                staffAll:data.allLength,
                staff:data.result,
                search:sub.sub
            }
        },
        edituser_c(state,{data}){
            return{
                ...state,
                Staffdetails:data

            }
        },
        editadmin_c(state,{data}){
            var as = data
            as.login=1
            return{
                ...state,
                protagonist:as

            }
        },
        particular_c(state,{data}){
            return {
                ...state,
                Staffdetails:data
            }
        },
        online_c(state,{data}){
            if(data.result==1){
                let protagonist = data.data
                protagonist.login=1
                return {
                    ...state,
                    protagonist
                }
            }else{
               return {
                    ...state,
                    protagonist:{
                        login:0
                    }
                }
            }
        },
        outLgoin_c(state){
            return {
                ...state,
                protagonist:{}
            }
        },
        importUser_c(state,{data}){
            return {
                ...state,
                staffAll:data.result
            }
        }
    },
    effects: {
        addmonthactivity: function*(list, { put }) {
           var data =  yield fetch('/addmonthactivity', {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(list)
            }).then((data)=>data.json())
            yield put({ 'type': 'addmonthactivity_c', list })
        },
        getmonthactivity: function*(list, { put }) {
            var data = yield fetch('/a').then((data) => { return data.json() })
            yield put({ 'type': 'getmonthactivity_c', data })
        },
        sou: function*(sub, { put }) {
             var data = yield fetch('/sou',{
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(sub)
            }).then(function(result) {
                return result.json()
            })
            yield put({ 'type': 'sou_c', data,sub})
        },
        addemploy: function*(data, { put }) {
            var data = yield fetch('/addemploy', {
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(data.sub)
            }).then(function(result) {
                return result.json()
            })
            console.log(data)
        },
        getAlluser:function*(parameter, { put }) {
            var data = yield fetch('/getAlluser',{
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(parameter)
            }).then(function(result) {
                return result.json()
            })
            yield put({ 'type': 'getAlluser_c', data ,parameter})
        },
        edituser:function*(editnext, { put }) {
            var data = yield fetch('/edituser',{
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify({'editnext':JSON.stringify(editnext.data),'id':editnext.id})
            }).then(function(result) {
                return result.json()
            })
            yield put({ 'type': 'edituser_c',data})
        },
        particular:function*({idnumber}, { put }) {
            var data = yield fetch('/particular',{
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify({'id':idnumber})
            }).then(function(result) {
                return result.json()
            })
            yield put({ 'type': 'particular_c',data})
        },
        online:function*(empty,{put}){
            var data = yield fetch('/online',{
                 "method": "GET",
                credentials: 'include',
            }).then((data)=> data.json())
             yield put({ 'type': 'online_c',data})
        },
        outLgoin:function*(empty,{put}){
            var data = yield fetch('/outLgoin',{
                 "method": "GET",
                credentials: 'include',
            }).then((data)=> data.json())
            yield put({ 'type': 'outLgoin_c'})
        },
        initTodo:function*(empty,{put}){
            var data = yield fetch('/initTodo',{
                 "method": "POST",
                credentials: 'include',
            }).then((data)=> data.json())
            console.log(data)
        },
        editadmin:function*(editnext,{put}){
            var data = yield fetch('/editadmin',{
                "method": "POST",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify({'editnext':JSON.stringify(editnext.data),'id':editnext.id})
            }).then(function(result) {
                return result.json()
            })
            yield put({ 'type': 'editadmin_c',data})
        },
        importUser:function*({users},{put}){
            var data = yield fetch('/importUser',{
                'method':"POST",
                'headers':{
                    'Content-Type':'application/json'
                },
                'body':JSON.stringify({users})
            }).then((data)=>data.json())
             yield put({ 'type': 'importUser_c',data})
        }

    }
}