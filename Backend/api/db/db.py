from api import app
from flask_mysqldb import MySQL

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'duilio'
app.config['MYSQL_PASSWORD'] ='duilio'
# app.config['MYSQL_USER'] = 'user_api_flask'
# app.config['MYSQL_PASSWORD'] ='password'

app.config['MYSQL_DB'] = 'proyecto_informatico'

mysql = MySQL(app)

class DBError(Exception):
    pass
