from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    request_data = request.json
    message = request_data.get('message')
    response_data = {'message': f'You sent: {message}'}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
