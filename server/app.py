from flask import Flask, request
from flask_cors import CORS
import random
from writingPrompts import writing_prompts
from grammarChecker import checkRules

app = Flask(__name__) # setup paths
CORS(app) # enable cors on all routes

@app.route('/api/getprompt/<cefrLvl>') # dynamically route to diff cefr levels
def getWritingPrompt(cefrLvl):
    return random.choice(writing_prompts[cefrLvl])

@app.route('/api/grammarcheck', methods=['POST'])
def grammarCheck():
    data = request.get_json()

    return checkRules(data)


if __name__ == '__main__':
    app.run(debug = True)

# sample error paragraph (gpt generated, has NOT been reviewed by google translate)
# 今天早上我吃了早餐在家，然後去學校。
# 天氣很冷，我忘記穿著外套。我朋友昨天告訴我，今天會下雨，但今天沒有下雨。
# 到了學校，我忘了帶我的書包。老師看著我，問我為什麼我沒有帶書包。
# 我回答說因為我起得很晚，所以忘記拿。
# 然後我想起我的書包在車上，可是車停在很遠的地方。