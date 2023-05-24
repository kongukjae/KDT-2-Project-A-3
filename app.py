from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/get-pikachu-image')
def get_pikachu_image():
    image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    return jsonify(image_url=image_url)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
