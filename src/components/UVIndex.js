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

const UVLevel = styled.div`
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

const UVIndex = ({ city }) => {
  const [uvIndex, setUvIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUVIndex = async () => {
      const apiKey = '1779ca818b59557aa48558aec376d6db'; // Thay bằng API key của bạn

      // Đặt lại trạng thái trước khi bắt đầu tìm kiếm mới
      setLoading(true);
      setError(null);

      try {
        // Lấy tọa độ địa lý từ tên thành phố
        const cityResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const { lat, lon } = cityResponse.data.coord;

        // Lấy chỉ số UV từ tọa độ địa lý
        const uvResponse = await axios.get(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        setUvIndex(uvResponse.data.value);
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu: ' + error.message);
        console.error('Lỗi khi lấy dữ liệu:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUVIndex();
  }, [city]);

  if (loading) {
    return <Container>Đang tải dữ liệu...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  const getColorForUV = (index) => {
    if (index <= 2) return 'green';
    if (index <= 5) return 'yellow';
    if (index <= 7) return 'orange';
    if (index <= 10) return 'red';
    return 'purple';
  };

  const getWarningForUV = (index) => {
    if (index <= 2) return 'Chỉ số UV thấp. Không cần lo lắng.';
    if (index <= 5) return 'Chỉ số UV trung bình. Nên đeo kính râm và sử dụng kem chống nắng.';
    if (index <= 7) return 'Chỉ số UV cao. Hãy sử dụng kem chống nắng và hạn chế tiếp xúc với ánh nắng.';
    if (index <= 10) return 'Chỉ số UV rất cao. Tránh ra ngoài trời nếu có thể.';
    return 'Chỉ số UV cực kỳ cao. Tránh ra ngoài trời và bảo vệ da kỹ lưỡng.';
  };

  return (
    <Container>
      <Title>Chỉ số UV hôm nay tại {city}</Title>
      <UVLevel color={getColorForUV(uvIndex)}>{uvIndex}</UVLevel>
      <Warning>{getWarningForUV(uvIndex)}</Warning>
    </Container>
  );
};

export default UVIndex;
