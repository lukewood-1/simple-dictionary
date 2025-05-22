import Context from "../context";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedWordsEn from "./RelatedWordsEn";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";

const MeaningDisplay = () => {
  const { language } = useContext(Context);
  const [fetched, setFetched] = useState({word: ''});
  const [relatedWords, setRelatedWords] = useState([]);
  const [syns, setSyns] = useState([]);
  const [ants, setAnts] = useState([]);
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
        await findAntonyms();

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

  async function findAntonyms(){
    const url = `https://api.datamuse.com/words?rel_ant=${term.slice(1)}&max=10`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const data = [];

      for(let item of res){
        data.push(item.word)
      }

      setAnts(data);

    } catch (e) {
      console.warn(e);
      return false
    }
  }

  async function handleFetchEn(){
    const encodedTerm = encodeURIComponent(term.slice(1));
    const url = `https://api.datamuse.com/words?sp=${encodedTerm}&max=20&md=d`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const defs = res[0].defs;
      const capitalize = target => target.slice(0,1).toUpperCase() + target.slice(1);
      const data = {
        word: capitalize(res[0].word),
        defs: [],
      };

      // Sort results by part of speech
      const nouns = defs
        .filter(def => def.startsWith('n'))
        .map(def => def.replace(/n\t/, 'noun - '));
      const verbs = defs
        .filter(def => def.startsWith('v'))
        .map(def => def.replace(/v\t/, 'verb - '));
      const adjectives = defs
        .filter(def => def.startsWith('adj'))
        .map(def => def.replace(/adj\t/, 'adjective - '));
      const adverbs = defs
        .filter(def => def.startsWith('adv'))
        .map(def => def.replace(/adv\t/, 'adverb - '));

      data.defs = [].concat(nouns, verbs, adjectives, adverbs);

      setFetched(data);
      return true;
    } catch {
      console.warn('term not found');
      setFetched(false);
      return false;
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
        <h2>"{term.slice(1)}" not found</h2>
        <p>Try another term, we'll probably have a definition for that one.</p>
        <button onClick={() => goTo('/en')}>back</button>
      </div>
    )
  }

  function renderErrorPt(){
    return (
      <div className="meaning-display-pt">
        <h2>"{term.slice(1)}" não encontrada</h2>
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
        <div className="defs">
          <ol>
            {fetched.defs.length === 0
              ? <p>No definitions for this words, bud ;(</p>
              : fetched.defs.map(def => <li key={def}>{def}</li>)
            }
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
      {language.startsWith('en') && <Antonyms wordsArr={ants} />}
    </>
  )
}

export default MeaningDisplay