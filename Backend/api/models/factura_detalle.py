from api.db.db import mysql
from api.db.db import DBError

class Factura_detalle():
    def __init__(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._apellido = row[2]
        self._ranking_cliente = row[3]
    
    def to_json(self):
        return {
            "id" : self._id,
            "nombre" : self._nombre,
            "apellido" : self._apellido,
            "ranking_cliente" : self._ranking_cliente
        }