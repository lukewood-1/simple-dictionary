import { useState, useEffect } from "react";


function Settings({language, setLanguage, AppText}){
  const [showSettings, setShowSettings] = useState(false);

  const book = JSON.parse(AppText)[language.slice(0,2)].Settings;

  useEffect(() => {
    const setModal = document.querySelector('.settings-window');

    if(showSettings){
      setModal.show();
    } else {
      setModal.close()
    }
  }, [showSettings])

  function handleSettingsShow(){
    setShowSettings(!showSettings);
  }

  function onLanguageSwitch(e){
    setLanguage(e.target.value);
  }

  return (<>
    <button className='settings-open-btn' onClick={handleSettingsShow}>{book.button_settings}</button>
    <dialog className="settings-window">
      <div>
        <button className="settings-window-close" onClick={handleSettingsShow}>X</button>
        <h2>{book.headline}</h2>
        <label htmlFor="theme-switch">{book.select_label}</label>
        <select id='theme-switch' onChange={onLanguageSwitch}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </dialog>
  </>)
}

export default Settings