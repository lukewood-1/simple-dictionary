function Antonyms({wordsArr}){

  return (
    <div className="antonyms">
      <h3>Antonymys</h3>
      <ul>
        {wordsArr.map(word => <li key={word}>{word}</li> )}
      </ul>
    </div>
  )
}

export default Antonyms