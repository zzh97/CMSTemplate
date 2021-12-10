import { reactive } from 'vue'
// import router from '../router'
import MsgBox from '../components/MsgBox.vue'

const baseUrl = 'http://127.0.0.1:2333'

const zh = {
    // 我人傻了，这个globalProperties不知道怎么做类型注释
    install(app: { component: Function, config: { globalProperties: any } }) {
        app.component('MsgBox', MsgBox)
        let zhOrigin = {
            menu: [
                {
                    url: '/User',
                    tag: '用户管理',
                    isActive: true,
                },
                {
                    url: '/Home',
                    tag: '学籍管理',
                },
                {
                    url: '/About',
                    tag: '课程管理',
                },
            ],
            tags: [],
            // 生成时间（形如：2020/1/4 15:16:37）
            get_time: function () {
                let dat = new Date(); //生成日期
                let y = dat.getFullYear(); //取得年
                let m = dat.getMonth() + 1; //取得月,js从0开始取,所以+1
                let d = dat.getDate(); //取得天
                let h = dat.getHours(); //取得小时
                let mi = dat.getMinutes(); //取得分钟
                let s = dat.getSeconds(); //取得秒
                let time = y + "/" + m + "/" + d + " " + h + ":" + mi + ":" + s;
                return time;
            },
            // 自定义输出语句（输出日志）
            log: function (...a: any) {
                let time = this.get_time();
                // 接受到的动态参数
                let arg = a;
                // 从0开始，删除0个，添加tiem
                arg.splice(0, 0, time);
                // 把arg作为参数来运行log
                console.log.apply(console, arg);
            },
            isDown: false,
            isDel: false,
            // 移动元素（返回相对位置）
            move_element(moveEvent: Function) {
                // let isDown = false
                let downX = 0
                let downY = 0
                let moveX = 0
                let moveY = 0
                const mouseDownEvent = (e: { clientX: number, clientY: number }) => {
                    // isDown = true
                    downX = e.clientX
                    downY = e.clientY
                    // 要初始化一下move，否则第一次移动必为负数
                    moveX = e.clientX
                    moveY = e.clientY
                }
                const mouseMoveEvent = (e: { clientX: number, clientY: number }) => {
                    if (zhOrigin.isDown) {
                        moveX = e.clientX
                        moveY = e.clientY
                        let relationX = moveX - downX
                        let relationY = moveY - downY
                        moveEvent(relationX, relationY)
                    }
                    if (zhOrigin.isDel) {
                        window.removeEventListener('mousedown', mouseDownEvent)
                        window.removeEventListener('mousemove', mouseMoveEvent)
                    }
                }

                window.addEventListener('mousedown', mouseDownEvent)
                window.addEventListener('mousemove', mouseMoveEvent)
                window.addEventListener('mouseup', (e: { clientX: number, clientY: number }) => {
                    zhOrigin.isDown = false
                })

            },
            // body中加一个div，用于挂载dom
            init_dom() {
                document.body.innerHTML += ('<div id="zhDom" style="position: fixed; top:0; left:0; display: flex; justify-content: center; align-items: center; width: 100vw"></div>')
            },
            id: 0,
            isMsg: false,
            // 消息
            msg_box(msg: string, time: number = 2000) {
                // 最多一趟只能加100个（即msgbox的id是1到100）
                if (zhOrigin.id++ > 99) {
                    zhOrigin.id = 1
                }

                // 自动删除，默认2000ms
                const del_self = function (id: number) {
                    setTimeout(() => {
                        let a: any = document.getElementById('box') as HTMLElement
                        let b: any = document.getElementById(`msgBox${id}`) as HTMLElement;
                        b.style = `opacity:0; transition: opacity .5s; margin-top:1rem; z-index: 99`;
                        setTimeout(() => {
                            a.removeChild(b)
                        }, 500)
                    }, time)

                }

                // click事件 (暂时不用，因为会和自动删除起冲突，处理起来有些麻烦)
                const del = `let a = document.getElementById('zhDom');
                let b = document.getElementById('msgBox${zhOrigin.id}');
                b.style = 'opacity:0; transition: opacity .5s; z-index: 99';
                setTimeout(() => {
                    a.removeChild(b)
                }, 500);`

                let zhDom: any = document.getElementById('zhDom') as HTMLElement

                // 第一次使用时，外面会套一层div，用于文档流布局
                if (!zhOrigin.isMsg) {
                    let node: any = document.createElement("div")
                    node.id = 'box'
                    node.style = 'position:absolute; top:0;'
                    zhDom.appendChild(node)
                    // appendChild比innerHTML性能高，只是不方便
                    // zhDom.innerHTML = '<div id="box">45645</div>'
                    zhOrigin.isMsg = true
                }

                // 不能直接box.innerHTML，在边(自动)删除边增加的时候，removeChild会报错
                let box: any = document.getElementById('box') as HTMLElement
                let node: any = document.createElement("div")
                node.id = 'msgBox' + zhOrigin.id
                node.style = 'opacity:0; transition:opacity 0.5s; margin-top:1rem; z-index:99'
                // node.innerHTML += `<div id="msg${zhOrigin.id}" style="opacity:0; transition: opacity 0.5s; display: flex; justify-content: center; align-items: center; width: 100vw; z-index: 99">
                //     <div style="display: flex; padding: 0.5rem 1rem; max-width:calc(100vw - 3rem ); background: #ACC; border-radius: 0.4rem;">
                //         <div style="min-width: 20rem; font-size: 1.4rem">${msg}</div>
                //         <div style="display: flex; justify-content: center; align-items: center; width: 2rem; cursor:pointer;" onclick="${del}">x</div>
                //     </div>
                // </div>`
                node.innerHTML += `
                    <div style="display:flex; padding:0.5rem 1rem; max-width:calc(100vw - 3rem ); background:rgba(0,0,0,0.5); border-radius: 0.4rem;">
                        <div style="min-width:20rem; color:#fff; font-size:1.4rem; text-align:center">${msg}</div>
                    </div>
                `
                box.appendChild(node)

                // 渐进浮现的动画
                let msgBox: any = document.getElementById(`msgBox${zhOrigin.id}`)
                setTimeout(() => {
                    msgBox.style = `opacity:1; transition:opacity 0.5s; margin-top:1rem; z-index:99"`
                }, 100)

                del_self(zhOrigin.id)
            },
            // 存入seesion
            set_storage(key:string, value:any) {
                sessionStorage.setItem(key, value)
            },
            // 取出seesion
            get_storage(key:string, isJSON:boolean = false) {
                let value:string = sessionStorage.getItem(key) as string
                if (isJSON) {
                    value = JSON.parse(value)
                }
                return value
            },
            // ajax配置
            ajaxSystem: {
                timeout: 30000,
                // 请求拦截器
                intercept_request(xhr: XMLHttpRequest) { },
                // 响应拦截器
                intercept_response(res: {code:number, data:JSON, info:string}, resolve:Function, reject:Function) {
                    resolve(res.data)
                },
            },
            // AJAX请求
            ajax(parms: any) {
                let { url, method = 'POST', data = {}, responseType = 'json' } = parms
                method = method.toLocaleUpperCase()
                responseType = responseType.toLocaleUpperCase()
                // Promise链式语法
                return new Promise((resolve, reject) => {
                    // 1.创建Ajax对象（非IE6）
                    let xhr = new XMLHttpRequest();
                    // oAjax = new ActiveXObject('Microsoft.XMLHTTP')
                    if (responseType == 'BLOB') {
                        xhr.responseType = "blob";//该属性必须设置
                    }
                    if (method == 'GET' || method == 'DELETE') {
                        // {a:1, b:2} -> '?a=1&b=2'
                        let getData = '?'
                        for (let key in data) {
                            let value = data[key]
                            // null undefind '' []都传空
                            if (!value && value !== 0) {
                                value = ''
                            }
                            getData += (key + '=' + value + '&')
                        }
                        // 截掉末尾的&
                        getData = getData.slice(0, -1)
                        // console.log(getData)
                        // 2.连接服务器，如果要加时间戳：new Date().getTime()
                        xhr.open(method, baseUrl + url + getData, true)
                        // 请求拦截器
                        zhOrigin.ajaxSystem.intercept_request(xhr)
                        // 头部token
                        let token: string = zhOrigin.get_storage('token')
                        xhr.setRequestHeader('Authorization', token)
                        // 3.发生请求
                        xhr.send()
                    } else {
                        // 2.连接服务器，如果要加时间戳：new Date().getTime()
                        xhr.open(method, baseUrl + url, true)
                        // 请求拦截器
                        zhOrigin.ajaxSystem.intercept_request(xhr)
                        // 3.发生请求
                        // POST请求要添加Content-Type
                        xhr.setRequestHeader('Content-Type', 'application/json')
                        // 头部token
                        let token: string = zhOrigin.get_storage('token')
                        xhr.setRequestHeader('Authorization', token)
                        xhr.send(JSON.stringify(data))
                    }
                    // 设置超时时间
                    let timer = setTimeout(() => {
                        // xhr请求被终止，并且status为0
                        xhr.abort()
                        clearInterval(timer)
                    }, zhOrigin.ajaxSystem.timeout)
                    // 4.接受返回
                    xhr.onreadystatechange = () => {
                        // 0-还没open，1-开始send，2-send完成，3-解析res，4-解析完成
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                let res = xhr.response
                                if (responseType == 'JSON') {
                                    res = JSON.parse(res)
                                    // 响应拦截器
                                    zhOrigin.ajaxSystem.intercept_response(res, resolve, reject)
                                    // resolve(res.data)
                                }
                                // blob的情况
                                else {
                                    //获取文件名
                                    let fileStr = xhr.getResponseHeader("content-disposition") as string
                                    let fileName = fileStr.split(";")[1].split("=")[1]
                                    //响应头中的内容如果包含中文会出现乱码，需要解码才能正常显示
                                    let explorer = navigator.userAgent
                                    //IE和google浏览
                                    if (explorer.indexOf("MSIE") >= 0 || explorer.indexOf("Chrome") >= 0) {
                                    fileName = decodeURIComponent(fileName)
                                    } else {
                                    fileName = decodeURI(escape(fileName))
                                    }
                                    // 这行可有可无（暂不知其作用，可以是针对大数据量）
                                    res = new Blob([res])
                                    let newRes = {
                                    data: res,
                                    name: fileName
                                    }
                                    resolve(newRes)
                                }
                            } else {
                                let err = 'unknow'
                                if (xhr.status == 0) {
                                    err = 'timeout'
                                    zhOrigin.msg_box('远程服务器尚未启动，请稍后使用')
                                }
                                console.error('Error: ' + err)
                                reject(xhr.status)
                            }
                        }
                    }
                })
            },
            // fetch请求
            fetch(parms: { url: string, method: string, data: any, success: Function, fail: Function }) {
                let { url, method = 'POST', data = {}, success = () => { }, fail = () => { } } = parms
                let body: string | null = JSON.stringify(data)
                if (method == 'GET') {
                    body = null
                }
                fetch(url, {
                    method,
                    body,
                })
                    .then(response => response.json())
                    .then(json => success(json))
                    .catch(err => fail(err));
            },
            // websockter
            ws(parms: { url: string, data: any, onopen: Function, onmessage: Function, onclose: Function }) {
                let { url, data = {}, onopen = () => { }, onmessage = () => { }, onclose = () => { } } = parms
                let wsBase = baseUrl.split('://')[1]
                const ws = new WebSocket('ws://' + wsBase + url)
                ws.onopen = () => {
                    this.log("Websocket链接已创建")
                    let msg = 'Hello'
                    this.log("我方：", msg)
                    ws.send(msg)
                    onopen()
                }
                ws.onmessage = (evt) => {
                    this.log("对方：" + evt.data)
                    this.log("我方请求关闭连接")
                    onmessage()
                    ws.close();
                }
                ws.onclose = (evt) => {
                    console.log("Websocket链接已关闭");
                    onclose()
                }
            },
            // 生成手机号（位数，开头是否可以为0）
            getPhone(n: number, not_zero = false) {
                let phone = "";
                for (let i = 0; i < n; i++) {
                    phone += Math.floor(Math.random() * 10);
                }
                while (phone[0] == "0" && not_zero) {
                    phone = Math.floor(Math.random() * 10) + phone.substr(1);
                }
                return phone;
            },
            // 把'15591950177'转为'1559****177'（与游戏内规则一致）
            phone_shadow(phone: string) {
                let phoneArr = phone.split("");
                let num = Math.round(phoneArr.length / 3);
                for (let i = num; i < num * 2; i++) {
                    phoneArr[i] = "*";
                }
                let phoneStr = phoneArr.join("");
                return phoneStr;
            },
            // 文字超出者隐藏
            hide_words: function (str: string, n = 12) {
                let newStr = str
                if (str.length > n) {
                    newStr = str.slice(0, n) + '...'
                }
                return newStr
            },
            // 单数组去重
            arrayAlone(arr:[]) {
                let indexArr:[] = []
                arr.forEach(e => {
                    let isPush = true
                    for (let i = 0; i < indexArr.length; i++) {
                        if (e == indexArr[i]) {
                            isPush = false
                            break
                        }
                    }
                    if (isPush) {
                        indexArr.push(e)
                    }
                })
                return indexArr
            },
            // 二数组去重（a中取掉b）
            repeating_check(a:[] = [], b:[] = [], key:any) {
                let c:[] = []
                for (let i = 0; i < a.length; i++) {
                let isPush = true
                for (let j = 0; j < b.length; j++) {
                    if (a[i][key] == b[j][key]) {
                    isPush = false
                    break;
                    }
                }
                if (isPush) {
                    c.push(a[i])
                }
                }
                return c
            },
            // 判断手机号合法性
            isPhone(str:string) {
                let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
                if (reg.test(str)) {
                return true
                } else {
                return false
                }
            },
            // 判断中文（几到几位）
            isChinese(str:string, m:number, n:number) {
                let regStr = `^[\\u4E00-\\u9FA5]{${m},${n}}$`
                let reg = new RegExp(regStr)
                if (reg.test(str)) {
                return true
                } else {
                return false
                }
            },
            
        }
        // 在body中创建一个div用于msgbox
        zhOrigin.init_dom()
        const zh_data = reactive(zhOrigin)
        app.config.globalProperties.$zh = zh_data
        // 挂载到window底下
        // window.zh = zh_data
    }
}

export default zh;