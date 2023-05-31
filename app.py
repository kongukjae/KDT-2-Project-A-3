import json

def save_data(data):
    with open('data.json', 'w') as f:
        json.dump(data, f)