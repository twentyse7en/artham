import {html, css, LitElement} from 'lit';

export class ArthamDefinition extends LitElement {
  static styles = css`
    .definition {
      margin: 16px 0 14px 20px;
      border-bottom: 0.025rem solid #DBDBDD;
    }

    .last-definition {
      border-bottom: 0;
    }

    h3 {
      color: #060606;
      font: 16px;
      font-weight: normal;
      margin-bottom: 0;
      display: flex;
      align-items: center;
    }

    h3 .word {
      font-weight: 600;
      padding: 0 10px;
    }

    h3 .phonetic {
      /* border-left: 2px solid #060606; */
      padding: 0 10px;
    }

    ul {
      font-size: 16px;
      color: #8B8B8D;
      line-height: 1.5rem;
      margin: 12px 0 16px 0;
    }

    li {
      padding-right: 30px;
    }

    .vertical-split {
      border-left: 2px solid #060606;
      display: inline-block;
      height: 16px;
    }
  `;

  static properties = {
    word: {type: String},
    phonetic: {type: String},
    definitions: {type: Array},
    isLast: {type: Boolean}
  };

  constructor() {
    super();
    this.word = '';
    this.phonetic = '';
    this.definition = [];
    this.class = false;
  }

  render() {
    return html`
      <div class='definition ${this.isLast ? 'last-definition' : ''}'>
        <h3 class='header'>
          <span class="word"> ${this.word} </span>
          ${this.phonetic && html`<span class='vertical-split'> </span><span class="phonetic"> ${this.phonetic} </span>`}
      </h3>
        <ul>
        ${
          this.definitions.map(definition =>
            html`
              <li>${definition}</li>
            `
          )
        }
        </ul>
      </div>
    `;
  }
}
