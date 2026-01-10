const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
      display: block;
      width: 100%;
      height: 100%;
      perspective: 1200px;
    }

    .card {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s ease;
      cursor: pointer;
    }

    .card.flipped {
      transform: rotateY(180deg);
    }

    .front, .back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3rem;
      border-radius: 10px;
      padding: 10px;
      background: #aedfffff;
    }

    .back {
      background: #65bffbff;
      transform: rotateY(180deg);
    }

    .card, .front, .back {
    box-sizing: border-box;
    }
  </style>

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
