import React from "react";

import Container from "../components/Container/Container.js";
import Table from "../components/Table/Table.js";

const MoneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

class Main extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Container
        className={["kamina-container-main", data.length ? "" : "-loading"].join(" ")}
      >
        <Table
          data={data}
          headers={[
            {
              name: "#",
              data: (row, rowIdx) => rowIdx + 1
            },
            {
              name: "Name",
              data: row => (
                <div>
                  <b>{row.symbol}</b> • {row.name}
                </div>
              ),
              sortBy: row => row.name
            },
            {
              name: "Price USD",
              data: row => MoneyFormatter.format(row.quote.USD.price),
              sortBy: row => row.quote.USD.price,
              style: { textAlign: "right" }
            },
            {
              name: "24h Change",
              data: row =>
                `${Number(row.quote.USD.percent_change_24h).toFixed(3)}%`,
              sortBy: row => row.quote.USD.percent_change_24h,
              style: { textAlign: "right" },
              styleRow: row => ({
                color: row.quote.USD.percent_change_24h > 0 ? "#2e2" : "#f70",
                textAlign: "right"
              })
            },
            {
              name: "Market Cap",
              data: row => MoneyFormatter.format(row.quote.USD.market_cap),
              sortBy: row => row.quote.USD.market_cap,
              style: { textAlign: "right" }
            },
            {
              name: "Volume 24h",
              data: row => MoneyFormatter.format(row.quote.USD.volume_24h),
              sortBy: row => row.quote.USD.volume_24h,
              style: { textAlign: "right" }
            }
          ]}
        />
      </Container>
    );
  }
}

export default Main;
