import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  async componentDidMount() {
    try {
      const querySnapShot = await getDocs(collection(db, 'products'));
      const dataQuery = querySnapShot.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }));

      const processedData = this.processChartData(dataQuery);

      console.log('Processed Data:', processedData);

      this.setState({
        chartData: [
          {
            name: 'Products',
            data: processedData.prices.length ? processedData.prices : [0], // Ensure there's at least one data point
          },
        ],
        chartOptions: {
          ...this.props.chartOptions,
          xaxis: { categories: processedData.categories.length ? processedData.categories : ['No Data'] }, // Handle case where there are no categories
          yaxis: {
            min: 0, // Ensure the Y-axis starts from zero
          },
        },
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  processChartData(data) {
    const categoryMap = new Map();
  
    data.forEach((product) => {
      const { category, price } = product;
  
      // Convert price to a number and check for NaN or extremely large values
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice > 1e6) {
        console.error(`Invalid price found for category ${category}: ${price}`);
        return;
      }
  
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { total: parsedPrice, count: 1 });
      } else {
        const categoryData = categoryMap.get(category);
        categoryData.total += parsedPrice;
        categoryData.count += 1;
      }
    });
  
    const categories = [];
    const prices = [];
  
    categoryMap.forEach((value, key) => {
      categories.push(key);
      prices.push(value.total / value.count); // Calculating average
    });
  
    return {
      categories,
      prices,
    };
  }
  

  render() {
    console.log('Chart Data:', this.state.chartData);
    console.log('Chart Options:', this.state.chartOptions);

    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default ColumnChart;


