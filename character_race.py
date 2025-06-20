import pandas as pd

class Race:
    def __init__(self):
        self.data = pd.read_excel('C:/Users/blanc/OneDrive/Desktop/GeneradorDnD/data/data_race.xlsx').to_dict('records')
    
    def get_all(self):
        return self.data

    def get_by_id(self, race_id):
        for race in self.data:
            if race['id'] == race_id:
                return race
        return None
