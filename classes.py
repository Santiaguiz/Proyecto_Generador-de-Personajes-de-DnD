from flask import Blueprint, jsonify
from models.character_class import Class

class_bp = Blueprint('character_class', __name__)
class_model = Class()

@class_bp.route('/', methods=['GET'])
def get_all_classes():
    classes = class_model.get_all()
    return jsonify([{
        'id': cls.get('id'),
        'Class': cls.get('Class'),
        'Dado_de_Golpe': cls.get('Dado_de_Golpe'),
        'Caracterisitica_Principal': cls.get('Caracterisitica_Principal'),
        'TiradasSalvacion': cls.get('TiradasSalvacion'),
        'CompetArm': cls.get('CompetArm'),
        'Bonlvl1': cls.get('Bonlvl1'),
        'Rasgos': cls.get('Rasgos'),
        'Puntos_Golpe': cls.get('Puntos_Golpe')
    } for cls in classes]), 200

@class_bp.route('/<int:id>', methods=['GET'])
def get_class_by_id(id):
    cls = class_model.get_by_id(id)
    if not cls:
        return jsonify({'message': 'Clase no encontrada'}), 404
    return jsonify({
        'id': cls.get('id'),
        'Class': cls.get('Class'),
        'Dado_de_Golpe': cls.get('Dado_de_Golpe'),
        'Caracterisitica_Principal': cls.get('Caracterisitica_Principal'),
        'TiradasSalvacion': cls.get('TiradasSalvacion'),
        'CompetArm': cls.get('CompetArm'),
        'Bonlvl1': cls.get('Bonlvl1'),
        'Rasgos': cls.get('Rasgos'),
        'Puntos_Golpe': cls.get('Puntos_Golpe')
    }), 200
