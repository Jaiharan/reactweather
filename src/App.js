import './App.css';
import bgvideo from '../src/Components/Assets/bgvideo.mp4'
import WeatherApp from './Components/WeatherApp/WeaterApp';
import { useState } from 'react';



function App() {
  return (
    <div className="App" >
        <WeatherApp />
    </div>
  );
}

export default App;
