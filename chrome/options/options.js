const DEFAULT_TRIGGER_KEY = 'none',
    SAVE_STATUS = document.querySelector("#save-status"),
    SAVE_OPTIONS_BUTTON = document.querySelector("#save-btn"),
    RESET_OPTIONS_BUTTON = document.querySelector("#reset-btn"),
    OS_MAC = 'mac',
    KEY_COMMAND = 'Command',
    KEY_META = 'meta';



function saveOptions(e) {
    chrome.storage.local.set({
        interaction: {
            dblClick: {
                key: document.querySelector("#popup-dblclick-key").value
            }
        }
    }).then(showSaveStatusAnimation);
    e.preventDefault();
  }

  function restoreOptions() {
    let storageItem = chrome.storage.local.get();

    storageItem.then((results) => {
        let interaction = results.interaction || {};

        // interaction
        document.querySelector("#popup-dblclick-key").value = (interaction.dblClick && interaction.dblClick.key) || DEFAULT_TRIGGER_KEY;
    });
  }

  function resetOptions (e) {
    chrome.storage.local.set({
        interaction: {
            dblClick: {
                key: DEFAULT_TRIGGER_KEY
            }
        }
    }).then(restoreOptions);

    e.preventDefault();
  }

  function clearHistory(e) {
    chrome.storage.local.set({ definitions: {} });

    e.preventDefault();
  }

  function showSaveStatusAnimation () {
    SAVE_STATUS.style.setProperty("-webkit-transition", "opacity 0s ease-out");
    SAVE_STATUS.style.opacity = 1;
    window.setTimeout(function() {
        SAVE_STATUS.style.setProperty("-webkit-transition", "opacity 0.4s ease-out");
        SAVE_STATUS.style.opacity = 0
    }, 1500);
  }

  document.addEventListener('DOMContentLoaded', restoreOptions);
  SAVE_OPTIONS_BUTTON.addEventListener("click", saveOptions);
  RESET_OPTIONS_BUTTON.addEventListener("click", resetOptions);

  if (window.navigator.platform.toLowerCase().includes(OS_MAC)) {
    document.getElementById("popup-dblclick-key-ctrl").textContent = KEY_COMMAND;
    document.getElementById("popup-dblclick-key-ctrl").value = KEY_META;
  }
