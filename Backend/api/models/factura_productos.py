from api.db.db import mysql
from api.db.db import DBError
from flask import jsonify


class Factura_productos():
    schema = {
        #"id_factura" : int,
        "id_producto" : int,
        "cantidad" : int,
        "precio_producto" : float
    }

    def check_data_schema(data):
        if data == None or type(data) != dict:
            return False
        # check if data contains all keys of schema
        for key in Factura_productos.schema:
            if key not in data:
                return False
            # check if data[key] has the same type as schema[key]
            if type(data[key]) != Factura_productos.schema[key]:
                return False
        return True

    def __init__(self, row):
        self._id_factura = row[0]
        self._id_producto = row[1]
        self._cantidad = row[2]
        self._precio_producto = row[3]

    def to_json(self):
        return {
            "id_factura" : self._id_factura,
            "id_producto" : self._id_producto,
            "cantidad" : self._cantidad,
            "precio_producto" : self._precio_producto
        }
    
    def factura_producto_existe(id_factura):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM factura_productos WHERE factura_productos.ID_FACTURA = %s;',(id_factura,))
        cur.fetchall()
        return cur.rowcount > 0
    
    def create_factura_productos(data):
        if Factura_productos.check_data_schema(data):
            # check if not factura producto exists
            if not Factura_productos.factura_producto_existe(data["id_factura"]):
                raise DBError("Error creating factura productos - la factura no existe")
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO factura_productos (ID_FACTURA, ID_PRODUCTO, CANTIDAD, PRECIO_PRODUCTO) VALUES (%s, %s, %s, %s);',(data["id_factura"], data["id_producto"], data["cantidad"], data["precio_producto"]))
            mysql.connection.commit()
            #if cur.rowcount > 0:
                # get the id of the last inserted row
            #    cur.execute('SELECT LAST_INSERT_ID()')
            #    res = cur.fetchall()
                #id = res[0][0]
            #return Factura_productos(data["id_factura"], data["id_producto"], data["cantidad"], data["precio_producto"]).to_json()
            return Factura_productos((data["id_factura"], data["id_producto"], data["cantidad"], data["precio_producto"])).to_json()
            #raise DBError("Error creating factura producto - no row inserted")
        raise TypeError("Error creating factura producto - wrong data schema")

    def update_factura_productos(id_factura, data):
        if Factura_productos.check_data_schema(data):
            cur = mysql.connection.cursor()
            cur.execute('UPDATE factura_productos SET factura_productos.CANTIDAD = %s, factura_productos.PRECIO_PRODUCTO = %s WHERE factura_productos.ID_FACTURA = %s AND factura_productos.ID_PRODUCTO = %s;',(data["cantidad"], data["precio_producto"], data["id_factura"],data["id_producto"]))
            mysql.connection.commit()
            id_producto = data["id_producto"]
            if cur.rowcount > 0:
                return Factura_productos.get_factura_productos_by_id(id_factura, id_producto)
            raise DBError("ERROR actualizando Factura Productos - No se actualizo la fila")
        raise DBError("ERROR Actualizando Factura Productos - esquema incorrecto")

    def get_factura_productos_by_id(id_factura, id_producto):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM factura_productos WHERE factura_productos.ID_FACTURA = %s AND factura_productos.ID_PRODUCTO = %s;',(id_factura, id_producto))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Factura_productos(data[0]).to_json()
        raise DBError("ERROR obtieniendo Factura Productos by ID - no se encontro la fila")

    def delete_factura_producto(id_factura, id_producto):
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM factura_productos WHERE `factura_productos`.`ID_FACTURA` = %s AND `factura_productos`.`ID_PRODUCTO` = %s;',(id_factura, id_producto))
        mysql.connection.commit()
        data = cur.fetchall()
        if cur.rowcount > 0:
            mensaje = "El Factura Producto fue borrado correctamente"
            return jsonify({"message" : mensaje})
        raise DBError("Error borrando Factura Producto")