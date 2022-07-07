import './App.css';
import React, { Component } from "react"

const ENDPOINT = "localhost:5000";

 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prices: {},
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
    fetch("http://" + ENDPOINT + "/prices")
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data)
        const result = data.reduce(function(map, obj) {
          map[obj.symbol] = obj; return map;
        }, {})
        this.setState({...this.state, prices: result})
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
      </div>
    );
  }

  // 업데이트 시 실행되는 구문
  componentDidUpdate(prevProps,prevState) {
    console.log("갱신될때 실행")
    console.log(prevState.prices)
    console.log(this.state.prices)
    if (this.state.prices !== prevState.prices) {
      console.log("값 비교해서 다르면 실행")
      this.setState(this.state)
      console.log("setState 실행")
    }
  }
}

// const Game = (props) => {
//   var home_team = "Unknown"
//   var away_team = "Unknown"
//   if (props.game.home_team) {
//     home_team = props.game.home_team.name
//   }
//   if (props.game.away_team) {
//     away_team = props.game.away_team.name
//   }
//
//   const home_goals = props.game.goals.reduce(function(amount, goal) {
//     if (goal.team_id === props.game.home_team.id){
//       amount += 1;
//     }
//     return amount
//   }, 0)
//
//   const away_goals = props.game.goals.reduce(function(amount, goal) {
//     if (goal.team_id === props.game.away_team.id){
//       amount += 1;
//     }
//     return amount
//   }, 0)
//
//   return <div style={{margin: 10}}>
//     {home_team} - {away_team}: {home_goals}-{away_goals}
//     <br/>
//     <div style={{paddingLeft: 10, fontSize: 12}}>
//     {props.game.goals.map((item) =>
//       <div key={item.minute.toString()+item.player.id}>Goal: {item.player.name} - {item.minute}'</div>)}
//     {props.game.yellow_cards.map((item) =>
//       <div key={item.minute.toString()+item.player.id}>Yellow: {item.player.name} - {item.minute}'</div>)}
//     {props.game.second_yellows.map((item) =>
//       <div key={item.minute.toString()+item.player.id}>Second yellow: {item.player.name} - {item.minute}'</div>)}
//     {props.game.red_cards.map((item) =>
//       <div key={item.minute.toString()+item.player.id}>Red: {item.player.name} - {item.minute}'</div>)}
//     </div>
//   </div>
// }

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
    {type} : {symbol} : {hotime}
    <br/>
    <div style={{paddingLeft: 10, fontSize: 12}}>
      <table border="1">
        <thead>
          <tr>
            <th>건수</th>
            <th>잔량</th>
            <th>호가시간</th>
            <th>건수</th>
            <th>잔량</th>
          </tr>
        </thead>
        <tbody>
           <tr>
            <td>{offerno5}</td>
            <td>{offerrem5}</td>
            <td>{offerho5}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{offerno4}</td>
            <td>{offerrem4}</td>
            <td>{offerho4}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{offerno3}</td>
            <td>{offerrem3}</td>
            <td>{offerho3}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{offerno2}</td>
            <td>{offerrem2}</td>
            <td>{offerho2}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{offerno1}</td>
            <td>{offerrem1}</td>
            <td>{offerho1}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{bidho1}</td>
            <td>{bidrem1}</td>
            <td>{bidno1}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{bidho2}</td>
            <td>{bidrem2}</td>
            <td>{bidno2}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{bidho3}</td>
            <td>{bidrem3}</td>
            <td>{bidno3}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{bidho4}</td>
            <td>{bidrem4}</td>
            <td>{bidno4}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>{bidho5}</td>
            <td>{bidrem5}</td>
            <td>{bidno5}</td>
          </tr>
          <tr>
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