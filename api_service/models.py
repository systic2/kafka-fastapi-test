from dataclasses import dataclass, asdict

from sqlalchemy import Column, Integer, String, Float
from pydantic import BaseModel
from api_service.db import Base
from api_service.db import ENGINE


class O3101Table(Base):
    __tablename__ = "o3101"
    no = Column(Integer, primary_key=True, autoincrement=True)  # 기본 키
    Symbol = Column(String(8), nullable=False)  # 종목코드
    SymbolNm = Column(String(50), nullable=False)  # 종목명
    ApplDate = Column(String(8), nullable=False)  # 종목배치수신일(한국일자)
    BscGdsCd = Column(String(10), nullable=False)  # 기초상품코드
    BscGdsNm = Column(String(40), nullable=False)  # 기초상품명
    ExchCd = Column(String(10), nullable=False)  # 거래소코드
    ExchNm = Column(String(40), nullable=False)  # 거래소명
    CrncyCd = Column(String(3), nullable=False)  # 기준통화코드
    NotaCd = Column(String(3), nullable=False)  # 진법구분코드
    UntPrc = Column(Float, nullable=False)  # 호가단위가격
    MnChgAmt = Column(Float, nullable=False)  # 최소가격변동금액
    RgltFctr = Column(Float, nullable=False)  # 가격조정계수
    CtrtPrAmt = Column(Float, nullable=False)  # 계약당금액
    GdsCd = Column(String(3), nullable=False)  # 상품구분코드
    LstngYr = Column(String(4), nullable=False)  # 월물(년)
    LstngM = Column(String(1), nullable=False)  # 월물(월)
    EcPrc = Column(Float, nullable=False)  # 정산가격
    DlStrtTm = Column(String(6), nullable=False)  # 거래시작시간
    DlEndTm = Column(String(6), nullable=False)  # 거래종료시간
    DlPsblCd = Column(String(1), nullable=False)  # 거래가능구분코드
    MgnCltCd = Column(String(1), nullable=False)  # 증거금징수구분코드
    OpngMgn = Column(Float, nullable=False)  # 개시증거금
    MntncMgn = Column(Float, nullable=False)  # 유지증거금
    OpngMgnR = Column(Float, nullable=False)  # 개시증거금율
    MntncMgnR = Column(Float, nullable=False)  # 유지증거금율
    DotGb = Column(Integer, nullable=False)  # 유효소수점자리수


@dataclass
class O3101(BaseModel):
    no: int
    Symbol: str
    SymbolNm: str
    ApplDate: str
    BscGdsCd: str
    BscGdsNm: str
    ExchCd: str
    ExchNm: str
    CrncyCd: str
    NotaCd: str
    UntPrc: float
    MnChgAmt: float
    RgltFctr: float
    CtrtPrAmt: float
    GdsCd: str
    LstngYr: str
    LstngM: str
    EcPrc: float
    DlStrtTm: str
    DlEndTm: str
    DlPsblCd: str
    MgnCltCd: str
    OpngMgn: float
    MntncMgn: float
    OpngMgnR: float
    MntncMgnR: float
    DotGb: int

    def dict(self):
        return {
            "no": self.no,
            "Symbol": self.Symbol,
            "SymbolNm": self.SymbolNm,

            "ApplDate": self.ApplDate,
            "BscGdsCd": self.BscGdsCd,
            "BscGdsNm": self.BscGdsNm,
            "ExchCd": self.ExchCd,
            "ExchNm": self.ExchNm,

            "CrncyCd": self.CrncyCd,
            "NotaCd": self.NotaCd,
            "UntPrc": self.UntPrc,
            "MnChgAmt": self.MnChgAmt,
            "RgltFctr": self.RgltFctr,

            "CtrtPrAmt": self.CtrtPrAmt,
            "GdsCd": self.GdsCd,
            "LstngYr": self.LstngYr,
            "LstngM": self.LstngM,
            "EcPrc": self.EcPrc,

            "DlStrtTm": self.DlStrtTm,
            "DlEndTm": self.DlEndTm,
            "DlPsblCd": self.DlPsblCd,
            "MgnCltCd": self.MgnCltCd,
            "OpngMgn": self.OpngMgn,

            "MntncMgn": self.MntncMgn,
            "OpngMgnR": self.OpngMgnR,
            "MntncMgnR": self.MntncMgnR,
            "DotGb": self.DotGb,

        }
