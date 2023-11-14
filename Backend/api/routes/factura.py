from api import app
from api.models.factura import Factura
from flask import jsonify, request
from api.utils import token_required, user_resources
from api.db.db import mysql

@app.route('/user/<int:id_user>/factura', methods = ['POST'])
@token_required
@user_resources
def create_factura(id_user):
    data = request.get_json()
    data["id_usuario"] = id_user
    try:
        nueva_factura = Factura.crear_factura(data)
        return jsonify(nueva_factura), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    
@app.route('/user/<int:id_user>/factura/<int:id_factura>', methods = ['PUT'])
@token_required
@user_resources
def update_factura(id_user, id_factura):
    data = request.get_json()
    data["id_usuario"]= id_user
    data["id"] = id_factura
    try:
        update_factura = Factura.actualizar_factura(id_user, id_factura, data)
        return jsonify(update_factura)
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400