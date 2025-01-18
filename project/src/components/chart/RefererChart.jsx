import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const RefererChart = ({ data, isPercent = false, title = '' }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        // Foizni hisoblash
        const totalSum = data.reduce((sum, item) => sum + item.value, 0);
        const displayData = isPercent
            ? data.map((item) => ({
                ...item,
                value: ((item.value / totalSum) * 100).toFixed(2), // Foizni hisoblash
                rawValue: item.value, // Asl qiymatni saqlash uchun
            }))
            : data;

        const option = {
            title: {
                text: title,
                left: 'left',
                marginBottom: '20',
                textStyle: {
                    fontSize: 10,
                    fontWeight: '400',
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) =>
                    isPercent
                        ? `${params.name}: ${params.value}% (${params.data.rawValue})`
                        : `${params.name}: ${params.value}`,
            },
            legend: {
                icon: "circle",
                left: 'center',
                show: true,
                textStyle: {
                    fontSize: 10,
                },
            },
            series: [
                {
                    type: 'pie',
                    radius: '80%',
                    data: displayData,
                    center: ['50%', '60%'],
                    label: {
                        show: true, // Show labels
                        position: 'inside', // Position labels inside each slice
                        formatter: isPercent ? `{d}%` : `{c}`, // Display percentage or value
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

        const handleResize = () => {
            chartInstance.resize();
        };
        window.addEventListener('resize', handleResize);

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, [data, isPercent, title]);

    return <div ref={chartRef} style={{ height: 270, width: '100%' }} />;
};

export default RefererChart;
