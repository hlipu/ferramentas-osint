// js/components.js

const UI = {
  // Renderiza o Cabeçalho
  loadHeader: function(basePath = '') {
    const headerHTML = `
      <header>
        <div class="logo">OSINT<span>LIPU</span></div>
        <div class="header-meta">
          <a class="header-nav-link is-catalogo" href="${basePath}index.html">[ CATÁLOGO ]</a>
          <div>STATUS: <span class="header-status">● OFFLINE</span></div>
        </div>
      </header>
    `;
    document.getElementById('header-placeholder').innerHTML = headerHTML;
  },

  // Renderiza o Rodapé
  loadFooter: function() {
    const footerHTML = `
      <footer class="site-footer">
          OSINT VAULT // ASSET MANAGEMENT SYSTEM // OFFLINE MODE
      </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
  }
};
