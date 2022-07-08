import datetime
import json
from dataclasses import dataclass, asdict
from time import sleep
from typing import List, Dict

from kafka import KafkaConsumer
from kafka.errors import NoBrokersAvailable
from starlette.websockets import WebSocket

KAFKA_URL = "172.30.1.37:9092"  # kafka 주소


def connect_consumer():  # 컨슈머 연결
    while True:
        try:
            consumer = KafkaConsumer(
                f"futhres-test",
                max_poll_records=1,
                bootstrap_servers=KAFKA_URL,
            )  # kafka 컨슈머 생성
            break
        except NoBrokersAvailable:  # 예외 처리
            sleep(1)
    return consumer  # 컨슈머 반환


def parse(message):  # 메시지 구문 분석
    return json.loads(message.value.decode("utf-8"))  # json.loads 함수 호출


@dataclass  # 데이터 정의
class Message(object):  # Message 데이터클래스
    type: int
    symbol: str
    hotime: str


@dataclass
class Offerho(object):
    offerho1: float
    offerho2: float
    offerho3: float
    offerho4: float
    offerho5: float


@dataclass
class Bidho(object):
    bidho1: float
    bidho2: float
    bidho3: float
    bidho4: float
    bidho5: float


@dataclass
class Offerrem(object):
    offerrem1: float
    offerrem2: float
    offerrem3: float
    offerrem4: float
    offerrem5: float


@dataclass
class Bidrem(object):
    bidrem1: float
    bidrem2: float
    bidrem3: float
    bidrem4: float
    bidrem5: float


@dataclass
class Offerno(object):
    offerno1: float
    offerno2: float
    offerno3: float
    offerno4: float
    offerno5: float


@dataclass
class Bidno(object):
    bidno1: float
    bidno2: float
    bidno3: float
    bidno4: float
    bidno5: float

@dataclass
class Totoffer(object):
    totoffercnt: int
    totofferrem: int


@dataclass
class Totbidho(object):
    totbidcnt: int
    totbidrem: int


@dataclass(init=True)  # 데이터 정의(생성자 포함)
class Price:  # Price(실시간 호가창) 데이터클래스
    type: int           # 데이터 구분
    symbol: str         # 종목 구분
    hotime: str         # 호가 시간

    offerho1: float     # 매도호가1
    bidho1: float       # 매수호가1
    offerrem1: int      # 매도호가잔량1
    bidrem1: int        # 매수호가잔량1
    offerno1: int       # 매도호가건수1
    bidno1: int         # 매수호가건수1

    offerho2: float     # 매도호가2
    bidho2: float       # 매수호가2
    offerrem2: int      # 매도호가잔량2
    bidrem2: int        # 매수호가잔량2
    offerno2: int       # 매도호가건수2
    bidno2: int         # 매수호가건수2

    offerho3: float     # 매도호가3
    bidho3: float       # 매수호가3
    offerrem3: int      # 매도호가잔량3
    bidrem3: int        # 매수호가잔량3
    offerno3: int       # 매도호가건수3
    bidno3: int         # 매수호가건수3

    offerho4: float     # 매도호가4
    bidho4: float       # 매수호가4
    offerrem4: int      # 매도호가잔량4
    bidrem4: int        # 매수호가잔량4
    offerno4: int       # 매도호가건수4
    bidno4: int         # 매수호가건수4

    offerho5: float     # 매도호가5
    bidho5: float       # 매수호가5
    offerrem5: int      # 매도호가잔량5
    bidrem5: int        # 매수호가잔량5
    offerno5: int       # 매도호가건수5
    bidno5: int         # 매수호가건수5

    totoffercnt: int    # 매도호가총건수
    totbidcnt: int      # 매수호가총건수
    totofferrem: int    # 매도호가총잔량
    totbidrem: int      # 매수호가총잔량

    def dict(self):  # 딕셔너리 형태로 반환
        return {
            "type": self.type,
            "symbol": self.symbol,
            "hotime": self.hotime,

            "offerho1": self.offerho1,
            "offerho2": self.offerho2,
            "offerho3": self.offerho3,
            "offerho4": self.offerho4,
            "offerho5": self.offerho5,

            "bidho1": self.bidho1,
            "bidho2": self.bidho2,
            "bidho3": self.bidho3,
            "bidho4": self.bidho4,
            "bidho5": self.bidho5,

            "offerrem1": self.offerrem1,
            "offerrem2": self.offerrem2,
            "offerrem3": self.offerrem3,
            "offerrem4": self.offerrem4,
            "offerrem5": self.offerrem5,

            "bidrem1": self.bidrem1,
            "bidrem2": self.bidrem2,
            "bidrem3": self.bidrem3,
            "bidrem4": self.bidrem4,
            "bidrem5": self.bidrem5,

            "offerno1": self.offerno1,
            "offerno2": self.offerno2,
            "offerno3": self.offerno3,
            "offerno4": self.offerno4,
            "offerno5": self.offerno5,

            "bidno1": self.bidno1,
            "bidno2": self.bidno2,
            "bidno3": self.bidno3,
            "bidno4": self.bidno4,
            "bidno5": self.bidno5,

            "totoffercnt": self.totoffercnt,
            "totbidcnt": self.totbidcnt,
            "totofferrem": self.totofferrem,
            "totbidrem": self.totbidrem,
        }

    def apply(self, hotime) -> bool:  # hotime을 받아서 bool 형태로 반환
        """
        Apply the hotime and return whether something happened
        :param hotime:
        :return:
        """
        hotime = datetime.time(int(hotime[:2]), int(hotime[3:5]), int(hotime[5:]), 0,
                               tzinfo=datetime.timezone(datetime.timedelta(hours=9)))
        if hotime > datetime.time(00,00,00,00,tzinfo=datetime.timezone(datetime.timedelta(hours=9))):  # event['id'] 가 events 안에 있으면 False 반환
            return True


class DataManager:  # DataManager 클래스
    prices: Dict[str, Price] = {}  # prices = { 'key': Price object }

    def process_message(self, price: Price):  # 메시지 출력
        if price.symbol not in self.prices:  # prices 안에 symbol가 없으면
            self.prices[price.symbol] = Price(**price.dict())
        else:
            self.prices[price.symbol] = price

        price = self.prices[price.symbol]  # price에 prices 딕셔너리의 Price 클래스를 저장
        return price


class ConnectionManager:
    def __init__(self):  # 생성자
        self.active_connections: List[WebSocket] = []  # active_connections 에 WebSocket 리스트 저장

    async def connect(self, websocket: WebSocket):  # 비동기식 프로그래밍
        await websocket.accept()  # 웹소켓 accept 대기
        self.active_connections.append(websocket)  # active_connections 에 websocket 추가

    def disconnect(self, websocket: WebSocket):  # 연결 해제
        self.active_connections.remove(websocket)  # active_connections 에 websocket 제거

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):  # 비동기 프로그래밍
        for connection in self.active_connections:  # active_connections 에서 connection을 꺼내옴
            await connection.send_text(message)  # 메시지 전송 대기


class PriceEncoder(json.JSONEncoder):  # JSONEncoder 확장
    def default(self, o):
        if type(o) in [Price]:  # 해당 List 안에 입력한 object 타입이 있다면
            return asdict(o)  # 딕셔너리 형태로 반환
        return super().default(o)  # JSON default 함수로 반환
