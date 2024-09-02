import React from "react";
import ReactApexChart from "react-apexcharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Adjust the path as necessary

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  async componentDidMount() {
    try {
      const querySnapShot = await getDocs(collection(db, "products")); // Replace 'products' with your collection name
      const dataQuery = querySnapShot.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }));

      const processedData = this.processChartData(dataQuery);

      this.setState({
        chartData: processedData.values,
        chartOptions: {
          ...this.props.chartOptions,
          labels: processedData.labels, // Use labels for pie chart
        },
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  processChartData(data) {
    const categoryMap = new Map();

    data.forEach((product) => {
      const { category } = product;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, 1);
      } else {
        categoryMap.set(category, categoryMap.get(category) + 1);
      }
    });

    const labels = [];
    const values = [];

    categoryMap.forEach((value, key) => {
      labels.push(key);
      values.push(value);
    });

    return {
      labels,
      values,
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="pie"
        width="100%"
        height="55%"
      />
    );
  }
}



export default PieChart;
