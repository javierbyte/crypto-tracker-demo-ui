import React from "react";

import { Scatter } from "react-chartjs-2";

import Container from "../components/Container/Container.js";
import Options from "../components/Options/Options.js";

// X axis is Market Capitalization
// Y axis is Volume (24h)
// Z axis (or size of the point) is absolute price change (24h)

const MoneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

class Liquidity extends React.Component {
  state = {
    scatterPlotType: "logarithmic",
    useRelativeComparison: true,
    chartHeight: 500
  };

  componentDidMount() {
    const userAgent = window.navigator.userAgent;
    const isiOS = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
    const chartHeight =
      Math.min(window.innerHeight - 160, 580) + (isiOS ? -100 : 0);

    console.log(chartHeight);

    this.setState({
      chartHeight
    });
  }

  onSetType(type) {
    this.setState({
      scatterPlotType: type
    });
  }

  onSetRelative(bool) {
    this.setState({
      useRelativeComparison: bool
    });
  }

  render() {
    const { data } = this.props;
    const { scatterPlotType, useRelativeComparison, chartHeight } = this.state;

    const coinsByChange = data
      .map(coin => {
        return {
          id: coin.id,
          change:
            coin.quote.USD.percent_change_24h *
            (useRelativeComparison ? 1 : coin.quote.USD.market_cap)
        };
      })
      .sort((a, b) => a.change - b.change)
      .reduce((result, el, elIdx) => {
        result[el.id] = {
          relative: elIdx / data.length,
          change: el.change
        };
        return result;
      }, {});

    const parsedData = data.map(coin => {
      return {
        name: coin.name,
        symbol: coin.symbol,
        x: coin.quote.USD.market_cap,
        y: coin.quote.USD.volume_24h,
        percent_change_24h: coin.quote.USD.percent_change_24h
      };
    });

    const pointRadiusData = data.map(coin => {
      return coinsByChange[coin.id].relative * 4 + 2;
    });

    const pointBackgroundColorData = data.map(coin => {
      return `hsl(${coinsByChange[coin.id].relative * 210}, 100%, 50%)`;
    });

    return (
      <Container
        className={["container-main", data.length ? "" : "-loading"].join(" ")}
      >
        <div style={{ paddingTop: "6rem" }}>
          <Scatter
            key={chartHeight}
            height={chartHeight}
            options={{
              maintainAspectRatio: false,
              tooltips: {
                xPadding: 10,
                yPadding: 10,
                displayColors: false,
                callbacks: {
                  title: (items, data) =>
                    `${data.datasets[items[0].datasetIndex].data[items[0].index].name} (${data.datasets[items[0].datasetIndex].data[items[0].index].symbol})`,
                  label: (item, data) => ``,
                  beforeLabel: (item, data) =>
                    `Market Cap: ${MoneyFormatter.format(
                      data.datasets[item.datasetIndex].data[item.index].x
                    )}\nVolume 24h: ${MoneyFormatter.format(
                      data.datasets[item.datasetIndex].data[item.index].y
                    )}\nChange 24h: ${Number(
                      data.datasets[item.datasetIndex].data[item.index]
                        .percent_change_24h
                    ).toFixed(3)}%`
                }
              },
              legend: {
                display: false
              },
              scales: {
                xAxes: [
                  {
                    type: scatterPlotType,
                    position: "bottom",
                    scaleLabel: {
                      display: true,
                      labelString: "Market Cap (USD)"
                    }
                  }
                ],
                yAxes: [
                  {
                    type: scatterPlotType,
                    position: "bottom",
                    scaleLabel: {
                      display: true,
                      labelString: "Volume in the past 24h (USD)"
                    }
                  }
                ]
              }
            }}
            data={{
              datasets: [
                {
                  data: parsedData,
                  pointBackgroundColor: pointBackgroundColorData,
                  pointRadius: pointRadiusData
                }
              ]
            }}
          />
        </div>

        <div className="flex flex-wrap flex-align-center">
          <div className="padding-vertical-1">
            <div className="kamina-option-label">Scale Type</div>
            <Options
              options={[
                { name: "Linear", value: "linear" },
                { name: "Logarithmic", value: "logarithmic" }
              ]}
              value={scatterPlotType}
              onChange={this.onSetType.bind(this)}
            />
          </div>
          <div className="flex-1" />
          <div className="padding-vertical-1">
            <div className="kamina-option-label">Price Change</div>
            <Options
              options={[
                { name: "Relative", value: true },
                { name: "Absolute", value: false }
              ]}
              value={useRelativeComparison}
              onChange={this.onSetRelative.bind(this)}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default Liquidity;
