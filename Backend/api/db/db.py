from api import app
from flask_mysqldb import MySQL
from flask import Flask


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'duilio'
app.config['MYSQL_PASSWORD'] ='duilio'
app.config['MYSQL_DB'] = 'proyecto_informatico'

mysql = MySQL(app)

class DBError(Exception):
    pass
