from api import app
from api.models.cliente import Cliente
from api.models.factura import Factura
from api.models.producto import Producto
from api.models.productos_factura import Productos_factura
from api.models.historial_ventas import Historial
from flask import jsonify
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
