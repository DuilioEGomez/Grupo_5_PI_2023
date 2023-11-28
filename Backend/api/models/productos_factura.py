class Productos_factura():
    def __init__(self, row):
        self._id_factura = row[0]
        self._id_producto = row[1]
        self._cantidad = row[2]
        self._precio_producto = row[3]
        self._id = row[4]
        self._id_usuario = row[5]
        self._nombre_producto = row[6]
        self._stock_disponible = row[7]
        self._precio = row[8]
        self._proveedor = row[9]
        self._proveedor_email = row[10]
        self._alerta_stock = row[11]
        self._activo = row[12]
        self._id = row[13]
        self._id_usuario = row[14]
        self._nombre = row[15]
        self._apellido = row[16]
        self._cuit = row[17]
        self._activo = row[18]
        self._id = self._id_factura
        self._id_usuario = row[20]
        self._id_cliente = row[21]
        self._fecha_factura = row[22]
    
    def to_json(self):
        return {
            "id_factura" : self._id_factura,
            "cliente" : self._id_cliente,
            "apellido" : self._apellido,
            "nombre" : self._nombre,
            "cuit" : self._cuit,
            "nombre producto" : self._nombre_producto,
            "precio" : self._precio_producto,
            "cantidad" : self._cantidad,
            "fecha_factura" : self._fecha_factura
        }
        
