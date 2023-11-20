from api.db.db import mysql
from api.db.db import DBError
from flask import jsonify

class Producto():
    schema = {
        "id_usuario" : int,
        "nombre_producto" : str,
        "stock_disponible" : int,
        "precio" : float,
        "proveedor" : str,
        "proveedor_email" : str,
        "alerta_stock" : int
    }

    def check_data_schema(data):
        if data == None or type(data) != dict:
            print(" ERROR no es el schema correcto")
            return False
        for key in Producto.schema:
            if key not in data:
                print(f'ERROR la clave {key} no esta en el schema')
                return False
            if type(data[key]) != Producto.schema[key]:
                print(f'ERROR la clave {data[key]} no es del tipo correcto')
                return False
        return True

    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._nombre_producto = row[2]
        self._stock_disponible = row[3]
        self._precio = row[4]
        self._proveedor = row[5]
        self._proveedor_email = row[6]
        self._alerta_stock = row[7]
        
        
    def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "nombre_producto" : self._nombre_producto,
            "stock_disponible" : self._stock_disponible,
            "precio" : self._precio,
            "proveedor" : self._proveedor,
            "proveedor_email" : self._proveedor_email,
            "alerta_stock" : self._alerta_stock
        }
   
    def producto_existe(id_usuario, nombre_producto):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM producto WHERE producto.ID_USUARIO = %s AND producto.NOMBRE_PRODUCTO = %s;', (id_usuario, nombre_producto))
        cur.fetchall()
        return cur.rowcount > 0

    def crear_producto(data):
        print("antes del 1er if",data)
        if Producto.check_data_schema(data):
            print("antes del 2do if")
            print(data["id_usuario"], data["nombre_producto"])
            if Producto.producto_existe(data["id_usuario"], data["nombre_producto"]):
                raise DBError("Error, el producto ya existe")
            id_usuario = data["id_usuario"]
            nombre_producto = data["nombre_producto"]
            stock_disponible = data["stock_disponible"]
            precio = data["precio"]
            proveedor = data["proveedor"]
            proveedor_email = data["proveedor_email"]
            alerta_stock = data["alerta_stock"]
            print("SQL data", id_usuario, nombre_producto, stock_disponible, precio, proveedor, proveedor_email, alerta_stock)
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO `producto` (`ID`, `ID_USUARIO`, `NOMBRE_PRODUCTO`, `STOCK_DISPONIBLE`, `PRECIO`, `PROVEEDOR`, `PROVEEDOR_EMAIL`, `ALERTA_STOCK`, `activo`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, 1);',(id_usuario, nombre_producto, stock_disponible, precio, proveedor, proveedor_email, alerta_stock))
            mysql.connection.commit()    
            if cur.rowcount > 0:
                cur.execute('SELECT LAST_INSERT_ID()')
                row = cur.fetchall()
                id = row[0][0]
                return Producto((id, id_usuario, nombre_producto, stock_disponible, precio, proveedor, proveedor_email, alerta_stock)).to_json()
            raise DBError("Error creando el producto - no se inserto la fila")            
        raise TypeError("Error creando el producto - error en los datos del schema")

    def actualizar_producto(id_user, id_producto, data):
        if Producto.check_data_schema(data):
            id_usuario = id_user
            id_producto = id_producto
            nombre_producto = data["nombre_producto"]
            stock_disponible = data["stock_disponible"]
            precio = data["precio"]
            proveedor = data["proveedor"]
            proveedor_email = data["proveedor_email"]
            alerta_stock = data["alerta_stock"]
            cur = mysql.connection.cursor()
            cur.execute('UPDATE producto SET nombre_producto = %s, stock_disponible = %s, precio = %s , proveedor = %s, proveedor_email = %s, alerta_stock = %s WHERE producto.ID = %s AND producto.ID_USUARIO = %s AND producto.activo = 1;',(nombre_producto, stock_disponible, precio, proveedor, proveedor_email, alerta_stock, id_producto, id_usuario)) 
            mysql.connection.commit()
            if cur.rowcount > 0:
                return Producto.get_producto_by_ID(id_producto)
            else:
                raise DBError("No se pudo actualizar el cliente")

    def get_producto_by_ID(id_producto):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM producto WHERE producto.ID = %s',(id_producto,))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Producto(data[0]).to_json()
        raise DBError("Error obtiendo la ID del Producto")

    def delete_producto(id_user, id_producto):
        cur = mysql.connection.cursor()
        cur.execute('UPDATE producto SET ACTIVO = 0 WHERE producto.ID = %s AND producto.ID_USUARIO = %s;',(id_producto, id_user))
        mysql.connection.commit()
        data = cur.fetchall()
        if cur.rowcount > 0:
            mensaje = "El Producto fue borrado correctamente"
            return jsonify({"message" : mensaje})
        raise DBError("Error borrando Producto")