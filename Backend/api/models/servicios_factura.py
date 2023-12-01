class Servicios_factura():
    def __init__(self, row):
        self._id_factura = row[0]
        self._id_servicio = row[1]
        self._cantidad = row[2]
        self._precio_servicio = row[3]
        self._id = row[4]
        self._id_usuario = row[5]
        self._nombre_servicio = row[6]
        self._precio = row[7]
        self._activo = row[8]
        self._id = row[9]
        self._id_usuario = row[10]
        self._nombre = row[11]
        self._apellido = row[12]
        self._cuit = row[13]
        self._activo = row[14]
        self._id = row[15]
        self._id_usuario = row[16]
        self._id_cliente = row[17]
        self._fecha_factura = row[18]

    def to_json(self):
        return {
            "apellido" : self._apellido,
            "nombre" : self._nombre,
            "nombre servicio" : self._nombre_servicio,
            "precio servicio" : self._precio_servicio,
            "cantidad" : self._cantidad,
            "cuit" : self._cuit,
            "fecha_factura" : self._fecha_factura,
            "id_servicio" : self._id_servicio
        }
