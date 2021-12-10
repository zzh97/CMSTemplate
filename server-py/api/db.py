# MongoDB
import pymongo

'''
函数集
'''

# 自定义输出
def log (*args, **kwargs):
    import time
    format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(format, value)
    # print (dt, *args, **kwargs )
    # 'a'表示追加
    with open ('log/log.txt', 'a', encoding='utf-8') as f:
        print (dt, *args, file=f, **kwargs)
    # # 反着写
    # with open ('log/log.txt', 'r+', encoding='utf-8') as f:
    #     old = f.read()
    #     # 文件指针指向头部
    #     f.seek(0)
    #     # 先写新的
    #     print (dt, *args, file=f, **kwargs )
    #     # 后写旧的
    #     f.write(old)

# 连接MongoDB
def link_mongo ():
    # 连接MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    log ('连接成功:', client)
    # client相当于一个dict
    return client

# 打开libName库
def open_lib (libName):
    client = link_mongo ()
    # 打开libName（不存在则自动创建，不过不是现在）
    db = client[libName]
    log (f'打开{libName}库:', db)
    return db

# 链接数据库
db = open_lib ("myMongo")

# 在tableName表中插入一条记录
# INSERT INTO tableName VALUES recode
def add_data (tableName, recode):
    # 插入一条数据（此时会创建libName）
    db[tableName].insert(recode)
    log ('插入数据:', recode)

# 在tableName表中删除option条件下的记录
# DELETE FROM tableName WHERE option
def del_data (tableName, option):
    # 满足opotion条件的都会被删除
    db[tableName].remove(option)
    log ('删除数据:', option)

# 在tableName表中修改option条件下的记录为change值
# UPDATE option SET change WHERE tableName
def set_data (tableName, option, change):
    setChange = {
        '$set': change
    }
    # 默认之后修改第一个匹配的记录
    db[tableName].update(option, setChange)
    log ('修改数据:', option, change)

# 在tableName表中查找option条件下的记录（默认不显示id）
# SELECT option FROM tableName
def see_data (tableName, option, field={'_id' : 0}, skip=0, limit=0):
    # find里不填的话，就是查找全部
    result = db[tableName].find(option, field)
    limitRes = result.skip(skip).limit(limit)
    # count已被弃用（暂时先用着）
    totalNum = result.count()
    resultList = list(limitRes)
    res = {
        'list': resultList,
        'total': totalNum
    }
    log ('查找数据:', resultList)
    return res
