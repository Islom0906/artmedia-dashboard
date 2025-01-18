import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({
                      dataTime,
                      subTitle,
                      barData,
                      color,
                      footerText,
                      isPercentage,
                  }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const totalSum = barData.reduce((sum, value) => sum + value, 0);

        const displayData = isPercentage
            ? barData.map((value) => ((value / totalSum) * 100).toFixed(2))
            : barData;

        const option = {
            title: {
                text: subTitle,
                left: "left",
                top: "top",
                textStyle: { fontSize: 15, fontWeight: "400" },
            },
            tooltip: {
                trigger: "item",
                formatter: isPercentage ? "{c}%" : "{c}",
            },
            xAxis: {
                type: "category",
                data: dataTime,
                axisLabel: { rotate: 50, fontSize: 10 },
            },
            yAxis: {
                show: false,
                type: "value",
                axisLabel: {
                    formatter: (value) =>
                        isPercentage
                            ? `${value}%`
                            : value.toLocaleString("ru-RU").replace(",", " "),
                },
            },
            series: [
                {
                    data: displayData,
                    type: "bar",
                    itemStyle: { color },
                    label: {
                        show: true,
                        position: "inside",
                        align: "center",
                        textStyle: { fontSize: 9 },
                        verticalAlign: "middle",
                        rotate: 90,
                        formatter: (params) =>
                            isPercentage
                                ? `${params.value}%`
                                : params.value
                                    .toLocaleString("ru-RU")
                                    .replace(",", " "),
                    },
                    animation: true,
                    animationDuration: 1500,
                    animationEasing: "elasticOut",
                    animationDelay: (index) => index * 200,
                },
            ],
        };

        const handleResize = () => chartInstance.resize();
        window.addEventListener("resize", handleResize);

        chartInstance.setOption(option);
        chartInstance.resize();

        return () => {
            chartInstance.dispose();
            window.removeEventListener("resize", handleResize);
        };
    }, [dataTime, barData, color, subTitle, isPercentage]);

    return (
        <div style={{ textAlign: "center" }}>
            <div
                ref={chartRef}
                style={{ minHeight: 250, height: 300, width: "100%" }}
            />
            <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
                {footerText || ""}
            </div>
        </div>
    );
};

export default BarChart;
