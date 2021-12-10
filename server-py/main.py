# # web框架
# from flask import (
#     Flask,
#     render_template,
#     request,
#     redirect,
#     # 传JSON
#     jsonify,
#     # 跨域
#     Response
# )
# # 跨域（更好用）
# from flask_cors import cross_origin

# web框架
from flask import Flask
# 用户路由
from route.user import userApp as userRoute

# 实例化
app = Flask (__name__)

# app.secret_key = 'reandom str'

app.register_blueprint (userRoute, url_prefix='/user')

 
# @app.route('/cors', methods=['GET', 'POST'])
# @cross_origin()
# def cors():
#     print ('GET参数：', request.args.get('username'))
#     # Content-Type为multipart/form-data
#     print ('POST参数1：', request.form.get('username'))
#     # Content-Type为application/x-www-form-urlencoded
#     print ('POST参数2：', request.values.get('username'))
#     # Content-Type为 application/json
#     # print ('POST参数3：', request.json.get('username'))
#     res = Response('get8081 ok by Access-Control-Allow')
#     ip = request.remote_addr
#     return jsonify({'ip': ip})

def main ():
    # 启动服务器
    config = dict (
        debug = True,
        host = '0.0.0.0',
        port = 2333,
    )
    app.run (**config)

if __name__ == '__main__':
    main ()