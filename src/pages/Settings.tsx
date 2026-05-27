import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Heading from '../components/layout/Heading';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';

function Settings() {
  const navigate = useNavigate();
  
  // Simple state management using localStorage for persistence
  const [namePreference, setNamePreference] = useState<'english' | 'romaji'>(() => {
    const saved = localStorage.getItem('seriesNamePreference');
    return (saved === 'romaji' || saved === 'english') ? saved : 'english';
  });

  const handlePreferenceChange = (pref: 'english' | 'romaji') => {
    setNamePreference(pref);
    localStorage.setItem('seriesNamePreference', pref);
  };

  return (
    <div className="settingsPage">
      <Image src='/home_background.png' alt="Home_Background" className="background" />
      <Header />
      <main className="settings-content">
        <Heading className="settings-heading">Settings</Heading>
        
        <section className="settings-section">
          <h2>Display Preferences</h2>
          <p>Choose your preferred language for anime series titles:</p>
          
          <div className="settings-options">
            <label className="settings-radio-label">
              <input
                type="radio"
                name="namePreference"
                value="english"
                checked={namePreference === 'english'}
                onChange={() => handlePreferenceChange('english')}
              />
              <span>English</span>
            </label>
            <label className="settings-radio-label">
              <input
                type="radio"
                name="namePreference"
                value="romaji"
                checked={namePreference === 'romaji'}
                onChange={() => handlePreferenceChange('romaji')}
              />
              <span>Japanese (Romaji)</span>
            </label>
          </div>
        </section>

        <Button className="backButton" onClick={() => navigate('/')}>Back to Home</Button>
      </main>
      <Footer />
    </div>
  );
}

export default Settings;