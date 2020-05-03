import React from "react";
import ReactApexChart from "react-apexcharts";
import "./chart.css";

export default class Chart extends React.Component {
  render() {
    const data = {
      series: this.props.series,
      options: {
        toolbar: {
          show: false,
        },
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: this.props.title,
          align: "center",
          style: {
            fontFamily: "Roboto",
            color: "white",
          },
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.props.categories,
        },
        yaxis: {
          show: true,
          showAlways: true,
          labels: {
            show: true,
            style: {
              colors: "white",
            },
          },
        },
      },
    };

    return (
      <div>
        <ReactApexChart
          className="color"
          options={data.options}
          series={data.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
