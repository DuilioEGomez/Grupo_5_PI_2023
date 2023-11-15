from api.db.db import mysql
from api.db.db import DBError
from flask import jsonify

class Cliente():
    schema = {
        #"id" : int,
        "id_usuario" : int,
        "nombre" : str,
        "apellido" : str,
        "cuit" : int
        }
    
    def check_data_schema(data):
        if data == None or type(data) != dict:
            print(" ERROR no es el schema correcto")
            return False
        for key in Cliente.schema:
            if key not in data:
                print("ERROR la clave no esta en el schema")
                return False
            if type(data[key]) != Cliente.schema[key]:
                print(f'ERROR la clave {data[key]} no es del tipo correcto')
                return False
        return True                

    def cliente_existe(id_user, cuit):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM cliente WHERE id_usuario = %s AND cuit = %s', (id_user, cuit))
        cur.fetchall()
        return cur.rowcount > 0

    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._nombre = row[2]
        self._apellido = row[3]
        self._cuit = row[4]
    
    def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "nombre" : self._nombre,
            "apellido" : self._apellido,
            "cuit" : self._cuit
        }

    def crear_cliente(data):
        if Cliente.check_data_schema(data):
            if Cliente.cliente_existe(data["id_usuario"], data["cuit"]):
                raise DBError("Error, el cliente ya existe")
            id_usuario = data["id_usuario"]
            nombre = data["nombre"]
            apellido = data["apellido"]
            cuit = data["cuit"]
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO `cliente` (`ID`, `ID_USUARIO`, `NOMBRE`, `APELLIDO`, `CUIT`, `activo`) VALUES (NULL, %s, %s, %s, %s, %s);',(id_usuario, nombre, apellido, cuit, 1))
            mysql.connection.commit()    
            if cur.rowcount > 0:
                cur.execute('SELECT LAST_INSERT_ID()')
                row = cur.fetchall()
                id = row[0][0]
                return Cliente((id, id_usuario, nombre, apellido, cuit)).to_json()
            raise DBError("Error creando el cliente - no se inserto la fila")            
        raise TypeError("Error creando el cliente - error en los datos del schema")

    def actualizar_cliente(id_user, id_cliente, data):
        if Cliente.check_data_schema(data):
            id_usuario = id_user
            id_cliente = id_cliente
            nombre = data["nombre"]
            apellido = data["apellido"]
            cuit = data["cuit"]
            cur = mysql.connection.cursor()
            cur.execute('UPDATE cliente SET nombre = %s, apellido = %s, cuit = %s WHERE cliente.ID = %s AND cliente.ID_USUARIO = %s AND cliente.ACTIVO = 1',(nombre,apellido, cuit, id_cliente, id_usuario))   
            mysql.connection.commit()
            if cur.rowcount > 0:
                return Cliente.get_cliente_by_ID(id_cliente)
            else:
                raise DBError("No se pudo actualizar el cliente")

    def get_cliente_by_ID(id_cliente):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM cliente WHERE cliente.ID = %s',(id_cliente,))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Cliente(data[0]).to_json()
        raise DBError("Error obtiendo la ID del Cliente")

    def delete_client(id_user, id_cliente):
        #id_usuario = id_user
        id_cliente = id_cliente
        #nombre = data["nombre"]
        #apellido = data["apellido"]
        #cuit = data["cuit"]
        cur = mysql.connection.cursor()
        cur.execute('UPDATE cliente SET ACTIVO = 0 WHERE cliente.ID = %s AND cliente.ID_USUARIO = %s;',(id_cliente, id_user))
        mysql.connection.commit()
        data = cur.fetchall()
        if cur.rowcount > 0:
            #return Cliente(data[0]).to_json()
            mensaje = "El cliente fue borrado correctamente"
            return jsonify({"message" : mensaje})
        raise DBError("Error borrando cliente")
