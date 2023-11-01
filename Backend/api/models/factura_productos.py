class Factura_productos():
    def __init__(self, row):
        self._id_factura = row[0]
        self._id_producto = row[1]
        self._cantidad = row[2]
        self._precio = row[3]
        self._precio_producto = row[4]

    def to_json(self):
        return {
            "id_factura" : self._id_factura,
            "id_producto" : self._id_producto,
            "cantidad" : self._cantidad,
            "precio_producto" : self._precio_producto
        }