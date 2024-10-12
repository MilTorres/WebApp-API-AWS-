from flask import Flask, request, jsonify

app = Flask(__name__)

class MyClass:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}!"

@app.route('/greet', methods=['GET'])
def greet():
    name = request.args.get('name')
    my_class = MyClass(name)
    result = my_class.greet()
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
