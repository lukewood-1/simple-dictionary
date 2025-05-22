import { Link } from "react-router-dom"

function Antonyms({wordsArr}){

  return (
    <div className="antonyms">
      <h3>Antonyms</h3>
      <ul>
        {wordsArr.length === 0
          ? <p>No antonyms found</p>
          : wordsArr.map(word => <li key={word}><Link to={'/en/meaning/:' + word}>{word}</Link></li> )
        }
      </ul>
    </div>
  )
}

export default Antonyms