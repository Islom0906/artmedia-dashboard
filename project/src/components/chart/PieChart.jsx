import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ data, title, subTitle, isPercentage }) => {
    const chartRef = useRef(null);


    const totalSum = data.reduce((sum, item) => sum + item.value, 0);
    const displayData = isPercentage
        ? data.map((item) => ({
            ...item,
            value: ((item.value / totalSum) * 100).toFixed(2),
        }))
        : data;

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
                    ? `${params.name}: ${params.value}% (${params.data.rawValue})`
                    : `${params.name}: ${params.value}`, // Tooltipda asl qiymatni ham ko'rsatamiz.
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
                    formatter: isPercentage ? '{d}%' : '{c}',
                    fontSize: 11,
                },
                labelLine: {
                    show: false,
                },
                data: displayData.map((item) => ({
                    ...item,
                    rawValue: item.value,
                })),
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
