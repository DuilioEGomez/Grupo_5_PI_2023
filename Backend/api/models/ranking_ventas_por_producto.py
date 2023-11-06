class Ranking_ventas_por_producto():
    def __init__(self, row):
        self._producto_id = row[0]
        self._nombre_producto = row[1]
        self._precio_producto = row[2]
        self._total_cantidad = row[3]
    
    def to_json(self):
        return {
            "producto_id" : self._producto_id,
            "nombre producto" : self._nombre_producto,
            "precio producto" : self._precio_producto,
            "total cantidad" : self._total_cantidad
        }