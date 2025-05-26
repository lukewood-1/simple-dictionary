import { Link } from "react-router-dom"

function Synonyms({wordsArr}){

  return (
    <div className="synonyms">
      <h2>Synonyms</h2>
      <ul className='plus-words'>
        {wordsArr.length === 0
          ? <p>None found</p>
          : wordsArr.map(word => <li key={word}><Link to={'/meaning/:' + word}>{word}</Link></li>)
        }
      </ul>
    </div>
  )
}

export default Synonyms