import Context from "../context";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedWordsEn from "./RelatedWordsEn";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";

const MeaningDisplay = () => {
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
        await handleFetchEn();
        await findRelatedWordsEn();
        await findSynonyms();
        await findAntonyms();

        if(!fetched.word){
          setRender(renderErrorEn())
        } else {
          setRender(renderEn())
        }
    }

    loadData();

    return () => {
      abortController.abort();
    }
  }, [fetched.word, term])

  async function findRelatedWordsEn(){
    const url = `https://api.datamuse.com/words?rel_trg=${term.slice(1)}&max=10`;

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

  function renderErrorEn(){
    return (
      <div className="meaning-display-en">
        <h2>"{term.slice(1)}" not found</h2>
        <p>Try another term, we'll probably have a definition for that one.</p>
        <button onClick={() => goTo('/')}>back</button>
      </div>
    )
  }

  function renderEn() {
    return (
      <>
      <div className="meaning-display-en">
        <div className='defs-sign'>
          <h2>{fetched.word}</h2>
          <button onClick={() => goTo('/')}>new search</button>
        </div>
        <div className="defs">
          <h3>Definitions</h3>
          <ol>
            {fetched.defs.length === 0
              ? <p>No definitions for this words, bud ;(</p>
              : fetched.defs.map(def => <li key={def}>{def}</li>)
            }
          </ol>
        </div>
      </div>
      </>
    )
  }

  function renderLoading(){
    return <p className="loading-sign">$</p>
  }

  return (
    <>
      {render}
      <div className="plus-services">
        <Synonyms wordsArr={syns} />
        <RelatedWordsEn wordsArr={relatedWords} />
        <Antonyms wordsArr={ants} />
      </div>
    </>
  )
}

export default MeaningDisplay