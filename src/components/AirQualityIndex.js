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
  font-weight: bold;
  margin-top: 10px;
  color: ${props => props.color};
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
      const apiKey = '1779ca818b59557aa48558aec376d6db'; // Thay bằng API key của bạn

      // Đặt lại trạng thái trước khi bắt đầu tìm kiếm mới
      setLoading(true);
      setError(null);

      try {
        // Lấy tọa độ địa lý từ tên thành phố
        const cityResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const { lat, lon } = cityResponse.data.coord;

        // Lấy chỉ số AQI từ tọa độ địa lý
        const aqiResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const { aqi } = aqiResponse.data.list[0].main;
        setAqi(aqi);
      } catch (error) {
        setError('Không thể lấy thông tin chất lượng không khí.');
      }

      setLoading(false);
    };

    fetchAQI();
  }, [city]);

  const getAQIColor = (aqi) => {
    switch (aqi) {
      case 1:
        return 'green';
      case 2:
        return 'pink';
      case 3:
        return 'orange';
      case 4:
        return 'red';
      case 5:
        return 'purple';
      default:
        return 'gray';
    }
  };

  const getWarningMessage = (aqi) => {
    switch (aqi) {
      case 1:
        return 'Chất lượng không khí tốt. Không cần lo lắng.';
      case 2:
        return 'Chất lượng không khí trung bình. Người nhạy cảm nên hạn chế ra ngoài.';
      case 3:
        return 'Chất lượng không khí kém. Hạn chế ra ngoài, đặc biệt là người nhạy cảm.';
      case 4:
        return 'Chất lượng không khí xấu. Tránh ra ngoài nếu có thể.';
      case 5:
        return 'Chất lượng không khí nguy hiểm. Tránh ra ngoài và bảo vệ sức khỏe của bạn.';
      default:
        return '';
    }
  };

  const getWarningColor = (aqi) => {
    switch (aqi) {
      case 1:
        return 'green';
      case 2:
        return 'pink';
      case 3:
        return 'orange';
      case 4:
        return 'red';
      case 5:
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <Container>
      <Title>Chỉ số Chất lượng Không khí</Title>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <AQILevel color={getAQIColor(aqi)}>{aqi}</AQILevel>
          {getWarningMessage(aqi) && (
            <Warning color={getWarningColor(aqi)}>{getWarningMessage(aqi)}</Warning>
          )}
        </>
      )}
    </Container>
  );
};

export default AirQualityIndex;
