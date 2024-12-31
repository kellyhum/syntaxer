from flask import Flask
from flask_cors import CORS

app = Flask(__name__) # setup paths
CORS(app) # enable cors on all routes

@app.route('/msg')
def test():
    return 'hello world! backend up and running'

if __name__ == '__main__':
    app.run(debug = True)