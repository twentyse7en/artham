async function getDefinitions(keyword) {
  const url = `https://olam.in/Dictionary/en_ml/${keyword}/?json=1`
  const resp = await fetch(url)
  const result = await resp.json();
  // if no definition is found blank array is returned
  if (result.length == 0) {
    return [];
  }
  const { word, definitions } = result[0];
  // last item is a anchor tag to more info
  definitions.pop();
  return {
    word,
    definitions: definitions.slice(0, 3)
  }
}

function formatEnglishDef(data) {
    const { word, meanings, phonetic } = data;
    return meanings.map(function formatEnglishMeaning(definition) {
        return {
            word,
            phonetic,
            definitions: definition.definitions.map(d => d.definition).slice(0, 2)
        }
    });
}

async function getEnglishDefinitions(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  const resp = await fetch(url);
  const data = await resp.json();
  const formatedDefs = data.flatMap(formatEnglishDef);
  return formatedDefs;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { word } = request;
  Promise.all([getDefinitions(word), getEnglishDefinitions(word)])
    .then((data) => {
      sendResponse({
        data: {
          def: [data[0], ...data[1]]
        }
      })
    })
    .catch(() => {
      // TODO: remove
      console.log('promise failed');
      sendResponse({
        data: {
          errorMessage: 'Failed to fetch the meaning'
        }
      });
    })
  return true;
})
