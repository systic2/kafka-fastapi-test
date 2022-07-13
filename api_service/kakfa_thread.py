import json
from time import sleep

from kafka import KafkaConsumer
from kafka.errors import NoBrokersAvailable

from api_service.helpers import ConnectionManager, DataManager, Price, PriceEncoder

KAFKA_URL = "172.30.1.15:9092"  # kafka 주소


# async 는 멀티태스킹을 위한 비동기 프로그래밍
async def run(sockets: ConnectionManager, data: DataManager):  # sockets, data 를 받아옴
    consumer = connect_consumer()  # kafka 컨슈머 생성 후 저장
    for price in consumer:    # 컨슈머에서 메시지를 꺼내옴
        price = Price(**json.loads(price.value))  # json 형태 파일로 저장
        updated_price = data.process_message(price)    # DataManager 클래스 process_message() 호출 game 을 반환하고
        # updated_price 에 저장
        if updated_price:  # 참이면 실행
            await sockets.broadcast(json.dumps(updated_price, cls=PriceEncoder))  # broadcast() 함수 대기
            sleep(0.05)
    print("Kafka thread ended")


# kafka 컨슈머 생성 루프
def connect_consumer():
    while True:  # 무한루프
        try:
            consumer = KafkaConsumer(  # kafka 컨슈머 생성
                "futhres-test",  # topic 이름
                bootstrap_servers=KAFKA_URL,  # kafka 주소 정보 입력
                auto_offset_reset='earliest'
            )
            print("Kafka consumer initiated")
            break  # 무한루프 탈출
        except NoBrokersAvailable:  # 예외
            sleep(1)
    return consumer  # kafka 컨슈머 반환
