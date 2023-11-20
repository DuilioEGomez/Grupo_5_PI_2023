from api import app
from api.models.producto import Producto
from api.models.ranking_ventas_por_producto import Ranking_ventas_por_producto
from flask import jsonify, request
from api.utils import token_required, user_resources
from api.db.db import mysql


@app.route('/user/<int:id_user>/ranking_productos', methods = ['GET'])
@token_required
@user_resources
def get_ranking_productos(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT producto.ID AS producto_id, producto.NOMBRE_PRODUCTO, factura_productos.PRECIO_PRODUCTO, SUM(factura_productos.CANTIDAD) AS total_cantidad FROM factura JOIN usuario ON factura.ID_USUARIO = usuario.id JOIN factura_productos ON factura.ID = factura_productos.ID_FACTURA JOIN producto ON factura_productos.ID_PRODUCTO = producto.ID WHERE usuario.id = %s GROUP BY producto.ID, producto.NOMBRE_PRODUCTO, factura_productos.PRECIO_PRODUCTO ORDER BY total_cantidad DESC;',(id_user,))
    data = cur.fetchall()
    ranking_productosList = []
    for row in data:
        objRanking_productos = Ranking_ventas_por_producto(row)
        ranking_productosList.append(objRanking_productos.to_json())
    return jsonify({"ranking productos" : ranking_productosList})

@app.route('/user/<int:id_user>/stock', methods = ['GET'])
@token_required
@user_resources
def get_product_by_user_id(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * from producto where producto.ID_USUARIO = %s AND producto.activo = 1',(id_user,))
    data = cur.fetchall()
    productosList = []
    for row in data:
        objProductos = Producto(row)
        productosList.append(objProductos.to_json())
    return jsonify({"stock" : productosList})

@app.route('/user/<int:id_user>/producto', methods = ['POST'])
@token_required
@user_resources
def create_producto(id_user):
    data = request.get_json()
    data["id_usuario"] = id_user
    for i in data:
        print(type(data[i]))
    try:
        nuevo_producto = Producto.crear_producto(data)
        return jsonify(nuevo_producto), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400

@app.route('/user/<int:id_user>/producto/<int:id_producto>', methods = ['PUT'])
@token_required
@user_resources

def update_producto(id_user, id_producto):
    data = request.get_json()
    data["id_usuario"]= id_user
    data["id"] = id_producto
    try:
        update_producto = Producto.actualizar_producto(id_user, id_producto, data)
        return jsonify(update_producto)
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    
@app.route('/user/<int:id_user>/producto/<int:id_producto>', methods = ['DELETE'])
@token_required
@user_resources

def delete_producto(id_user, id_producto):
    try:
        delete_producto = Producto.delete_producto(id_user, id_producto)
        return delete_producto
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400