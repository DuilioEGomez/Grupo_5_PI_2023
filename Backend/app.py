from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
import jwt
import datetime
from functools import wraps


app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'duilio'
app.config['MYSQL_PASSWORD'] = 'duilio'
app.config['MYSQL_DB'] = 'proyecto_informatico'

app.config['SECRET_KEY'] = 'DSP462'

mysql = MySQL(app)



if __name__ == '__main__':
    app.run(debug=True, port=5000)
