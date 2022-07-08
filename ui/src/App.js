import './App.css';
import React, { Component } from "react"

const ENDPOINT = "172.30.1.7:5000"; // 웹 서비스 주소 설정

 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prices: {},
        plists: {},
        symbol: "HCEIZ22" // set this game as the default
    }
    this.processMessage = this.processMessage.bind(this);
  }

  processMessage(message) {
      message = JSON.parse(message.data)
      const symbol = message.symbol
      const newState = {...this.state, prices: {...this.state.prices, [symbol]: message}}
      this.setState(newState)
  }

  componentDidMount() {
    fetch("http://" + ENDPOINT + "/prices") // 호가창 연결
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data)
        const result = data.reduce(function(map, obj) {
          map[obj.symbol] = obj; return map;
        }, {})
        this.setState({...this.state, prices: result})
      })

    fetch("http://" + ENDPOINT + "/plists") // 데이터 베이스 연결 추가
      .then(response => {
        console.log(response)
        response.json()
      })
      .then(data => {
        console.log(data)
        data = JSON.parse(data)
        console.log(data)
        const result = data.reduce(function(map, obj) {
          map[obj.SymbolNm] = obj; return map;
        }, [])
        this.setState({...this.state, plists: result})
      })

    const client = new WebSocket("ws://" + ENDPOINT + "/ws")

    client.onopen = function(event) {
      console.log("Connected!")
    }
 
    client.onerror = function(error) {
      console.log(error)
    };
    
    client.onmessage = this.processMessage

    client.oclose = function(event) {
      console.log("Disconnected")
    }
  }

  render() {
    return (
      <div style={{marginLeft: 50}}>
        <h1>Live Prices</h1>
        {Object.keys(this.state.prices).map((key) => <Price key={key} price={this.state.prices[key]}/>)}
        {Object.keys(this.state.plists).map((key) => <Plist key={key} plist={this.state.plists[key]}/>)}
      </div>
    );
  }
}

const Plist = (props) => {
  let no = 0
  let Symbol = ''
  let SymbolNm = ''
  let ApplDate = ''
  let BscGdsCd = ''
  let BscGdsNm = ''
  let ExchCd = ''
  let ExchNm = ''
  let CrncyCd = ''
  let NotaCd = ''
  let UntPrc = 0.0
  let MnChgAmt = 0.0
  let RgltFctr = 0.0
  let CtrtPrAmt = 0.0
  let GdsCd = ''
  let LstngYr = ''
  let LstngM = ''
  let EcPrc = 0.0
  let DlStrtTm = ''
  let DlEndTm = ''
  let DlPsbCd = ''
  let MgnCltCd = ''
  let OpngMgn = 0.0
  let MntncMgn = 0.0
  let OpngMgnR = 0.0
  let MntncMgnR = 0.0
  let DotGb = ''

  if (props.plists.no) {
    no = props.plists.no
  }
  if (props.plists.Symbol) {
    Symbol = props.plists.Symbol
  }
  if (props.plists.SymbolNm) {
    SymbolNm = props.plists.SymbolNm
  }
  if (props.plists.ApplDate) {
    ApplDate = props.plists.ApplDate
  }
  if (props.plists.BscGdsCd) {
    BscGdsCd = props.plists.BscGdsCd
  }
  if (props.plists.BscGdsNm) {
    BscGdsNm = props.plists.BscGdsNm
  }
  if (props.plists.ExchCd) {
    ExchCd = props.plists.ExchCd
  }
  if (props.plists.ExchNm) {
    ExchNm = props.plists.ExchNm
  }
  if (props.plists.CrncyCd) {
    CrncyCd = props.plists.CrncyCd
  }
  if (props.plists.NotaCd) {
    NotaCd = props.plists.NotaCd
  }
  if (props.plists.UntPrc) {
    UntPrc = props.plists.UntPrc
  }
  if (props.plists.MnChgAmt) {
    MnChgAmt = props.plists.MnChgAmt
  }
  if (props.plists.RgltFctr) {
    RgltFctr = props.plists.RgltFctr
  }
  if (props.plists.CtrtPrAmt) {
    CtrtPrAmt = props.plists.CtrtPrAmt
  }
  if (props.plists.GdsCd) {
    GdsCd = props.plists.GdsCd
  }
  if (props.plists.LstngYr) {
    LstngYr = props.plists.LstngYr
  }
  if (props.plists.LstngM) {
    LstngM = props.plists.LstngM
  }
  if (props.plists.EcPrc) {
    EcPrc = props.plists.EcPrc
  }
  if (props.plists.DlStrtTm) {
    DlStrtTm = props.plists.DlStrtTm
  }
  if (props.plists.DlEndTm) {
    DlEndTm = props.plists.DlEndTm
  }
  if (props.plists.DlPsbCd) {
    DlPsbCd = props.plists.DlPsbCd
  }
  if (props.plists.MgnCltCd) {
    MgnCltCd = props.plists.MgnCltCd
  }
  if (props.plists.OpngMgn) {
    OpngMgn = props.plists.OpngMgn
  }
  if (props.plists.MntncMgn) {
    MntncMgn = props.plists.MntncMgn
  }
  if (props.plists.OpngMgnR) {
    OpngMgnR = props.plists.OpngMgnR
  }
  if (props.plists.MntncMgnR) {
    MntncMgnR = props.plists.MntncMgnR
  }
  if (props.plists.DotGb) {
    DotGb = props.plists.DotGb
  }

  return <div style={{margin: 10}}>

    <div style={{paddingLeft: 10, fontSize: 12}}>

      <table border="1">
        <caption>목록</caption>
        <thead>
          <tr className="top">
            <th>종목</th>
            <th>코드</th>
            <th>월물</th>
            <th>현재가</th>
            <th>전일대비</th>
          </tr>
        </thead>
        <tbody>
           <tr>
            <td>{SymbolNm}</td>
            <td>{Symbol}</td>
            <td>{LstngYr}({LstngM})</td>
            <td>{CtrtPrAmt}</td>
            <td>{EcPrc}</td>
          </tr>
        </tbody>


      </table>
    </div>
  </div>
}


