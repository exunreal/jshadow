/*! jShadow - v0.1.0 - 2018-02-20
* Copyright (c) 2017 Alexander Bobkov; */
(function(global){
  
  "use strict";

  /**
   * Makes recursive search of by CSS selector
   * passing through Shadow DOM boundaries
   * @param {String} selector - A valid CSS selector
   * @param {HTMLElement} container - A container to search
   * @returns {Array} An array of DOM nodes
   */
  async function traverseShadowDom(selector, container = document) {

    if (!selector) return []

    const searchRoot = container.shadowRoot || container

    const nodes   = Array.from(searchRoot.querySelectorAll('*')), // all nodes of the Light DOM
          matches = Array.from(searchRoot.querySelectorAll(selector)) // elements from the Light DOM that match the selector
    
    const shadowElems = nodes.filter(isShadowElement) // custom elements with Shadow DOM

    if (shadowElems.length === 0) {
      // branch end
      return matches
    } else {
      /**
       * Continue asyncronous recursive search through Shadow DOM boundaries
       * creating an array of promises for remainув branches of the tree
       */
      let asyncGetters = shadowElems.map(async elem => {
          return await (function () {
            return new Promise(resolve => {
              resolve(traverseShadowDom(selector, elem))
            })
          })()
      })
      return matches.concat(...await Promise.all(asyncGetters))
    }
  }

  /**
   * Used for filter custom elements with Shadow DOM
   * passing through Shadow DOM boundaries
   * @param {HTMLElement} item - A DOM node
   * @returns {Boolean} The value that indicates if the HTML element is custom and have Shadow DOM
   */
  function isShadowElement(item) {
    return item.nodeName.indexOf('-') !== -1 && item.shadowRoot
  }

  const _$ = traverseShadowDom

  global._$ = global.jshadow = _$

}(window));