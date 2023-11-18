from api import app
from api.models.factura_productos import Factura_productos

from flask import jsonify, request
from api.utils import token_required, user_resources, factura_resources
from api.db.db import mysql

@app.route('/user/<int:id_user>/factura/<int:id_factura>/factura_productos', methods = ['POST'])
@token_required
@user_resources
@factura_resources
def create_factura_productos(id_user, id_factura):
    data = request.get_json()
    #data["id_usuario"] = id_user
    data["id_factura"] = id_factura
    try:
        nueva_factura_producto = Factura_productos.create_factura_productos(data)
        return jsonify(nueva_factura_producto), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    
@app.route('/user/<int:id_user>/factura/<int:id_factura>/factura_productos', methods = ['PUT'])
@token_required
@user_resources
@factura_resources
def update_factura_productos(id_user, id_factura):
    data = request.get_json()
    data["id_factura"] = id_factura
    try:
        update_fact_prod = Factura_productos.update_factura_productos(id_factura, data)
        return jsonify(update_fact_prod), 201
    except Exception as e:
        return jsonify({"message" : e.args[0]}), 400