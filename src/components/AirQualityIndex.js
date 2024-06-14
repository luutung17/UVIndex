import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AQILevel = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.color};
  margin: 20px 0;
`;

const Warning = styled.div`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const AirQualityIndex = ({ city }) => {
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAQI = async () => {
      const apiKey = '1779ca818b59557aa48558aec376d6db';

      // Đặt lại trạng thái trước khi bắt đầu tìm kiếm mới
      setLoading(true);
      setError(null);

      try {
        // Lấy tọa độ địa lý từ tên thành phố
        const cityResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const { lat, lon } = cityResponse.data.coord;

        // Lấy chỉ số AQI từ tọa độ địa lý
        const aqiResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        setAqi(aqiResponse.data.list[0].main.aqi);
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu: ' + error.message);
        console.error('Lỗi khi lấy dữ liệu:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
  }, [city]);

  const getAQIColor = (index) => {
    if (index === 1) return 'green';
    if (index === 2) return 'yellow';
    if (index === 3) return 'orange';
    if (index === 4) return 'red';
    return 'purple';
  };

  const getAQIDescription = (index) => {
    if (index === 1) return 'Good';
    if (index === 2) return 'Fair';
    if (index === 3) return 'Moderate';
    if (index === 4) return 'Poor';
    return 'Very Poor';
  };

  if (loading) {
    return <Container>Đang tải dữ liệu...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <Title>Chỉ số Chất lượng Không khí tại {city}</Title>
      <AQILevel color={getAQIColor(aqi)}>{aqi}</AQILevel>
      <Warning>{getAQIDescription(aqi)}</Warning>
    </Container>
  );
};

export default AirQualityIndex;
