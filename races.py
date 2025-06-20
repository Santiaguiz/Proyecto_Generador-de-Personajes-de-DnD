from flask import Blueprint, jsonify
from models.character_race import Race

races_bp = Blueprint('races', __name__)
race_model = Race()

@races_bp.route('/', methods=['GET'])
def get_all_races():
    races = race_model.get_all()
    return jsonify([{
        'id': race.get('id'),
        'nombre': race.get('name'),
        'raza_padre': race.get('parent'),
        'bonif_fuerza': race.get('fuerza'),
        'bonif_destreza': race.get('destreza'),
        'bonif_constitucion': race.get('constitucion'),
        'bonif_inteligencia': race.get('inteligencia'),
        'bonif_carisma': race.get('carisma'),
        'bonif_sabiduria': race.get('sabiduria'),
        'habilidades': race.get('habilidades'),
        'idiomas': race.get('idiomas')
    } for race in races]), 200

@races_bp.route('/<int:id>', methods=['GET'])
def get_race_by_id(id):
    race = race_model.get_by_id(id)
    if not race:
        return jsonify({'message': 'Raza no encontrada'}), 404
    return jsonify({
        'id': race.get('id'),
        'nombre': race.get('name'),
        'raza_padre': race.get('parent'),
        'bonif_fuerza': race.get('fuerza'),
        'bonif_destreza': race.get('destreza'),
        'bonif_constitucion': race.get('constitucion'),
        'bonif_inteligencia': race.get('inteligencia'),
        'bonif_carisma': race.get('carisma'),
        'bonif_sabiduria': race.get('sabiduria'),
        'habilidades': race.get('habilidades'),
        'idiomas': race.get('idiomas')
    }), 200
