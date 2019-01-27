import React, { Component } from "react";

class StoreInfo extends Component {
  state = { dataKey: null };
  storeStateLabels = ["0-CREATED", "1-OPEN", "2-SUSPENDED", "3-CLOSED"];

  componentDidMount() {
    const { Bileto } = this.props.drizzle.contracts;
    const dataKey = Bileto.methods.fetchStoreInfo.cacheCall();
    this.setState({ dataKey });
  }

  formatWeiToEther(_amount) {
    let _output = this.props.drizzle.web3.utils.fromWei(
      _amount.toString(),
      "ether"
    );
    _output += " ETHER";
    return _output;
  }

  render() {
    const { Bileto } = this.props.drizzleState.contracts;
    const storeInfo = Bileto.fetchStoreInfo[this.state.dataKey];
    if (!storeInfo) return "Loading...";
    const {
      storeStatus,
      storeName,
      storeOwner,
      storeSettledBalance,
      storeExcessBalance,
      storeRefundableBalance,
      storeCounterEvents,
      storeCounterPurchases
    } = storeInfo.value;
    return (
      <div className="card shadow h-100">
        <h5 className="card-header">
          <strong>{storeName}</strong> store information
        </h5>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Status: </strong>
              {this.storeStateLabels[storeStatus]}
            </li>
            <li className="list-group-item">
              <strong>Owner: </strong>
              {storeOwner}
            </li>
            <li className="list-group-item">
              <strong>Settled: </strong>
              {this.formatWeiToEther(storeSettledBalance)}
            </li>
            <li className="list-group-item">
              <strong>Excess: </strong>
              {this.formatWeiToEther(storeExcessBalance)}
            </li>
            <li className="list-group-item">
              <strong>Refundable: </strong>
              {this.formatWeiToEther(storeRefundableBalance)}
            </li>
            <li className="list-group-item">
              <strong># of Events: </strong>
              {storeCounterEvents}
            </li>
            <li className="list-group-item">
              <strong># of Purchases: </strong>
              {storeCounterPurchases}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StoreInfo;