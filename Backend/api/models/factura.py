from api.db.db import mysql
from api.db.db import DBError

class Factura():
     schema = {
        #"id" : int,
        "id_usuario" : int,
        "id_cliente" : int,
        "fecha_factura" : str
        }
    
     def check_data_schema(data):
        if data == None or type(data) != dict:
            print(" ERROR no es el schema correcto")
            return False
        for key in Factura.schema:
            if key not in data:
                print("ERROR la clave no esta en el schema")
                return False
            if type(data[key]) != Factura.schema[key]:
                print(f'ERROR la clave {data[key]} no es del tipo correcto')
                return False
        return True                

     def factura_existe(id_user, id_cliente, fecha_factura):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM factura WHERE factura.id_usuario = %s AND factura.id_cliente = %s AND factura.fecha_factura = %s;', (id_user, id_cliente, fecha_factura))
        cur.fetchall()
        return cur.rowcount > 0

     def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._id_cliente = row[2]
        self._fecha_factura = row[3]
    
     def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "id_cliente" : self._id_cliente,
            "fecha_factura" : self._fecha_factura
        }
     
     def crear_factura(data):
        if Factura.check_data_schema(data):
            if Factura.factura_existe(data["id_usuario"], data["id_cliente"], data["fecha_factura"]):
                raise DBError("Error, La factura ya existe")

            id_usuario = data["id_usuario"]
            id_cliente = data["id_cliente"]
            fecha_factura = data["fecha_factura"]
            
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO factura (ID, ID_USUARIO, ID_CLIENTE, FECHA_FACTURA) VALUES (NULL, %s, %s, %s);',(id_usuario, id_cliente, fecha_factura))
            mysql.connection.commit()    
            if cur.rowcount > 0:
                cur.execute('SELECT LAST_INSERT_ID()')
                row = cur.fetchall()
                id = row[0][0]
                return Factura((id, id_usuario, id_cliente, fecha_factura)).to_json()
            raise DBError("Error creando la factura - no se inserto la fila")            
        raise TypeError("Error creando la factura - error en los datos del schema")

     def actualizar_factura(id_user, id_factura, data):
        if Factura.check_data_schema(data):
            id_usuario = id_user
            id_cliente = id_factura
            fecha_factura = data["fecha_factura"]
            id_factura = data["id"]
            cur = mysql.connection.cursor()
            cur.execute('UPDATE factura SET fecha_factura = %s, id_usuario = %s, id_cliente = %s WHERE factura.ID = %s AND factura.ID_USUARIO = %s',(fecha_factura, id_usuario, id_cliente, id_factura, id_usuario))   
            mysql.connection.commit()
            if cur.rowcount > 0:
                return Factura.get_factura_by_ID(id_factura)
            
     def get_factura_by_ID(id_factura):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM factura WHERE factura.ID = %s',(id_factura,))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Factura(data[0]).to_json()
        raise DBError("Error obtiendo la ID de la Factura")