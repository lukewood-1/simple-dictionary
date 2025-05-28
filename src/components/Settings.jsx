import { useState, useEffect } from "react";

function Settings(){
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const setModal = document.querySelector('.help-window');

    if(showSettings){
      setModal.showModal();
    } else {
      setModal.close()
    }
  }, [showSettings])

  function handleSettingsShow(){
    setShowSettings(!showSettings);
  }

  function showHelp(){
    const search = document.querySelector('.search');
    const meanings = document.querySelector('.meaning-display-en');
    
    if(search){
      return (<>
        <div className='help-title'>
          <h2>Search Section</h2>
          <button onClick={handleSettingsShow}>X</button>
        </div>
        <div>
          <p>This page will take you to the meanings section, where you'll have access to not only the definition of the term but also synonyms, antonyms and words that are socially related to the word you typed. Here's how you operate this part:</p>
          <ol>
            <li>Type whatever term you want a definition for;</li>
            <li>Either click the <button type='button'>search</button> button, or press the <code>Enter</code> key;</li>
            <li>You'll be taken to the Meanings Section.</li>
          </ol>
        </div>
      </>)
    } else if(meanings){
      return (<>
        <div className='help-title'>
          <h2>Meanings Section</h2>
          <button onClick={handleSettingsShow}>X</button>
        </div>
        <div>
          <p>You typed a word in the search input form, and it brought you here. You'll have shortcuts for <span className="reference">synonyms</span>, <span className="reference">antonyms</span> and culturally <span className="reference">related words</span>, and a button to return to the previous page where you can search definitions for another word.</p>
          <ul>
            <li>You can click any <span className='reference'>synonym</span>/<span className='reference'>antonym</span>/<span className="reference">related word</span> to search its meaning;</li>
            <li>If you wanna search for another word, click the <button>new search</button> button and you'll be taken back to the <span className="reference">Search Section</span>.</li>
          </ul>
        </div>
      </>)
    }
  }

  return (<>
    <button className='help-btn' onClick={handleSettingsShow}>Help</button>
    <dialog className="help-window">
      {showHelp()}
    </dialog>
  </>)
}

export default Settings