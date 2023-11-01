class Factura_servicios():
    def __init__(self, row):
        self._id_factura = row[0]
        self._id_servicio = row[1]
        self._cantidad = row[2]
        self._precio_servicio = row[3]
    
    def to_json(self):
        return {
            "id_factura" : self._id_factura,
            "id_servicio" : self._id_servicio,
            "cantidad" : self._cantidad,
            "precio_servicio" : self._precio_servicio
        }