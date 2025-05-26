import { Link } from "react-router-dom"

function RelatedWordsEn({wordsArr}){

  return (
    <div className="related-words">
      <h2>Related</h2>
      <ul className='plus-words'>
        {wordsArr.length === 0
          ? <p>None found</p>
          : wordsArr.map(word => 
          <li key={word}>
            <Link to={'/meaning/:' + word}>{word}</Link>
          </li>)
        }
      </ul>
    </div>
  )
}


export default RelatedWordsEn