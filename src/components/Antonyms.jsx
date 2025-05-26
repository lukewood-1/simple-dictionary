import { Link } from "react-router-dom"

function Antonyms({wordsArr}){

  return (
    <div className="antonyms">
      <h2>Antonyms</h2>
      <ul className='plus-words'>
        {wordsArr.length === 0
          ? <p>None found</p>
          : wordsArr.map(word => <li key={word}><Link to={'/meaning/:' + word}>{word}</Link></li> )
        }
      </ul>
    </div>
  )
}

export default Antonyms