import React, { useState } from 'react';
import UVIndex from './components/UVIndex';
import AirQualityIndex from './components/AirQualityIndex';
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
  text-align: left;
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

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  
  &:hover {
    background-color: #0056b3;
  }
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

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const App = () => {
  const [city, setCity] = useState('Hanoi');
  const [inputCity, setInputCity] = useState('Hanoi');
  const [showUVIndex, setShowUVIndex] = useState(true);
  const [showInfoPage, setShowInfoPage] = useState(1); // State để quản lý trang giới thiệu

  const handleCityChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSearch = () => {
    setCity(inputCity);
  };

  const toggleView = () => {
    setShowUVIndex(!showUVIndex);
  };

  return (
    <AppContainer>
      <Title>Ứng dụng Dự báo Thời tiết</Title>

      {showInfoPage === 1 ? (
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
      ) : (
        <InfoSection>
          <Subtitle>Chỉ số Chất lượng Không khí (AQI) là gì?</Subtitle>
          <Paragraph>
            Chỉ số Chất lượng Không khí (AQI) là một hệ thống chỉ số dùng để đánh giá và thông báo chất lượng không khí hàng ngày cho công chúng. AQI được tính dựa trên nồng độ của các chất gây ô nhiễm trong không khí, bao gồm:
            <ul>
              <li>Ôzôn mặt đất (O3)</li>
              <li>Hạt bụi mịn (PM2.5 và PM10)</li>
              <li>Carbon monoxide (CO)</li>
              <li>Lưu huỳnh dioxide (SO2)</li>
              <li>Ni-tơ dioxide (NO2)</li>
            </ul>
            Mỗi chất gây ô nhiễm có một thang điểm riêng, và chỉ số AQI được tính toán dựa trên nồng độ cao nhất của các chất này. Chỉ số AQI có thể từ 0 đến 500, với các mức độ tương ứng từ tốt đến nguy hiểm.
          </Paragraph>
          <Subtitle>Tác hại của Ô nhiễm không khí</Subtitle>
          <Paragraph>
            Ô nhiễm không khí có thể gây ra nhiều vấn đề sức khỏe nghiêm trọng, bao gồm:
            <ul>
              <li>Kích ứng mắt, mũi, và họng</li>
              <li>Khó thở và các vấn đề về hô hấp</li>
              <li>Gia tăng nguy cơ mắc bệnh tim mạch và phổi</li>
              <li>Ảnh hưởng xấu đến hệ thần kinh và các chức năng sinh sản</li>
            </ul>
            Do đó, việc theo dõi chỉ số AQI hàng ngày và có biện pháp bảo vệ sức khỏe khi chỉ số AQI cao là rất quan trọng.
          </Paragraph>
        </InfoSection>
      )}
      <ButtonContainer>
        <Button onClick={() => setShowInfoPage(1)}>1</Button>
        <Button onClick={() => setShowInfoPage(2)}>2</Button>
      </ButtonContainer>
      <hr></hr>
      <InputSection>
        <Input
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          placeholder="Nhập tên thành phố"
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </InputSection>

      <Button onClick={toggleView}>
        {showUVIndex ? 'Xem Chỉ số Chất lượng Không khí' : 'Xem Chỉ số UV'}
      </Button>

      {showUVIndex ? <UVIndex city={city} /> : <AirQualityIndex city={city} />}

      
    </AppContainer>
  );
};

export default App;
