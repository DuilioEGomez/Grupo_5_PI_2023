class Factura_servicios_total():
    def __init__(self, row):
        self._id_factura = row[0]
        self._total = row[1]
        
    def to_json(self):
        return {
            "id_factura" : self._id_factura,
            "total" : self._total,
        }