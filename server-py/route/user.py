# web框架
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    # 传JSON
    jsonify,
    # 跨域
    Response,
    # 路由模块化
    Blueprint
)
# 跨域（更好用）
from flask_cors import cross_origin
from api.db import *
# 取时间
import time

userApp = Blueprint('user', __name__)
res200 = {'code': 200, 'data': {}, 'info': '请求成功'}

@userApp.route('/')
def index():
    return b'<h1>hello</h1>'


# 登录
@userApp.route('/login', methods=['POST'])
@cross_origin()
def login():
    print('请求方法：', request.method)
    username = request.json.get('username')
    password = request.json.get('password')
    print('请求数据:', f'username:{username}, password:{password}')
    options = {
        'username': username,
        'password': password,
    }
    result = see_data('user', options)['list']
    res = res200
    if len(result) > 0:
        res['data'] = {'isSuccess': True, 'msg': f'{username}登录成功'}
    else:
        res['data'] = {'isSuccess': False, 'msg': '登录失败'}
    print('响应数据:', res)
    return res


# 注册
@userApp.route('/signUp', methods=['POST'])
@cross_origin()
def signUp():
    print('请求方法:', request.method)
    username = request.json.get('username')
    password = request.json.get('password')
    phone = request.json.get('phone')
    power = request.json.get('power')
    format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    createTime = time.strftime(format, value)
    print(
        '请求数据:', f'username:{username}, password:{password}, phone:{phone}, power:{power}')
    options = {
        'username': username
    }
    result = see_data('user', options)['list']
    res = res200
    if len(result) == 0:
        someUser = {
            'username': username,
            'password': password,
            'phone': phone,
            'createTime': createTime,
            'power': power,
        }
        add_data('user', someUser)
        res['data'] = {'isSuccess': True, 'msg': f'成功注册{username}'}
    else:
        res['data'] = {'isSuccess': False, 'msg': '账号已存在'}
    print('响应数据:', res)
    return jsonify(res)


# 用户列表
@userApp.route('/getUserList', methods=['GET'])
@cross_origin()
def getUserList():
    print('请求方法:', request.method)
    keyword = request.args.get('keyword')
    pageIndex = int(request.args.get('pageIndex'))
    print('请求数据:', f'keyword:{keyword}, pageIndex:{pageIndex}')
    # 或运算 + 正则
    options = {
        '$or': [
            {'username': {'$regex': keyword}},
            {'phone': {'$regex': keyword}}
        ]
    }
    skipNum = 10 * (pageIndex-1)
    print(skipNum)
    result = see_data('user', options, skip=skipNum, limit=10)
    userList = result['list']
    total = result['total']
    res = res200
    res['data'] = {'userList': userList,'totalNum': total, 'msg': f'总计{len(userList)}条'}
    print('响应数据:', res)
    # time.sleep(10)
    return jsonify(res)


# 删除用户
@userApp.route('/delSomeUser', methods=['GET'])
@cross_origin()
def delSomeUser():
    print('请求方法:', request.method)
    username = request.args.get('username')
    print('请求数据:', f'username:{username}')
    options = {
        'username': username
    }
    result = see_data('user', options)['list']
    res = res200
    if len(result) == 0:
        res['data'] = {'isSuccess': False, 'msg': '账号不存在'}
    else:
        del_data('user', options)
        res['data'] = {'isSuccess': True, 'msg': f'{username}成功删除'}
    print('响应数据:', res)
    return jsonify(res)


# 重置用户密码
@userApp.route('/initSomeUser', methods=['GET'])
@cross_origin()
def initSomeUser():
    print('请求方法:', request.method)
    username = request.args.get('username')
    print('请求数据:', f'username:{username}')
    options = {
        'username': username
    }
    changes = {
        'password': '123456'
    }
    result = see_data('user', options)['list']
    res = res200
    if len(result) == 0:
        res['data'] = {'isSuccess': False, 'msg': '账号不存在'}
    else:
        set_data('user', options, changes)
        res['data'] = {'isSuccess': True, 'msg': f'{username}成功重置密码'}
    print('响应数据:', res)
    return jsonify(res)
