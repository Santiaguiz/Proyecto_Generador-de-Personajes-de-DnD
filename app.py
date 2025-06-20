from flask import Flask, send_from_directory
from routes.races import races_bp
from routes.classes import class_bp

app = Flask(__name__)

# Registrar blueprints
app.register_blueprint(races_bp, url_prefix='/api')
app.register_blueprint(class_bp, url_prefix='/api')

# Servir frontend
@app.route('/')
def serve_frontend():
    return send_from_directory('frontend', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('frontend', filename)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
