import { Link } from "react-router-dom"

function Synonyms({wordsArr}){

  return (
    <div className="synonyms">
      <h2>Synonyms</h2>
      <ul>
        {wordsArr.length === 0
          ? <p>No synonyms</p>
          : wordsArr.map(word => <li key={word}><Link to={'/en/meaning/:' + word}>{word}</Link></li>)
        }
      </ul>
    </div>
  )
}

export default Synonyms