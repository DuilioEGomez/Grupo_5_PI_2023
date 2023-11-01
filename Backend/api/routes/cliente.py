from api import app
from api.models.cliente import Cliente
from api.models.factura import Factura
from api.models.usuarios_productos import Usuarios_productos
from api.models.producto import Producto
from api.models.productos_factura import Productos_factura
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
    return jsonify(clientList)

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
    return jsonify(facturaList)

@app.route('/user/<int:id_user>/productos', methods = ['GET'])
@token_required
@user_resources
def get_products_by_user_id(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM producto, usuario WHERE producto.ID_USUARIO = usuario.id AND producto.STOCK_DISPONIBLE >= 0 AND usuario.id = {0}'.format(id_user))
    data = cur.fetchall()
    usuario_productosList = []
    for row in data:
        objUsuarios_productos = Usuarios_productos(row)
        usuario_productosList.append(objUsuarios_productos.to_json())
    return jsonify(usuario_productosList)

@app.route('/user/<int:id_user>/producto', methods = ['GET'])
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
    return jsonify(productosList)

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
