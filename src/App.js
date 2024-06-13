import React, { useState } from 'react';
import UVIndex from './components/UVIndex';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #eef2f3;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: #007bff;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`;

const InputSection = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const App = () => {
  const [city, setCity] = useState('Hanoi');
  const [inputCity, setInputCity] = useState('Hanoi');

  const handleCityChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSearch = () => {
    setCity(inputCity);
  };

  return (
    <AppContainer>
      <Title>Ứng dụng Dự báo Thời tiết</Title>
      <InfoSection>
        <Subtitle>Tia UV là gì?</Subtitle>
        <Paragraph>
          Tia UV (Ultraviolet) là một loại bức xạ điện từ có bước sóng ngắn hơn ánh sáng khả kiến nhưng dài hơn tia X. Tia UV đến từ mặt trời và cũng có thể được tạo ra bởi một số nguồn nhân tạo.
        </Paragraph>
        <Subtitle>Tác hại của tia UV</Subtitle>
        <Paragraph>
          Tia UV có thể gây ra một số tác hại cho sức khỏe nếu tiếp xúc quá nhiều, bao gồm:
          <ul>
            <li>Gây cháy nắng</li>
            <li>Làm lão hóa da</li>
            <li>Tăng nguy cơ ung thư da</li>
            <li>Gây tổn thương mắt, như đục thủy tinh thể</li>
          </ul>
          Do đó, việc bảo vệ bản thân khỏi tia UV là rất quan trọng, đặc biệt là trong những ngày chỉ số UV cao.
        </Paragraph>
      </InfoSection>
      <InputSection>
        <Input
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          placeholder="Nhập tên thành phố"
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </InputSection>
      <UVIndex city={city} />
    </AppContainer>
  );
};

export default App;
