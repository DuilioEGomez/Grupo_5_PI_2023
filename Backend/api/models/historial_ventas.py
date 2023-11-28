class Historial():
    def __init__(self,row):
        self._apellido = row[0]
        self._nombre = row[1]
        self._cuit = row[2]
        self._cantidad = row[3]
        self._precio_producto = row[4]
        self._nombre_producto = row[5]        
        self._fecha_factura = row[6]
        self._id = row[7]
        self._id_usuario = row[8]
    
    def to_json(self):
        return {
            "apellido" : self._apellido,
            "nombre": self._nombre,
            "cuit" : self._cuit,
            "cantidad" : self._cantidad,
            "precio_producto" : self._precio_producto,
            "nombre_producto" : self._nombre_producto,
            "fecha factura" : self._fecha_factura,
            "id factura" : self._id ,
            "id_usuario" : self._id_usuario
            
        }

    
