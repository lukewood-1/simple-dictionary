async function fetcher(term){
  term = term.slice(1);
  const results = {};

  async function handleFetchEn(){
    const encodedTerm = encodeURIComponent(term);
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

      return Promise.resolve(data);
    } catch {
      console.warn('term not found');
      return Promise.resolve(false)
    }
  }

  async function findRelatedWordsEn(){
    const encoded = encodeURIComponent(term);
    const url = `https://api.datamuse.com/words?rel_trg=${encoded}&max=10`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const data = [];

      for(let item of res){
        data.push(item.word)
      }

      return Promise.resolve(data);

    } catch (e) {
      console.warn(e);
      return Promise.resolve(false);
    }
  }

  async function findAntonyms(){
    const encoded = encodeURIComponent(term);
    const url = `https://api.datamuse.com/words?rel_ant=${encoded}&max=10`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const data = [];

      for(let item of res){
        data.push(item.word)
      }

      return Promise.resolve(data);

    } catch (e) {
      console.warn(e);
      return Promise.resolve([]);
    }
  }

  async function findSynonyms(){
    const encoded = encodeURIComponent(term);
    const url = `https://api.datamuse.com/words?rel_syn=${encoded}&max=10`;

    try {
      const req = await fetch(url);
      const res = await req.json();

      const data = [];

      for(let item of res){
        data.push(item.word)
      }

      return Promise.resolve(data);

    } catch (e) {
      console.warn(e);
      return Promise.resolve([]);
    }
  }

  // await Promise.all(handleFetchEn, findRelatedWordsEn, findSynonyms, findAntonyms);
  results.meanings = await handleFetchEn();
  results.relatedWords = await findRelatedWordsEn();
  results.synonyms = await findSynonyms();
  results.antonyms = await findAntonyms();

  return results

}

export default fetcher