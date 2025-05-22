import { Link } from "react-router-dom"

function RelatedWordsEn({wordsArr}){

  return (
    <div className="related-words">
      <h2>Related Words</h2>
      <ul>
        {wordsArr.map(word => 
          <li key={word}>
            <Link to={'/en/meaning/:' + word}>{word}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}


export default RelatedWordsEn