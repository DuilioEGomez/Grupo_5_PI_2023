class Factura():
    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._id_cliente = row[2]
    
    def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "id_cliente" : self._id_cliente
        }