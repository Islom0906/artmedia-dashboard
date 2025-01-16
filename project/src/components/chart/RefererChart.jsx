import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

const RefererChart = ({data}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                icon: "circle",
                left:'center',
                show: true,
                textStyle: {
                    fontSize: 10,
                },
            },
            series: [
                {
                    type: 'pie',
                    radius: '80%',
                    data: data,
                    label: {
                        show: true, // Show labels
                        position: 'inside', // Position labels inside each slice
                        formatter: '{d}%', // Display percentage inside each slice
                        fontSize: 9, // Font size for the percentage
                    },
                    labelLine: {
                        show: false, // Hide label lines
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };

        const handleResize=()=>{
            chartInstance.resize()
        }
        window.addEventListener('resize',handleResize)


        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize',handleResize)

        };
    }, [data]);

    return <div ref={chartRef} style={{height: 270, width: '100%'}}/>;
};

export default RefererChart;
