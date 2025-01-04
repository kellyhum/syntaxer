import stanza
import re
from grammarRules import grammar_rules

# IMPORTANT: uncomment and run this once initially to get the library
# after that, can comment out b/c library is already installed
# stanza.download('zh', processors='tokenize,pos')

def checkRules(text):
    # workflow:
    # 1. split into words + parts of speech!
    # 2. check against all rules in the level and below
        # get all the rules in a database or array format
        # loop through the rules in lvl and below
        # if error identified...
            # create a new object w/ the error location (sentence, word) and desc of error (string)
            # add to error array

    # 4. return error array (to be used for chakra highlight + dialog components)

    errors = []

    # segment into words and get parts of speech for each word (for checking purposes)
    nlp = stanza.Pipeline('zh', processors='tokenize, pos', download_method=None) # turn off download

    noSpaceText = ''.join(text.split()) # rmv all spaces from text

    doc = nlp(noSpaceText)

    for sentence in doc.sentences:
        sentence_text = sentence.text
        print(sentence_text)
        # sentenceAsDict = {}
        # for word in sentence.words:
        #     sentenceAsDict[word.text] = word.upos
        
        # wordList.append(sentenceAsDict)

        for rule in grammar_rules['A1']:
            err = re.search(rule['errorPattern'], sentence_text)
            if err:
                errors.append(sentence_text[err.span()[0]:err.span()[1]])

    return {
        "errors": errors, 
        "originalParagraph": text
    }

