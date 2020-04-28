import React from 'react';
import ReactApexChart from 'react-apexcharts';



export default class Chart extends React.Component {

    render(){

      const data = {
        series: this.props.series,
        options: {
          toolbar: {
            show: false
          },
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: this.props.title,
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: this.props.categories,
          }
        },
      
      
      };

      return <div>
          <ReactApexChart options={data.options} series={data.series} type="line" height={350}/>
      </div>
    }
    }
