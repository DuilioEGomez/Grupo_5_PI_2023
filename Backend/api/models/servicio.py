class Servicio():
    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._nombre_servicio = row[2]
        self._precio = row[3]
        self._cliente = row[4]
        self._cliente_email = row[5]
    
    def to_json(self):
        return {
            "id" : self._id,
            "id_usuario" : self._id_usuario,
            "nombre_servicio" : self._nombre_servicio,
            "precio" : self._precio,
            "cliente" : self._cliente,
            "cliente_email" : self._cliente_email
        } 