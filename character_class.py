import pandas as pd

class Class:
    def __init__(self):
        self.data = pd.read_excel('C:/Users/blanc/OneDrive/Desktop/GeneradorDnD/data/class_data.xlsx').to_dict('records')
    
    def get_all(self):
        return self.data

    def get_by_id(self, class_id):
         for cls in self.data:
                if cls['id'] == class_id:
                 return cls
         return None