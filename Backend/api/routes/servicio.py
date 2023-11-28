from api import app
from api.models.servicio import Servicio
from api.models.ranking_ventas_por_servicio import Ranking_ventas_por_servicio
from flask import jsonify, request
from api.utils import token_required, client_resource, user_resources
from api.db.db import mysql


@app.route('/user/<int:id_user>/ranking_servicios', methods = ['GET'])
@token_required
@user_resources

def get_ranking_servicios(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT servicio.ID AS servicio_id, servicio.NOMBRE_SERVICIO, factura_servicios.PRECIO_SERVICIO, SUM(factura_servicios.CANTIDAD) AS total_cantidad FROM factura JOIN usuario ON factura.ID_USUARIO = usuario.id JOIN factura_servicios ON factura.ID = factura_servicios.ID_FACTURA JOIN servicio ON factura_servicios.ID_SERVICIO = servicio.ID WHERE usuario.id = %s GROUP BY servicio.ID, servicio.NOMBRE_SERVICIO, factura_servicios.PRECIO_SERVICIO ORDER BY total_cantidad DESC;',(id_user,))
    data = cur.fetchall()
    ranking_serviciosList = []
    for row in data:
        objRanking_servicios = Ranking_ventas_por_servicio(row)
        ranking_serviciosList.append(objRanking_servicios.to_json())
    return jsonify({"ranking servicios" : ranking_serviciosList})

@app.route('/user/<int:id_user>/servicios', methods = ['GET'])
@token_required
@user_resources

def get_servicios_by_user(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM `servicio` WHERE servicio.ID_USUARIO = %s AND servicio.activo = 1;',(id_user,))
    data = cur.fetchall()
    servicioList = []
    for row in data:
        servicioObj = Servicio(row)
        servicioList.append(servicioObj.to_json())
    return jsonify({"servicios" : servicioList})

@app.route('/user/<int:id_user>/servicios', methods = ['POST'])
@token_required
@user_resources

def create_servicio(id_user):
    data = request.get_json()
    data["id_usuario"] = id_user
    try:
        nuevo_servicio = Servicio.crear_servicio(data)
        return jsonify(nuevo_servicio), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    
@app.route('/user/<int:id_user>/servicios/<int:id_servicio>', methods = ['PUT'])
@token_required
@user_resources

def update_servicio(id_user, id_servicio):
    data = request.get_json()
    data["id_usuario"]= id_user
    data["id"] = id_servicio
    try:
        update_servicio = Servicio.actualizar_servicio(id_user, id_servicio, data)
        return jsonify(update_servicio)
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400

@app.route('/user/<int:id_user>/servicios/<int:id_servicio>', methods = ['DELETE'])
@token_required
@user_resources

def delete_servicio(id_user, id_servicio):
    try:
        delete_servicio = Servicio.delete_servicio(id_user, id_servicio)
        return delete_servicio
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400


