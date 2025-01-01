from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key= os.getenv('OPENAI_API_KEY')
)

app = Flask(__name__) # setup paths
CORS(app) # enable cors on all routes

@app.route('/msg')
def test():
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "write a haiku about ai"}
        ]
    )

    return completion.choices[0].message
    #return 'hello world! backend up and running'

if __name__ == '__main__':
    app.run(debug = True)