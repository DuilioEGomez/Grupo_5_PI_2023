from api.db.db import mysql
from api.db.db import DBError
from flask import jsonify

class Servicio():
    schema = {
        "id_usuario" : int,
        "nombre_servicio" : str,
        "precio" : float
    }

    def check_data_schema(data):
        if data == None or type(data) != dict:
            print(" ERROR no es el schema correcto")
            return False
        for key in Servicio.schema:
            if key not in data:
                print("ERROR la clave no esta en el schema")
                return False
            if type(data[key]) != Servicio.schema[key]:
                print(f'ERROR la clave {data[key]} no es del tipo correcto')
                return False
        return True                

    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._nombre_servicio = row[2]
        self._precio = row[3]
    
    def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "nombre_servicio" : self._nombre_servicio,
            "precio" : self._precio
        } 
    
    def servicio_existe(id_usuario, nombre_servicio):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM servicio WHERE servicio.ID_USUARIO = %s AND servicio.NOMBRE_SERVICIO = %s;', (id_usuario, nombre_servicio))
        cur.fetchall()
        return cur.rowcount > 0

    def crear_servicio(data):
        if Servicio.check_data_schema(data):
            if Servicio.servicio_existe(data["id_usuario"], data["nombre_servicio"]):
                raise DBError("Error, el servicio ya existe")
            id_usuario = data["id_usuario"]
            nombre_servicio = data["nombre_servicio"]
            precio = data["precio"]
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO servicio (`ID`, `ID_USUARIO`, `NOMBRE_SERVICIO`, `PRECIO`, `activo`) VALUES (NULL, %s, %s, %s, 1);',(id_usuario, nombre_servicio, precio))
            mysql.connection.commit()
            if cur.rowcount > 0:
                cur.execute('SELECT LAST_INSERT_ID()')
                row = cur.fetchall()
                id = row[0][0]
                return Servicio((id, id_usuario, nombre_servicio, precio)).to_json()
            raise DBError("Error creando el cliente - no se inserto la fila")            
        raise TypeError("Error creando el cliente - error en los datos del schema")
    
    def actualizar_servicio(id_user, id_servicio, data):
            if Servicio.check_data_schema(data):
                id_usuario = id_user
                id_servicio = data["id"]
                nombre_servicio = data["nombre_servicio"]
                precio = data["precio"]
                cur = mysql.connection.cursor()
                cur.execute('UPDATE `servicio` SET `NOMBRE_SERVICIO` = %s, `PRECIO` = %s WHERE `servicio`.`ID` = %s AND servicio.ID_USUARIO = %s AND servicio.activo = 1;',(nombre_servicio, precio, id_servicio, id_usuario))   
                mysql.connection.commit()
                if cur.rowcount > 0:
                    return Servicio.get_servicio_by_ID(id_servicio)
            
    def get_servicio_by_ID(id_servicio):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM servicio WHERE servicio.ID = %s AND servicio.activo = 1',(id_servicio,))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Servicio(data[0]).to_json()
        raise DBError("Error obtiendo la ID del Servicio")

    def delete_servicio(id_user, id_servicio):
        print("ID_SERVICIO", id_servicio)
        print("ID_USUARIO", id_user)
        cur = mysql.connection.cursor()
        cur.execute('UPDATE servicio SET ACTIVO = 0 WHERE servicio.ID = %s AND servicio.ID_USUARIO = %s;',(id_servicio, id_user))
        mysql.connection.commit()
        data = cur.fetchall()
        if cur.rowcount > 0:
            mensaje = "El servicio fue borrado correctamente"
            return jsonify({"message" : mensaje})
        raise DBError("Error borrando servicio")
