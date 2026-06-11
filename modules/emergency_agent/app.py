import uvicorn
from fastapi import FastAPI
from .router import router

app = FastAPI(title="RailMind - Emergency Response Agent", version="0.1.0")


@app.get("/")
def root():
    return {
        "service": "RailMind Emergency Response Agent",
        "endpoints": {
            "GET  /emergency/health": "Health check",
            "POST /emergency/assess": "Assess incident and generate recommendations",
        },
    }


app.include_router(router)


if __name__ == "__main__":
    uvicorn.run("modules.emergency_agent.app:app", host="0.0.0.0", port=8002, reload=True)
