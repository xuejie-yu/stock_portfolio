import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";

export default function PerformanceChart(props) {
  const { portfolio } = props;
  const options = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: [],
      textStyle: {
        color: "#fff"
      }
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false
      }
    },
    toolbox: {
      itemSize: 25,
      top: 25,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {}
      }
    },
    series: []
  };

  useEffect(() => {

    let chartDOM = echarts.getInstanceByDom(document.getElementById("performanceChart"));
    if (!chartDOM) {
      chartDOM = echarts.init(document.getElementById("performanceChart"));
    }
    const legendData = [];
    options.series = [];
    if (portfolio && portfolio.stocks) {
      portfolio.stocks.forEach(stock => {
        if (!stock.gains || stock.quantity === 0) return;
        legendData.push(stock.name);
        const graphData = {
          name: stock.name,
          type: "line",
          data: stock.gains
        };
        options.series.push(graphData);
      });
    }
    options.legend.data = legendData;
    chartDOM.setOption(options, true);
  }, [options])

  return (
    <div
      id="performanceChart"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  )
}

PerformanceChart.propTypes = {
  portfolio: PropTypes.object,
};