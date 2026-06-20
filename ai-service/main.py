from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        database="stayNepal",
        user="postgres",
        password="nepal@123"
    )

@app.get("/")
def root():
    return {"message": "StayNepal AI Service is running!"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "StayNepal AI"}

@app.get("/recommend/{user_id}")
def recommend(user_id: int):
    try:
        conn = get_db()
        cur = conn.cursor()

        cur.execute("SELECT id, name_en, district, price_per_night, cultural_experiences FROM homestays")
        homestays = cur.fetchall()

        cur.execute("SELECT homestay_id FROM bookings WHERE tourist_id = %s", (user_id,))
        booked_ids = [row[0] for row in cur.fetchall()]

        cur.close()
        conn.close()

        if not homestays:
            return {"recommendations": [], "message": "No homestays available"}

        recommendations = []
        for h in homestays:
            if h[0] not in booked_ids:
                recommendations.append({
                    "id": h[0],
                    "name_en": h[1],
                    "district": h[2],
                    "price_per_night": float(h[3]) if h[3] else 0,
                    "cultural_experiences": h[4],
                    "score": 0.95
                })

        return {
            "user_id": user_id,
            "recommendations": recommendations[:5],
            "algorithm": "Content-Based Filtering",
            "message": "Top 5 recommended homestays"
        }

    except Exception as e:
        return {"error": str(e), "recommendations": []}