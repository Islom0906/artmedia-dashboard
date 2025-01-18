import React, { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";

const RefererChart = ({ data, isPercentage, title}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

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
                    isPercentage
                        ? `${params.value}%`
                        : params.value
                            .toLocaleString("ru-RU")
                            .replace(",", " "),
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
                    data: data.map(item => ({
                        ...item,
                        rawValue: item.value,
                        value: isPercentage ? item.value : item.value ,
                    })),
                    center: ['50%', '60%'],
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: (params) =>
                            isPercentage
                                ? `${params.value}%`
                                : params.value
                                    .toLocaleString("ru-RU")
                                    .replace(",", " "),
                        fontSize: 11,
                    },
                    labelLine: {
                        show: false,
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
    }, [data, isPercentage, title]);

    return <div ref={chartRef} style={{ height: 270, width: '100%' }} />;
};

export default RefererChart;