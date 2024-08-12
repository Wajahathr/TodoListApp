import React from 'react';
import Navbar from './Navbar';
import TodoApp from './TodoApp';
import Footer from './Footer';
import './App.css';
import videoSrc from './video.mp4'; 

function App() {
  return (
    <div className="App">
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted src={videoSrc}></video>
      
      <Navbar />
      <TodoApp />
      <Footer />
    </div>
  );
}

export default App;
