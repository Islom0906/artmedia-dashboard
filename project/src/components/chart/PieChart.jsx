import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import {priceView} from "../../helper";

const PieChart = ({ data, title, subTitle, isPercentage }) => {
    const chartRef = useRef(null);

    const valueFormatter = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
    };

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
            formatter: (params) =>
                isPercentage
                    ? `${params.name} возраст: ${params.value}%`
                    : `${params.name} возраст: ${priceView(params.value)}`,
        },
        legend: {
            icon: 'circle',
            left: 'center',
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
                center: ['50%', '60%'],
                itemStyle: {
                    borderRadius: 0,
                    borderWidth: 8,
                    borderColor: '#fff',
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: (params) =>
                        isPercentage ? `${params.value}%` : valueFormatter(params.value),
                    fontSize: 11,
                },
                labelLine: {
                    show: false,
                },
                data: data,
            },
        ],
    };

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <ReactECharts ref={chartRef} option={option} style={{ maxHeight: 270, width: '100%' }} />;
};

export default PieChart;
