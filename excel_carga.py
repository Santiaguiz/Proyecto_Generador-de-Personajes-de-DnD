import pandas as pd

def load_races():
    df = pd.read_excel('../data/data_race.xlsx')
    return df.to_dict('records')

def load_classes():
    df = pd.read_excel('../data/class_data.xlsx')
    return df.to_dict('records')
