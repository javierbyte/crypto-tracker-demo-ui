import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Topnav from "./components/Topnav/Topnav.js";
import Container from "./components/Container/Container.js";
import Options from "./components/Options/Options.js";

import Main from "./views/Main.js";
import Liquidity from "./views/Liquidity.js";

class App extends React.Component {
  state = {
    listings: [],
    coinLimit: 100
  };

  onSetCoinLimit(coinLimit) {
    this.setState({
      coinLimit
    });
  }

  componentDidMount() {
    fetch(
      "https://javierbyte-hasty-backend.javierbyte.now.sh/v1/cryptocurrency/listings/latest"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          listings: res.data
        });
      });
  }

  render() {
    const { listings, coinLimit } = this.state;

    const coins = listings.slice(0, coinLimit);

    return (
      <Router>
        <Topnav>
          <Container className="flex flex-align-center">
            <b
              className="-hide-on-mobile"
              style={{ color: "#fff", paddingRight: "1.5rem" }}
            >
              CRYPTO
            </b>
            <NavLink activeClassName="-active" to="/" exact>
              Market
            </NavLink>
            <NavLink activeClassName="-active" to="/liquidity" exact>
              Liquidity
            </NavLink>

            <div className="flex-1" />
            <div>
              <div className="kamina-option-label">Coins</div>
              <Options
                options={[
                  { name: "10", value: 10 },
                  { name: "50", value: 50 },
                  { name: "100", value: 100 }
                ]}
                value={coinLimit}
                onChange={this.onSetCoinLimit.bind(this)}
              />
            </div>
          </Container>
        </Topnav>
        <Route exact path="/">
          <Main data={coins} />
        </Route>
        <Route exact path="/liquidity">
          <Liquidity data={coins} />
        </Route>
      </Router>
    );
  }
}

export default App;
