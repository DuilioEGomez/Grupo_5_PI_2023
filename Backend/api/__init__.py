from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = 'DSP462'

import api.routes.cliente
import api.routes.usuario
import api.routes.factura
import api.routes.factura_productos
import api.routes.servicio
import api.routes.producto