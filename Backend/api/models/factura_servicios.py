from api.db.db import mysql
from api.db.db import DBError
from flask import jsonify

class Factura_servicios():
    schema ={
        "id_servicio" : int,
        "cantidad" : int,
        "precio_servicio" : float
    }

    def check_data_schema(data):
        if data == None or type(data) != dict:
            print(" ERROR no es el schema correcto")
            return False
        for key in Factura_servicios.schema:
            if key not in data:
                print(f'ERROR la clave {key} no esta en el schema')
                return False
            if type(data[key]) != Factura_servicios.schema[key]:
                print(f'ERROR la clave {data[key]} no es del tipo correcto')
                return False
        return True
    
    def __init__(self, row):
        self._id_factura = row[0]
        self._id_servicio = row[1]
        self._cantidad = row[2]
        self._precio_servicio = row[3]
    
    def to_json(self):
        return {
            "id_factura" : self._id_factura,
            "id_servicio" : self._id_servicio,
            "cantidad" : self._cantidad,
            "precio_servicio" : self._precio_servicio
        }
    
    def factura_servicio_existe(id_factura):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM factura WHERE factura.ID = %s;',(id_factura,))
        cur.fetchall()
        return cur.rowcount > 0

    def create_factura_servicios(data):
        if "alta servicios" in data and isinstance(data["alta servicios"], list):
            factura_id = data.get("id_factura")

            for item in data["alta servicios"]:
                item["id_factura"] = factura_id

                if Factura_servicios.check_data_schema(item):
                    if not Factura_servicios.factura_servicio_existe(item["id_factura"]):
                        raise DBError("Error creating factura servicios - la factura no existe")

                    factura_servicio_instance = Factura_servicios((
                        item["id_factura"],
                        item["id_servicio"],
                        item["cantidad"],
                        item["precio_servicio"]
                    ))

                    cur = mysql.connection.cursor()
                    cur.execute('INSERT INTO factura_servicios (ID_FACTURA, ID_SERVICIO, CANTIDAD, PRECIO_SERVICIO) VALUES (%s, %s, %s, %s);',(item["id_factura"], item["id_servicio"], item["cantidad"], item["precio_servicio"]))
                    mysql.connection.commit()

            return factura_servicio_instance.to_json()

        raise TypeError("Error creating factura servicio - wrong data schema")

    def update_factura_servicios(id_factura, data):
        if Factura_servicios.check_data_schema(data):
            cur = mysql.connection.cursor()
            cur.execute('UPDATE factura_servicios SET factura_servicios.CANTIDAD = %s, factura_servicios.PRECIO_SERVICIO = %s WHERE factura_servicios.ID_FACTURA = %s AND factura_servicios.ID_SERVICIO = %s;',(data["cantidad"], data["precio_servicio"], data["id_factura"],data["id_servicio"]))
            mysql.connection.commit()
            id_servicio = data["id_servicio"]
            if cur.rowcount > 0:
                return Factura_servicios.get_factura_servicios_by_id(id_factura, id_servicio)
            raise DBError("ERROR actualizando Factura Productos - No se actualizo la fila")
        raise DBError("ERROR Actualizando Factura Productos - esquema incorrecto")
    
    def get_factura_servicios_by_id(id_factura, id_servicio):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM factura_servicios WHERE factura_servicios.ID_FACTURA = %s AND factura_servicios.ID_SERVICIO = %s;',(id_factura, id_servicio))
        data = cur.fetchall()
        if cur.rowcount > 0:
            return Factura_servicios(data[0]).to_json()
        raise DBError("ERROR obtieniendo Factura Servicios by ID - no se encontro la fila")

    def delete_factura_servicio(id_factura, id_servicio):
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM factura_servicios WHERE `factura_servicios`.`ID_FACTURA` = %s AND `factura_servicios`.`ID_SERVICIO` = %s;',(id_factura, id_servicio))
        mysql.connection.commit()
        data = cur.fetchall()
        if cur.rowcount > 0:
            mensaje = "El Factura Servicio fue borrado correctamente"
            return jsonify({"message" : mensaje})
        raise DBError("Error borrando Factura Servicio")