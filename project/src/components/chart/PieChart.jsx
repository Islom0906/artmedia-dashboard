import React, {useEffect, useRef} from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ data, title, subTitle }) => {
    const chartRef = useRef(null);
    const option = {
        title: {
            text: title,
            subtext: subTitle,
            left: 'center',
            top: 'top',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
            },
            subtextStyle: {
                fontSize: 14,
                color: '#888',
                left: 0,
                fontWeight: 'medium',
                marginBottom: 10,
            },
        },
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
                radius: ['40%', '80%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 0,
                    borderWidth: 8,
                    borderColor: '#fff',
                },
                label: {
                    show: true, // Show labels
                    position: 'inside', // Position labels inside each slice
                    formatter: '{d}%', // Display percentage inside each slice
                    fontSize: 11, // Set font size for the percentage
                },
                labelLine: {
                    show: false, // Hide label lines
                },
                data: data,
            },
        ],
    };
    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize(); // Call resize method
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return <ReactECharts ref={chartRef} option={option} style={{ maxHeight: 270, width: '100%' }} />;
};

export default PieChart;
