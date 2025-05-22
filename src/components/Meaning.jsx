import Context from "../context";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedWordsEn from "./RelatedWordsEn";
import Synonyms from "./Synonyms";

const MeaningDisplay = () => {
  const { language } = useContext(Context);
  const [fetched, setFetched] = useState({word: ''});
  const [relatedWords, setRelatedWords] = useState([]);
  const [syns, setSyns] = useState([]);
  const { term } = useParams();
  const [render, setRender] = useState(renderLoading());
  const goTo = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      if(language.startsWith('pt')){
        await handleFetchPt();

        if(!fetched.word){
          setRender(renderErrorPt());
        } else {
          setRender(renderPt());
        }
      } else {
        await handleFetchEn(term.slice(1));
        await findRelatedWordsEn();
        await findSynonyms();

        if(!fetched.word){
          setRender(renderErrorEn())
        } else {
          setRender(renderEn())
        }
      }
    }

    loadData();

    return () => {
      abortController.abort();
    }
  }, [fetched.word, language, term])

  async function findRelatedWordsEn(){
    const url = `https://api.datamuse.com/words?rel_trg=${term.slice(1)}&max=5`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const data = [];

      for(let item of res){
        data.push(item.word)
      }

      setRelatedWords(data);

    } catch (e) {
      console.warn(e);
      return false
    }
  }

  async function findSynonyms(){
    const url = `https://api.datamuse.com/words?rel_syn=${term.slice(1)}&max=10`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const data = [];

      for(let item of res){
        data.push(item.word)
      }

      setSyns(data);

    } catch (e) {
      console.warn(e);
      return false
    }
  }

  async function handleFetchEn(){
    const encodedTerm = encodeURIComponent(term.slice(1));
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodedTerm}`;

    try {
      const req = await fetch(url);
      if(!req.ok){
        setFetched(false);
        return
      }
      const res = await req.json();

      const data = {
        word: res[0].word.slice(0,1).toUpperCase()
        + res[0].word.slice(1),

        defs: {
          noun: [],
          verb: []
        }
      }

      for(let defObj of res[0].meanings){
        if(defObj.partOfSpeech === 'noun'){
          for(let def of defObj.definitions){
            data.defs.noun.push(def.definition)
          }
        }
        if(defObj.partOfSpeech === 'verb'){
          for(let def of defObj.definitions){
            data.defs.verb.push(def.definition)
          }
        }
      }

      setFetched(data);
      return true

    } catch {
      console.warn('term not found');
      setFetched(false);
      return false
    }
  }

  async function handleFetchPt(){
    const encodedTerm = encodeURIComponent(term.slice(1));
    const url = `https://api.dicionario-aberto.net/word/${encodedTerm}`;

    try {
      const req = await fetch(url);
      if(!req.ok){
        setFetched(false);
        return false
      }
      const res = await req.json();
      const xml = await res[0].xml;
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const query = [...doc.children[0].children];

      const filterNodes = node => {
        const arr = node.textContent
          .split('\n')
          .filter(e => e.length > 4)
          .map(e => e.replaceAll(/[_.]/g, ''));
        return arr
      }
      const data = {
        word: doc.querySelector('form').textContent
          .replaceAll(/[\n]/g, ''),
        defs: filterNodes(query[1]),
      }
      setFetched(data);
      return true;
    } catch {
      console.warn('termo não encontrado')
      setFetched(false);
      return false
    }
  }

  function renderErrorEn(){
    return (
      <div className="meaning-display-en">
        <h2>Term ({term.slice(1)}) not found</h2>
        <p>Try another term, we'll probably have a definition for that one.</p>
        <button onClick={() => goTo('/en')}>back</button>
      </div>
    )
  }

  function renderErrorPt(){
    return (
      <div className="meaning-display-pt">
        <h2>Definição não encontrada</h2>
        <p>Tente outra palavra, provavelmente temos a definição desta</p>
        <button onClick={() => goTo('/pt')}>voltar</button>
      </div>
    )
  }

  function renderPt(){
    return (
      <div className="meaning-display-pt">
        <h2>{fetched.word}</h2>
        <h4>Definições</h4>
        <ol>
          {fetched.defs.map(def => <li key={crypto.randomUUID()}>{def}</li>)}
        </ol>
        <button onClick={() => goTo('/pt')}>nova pesquisa</button>
      </div>
    )
  }

  function renderEn() {
    return (
      <div className="meaning-display-en">
        <h2>{fetched.word}</h2>
        <h3>Definitions</h3>
        <button onClick={() => goTo('/en')}>new search</button>
        <div className='nouns'>
          <h4>Noun</h4>
          <ol>
            {fetched.defs.noun.map(def => <li key={def}>{def}</li>)}
          </ol>
        </div>
        <div className="verbs">
          <h4>Verb</h4>
          <ol>
            {fetched.defs.verb.length === 0 ? <p>No verb definitions available for this term</p> : fetched.defs.verb.map(def => <li key={def}>{def}</li>)}
          </ol>
        </div>
      </div>
    )
  }

  function renderLoading(){
    return <p className="loading-sign">$</p>
  }

  return (
    <>
      {render}
      {language.startsWith('en') && <RelatedWordsEn wordsArr={relatedWords} />}
      {language.startsWith('en') && <Synonyms wordsArr={syns} />}
    </>
  )
}

export default MeaningDisplay