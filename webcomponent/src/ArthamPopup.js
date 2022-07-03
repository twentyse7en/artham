import { LitElement, html, css } from 'lit';

// import { sampleResponse } from './sampleData';

const SEARCH_GOOGLE = 'https://www.google.com/search?q=definition+of+';

export class ArthamPopup extends LitElement {
  static get properties() {
    return {
      isVisible: { type: Boolean},
      keyword: {type: String},
      definitions: {type: Array},
      errorMessage: {type: String}
    };
  }

  static get styles() {
    return css`
    .container {
        /* background: rgba(0, 0, 0, 0.2); */
        background: rgba(101,108,133,0.8);
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    .modal {
        background: #F3F2F8;
        border-radius: 8px;
        max-width: 50%;
        width: 600px;
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      padding: 24px;
      margin: 0;
      background-color: #FBFBFD;
      color: #060606;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      border-bottom: 1px solid #A9A8AD;
    }
    .subtitle {
      font-size: 20px;
      color: #060606;
      font-weight: 700;
      margin: 24px 0 12px 30px;
    }
    .definitions {
      background: #FFF;
      border-radius: 14px;
      margin: 0 20px 20px 20px;
      border: 1px solid #FFF;
      max-height: 600px;
      overflow-y: auto;
    }
    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #060606;
      font-size: 18px;
    }
    .error p {
      margin-right: 5px;
    }
    .error a {
      color: #3a3ac1;
    }
    `;
  }

    handleClick = () => {
        this.isVisible = false;
    }

  constructor() {
    super();
    this.keyword = '';
    this.definitions = [];
    document.addEventListener('click', this.handleClick);
    document.addEventListener('arthamEvent', (e) => {
      this.keyword = e.detail.keyword;
      this.definitions = e.detail?.definitions.slice(0, 3) || [];
      this.isVisible = true;
      this.errorMessage = e.detail?.error
    })
  }

  render() {
        if (this.isVisible) {
            return html`
                <div class='container'>
                    <div class='modal'>
                      <h1 class="title">${this.keyword}</h1>
                    ${
                      this.errorMessage ?
                      html`
                        <div class='error'>
                          <p> ${this.errorMessage} </p>
                          <a href='${SEARCH_GOOGLE+this.keyword}'> Try Google </a>
                        </div>
                        ` :
                      html`
                        <h2 class="subtitle"> Dictionary </h2>
                        <section class="definitions">
                        ${this.definitions.map((d, index) =>
                            html`
                            <artham-def
                              .word="${d.word}"
                              .phonetic="${d.phonetic}"
                              .definitions="${d.definitions}"
                              .isLast="${this.definitions.length-1 === index}"
                            >
                            </artham-def>
                          `
                        )}
                        </section>
                      `
                    }
                    </div>
                </div>
            `;
        }
  }
}

const tag = document.createElement('artham-popup');
document.body.appendChild(tag);
