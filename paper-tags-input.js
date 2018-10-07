import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@cwmr/paper-chip/paper-chip.js';
/**
* `paper-tags-input`
* Material Design input control for a collection of tags
*
* @customElement
* @polymer
* @demo demo/index.html
*/
class PaperTagsInput extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
            :host[hidden] {
                display: none !important;
            }
            input {
                text-transform: lowercase;
                height: 36px;
                width: auto !important;
                padding-left: 0.5em;
            }
            paper-chip {
                margin: 2px;
                padding-right: 6px;
                cursor: pointer;
            }
            iron-icon {
                --iron-icon-height: 20px;
                --iron-icon-width: 20px;
                color: var(--disabled-text-color);
            }
        </style>
    
        <paper-input label="Tags" placeholder="+tag" on-keydown="_onInputKeydown">
            <div slot="prefix">
                <template is="dom-repeat" items="[[tags]]">
                    <paper-chip selectable="">[[item]] <iron-icon icon="icons:cancel" on-tap="_onTagRemoveTapped"></iron-icon></paper-chip>
                </template>
            </div>
        </paper-input>
`;
  }

  static get is() { return 'paper-tags-input'; }
  static get properties() {
      return {
          tags: {
              type: Array,
              notify: true,
              value: function() { return []; }
          }
      };
  }

  add(tag) {
      if (this.tags === null) {
          this.tags = [];
      }
      
      var trimmedTag = tag.replace(/^\s+/, '').replace(/\s+$/, '');
      if (trimmedTag !== '') {
          var tagIndex = this.tags.indexOf(trimmedTag);
          if (tagIndex === -1) {
              this.push('tags', trimmedTag);
          }
      }
  }
  remove(tag) {
      if (this.tags === null) {
          return;
      }
      var tagIndex = this.tags.indexOf(tag);
      if (tagIndex > -1) {
          this.splice('tags', tagIndex, 1);
      }
  }

  _onTagRemoveTapped(e) {
      e.preventDefault();

      this.remove(e.model.item);
  }
  _onInputKeydown(e) {
      if (e.keyCode === 13) {
          this.add(e.target.value.toLowerCase());
          e.target.value = '';
      }
  }
}

window.customElements.define(PaperTagsInput.is, PaperTagsInput);