const Price = (props) => {
  var type = 0
  var symbol = "Unknown"
  var hotime = "Unknown"
  var offerho1 = 0.0
  var offerho2 = 0.0
  var offerho3 = 0.0
  var offerho4 = 0.0
  var offerho5 = 0.0
  var bidho1 = 0.0
  var bidho2 = 0.0
  var bidho3 = 0.0
  var bidho4 = 0.0
  var bidho5 = 0.0
  var offerrem1 = 0.0
  var offerrem2 = 0.0
  var offerrem3 = 0.0
  var offerrem4 = 0.0
  var offerrem5 = 0.0
  var bidrem1 = 0.0
  var bidrem2 = 0.0
  var bidrem3 = 0.0
  var bidrem4 = 0.0
  var bidrem5 = 0.0
  var offerno1 = 0.0
  var offerno2 = 0.0
  var offerno3 = 0.0
  var offerno4 = 0.0
  var offerno5 = 0.0
  var bidno1 = 0.0
  var bidno2 = 0.0
  var bidno3 = 0.0
  var bidno4 = 0.0
  var bidno5 = 0.0
  var totofferrem = 0
  var totoffercnt = 0
  var totbidcnt = 0
  var totbidrem = 0


  if (props.price.type) {
    type = props.price.type
  }
  if (props.price.symbol) {
    symbol = props.price.symbol
  }
  if (props.price.hotime) {
    hotime = props.price.hotime
  }
  if (props.price.offerho1) {
    offerho1 = props.price.offerho1
  }

  if (props.price.bidho1) {
    bidho1 = props.price.bidho1
  }
  if (props.price.offerrem1) {
    offerrem1 = props.price.offerrem1
  }
  if (props.price.bidrem1) {
    bidrem1 = props.price.bidrem1
  }
    if (props.price.offerno1) {
    offerno1 = props.price.offerno1
  }
  if (props.price.bidno1) {
    bidno1 = props.price.bidno1
  }

  if (props.price.offerho2) {
    offerho2 = props.price.offerho2
  }
  if (props.price.bidho2) {
    bidho2 = props.price.bidho2
  }
  if (props.price.offerrem2) {
    offerrem2 = props.price.offerrem2
  }
  if (props.price.bidrem2) {
    bidrem2 = props.price.bidrem2
  }
  if (props.price.offerno2) {
    offerno2 = props.price.offerno2
  }
  if (props.price.bidno2) {
    bidno2 = props.price.bidno2
  }
  if (props.price.offerho3) {
    offerho3 = props.price.offerho3
  }
  if (props.price.bidho3) {
    bidho3 = props.price.bidho3
  }
  if (props.price.offerrem3) {
    offerrem3 = props.price.offerrem3
  }
  if (props.price.bidrem3) {
    bidrem3 = props.price.bidrem3
  }
  if (props.price.offerno3) {
    offerno3 = props.price.offerno3
  }
  if (props.price.bidno3) {
    bidno3 = props.price.bidno3
  }
  if (props.price.offerho4) {
    offerho4 = props.price.offerho4
  }
  if (props.price.bidho4) {
    bidho4 = props.price.bidho4
  }
  if (props.price.offerrem4) {
    offerrem4 = props.price.offerrem4
  }
  if (props.price.bidrem4) {
    bidrem4 = props.price.bidrem4
  }
  if (props.price.offerno4) {
    offerno4 = props.price.offerno4
  }
  if (props.price.bidno4) {
    bidno4 = props.price.bidno4
  }
  if (props.price.offerho5) {
    offerho5 = props.price.offerho5
  }
  if (props.price.bidho5) {
    bidho5 = props.price.bidho5
  }
  if (props.price.offerrem5) {
    offerrem5 = props.price.offerrem5
  }
  if (props.price.bidrem5) {
    bidrem5 = props.price.bidrem5
  }
  if (props.price.offerno5) {
    offerno5 = props.price.offerno5
  }
  if (props.price.bidno5) {
    bidno5 = props.price.bidno5
  }
  if (props.price.totofferrem) {
    totofferrem = props.price.totofferrem
  }
  if (props.price.totbidrem) {
    totbidrem = props.price.totbidrem
  }
  if (props.price.totoffercnt) {
    totoffercnt = props.price.totoffercnt
  }
  if (props.price.totbidcnt) {
    totbidcnt = props.price.totbidcnt
  }


  return <div style={{margin: 10}}>

    <br/>
    <div style={{paddingLeft: 10, fontSize: 12}}>

      <table border="1">
        <caption>{symbol}</caption>
        <thead>
          <tr className="top">
            <th>건수</th>
            <th>잔량</th>
            <th>{hotime}</th>
            <th>건수</th>
            <th>잔량</th>
          </tr>
        </thead>
        <tbody>
           <tr>
            <td className="offer">{offerno5}</td>
            <td className="offer">{offerrem5}</td>
            <td className="offerho">{offerho5}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="offer">{offerno4}</td>
            <td className="offer">{offerrem4}</td>
            <td className="offerho">{offerho4}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="offer">{offerno3}</td>
            <td className="offer">{offerrem3}</td>
            <td className="offerho">{offerho3}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="offer">{offerno2}</td>
            <td className="offer">{offerrem2}</td>
            <td className="offerho">{offerho2}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td className="offer">{offerno1}</td>
            <td className="offer">{offerrem1}</td>
            <td className="offerho">{offerho1}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="bidho">{bidho1}</td>
            <td className="bid">{bidrem1}</td>
            <td className="bid">{bidno1}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="bidho">{bidho2}</td>
            <td className="bid">{bidrem2}</td>
            <td className="bid">{bidno2}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="bidho">{bidho3}</td>
            <td className="bid">{bidrem3}</td>
            <td className="bid">{bidno3}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="bidho">{bidho4}</td>
            <td className="bid">{bidrem4}</td>
            <td className="bid">{bidno4}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="bidho">{bidho5}</td>
            <td className="bid">{bidrem5}</td>
            <td className="bid">{bidno5}</td>
          </tr>
          <tr className="bottom">
            <td>{totoffercnt}</td>
            <td>{totofferrem}</td>
            <td>80</td>
            <td>{totbidrem}</td>
            <td>{totbidcnt}</td>
          </tr>
        </tbody>


      </table>
    </div>
  </div>
}