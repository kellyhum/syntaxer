from flask import Flask
from flask_cors import CORS
import random
from writingPrompts import writing_prompts

app = Flask(__name__) # setup paths
CORS(app) # enable cors on all routes

@app.route('/getprompt/<cefrLvl>') # dynamically route to diff cefr levels
def getWritingPrompt(cefrLvl):
    return random.choice(writing_prompts[cefrLvl])

if __name__ == '__main__':
    app.run(debug = True)