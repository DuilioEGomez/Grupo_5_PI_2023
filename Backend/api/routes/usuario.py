from api import app
from flask_mysqldb import MySQL
from flask import Flask
from flask import request, jsonify
from api.db.db import mysql
import jwt
import datetime

@app.route('/login', methods = ['POST'])
def login():
    auth = request.authorization
    print(auth)
    
    """ Control: existen valores para la autenticacion? """
    if not auth or not auth.username or not auth.password:
        return jsonify({"message": "No autorizado"}), 401       
            
    """ Control: existe y coincide el usuario en la BD? """
    print(auth.username, auth.password)
    mysql = MySQL()
    cur = mysql.connection.cursor()
    #cur.execute('SELECT * FROM usuario WHERE nombre = `DG Broadcasting` AND password = `henry`', (auth.username, auth.password))
    cur.execute('SELECT * FROM usuario WHERE usuario.NOMBRE = %s AND usuario.PASSWORD = %s', (auth.username, auth.password))
    row = cur.fetchone()

    if not row:
       return jsonify({"message": "No autorizado"}), 401  
    
    """ El usuario existe en la BD y coincide su contraseña """
    token = jwt.encode({'id': row[0],
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=90)}, app.config['SECRET_KEY'])

    return jsonify({"success": True, "token": token, "username": auth.username , "id": row[0]})