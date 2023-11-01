class Cliente():
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
