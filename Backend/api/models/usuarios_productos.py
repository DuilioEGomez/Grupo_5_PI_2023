class Usuarios_productos():
    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._nombre_producto = row[2]
        self._stock_disponible = row[3]
        self._precio = row[4]
        self._proveedor = row[5]
        self._proveedor_email = row[6]
        self._id_usuario = row[7]
        self._nombre = row[8]
        self._email = row[9]
        # self._password = row[10]
        
    def to_json(self):
        return {
            "id_producto" : self._id,
            "id_usuario" : self._id_usuario,
            "nombre_producto" : self._nombre_producto,
            "stock_disponible" : self._stock_disponible,
            "precio" : self._precio,
            "proveedor" : self._proveedor,
            "proveedor_email" : self._proveedor_email,
            "id_usuario" : self._id_usuario,
            "nombre" : self._nombre,
            "email" : self._email
            
        }