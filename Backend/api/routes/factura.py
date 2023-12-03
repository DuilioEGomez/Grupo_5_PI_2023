from api import app
from api.models.factura import Factura
from api.models.productos_factura import Productos_factura
from api.models.servicios_factura import Servicios_factura
from api.models.facturas_detalladas import Facturas_detalladas
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
    #return jsonify({"facturas" : productos_facturaList})
    
    cur = mysql.connection.cursor()
    cur.execute('SELECT DISTINCT factura_servicios.*, servicio.*, cliente.*, factura.* FROM factura_servicios INNER JOIN servicio ON factura_servicios.ID_SERVICIO = servicio.ID INNER JOIN factura ON factura_servicios.ID_FACTURA = factura.ID INNER JOIN cliente ON factura.ID_CLIENTE = cliente.ID WHERE factura.ID_USUARIO = %s AND factura_servicios.ID_FACTURA = %s;',(id_user, id_factura))
    data = cur.fetchall()
    servicios_facturaList = []
    for row in data:
        objServicio_factura = Servicios_factura(row)
        servicios_facturaList.append(objServicio_factura.to_json())

    cur = mysql.connection.cursor()
    cur.execute('SELECT cliente.APELLIDO, cliente.NOMBRE, cliente.CUIT, factura.FECHA_FACTURA FROM factura JOIN cliente ON factura.ID_CLIENTE = cliente.ID JOIN usuario ON factura.ID_USUARIO = usuario.ID WHERE factura.ID = %s AND usuario.ID = %s;',(id_factura, id_user))
    dataAN = cur.fetchall()
    servicios_facturaList = []
    for row in data:
        objServicio_factura = Servicios_factura(row)
        servicios_facturaList.append(objServicio_factura.to_json())
    # cliente = dataAN[0][0],dataAN[0][1]
    auxCliente = {"apellido": dataAN[0][0],"nombre" : dataAN[0][1],"cuit" : dataAN[0][2], "fecha factura" : dataAN[0][3]}
    print(auxCliente)
    print(servicios_facturaList)
    return jsonify({"detalle factura" : {"cliente" : auxCliente, "productos" : productos_facturaList, "servicios" : servicios_facturaList}})






@app.route('/user/<int:id_user>/facturas', methods = ['GET'])
@token_required
@user_resources
def get_facturas_by_user_id(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT factura.ID, factura.ID_USUARIO, factura.ID_CLIENTE,factura.FECHA_FACTURA, cliente.APELLIDO, cliente.NOMBRE, cliente.CUIT FROM factura, cliente WHERE cliente.ID_USUARIO = %s AND factura.ID_USUARIO = %s AND cliente.ID = factura.ID_CLIENTE;',(id_user, id_user))
    data = cur.fetchall()
    facturaList = []
    for row in data:
        objFactura = Facturas_detalladas(row)
        facturaList.append(objFactura.to_json())
    return jsonify({"facturas" : facturaList})
