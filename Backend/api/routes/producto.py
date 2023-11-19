from api import app
from api.models.producto import Producto
from api.models.ranking_ventas_por_producto import Ranking_ventas_por_producto
from flask import jsonify, request
from api.utils import token_required, client_resource, user_resources
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
    cur.execute('SELECT * from producto where producto.ID_USUARIO = {0}'.format(id_user))
    data = cur.fetchall()
    productosList = []
    for row in data:
        objProductos = Producto(row)
        productosList.append(objProductos.to_json())
    return jsonify({"stock" : productosList})

