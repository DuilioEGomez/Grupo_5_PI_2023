class Facturas_detalladas():
    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._id_cliente = row[2]
        self._fecha_factura = row[3]
        self._apellido = row[4]
        self._nombre = row[5]
        self._cuit = row[6]
    
    def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "id_cliente" : self._id_cliente,
            "fecha_factura" : self._fecha_factura,
            "apellido" : self._apellido,
            "nombre" : self._nombre,
            "cuit" : self._cuit
        }