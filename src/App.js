import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import loremIpsum from "lorem-ipsum";
import { List } from "react-virtualized";

const rowCount = 2000000;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.renderRow = this.renderRow.bind(this);
    this.sortList = this.sortList.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
    this.state = {
      list: Array(rowCount)
        .fill()
        .map((val, idx) => {
          return {
            id: idx,
            name: "John Doe",
            tradePrice: Math.floor(Math.random() * 600) + 1,
            image: "http://via.placeholder.com/40",
            text: loremIpsum({
              count: 1,
              units: "sentences",
              sentenceLowerBound: 4,
              sentenceUpperBound: 8
            })
          };
        }),
      sortDirection: 0
    };
  }
  renderRow({ index, key, style }) {
    return (
      <div key={key} style={style} className="row">
        <div>{this.state.list[index].id}&nbsp;</div>

        <div>{this.state.list[index].name}&nbsp;</div>
        <div>{this.state.list[index].tradePrice}&nbsp;</div>
        <div>{this.state.list[index].text}&nbsp;</div>
      </div>
    );
  }

  sortList() {
    console.log("sortList");
    var d = this.state.sortDirection === 0 ? 1 : 0;
    this.setState((prevState, props) => {
      return {
        list: this.state.list.sort(function(a, b) {
          if (d === 1) {
            return b.id - a.id;
          } else {
            return a.id - b.id;
          }
        }),
        sortDirection: d
      };
    });
    this.refs.forceUpdateGrid();
  }

  sortByPrice() {
    console.log("sortByPrice");
    var d = this.state.sortDirection === 0 ? 1 : 0;
    this.setState((prevState, props) => {
      return {
        list: this.state.list.sort(function(a, b) {
          if (d === 1) {
            return b.tradePrice - a.tradePrice;
          } else {
            return a.tradePrice - b.tradePrice;
          }
        }),
        sortDirection: d
      };
    });
    this.refs.forceUpdateGrid();
  }

  render() {
    const listHeight = 600;
    const rowHeight = 50;
    const rowWidth = 900;
    return (
      <div className="App">
        <div>
          <button onClick={this.sortList}>Sort</button>
        </div>
        <div>
          <button onClick={this.sortByPrice}>Sort by Price</button>
        </div>

        <div className="list">
          <List
            ref={ref => (this.refs = ref)}
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={this.state.list.length}
          />
        </div>
      </div>
    );
  }
}

export default App;
