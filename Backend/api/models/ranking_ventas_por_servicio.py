class Ranking_ventas_por_servicio():
    def __init__(self, row):
        self._servicio_id = row[0]
        self._nombre_servicio = row[1]
        self._precio_servicio = row[2]
        self._total_cantidad = row[3]
    
    def to_json(self):
        return {
            "servicio_id" : self._servicio_id,
            "nombre servicio" : self._nombre_servicio,
            "precio servicio" : self._precio_servicio,
            "total_cantidad" : self._total_cantidad
        }