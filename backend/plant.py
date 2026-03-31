from flask import Flask, jsonify, render_template

from sprint import *

app = Flask(__name__)

# total tasks & completed tasks
# total:


def getPlantStage(points):
    if points < 25:
        return "images/seed_plant.webp"
    elif points < 50:
        "images/sprout_plant.webp"
    elif points < 75:
        "images/leafy_plant.webp"
    elif points < 100:
        "images/bloom_plant.webp"
    else:
        "images/flower_plant.webp"

@app.route("/")
def home():
    return
    # points = 
