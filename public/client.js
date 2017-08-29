// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  customElements.define('dev-code', class extends HTMLElement {

    constructor() {
      super(); // always call super() first in the ctor.

      // Create shadow DOM for the component.
      let shadowRoot = this.attachShadow({mode: 'open'});
      // Dev to put template code here
      shadowRoot.innerHTML = ``;
    }
    
  });

});
