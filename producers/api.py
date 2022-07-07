import threading
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from kafka import KafkaProducer

from producers.football_data_producer import produce

app = FastAPI()
KAFKA_URL = "172.30.1.37:9092"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/prices/{symbol}")
def start_price(symbol: str):
    """
    Start events for a price
    :return:
    """

    producer = KafkaProducer(bootstrap_servers=KAFKA_URL)
    emitter = threading.Thread(target=produce, args=(producer, symbol))
    emitter.start()

    return {
        "status_code": 200,
        "detail": f"Started emitting events for game {symbol}"
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001, log_level="info")
