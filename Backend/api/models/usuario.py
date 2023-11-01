class Usuario():
    def __init__(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._email = row[2]
        self._password = row[3]
    
    def to_json(self):
        return {
            "id" : self._id,
            "nombre" : self._nombre,
            "email" : self._email,
            "password" : self._password
        }