class Historial():
    def __init__(self,row):
        self._fecha_factura = row[0]
        self._id_usuario = row[1]
        # self._id = row[2]
        # self._id_usuario = row[3]
        self._nombre = row[4]
        self._apellido = row[5]
        self._cuit = row[6]
        self._id_factura = row[7]
        self._id_producto = row[8]
        self._cantidad = row[9]
        self._precio_producto = row[10]
        self._nombre_producto = row[11]        
        # self._id = row[12]
    
    def to_json(self):
        return {
            "fecha factura" : self._fecha_factura,
            "id_usuario": self._id_usuario,
            "nombre": self._nombre,
            "apellido" : self._apellido,
            "cuit" : self._cuit,
            "id_factura" : self._id_factura,
            "id_producto" : self._id_producto,
            "cantidad" : self._cantidad,
            "precio_producto" : self._precio_producto
        }

    
