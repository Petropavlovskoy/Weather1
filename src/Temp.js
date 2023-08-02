import React, { useState, useEffect } from 'react';
import './style.css';
import Weather from './Weather';

const Temp = () => {
   // Состояния для хранения значения поиска и информации о погоде
   const [searchValue, setSearchValue] = useState('Kharkiv');
   const [tempInfo, setTempInfo] = useState({});

   // Функция для получения информации о погоде
   const fetchWeatherInfo = async (city) => {
      try {
         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=d1d50352f89876f29b1992a89faef924`;
         const res = await fetch(url);
         const data = await res.json();

         const { main, weather, name, wind, sys } = data;
         const { temp, humidity, pressure } = main;
         const { speed } = wind;
         const { country, sunset } = sys;

         // Создание объекта с информацией о погоде
         const myNewWeatherInfo = {
            temp, humidity, pressure,
            main: weather[0].main,
            name,
            speed,
            country, sunset
         };

         // Установка информации о погоде в состояние
         setTempInfo(myNewWeatherInfo);
      } catch (error) {
         console.log(error);
      }
   };

   // Эффект для вызова функции получения погодной информации при изменении searchValue
   useEffect(() => {
      fetchWeatherInfo(searchValue);
   }, [searchValue]);

   return (
      <div className='wrap'>
         <div className='search'>
            {/* Поле ввода для поиска */}
            <input
               type="search"
               placeholder='Search....'
               autoFocus
               id='search'
               className='searchTerm'
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Кнопка для запуска поиска */}
            <button
               className='searchButton'
               type="button"
               onClick={() => fetchWeatherInfo(searchValue)}>Search</button>
         </div>
         {/* Отображение компонента Weather с передачей информации о погоде */}
         <Weather tempInfo={tempInfo} />
      </div>
   );
};

export default Temp;
