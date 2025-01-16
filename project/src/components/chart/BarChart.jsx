import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({dataTime , title ,subTitle ,barData}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);


        const option = {
            title: {
                text: subTitle,
                left: 'left',
                top: 'top',
                textStyle: {
                    fontSize: 12,
                    fontWeight:'400'
                },

            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}'
            },
            xAxis: {
                type: 'category',
                data: dataTime,
                axisLabel: {
                    rotate: 50,
                    fontSize: 10
                },
                // axisTick: { alignWithLabel: true },
            },
            yAxis: {
                show:false,
                type: 'value',
                axisLabel: {
                    formatter: function (value) {
                        return value.toLocaleString('ru-RU').replace(',', ' ');
                    }
                }
            },
            series: [
                {
                    data: barData,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside',
                        align: 'center',
                        textStyle: {
                            fontSize:9
                        },
                        verticalAlign: 'middle',
                        rotate: 90,
                        formatter: function (params) {
                            return params.value.toLocaleString('ru-RU').replace(',', ' ');
                        }
                    }
                }
            ]
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
    }, []);

    return <div ref={chartRef} style={{ minHeight: 250, maxHeight: 450, width: '100%' }} />;
};

export default BarChart;
