import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    VictoryChart,
    VictoryLine,
    VictoryBar,
    VictoryTheme,
    VictoryAxis,
    VictoryScatter,
    VictoryArea,
    VictoryStack,
} from 'victory';

const WeatherChart = () => {
    const [chartData, setChartData] = useState([]);
    const [city, setCity] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [error, setError] = useState(null);
    const [chartType, setChartType] = useState('line'); // Default chart type is line

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (!city) return;
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=1779ca818b59557aa48558aec376d6db`
                );
                const weatherData = response.data.list.map(item => ({
                    x: new Date(item.dt * 1000).toLocaleTimeString(),
                    y: item.main.temp,
                }));
                setChartData(weatherData);
                setError(null); // Reset error when successfully fetched data
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Tên thành phố không hợp lệ'); // Set error message for invalid city name
                } else {
                    setError(error.message);
                }
            }
        };

        fetchWeatherData();
    }, [city]);

    const handleSubmit = e => {
        e.preventDefault();
        setCity(inputCity);
    };

    const handleChartTypeChange = newType => {
        setChartType(newType);
    };

    return (
        <div className="WeatherChartContainer">
            <h2>Weather Forecast</h2>
            <form className="WeatherForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={inputCity}
                    onChange={e => setInputCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="ErrorText">{error}</p>}
            <div className="ChartTypeButtons">
                <button onClick={() => handleChartTypeChange('line')}>Line Chart</button>
                <button onClick={() => handleChartTypeChange('bar')}>Bar Chart</button>
                <button onClick={() => handleChartTypeChange('scatter')}>Scatter Plot</button>
                <button onClick={() => handleChartTypeChange('area')}>Area Chart</button>
                <button onClick={() => handleChartTypeChange('stack')}>Stacked Bar Chart</button>
            </div>
            <VictoryChart
                theme={VictoryTheme.material}
                width={600}
                height={400}
                domainPadding={20}
            >
                <VictoryAxis
                    dependentAxis
                    label="Temperature (°C)"
                    style={{ axisLabel: { padding: 30 } }}
                />
                <VictoryAxis label="Time" style={{ axisLabel: { padding: 30 } }} />
                {chartType === 'line' ? (
                    <VictoryLine
                        data={chartData}
                        style={{
                            data: { stroke: "#c43a31" },
                        }}
                    />
                ) : chartType === 'bar' ? (
                    <VictoryBar
                        data={chartData}
                        style={{
                            data: { fill: "#c43a31" },
                        }}
                    />
                ) : chartType === 'scatter' ? (
                    <VictoryScatter
                        data={chartData}
                        style={{
                            data: { fill: "#c43a31" },
                        }}
                    />
                ) : chartType === 'area' ? (
                    <VictoryArea
                        data={chartData}
                        style={{
                            data: { fill: "#c43a31" },
                        }}
                    />
                ) : (
                    <VictoryStack
                        colorScale={"qualitative"}
                    >
                        <VictoryBar
                            data={chartData}
                            style={{
                                data: { fill: "#c43a31" },
                            }}
                        />
                    </VictoryStack>
                )}
            </VictoryChart>
        </div>
    );
};

export default WeatherChart;
