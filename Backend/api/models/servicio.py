class Servicio():
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