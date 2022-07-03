let DEFAULT_TRIGGER_KEY = 'none', TRIGGER_KEY;

async function handleDoubleClick(event) {
    //e has property altKey, shiftKey, cmdKey representing they key being pressed while double clicking.
    if (TRIGGER_KEY === 'none' || event[`${TRIGGER_KEY}Key`]) {
	var selectedWord = window?.getSelection()?.toString();
	chrome.runtime.sendMessage({word: selectedWord, time: Date.now()})
	    .then((data) => {
		// TODO: check if triggering event is standard practice
		const arthamEvent = new CustomEvent('arthamEvent',{
		    detail: {
			definitions: data.data?.def,
			keyword: selectedWord,
			error: data.data?.errorMessage
		    }
		});
		document.dispatchEvent(arthamEvent);
	    })
    }
}

document.addEventListener('dblclick', handleDoubleClick);

// inject lit web component
var litScript = document.createElement('script');
litScript.type = "module"
litScript.src = chrome.runtime.getURL('main.js');
document.querySelector("body").appendChild(litScript);

(function () {
    let storageItem = chrome.storage.local.get();

    storageItem.then((results) => {
        let interaction = results.interaction || { dblClick: { key: DEFAULT_TRIGGER_KEY }};
        TRIGGER_KEY = interaction.dblClick.key;
    });
})();
