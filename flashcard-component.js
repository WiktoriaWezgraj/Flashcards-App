const template = document.createElement('template');
template.innerHTML = `
  <div class="card">
    <div class="front"></div>
    <div class="back"></div>
  </div>
`;

export class FlashCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.card = this.shadowRoot.querySelector('.card');
    this.front = this.shadowRoot.querySelector('.front');
    this.back = this.shadowRoot.querySelector('.back');

    this.card.addEventListener('click', () => {
      this.card.classList.toggle('flipped');
    });
  }

  set data({ word, translation }) {
    this.front.textContent = word;
    this.back.textContent = translation;
  }
}

customElements.define('flash-card', FlashCard);
