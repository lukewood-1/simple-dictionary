function Synonyms({wordsArr}){

  return (
    <div className="synonyms">
      <h2>Synonyms</h2>
      <ul>
        {wordsArr.map(word => <li key={word}>{word}</li>)}
      </ul>
    </div>
  )
}

export default Synonyms