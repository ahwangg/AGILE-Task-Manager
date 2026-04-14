# plant.py
from fastapi import FastAPI
from sprint import *

app = FastAPI()

# total tasks & completed tasks
# total:

def getPlantStage(point_percent):
    if point_percent < 25:
        return "/frontend/src/assets/images/seed_plant.webp"
    elif point_percent < 50:
        return "/frontend/src/assets/images/sprout_plant.webp"
    elif point_percent < 75:
        return "/frontend/src/assets/images/leafy_plant.webp"
    elif point_percent < 100:
        return "/frontend/src/assets/images/bloom_plant.webp"
    else:
        return "/frontend/src/assets/images/flower_plant.webp"

def calculate_progress(points, total):
    if total == 0:
        return 0
    return (points/total) * 100

@app.get("/plant")
def plant():
    total = 10
    points = 4

    point_percent = calculate_progress(points, total)
    stage = getPlantStage(point_percent)

    return {
        "progress": point_percent,
        "image": stage
    }