from api import app
from api.models.factura_servicios import Factura_servicios
from api.models.factura_servicios_total import Factura_servicios_total
from flask import jsonify, request
from api.utils import token_required, user_resources, factura_resources
from api.db.db import mysql

@app.route('/user/<int:id_user>/factura/<int:id_factura>/factura_servicios', methods = ['POST'])
@token_required
@user_resources
@factura_resources
def create_factura_servicios(id_user, id_factura):
    data = request.get_json()
    #data["id_usuario"] = id_user
    data["id_factura"] = id_factura
    try:
        nueva_factura_servicio = Factura_servicios.create_factura_servicios(data)
        return jsonify(nueva_factura_servicio), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400

@app.route('/user/<int:id_user>/factura/<int:id_factura>/factura_servicios', methods = ['PUT'])
@token_required
@user_resources
@factura_resources
def update_factura_servicios(id_user, id_factura):
    data = request.get_json()
    data["id_factura"] = id_factura
    try:
        update_fact_serv = Factura_servicios.update_factura_servicios(id_factura, data)
        return jsonify(update_fact_serv), 201
    except Exception as e:
        return jsonify({"message" : e.args[0]}), 400
    
@app.route('/user/<int:id_user>/factura/<int:id_factura>/factura_servicios/<int:id_servicio>', methods = ['DELETE'])
@token_required
@user_resources
@factura_resources
def delete_factura_servicios(id_user, id_factura, id_servicio):
    try:
        delete_factura_servicio = Factura_servicios.delete_factura_servicio(id_factura, id_servicio)
        return delete_factura_servicio
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400

@app.route('/user/<int:id_user>/factura_servicios_total/<int:id_factura>', methods = ['GET'])
@token_required
@user_resources
@factura_resources
def get_total_factura_servicio(id_user, id_factura):
    cur = mysql.connection.cursor()
    cur.execute('SELECT factura_servicios.ID_FACTURA, SUM(factura_servicios.CANTIDAD * factura_servicios.PRECIO_SERVICIO) AS TOTAL FROM factura_servicios WHERE factura_servicios.ID_FACTURA= %s GROUP BY factura_servicios.ID_FACTURA;',(id_factura,))
    data = cur.fetchall()
    for row in data:
        objFactura_servicio_total = Factura_servicios_total(row)
    return jsonify({"total factura servicios" : objFactura_servicio_total.to_json()})

