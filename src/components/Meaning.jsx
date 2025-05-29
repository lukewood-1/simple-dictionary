import { useNavigate, useLoaderData } from "react-router-dom";
import RelatedWordsEn from "./RelatedWordsEn";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";

const MeaningDisplay = () => {
  const {meanings, relatedWords, synonyms, antonyms} = useLoaderData();
  const goTo = useNavigate();

  function renderErrorEn(){
    return (
      <div className="meaning-display-en">
        <h2>"{meanings.word}" not found</h2>
        <p>Try another term, we'll probably have a definition for that one.</p>
        <button onClick={() => goTo('/')}>back</button>
      </div>
    )
  }

  function renderEn() {
    return (
      <>
      <div className="meaning-display-en">
        <div className='defs-sign'>
          <h2>{meanings.word}</h2>
          <button onClick={() => goTo('/')}>new search</button>
        </div>
        <div className="defs">
          <h3>Definitions</h3>
          <ol>
            {meanings.defs.length === 0
              ? <p>No definitions for this words, bud ;(</p>
              : meanings.defs.map(def => <li key={def}>{def}</li>)
            }
          </ol>
        </div>
      </div>
      </>
    )
  }

  function chooseRender(){
    if(!meanings){
      return renderErrorEn()
    } else {
      return renderEn()
    }
  }

  return (
    <>
      {chooseRender()}
      <div className="plus-services">
        <Synonyms wordsArr={synonyms} />
        <hr />
        <RelatedWordsEn wordsArr={relatedWords} />
        <hr />
        <Antonyms wordsArr={antonyms} />
      </div>
    </>
  )
}

export default MeaningDisplay