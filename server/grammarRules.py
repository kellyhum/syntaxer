grammar_rules = {
   "A1": [
       {
           "rule": "negation of 有",
           "errorPattern": "不有",
           "message": "Your negation of 有 (specifically 不有) is incorrect: always use 沒 with 有"
       },
       {
           "rule": "days of the week structure",
           "errorPattern": "星期[^一二三四五六七]",
           "message": "You inputted a day of the week that is invalid (not a number)"
       }
   ]
}