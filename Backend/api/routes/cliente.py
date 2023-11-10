from api import app
from api.models.cliente import Cliente
from api.models.factura import Factura
from api.models.producto import Producto
from api.models.productos_factura import Productos_factura
from api.models.historial_ventas import Historial
from api.models.ranking_ventas_por_cliente import Ranking_ventas_por_cliente
from api.models.ranking_ventas_por_producto import Ranking_ventas_por_producto
from api.models.ranking_ventas_por_servicio import Ranking_ventas_por_servicio
from flask import jsonify, request
from api.utils import token_required, client_resource, user_resources
from api.db.db import mysql

@app.route('/user/<int:id_user>/client', methods = ['GET'])
@token_required
@user_resources
def get_all_clients_by_user_id(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE id_usuario = {0}'.format(id_user))
    data = cur.fetchall()
    clientList = []
    for row in data:
        objClient = Cliente(row)
        clientList.append(objClient.to_json())
    return jsonify({"clientes" : clientList})

@app.route('/user/<int:id_user>/facturas', methods = ['GET'])
@token_required
@user_resources
def get_facturas_by_user_id(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM factura, usuario WHERE usuario.ID = %s AND factura.ID_USUARIO = %s;',(id_user, id_user))
    data = cur.fetchall()
    facturaList = []
    for row in data:
        objFactura = Factura(row)
        facturaList.append(objFactura.to_json())
    return jsonify({"facturas" : facturaList})

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

@app.route('/user/<int:id_user>/factura/<int:id_factura>', methods = ['GET'])
@token_required
@user_resources
def get_factura_by_user(id_user, id_factura):
    cur = mysql.connection.cursor()
    cur.execute('SELECT DISTINCT factura_productos.*, producto.*, cliente.*, factura.* FROM factura_productos INNER JOIN producto ON factura_productos.ID_PRODUCTO = producto.ID INNER JOIN factura ON factura_productos.ID_FACTURA = factura.ID INNER JOIN cliente ON factura.ID_CLIENTE = cliente.ID WHERE factura.ID_USUARIO = %s AND factura_productos.ID_FACTURA = %s;',(id_user, id_factura))
    data = cur.fetchall()
    productos_facturaList = []
    for row in data:
        objProductos_factura = Productos_factura(row)
        productos_facturaList.append(objProductos_factura.to_json())
    return jsonify({"facturas" : productos_facturaList})

@app.route('/user/<int:id_user>/historial', methods= ['GET'])
@token_required
@user_resources
def get_historial(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT factura.fecha_factura, factura.id_usuario, cliente.id, cliente.id_usuario, cliente.nombre, cliente.apellido, cliente.cuit, factura_productos.ID_FACTURA, factura_productos.ID_PRODUCTO, factura_productos.CANTIDAD, factura_productos.PRECIO_PRODUCTO, producto.nombre_producto, usuario.id FROM factura JOIN cliente ON cliente.id = factura.ID_CLIENTE JOIN factura_productos ON factura_productos.ID_FACTURA = factura.ID JOIN producto ON factura_productos.ID_PRODUCTO = producto.id JOIN usuario ON factura.ID_USUARIO = usuario.id WHERE factura.ID_USUARIO = %s GROUP BY factura.fecha_factura, factura.id_usuario, cliente.id, cliente.id_usuario, cliente.nombre, cliente.apellido, cliente.cuit, factura_productos.ID_FACTURA, factura_productos.ID_PRODUCTO, factura_productos.CANTIDAD, producto.nombre_producto, producto.precio, usuario.nombre, usuario.id;',(id_user,))
    data = cur.fetchall()
    historialList = []
    for row in data:
        objHistorial = Historial(row)
        historialList.append(objHistorial.to_json())
    return jsonify({"historial": historialList})

@app.route('/user/<int:id_user>/ranking_clientes', methods = ['GET'])
@token_required
@user_resources
def get_ranking_clientes(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT cliente.id, cliente.nombre, cliente.apellido, COUNT(cliente.id) AS ranking_cliente FROM cliente JOIN factura ON cliente.ID = factura.ID_CLIENTE WHERE factura.ID_USUARIO = %s AND cliente.ID_USUARIO = factura.ID_USUARIO GROUP BY cliente.id, cliente.nombre, cliente.apellido ORDER BY ranking_cliente DESC;',(id_user,))
    data = cur.fetchall()
    ranking_clientesList = []
    for row in data:
        objRanking_clientes = Ranking_ventas_por_cliente(row)
        ranking_clientesList.append(objRanking_clientes.to_json())
    return jsonify({"ranking clientes" : ranking_clientesList})

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

@app.route('/user/<int:id_user>/client', methods = ['POST'])
@token_required
@user_resources
def create_client(id_user):
    data = request.get_json()
    data["id_usuario"] = id_user
    try:
        nuevo_cliente = Cliente.crear_cliente(data)
        return jsonify(nuevo_cliente), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400

@app.route('/user/<int:id_user>/cliente/<int:id_client>', methods = ['PUT'])
@token_required
@user_resources
def update_client(id_user, id_client):
    data = request.get_json()
    data["id_usuario"]= id_user
    data["id"] = id_client
    try:
        update_client = Cliente.actualizar_cliente(id_user, id_client, data)
        return jsonify(update_client)
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
