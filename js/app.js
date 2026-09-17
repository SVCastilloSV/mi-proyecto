/**
 * Controlador Principal: Cafés de El Salvador
 * Interacciones dinámicas, filtrado reactivo, modales, persistencia de favoritos,
 * Quiz sensorial, cronómetro de barista y sintetizador de ambiente sonoro con Web Audio API.
 */

// Estado global de la aplicación
const AppState = {
  favorites: new Set(JSON.parse(localStorage.getItem('salvador_coffee_favs') || '[]')),
  activeFilter: 'all',
  searchQuery: '',
  activeCordilleraId: 'apaneca-ilamatepec',
  quizStep: 1,
  quizAnswers: { q1: null, q2: null, q3: null },
  activeMethodKey: 'v60',
  coffeeGrams: 18,
  timerSeconds: 0,
  isTimerRunning: false,
  timerInterval: null,
  isSoundPlaying: false,
  audioCtx: null,
  soundNodes: null
};

// ==========================================
// 1. INICIALIZACIÓN Y EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCordilleras();
  renderCafes();
  updateFavoritesBadge();
  initFilters();
  initSearch();
  initQuiz();
  initBaristaLab();
  initSoundAmbient();
  initModals();
  initMobileMenu();
});

// ==========================================
// 2. CORDILLERAS VOLCÁNICAS INTERACTIVAS
// ==========================================
function initCordilleras() {
  const tabsContainer = document.getElementById('cordilleras-tabs-container');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = CORDILLERAS_DATA.map((cord, idx) => `
    <button 
      class="cordillera-tab min-w-0 w-full p-2.5 sm:p-3 rounded-2xl text-left border ${cord.id === AppState.activeCordilleraId ? 'active border-amberGold-500 bg-amberGold-500/10' : 'border-neutral-800 bg-roast-800/80 hover:border-neutral-700'} transition-all"
      data-cord-id="${cord.id}"
    >
      <div class="text-[9px] sm:text-[10px] uppercase tracking-wider text-amberGold-400 font-bold mb-0.5">0${idx + 1} • Región</div>
      <div class="font-serif font-bold text-xs sm:text-sm text-white truncate">${cord.nombre}</div>
      <div class="text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-0.5 sm:mt-1">${cord.altura.split(' ')[0]} msnm</div>
    </button>
  `).join('');

  // Click handler para tabs
  tabsContainer.querySelectorAll('.cordillera-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.cordillera-tab').forEach(b => {
        b.classList.remove('active', 'border-amberGold-500', 'bg-amberGold-500/10');
        b.classList.add('border-neutral-800', 'bg-roast-800/80');
      });
      btn.classList.add('active', 'border-amberGold-500', 'bg-amberGold-500/10');
      btn.classList.remove('border-neutral-800', 'bg-roast-800/80');

      AppState.activeCordilleraId = btn.getAttribute('data-cord-id');
      renderCordilleraDetail();
    });
  });

  renderCordilleraDetail();
}

function renderCordilleraDetail() {
  const panel = document.getElementById('cordillera-detail-panel');
  const cord = CORDILLERAS_DATA.find(c => c.id === AppState.activeCordilleraId);
  if (!panel || !cord) return;

  // Filtrar cafeterías que sirven café de esta cordillera
  const relatedCafes = CAFES_DATA.filter(c => c.cordillera.toLowerCase().includes(cord.nombre.toLowerCase().split(' ')[0]));

  panel.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <div class="lg:col-span-7">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volcano-500/20 text-volcano-400 text-xs font-bold mb-3 border border-volcano-500/30">
          <i data-lucide="flame" class="w-3.5 h-3.5"></i> ${cord.volcanes}
        </div>
        <h3 class="font-serif text-2xl sm:text-4xl font-bold text-white mb-2">${cord.nombre}</h3>
        <p class="text-xs sm:text-sm text-amberGold-400/90 font-medium mb-4">Departamentos: ${cord.departamentos}</p>
        <p class="text-neutral-300 text-sm leading-relaxed mb-6">${cord.descripcion}</p>

        <!-- Datos Específicos -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-6">
          <div class="bg-roast-900/80 p-3 rounded-2xl border border-neutral-800">
            <div class="text-neutral-500 text-[11px] mb-1">Rango de Altura</div>
            <div class="font-bold text-white font-mono">${cord.altura}</div>
          </div>
          <div class="bg-roast-900/80 p-3 rounded-2xl border border-neutral-800">
            <div class="text-neutral-500 text-[11px] mb-1">Suelo Volcánico</div>
            <div class="font-bold text-neutral-200 line-clamp-1" title="${cord.suelo}">${cord.suelo}</div>
          </div>
          <div class="bg-roast-900/80 p-3 rounded-2xl border border-neutral-800 col-span-2 sm:col-span-1">
            <div class="text-neutral-500 text-[11px] mb-1">Variedades Clave</div>
            <div class="font-bold text-amberGold-400 line-clamp-1">${cord.variedadesClave}</div>
          </div>
        </div>

        <!-- Notas de Cata -->
        <div class="mb-6">
          <div class="text-xs text-neutral-400 mb-2 font-semibold">Notas características en taza:</div>
          <div class="flex flex-wrap gap-2">
            ${cord.notas.map(n => `<span class="badge-gold px-3 py-1 rounded-full text-xs font-medium">✨ ${n}</span>`).join('')}
          </div>
        </div>

        <!-- Fincas Galardonadas -->
        <div class="text-xs text-neutral-400">
          <span class="font-semibold text-white">Fincas emblemáticas:</span> ${cord.fincasFamosas.join(', ')}.
        </div>
      </div>

      <!-- Lado derecho: Cafeterías sugeridas de la cordillera -->
      <div class="lg:col-span-5 bg-roast-900/90 p-6 rounded-3xl border border-neutral-800">
        <h4 class="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-4 flex items-center gap-2">
          <i data-lucide="coffee" class="w-4 h-4 text-amberGold-400"></i>
          <span>Cafeterías que sirven este origen</span>
        </h4>

        ${relatedCafes.length > 0 ? `
          <div class="space-y-3">
            ${relatedCafes.slice(0, 3).map(c => `
              <div class="flex items-center justify-between p-3 rounded-2xl bg-roast-800/80 hover:bg-roast-700/80 border border-neutral-700/60 transition-all cursor-pointer" onclick="openCafeModal('${c.id}')">
                <div class="flex items-center gap-3">
                  <img src="${c.imagen}" alt="${c.nombre}" class="w-11 h-11 rounded-xl object-cover">
                  <div>
                    <div class="font-serif font-bold text-sm text-white">${c.nombre}</div>
                    <div class="text-[11px] text-neutral-400">${c.ciudad}</div>
                  </div>
                </div>
                <div class="text-amberGold-400 text-xs font-semibold flex items-center gap-1">
                  <span>Ver</span>
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <p class="text-xs text-neutral-400 italic py-6 text-center">
            Muchos microlotes de esta cordillera se catan en barras itinerantes de San Salvador y eventos especiales.
          </p>
        `}

        <div class="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
          <span class="text-neutral-400">¿Quieres probar granos de esta región?</span>
          <a href="#cafeterias" class="text-amberGold-400 font-bold hover:underline">Ver cafeterías →</a>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 3. DIRECTORIO DE CAFETERÍAS Y FILTROS
// ==========================================
function renderCafes() {
  const grid = document.getElementById('cafes-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  const query = AppState.searchQuery.toLowerCase().trim();

  const filtered = CAFES_DATA.filter(cafe => {
    // 1. Filtro de Categoría / Zona
    let matchFilter = true;
    if (AppState.activeFilter === 'favorites') {
      matchFilter = AppState.favorites.has(cafe.id);
    } else if (AppState.activeFilter === 'san-salvador') {
      matchFilter = cafe.zona === 'san-salvador';
    } else if (AppState.activeFilter === 'santa-tecla') {
      matchFilter = cafe.zona === 'santa-tecla';
    } else if (AppState.activeFilter === 'santa-ana') {
      matchFilter = cafe.zona === 'santa-ana';
    } else if (AppState.activeFilter === 'ruta-flores') {
      matchFilter = cafe.zona === 'ruta-flores';
    } else if (['Terraza', 'Coworking', 'Pet Friendly'].includes(AppState.activeFilter)) {
      matchFilter = cafe.etiquetas.includes(AppState.activeFilter);
    }

    // 2. Filtro de Búsqueda
    let matchQuery = true;
    if (query) {
      const searchTarget = [
        cafe.nombre,
        cafe.ciudad,
        cafe.cordillera,
        cafe.distintivo,
        cafe.perfil,
        ...cafe.variedades,
        ...cafe.metodos,
        ...cafe.etiquetas
      ].join(' ').toLowerCase();
      matchQuery = searchTarget.includes(query);
    }

    return matchFilter && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = filtered.map(cafe => {
    const isFav = AppState.favorites.has(cafe.id);
    return `
      <article class="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-neutral-800 hover:border-amberGold-500/40">
        
        <div>
          <!-- Card Image Header -->
          <div class="relative h-52 sm:h-56 img-zoom-container">
            <img src="${cafe.imagen}" alt="${cafe.nombre}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-roast-900 via-transparent to-black/40"></div>
            
            <!-- Cordillera Badge -->
            <div class="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
              <span class="px-2.5 py-1 rounded-full bg-roast-900/85 backdrop-blur-md text-amberGold-300 text-[11px] font-semibold border border-amberGold-500/30 shadow-md">
                🌋 ${cafe.cordillera.split('-')[0].trim()}
              </span>
            </div>

            <!-- Favorite Button on Card -->
            <button 
              class="fav-toggle-btn absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-roast-900/85 backdrop-blur-md flex items-center justify-center text-neutral-300 hover:text-red-400 border border-neutral-700/80 transition-transform active:scale-90"
              data-id="${cafe.id}"
              title="${isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}"
            >
              <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}"></i>
            </button>

            <!-- Bottom Title overlay on image -->
            <div class="absolute bottom-3.5 left-4 right-4">
              <span class="text-[11px] font-medium text-amberGold-400/90 uppercase tracking-wider">${cafe.distintivo}</span>
              <h3 class="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">${cafe.nombre}</h3>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-5">
            
            <!-- Location & Rating -->
            <div class="flex items-center justify-between text-xs text-neutral-400 mb-3 pb-3 border-b border-neutral-800">
              <span class="flex items-center gap-1.5">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amberGold-400"></i> ${cafe.ciudad}
              </span>
              <span class="flex items-center gap-1 text-amberGold-400 font-bold">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${cafe.rating}
                <span class="text-neutral-500 font-normal">(${cafe.reviewsCount})</span>
              </span>
            </div>

            <!-- Variedades & Altura -->
            <div class="text-xs mb-3">
              <span class="text-neutral-400 font-medium">Granos e insignias:</span>
              <div class="flex flex-wrap gap-1.5 mt-1">
                ${cafe.variedades.map(v => `<span class="px-2 py-0.5 rounded-md bg-roast-800 border border-neutral-700/80 text-[11px] text-neutral-300">${v}</span>`).join('')}
              </div>
            </div>

            <!-- Tasting Notes -->
            <p class="text-xs text-neutral-300 italic line-clamp-2 mb-4 bg-roast-800/40 p-2.5 rounded-xl border border-neutral-800">
              "${cafe.perfil}"
            </p>

            <!-- Métodos Destacados -->
            <div class="flex items-center gap-1 text-[11px] text-neutral-400 mb-4">
              <span class="font-semibold text-neutral-300">Métodos:</span>
              <span class="text-neutral-400 line-clamp-1">${cafe.metodos.join(' • ')}</span>
            </div>

          </div>
        </div>

        <!-- Card Footer Action -->
        <div class="px-5 pb-5 pt-0">
          <button 
            class="w-full py-2.5 rounded-xl bg-roast-800 hover:bg-amberGold-500 hover:text-roast-900 border border-amberGold-500/30 text-amberGold-300 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
            onclick="openCafeModal('${cafe.id}')"
          >
            <span>Ver Ficha y Maridaje</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>

      </article>
    `;
  }).join('');

  // Re-bind favorite buttons
  grid.querySelectorAll('.fav-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleFavorite(id);
    });
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function initFilters() {
  const container = document.getElementById('filters-container');
  const resetBtn = document.getElementById('reset-filter-btn');
  if (!container) return;

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.hasAttribute('data-filter')) {
        AppState.activeFilter = btn.getAttribute('data-filter');
      } else if (btn.hasAttribute('data-tag')) {
        AppState.activeFilter = btn.getAttribute('data-tag');
      }

      renderCafes();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AppState.activeFilter = 'all';
      AppState.searchQuery = '';
      const input = document.getElementById('search-input');
      if (input) input.value = '';
      document.getElementById('search-clear-btn')?.classList.add('hidden');
      
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      container.querySelector('[data-filter="all"]')?.classList.add('active');
      
      renderCafes();
    });
  }
}

function initSearch() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  if (!input) return;

  input.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    if (AppState.searchQuery.trim().length > 0) {
      clearBtn?.classList.remove('hidden');
    } else {
      clearBtn?.classList.add('hidden');
    }
    renderCafes();
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    AppState.searchQuery = '';
    clearBtn.classList.add('hidden');
    renderCafes();
  });
}

// ==========================================
// 4. GESTIÓN DE FAVORITOS (LOCALSTORAGE)
// ==========================================
function toggleFavorite(id) {
  if (AppState.favorites.has(id)) {
    AppState.favorites.delete(id);
  } else {
    AppState.favorites.add(id);
  }

  localStorage.setItem('salvador_coffee_favs', JSON.stringify(Array.from(AppState.favorites)));
  updateFavoritesBadge();
  renderCafes();
  renderFavoritesDrawer();
}

function updateFavoritesBadge() {
  const count = AppState.favorites.size;
  const countEl = document.getElementById('favorites-count');
  const filterCountEl = document.getElementById('filter-favorites-count');
  if (countEl) countEl.textContent = count;
  if (filterCountEl) filterCountEl.textContent = count;
}

function renderFavoritesDrawer() {
  const container = document.getElementById('favorites-list-container');
  if (!container) return;

  const favCafes = CAFES_DATA.filter(c => AppState.favorites.has(c.id));

  if (favCafes.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-neutral-400">
        <i data-lucide="heart" class="w-10 h-10 mx-auto mb-3 opacity-30 text-amberGold-400"></i>
        <p class="text-sm font-medium">Aún no has guardado cafeterías.</p>
        <p class="text-xs text-neutral-500 mt-1">Presiona el corazón en cualquier tarjeta para armar tu ruta del café.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = favCafes.map(cafe => `
    <div class="flex items-center justify-between p-3.5 rounded-2xl bg-roast-800 border border-neutral-700/70 group">
      <div class="flex items-center gap-3 cursor-pointer" onclick="openCafeModal('${cafe.id}')">
        <img src="${cafe.imagen}" alt="${cafe.nombre}" class="w-12 h-12 rounded-xl object-cover">
        <div>
          <div class="font-serif font-bold text-sm text-white group-hover:text-amberGold-400 transition-colors">${cafe.nombre}</div>
          <div class="text-[11px] text-neutral-400">${cafe.ciudad}</div>
        </div>
      </div>
      <button 
        class="p-2 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-roast-700 transition-colors"
        onclick="toggleFavorite('${cafe.id}')"
        title="Quitar de favoritos"
      >
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 5. MODALES Y NAVEGACIÓN
// ==========================================
function initModals() {
  const modal = document.getElementById('cafe-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const favDrawer = document.getElementById('favorites-drawer');
  const favBtn = document.getElementById('favorites-btn');
  const favClose = document.getElementById('favorites-drawer-close');
  const clearFavsBtn = document.getElementById('clear-all-favorites-btn');

  // Close cafe modal on overlay click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeCafeModal();
  });
  closeBtn?.addEventListener('click', closeCafeModal);

  // Favorites Drawer
  favBtn?.addEventListener('click', () => {
    renderFavoritesDrawer();
    favDrawer?.classList.remove('hidden');
    setTimeout(() => favDrawer?.classList.remove('opacity-0'), 10);
  });

  favClose?.addEventListener('click', () => {
    favDrawer?.classList.add('opacity-0');
    setTimeout(() => favDrawer?.classList.add('hidden'), 300);
  });

  clearFavsBtn?.addEventListener('click', () => {
    if (confirm('¿Deseas vaciar todas tus cafeterías favoritas?')) {
      AppState.favorites.clear();
      localStorage.removeItem('salvador_coffee_favs');
      updateFavoritesBadge();
      renderFavoritesDrawer();
      renderCafes();
    }
  });

  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCafeModal();
      favDrawer?.classList.add('opacity-0');
      setTimeout(() => favDrawer?.classList.add('hidden'), 300);
    }
  });
}

function openCafeModal(id) {
  const cafe = CAFES_DATA.find(c => c.id === id);
  const modal = document.getElementById('cafe-modal');
  const content = document.getElementById('modal-content-area');
  if (!cafe || !modal || !content) return;

  const isFav = AppState.favorites.has(cafe.id);

  content.innerHTML = `
    <!-- Header with Photo -->
    <div class="relative h-60 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 rounded-t-3xl overflow-hidden mb-6">
      <img src="${cafe.imagen}" alt="${cafe.nombre}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-roast-900 via-roast-900/40 to-transparent"></div>
      <div class="absolute bottom-4 left-6 right-6 flex justify-between items-end">
        <div>
          <span class="badge-gold px-3 py-1 rounded-full text-xs font-bold mb-1.5 inline-block">${cafe.distintivo}</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white">${cafe.nombre}</h2>
          <p class="text-xs text-neutral-300 flex items-center gap-1.5 mt-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amberGold-400"></i> ${cafe.ubicacion}
          </p>
        </div>
        <button 
          class="px-3.5 py-2 rounded-xl bg-roast-900/90 border border-neutral-700 text-xs font-semibold flex items-center gap-2 hover:border-amberGold-500 transition-colors"
          onclick="toggleFavorite('${cafe.id}'); openCafeModal('${cafe.id}');"
        >
          <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-neutral-300'}"></i>
          <span>${isFav ? 'Guardado' : 'Favorito'}</span>
        </button>
      </div>
    </div>

    <!-- Main Content Breakdown -->
    <div class="space-y-6">
      
      <!-- Historia & Identidad -->
      <div>
        <h4 class="text-xs uppercase font-bold text-neutral-400 tracking-wider mb-2">Historia & Pasión</h4>
        <p class="text-sm text-neutral-300 leading-relaxed">${cafe.historia}</p>
      </div>

      <!-- Ficha de Origen & Altura -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div class="bg-roast-800/80 p-3.5 rounded-2xl border border-neutral-800">
          <div class="text-neutral-500 text-[11px] mb-0.5">Cordillera de Origen</div>
          <div class="font-bold text-white">${cafe.cordillera}</div>
        </div>
        <div class="bg-roast-800/80 p-3.5 rounded-2xl border border-neutral-800">
          <div class="text-neutral-500 text-[11px] mb-0.5">Rango de Altitud</div>
          <div class="font-bold text-amberGold-400 font-mono">${cafe.altura}</div>
        </div>
        <div class="bg-roast-800/80 p-3.5 rounded-2xl border border-neutral-800 col-span-2 sm:col-span-1">
          <div class="text-neutral-500 text-[11px] mb-0.5">Valoración</div>
          <div class="font-bold text-white flex items-center gap-1">
            ⭐ ${cafe.rating} / 5.0 <span class="text-neutral-400 font-normal">(${cafe.reviewsCount})</span>
          </div>
        </div>
      </div>

      <!-- Bebida Insigne & Maridaje Recomendado -->
      <div class="p-4 rounded-2xl bg-amberGold-500/10 border border-amberGold-500/25">
        <div class="flex items-start gap-3 mb-3">
          <div class="w-8 h-8 rounded-xl bg-amberGold-500/20 text-amberGold-400 flex items-center justify-center shrink-0">
            <i data-lucide="coffee" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-amberGold-300 uppercase tracking-wide">Bebida Insigne Recomendada</div>
            <div class="text-sm text-white font-serif font-bold">${cafe.bebidaInsigne}</div>
          </div>
        </div>
        <div class="flex items-start gap-3 pt-3 border-t border-amberGold-500/20">
          <div class="w-8 h-8 rounded-xl bg-volcano-500/20 text-volcano-400 flex items-center justify-center shrink-0">
            <i data-lucide="cookie" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-volcano-400 uppercase tracking-wide">Maridaje Perfecto de Autor</div>
            <div class="text-xs text-neutral-300">${cafe.maridaje}</div>
          </div>
        </div>
      </div>

      <!-- Métodos y Variedades -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <span class="text-neutral-400 font-bold block mb-2">Métodos de Preparación:</span>
          <div class="flex flex-wrap gap-1.5">
            ${cafe.metodos.map(m => `<span class="px-2.5 py-1 rounded-lg bg-roast-800 border border-neutral-700 text-neutral-300">${m}</span>`).join('')}
          </div>
        </div>
        <div>
          <span class="text-neutral-400 font-bold block mb-2">Variedades en Barra:</span>
          <div class="flex flex-wrap gap-1.5">
            ${cafe.variedades.map(v => `<span class="px-2.5 py-1 rounded-lg bg-roast-800 border border-amberGold-500/30 text-amberGold-300">${v}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Horario y Contacto -->
      <div class="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
        <div class="flex items-center gap-2">
          <i data-lucide="clock" class="w-4 h-4 text-amberGold-400"></i>
          <span>${cafe.horario}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-neutral-300 font-semibold">${cafe.telefono}</span>
          <span class="text-amberGold-400 font-semibold">${cafe.instagram}</span>
        </div>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.remove('opacity-0'), 10);
  if (window.lucide) lucide.createIcons();
}

function closeCafeModal() {
  const modal = document.getElementById('cafe-modal');
  if (!modal) return;
  modal.classList.add('opacity-0');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
}

// ==========================================
// 6. QUIZ INTERACTIVO: CAFÉ Y CAFETERÍA IDEAL
// ==========================================
function initQuiz() {
  const options = document.querySelectorAll('.quiz-option');
  if (!options) return;

  options.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = parseInt(btn.getAttribute('data-q'));
      const val = btn.getAttribute('data-val');

      AppState.quizAnswers[`q${q}`] = val;

      if (q === 1) {
        showQuizStep(2);
      } else if (q === 2) {
        showQuizStep(3);
      } else if (q === 3) {
        calculateQuizResult();
      }
    });
  });
}

function showQuizStep(step) {
  AppState.quizStep = step;
  const bar = document.getElementById('quiz-progress-bar');
  const stepIndicator = document.getElementById('quiz-step-indicator');
  const percentIndicator = document.getElementById('quiz-percent-indicator');

  // Hide all steps
  document.querySelectorAll('.quiz-step-pane').forEach(el => el.classList.add('hidden'));

  const activePane = document.getElementById(`quiz-question-${step}`);
  if (activePane) activePane.classList.remove('hidden');

  if (bar) bar.style.width = step === 1 ? '33%' : step === 2 ? '66%' : '100%';
  if (stepIndicator) stepIndicator.textContent = `Paso ${step} de 3`;
  if (percentIndicator) percentIndicator.textContent = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

  if (window.lucide) lucide.createIcons();
}

function calculateQuizResult() {
  const { q1, q2, q3 } = AppState.quizAnswers;
  const resultPane = document.getElementById('quiz-result');
  if (!resultPane) return;

  // Hide question steps
  document.querySelectorAll('.quiz-step-pane').forEach(el => el.classList.add('hidden'));

  // Logic to determine best matching cafe and variety
  let recommendedCafeId = 'viva-espresso';
  let recommendedVariety = 'Pacamara Salvadoreño de Altura';
  let profileTitle = 'Alquimista Sensorial de Pacamara';
  let profileDesc = 'Buscas una experiencia compleja, luminosa y colmada de matices florales y frutas exóticas.';

  if (q3 === 'montana') {
    recommendedCafeId = 'entre-nubes';
    recommendedVariety = 'Pacamara Reserva & Bourbon de Altura';
    profileTitle = 'Espíritu Volcánico de Cumbre';
    profileDesc = 'Tu café perfecto se disfruta con vistas a los cráteres, aire fresco y notas a miel silvestre y chocolate amargo.';
  } else if (q3 === 'botanico') {
    recommendedCafeId = 'siete-coffee';
    recommendedVariety = 'Pacamara Honey y Orange Bourbon';
    profileTitle = 'Calma Botánica & Dulzor Lento';
    profileDesc = 'Aprecias la pausa, la naturaleza y un filtrado en papel grueso que resalta la panela y el jazmín.';
  } else if (q1 === 'achocolatado' || q2 === 'espresso') {
    recommendedCafeId = 'four-monkeys';
    recommendedVariety = 'Yellow Bourbon Salvadoreño';
    profileTitle = 'Cultura Urbana & Textura Sedosa';
    profileDesc = 'El balance entre chocolate con leche, caramelo salado y un espresso de crema densa es tu paraíso cafetero.';
  } else if (q1 === 'frutal' || q2 === 'filtrado') {
    recommendedCafeId = 'crafters-coffee';
    recommendedVariety = 'Pacamara Lavado Cup of Excellence';
    profileTitle = 'Purista del Grano de Concurso';
    profileDesc = 'Prefieres un perfil cristalino, aromático a flor de azahar y notas cítricas de mandarina en pour-over.';
  }

  const cafe = CAFES_DATA.find(c => c.id === recommendedCafeId);

  resultPane.innerHTML = `
    <div class="text-center max-w-xl mx-auto py-2">
      
      <div class="w-16 h-16 rounded-3xl bg-gradient-to-br from-amberGold-500 to-volcano-500 p-0.5 mx-auto mb-4 shadow-xl">
        <div class="w-full h-full bg-roast-900 rounded-[22px] flex items-center justify-center text-amberGold-400">
          <i data-lucide="sparkles" class="w-8 h-8"></i>
        </div>
      </div>

      <span class="badge-gold px-3.5 py-1 rounded-full text-xs font-bold mb-2 inline-block">Resultado de tu Perfil</span>
      <h3 class="font-serif text-3xl font-bold text-white mb-2">${profileTitle}</h3>
      <p class="text-sm text-neutral-300 leading-relaxed mb-6">${profileDesc}</p>

      <!-- Recommendation Card -->
      <div class="bg-roast-900/90 p-6 rounded-3xl border border-amberGold-500/30 text-left mb-6">
        <div class="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-800">
          <img src="${cafe.imagen}" alt="${cafe.nombre}" class="w-16 h-16 rounded-2xl object-cover border border-amberGold-500/30">
          <div>
            <div class="text-[11px] text-amberGold-400 font-bold uppercase tracking-wider">Tu Cafetería Ideal en El Salvador</div>
            <div class="font-serif font-bold text-xl text-white">${cafe.nombre}</div>
            <div class="text-xs text-neutral-400">${cafe.ciudad} • ${cafe.cordillera}</div>
          </div>
        </div>

        <div class="space-y-2 text-xs text-neutral-300">
          <div><strong>Variedad Insigne:</strong> <span class="text-amberGold-300">${recommendedVariety}</span></div>
          <div><strong>Bebida Sugerida:</strong> ${cafe.bebidaInsigne}</div>
          <div><strong>Notas en Taza:</strong> <em class="text-neutral-400">${cafe.perfil}</em></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <button 
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-amberGold-500 to-amberGold-600 text-roast-900 font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
          onclick="openCafeModal('${cafe.id}')"
        >
          Ver Ficha de ${cafe.nombre}
        </button>

        <button 
          id="quiz-restart-btn"
          class="px-5 py-3 rounded-xl bg-roast-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold hover:border-neutral-500 transition-all"
        >
          Repetir el Test
        </button>
      </div>

    </div>
  `;

  resultPane.classList.remove('hidden');

  document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
    AppState.quizAnswers = { q1: null, q2: null, q3: null };
    showQuizStep(1);
  });

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// 7. LABORATORIO DE BARISTA Y CRONÓMETRO
// ==========================================
function initBaristaLab() {
  const methodButtons = document.querySelectorAll('.brew-btn');
  const gramsInput = document.getElementById('coffee-grams-input');
  const startBtn = document.getElementById('timer-start-btn');
  const resetBtn = document.getElementById('timer-reset-btn');

  // Method Selector
  methodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      methodButtons.forEach(b => {
        b.classList.remove('active', 'border-amberGold-500/80');
        b.classList.add('border-neutral-700');
        b.querySelector('span:first-child')?.classList.remove('bg-amberGold-400');
        b.querySelector('span:first-child')?.classList.add('bg-neutral-500');
      });

      btn.classList.add('active', 'border-amberGold-500/80');
      btn.classList.remove('border-neutral-700');
      btn.querySelector('span:first-child')?.classList.add('bg-amberGold-400');
      btn.querySelector('span:first-child')?.classList.remove('bg-neutral-500');

      AppState.activeMethodKey = btn.getAttribute('data-method');
      updateBrewMethodDetails();
      resetTimer();
    });
  });

  // Grams Slider
  gramsInput?.addEventListener('input', (e) => {
    AppState.coffeeGrams = parseInt(e.target.value);
    updateBrewMethodDetails();
  });

  // Timer Controls
  startBtn?.addEventListener('click', toggleTimer);
  resetBtn?.addEventListener('click', resetTimer);

  updateBrewMethodDetails();
  renderTimerPhases();
}

function updateBrewMethodDetails() {
  const recipe = BREW_RECIPES[AppState.activeMethodKey];
  if (!recipe) return;

  // Calculo de agua según ratio
  let ratioMultiplier = 15;
  if (AppState.activeMethodKey === 'chemex') ratioMultiplier = 16;
  if (AppState.activeMethodKey === 'aeropress') ratioMultiplier = 12;
  if (AppState.activeMethodKey === 'frenchpress') ratioMultiplier = 14;

  const totalWaterGrams = AppState.coffeeGrams * ratioMultiplier;

  // Displays
  const gramsDisplay = document.getElementById('coffee-grams-display');
  const waterDisplay = document.getElementById('water-grams-display');
  const grindDisplay = document.getElementById('grind-display');
  const descText = document.getElementById('method-description-text');
  const titleText = document.getElementById('timer-method-title');
  const targetTimeLabel = document.getElementById('target-time-label');

  if (gramsDisplay) gramsDisplay.textContent = `${AppState.coffeeGrams} g`;
  if (waterDisplay) waterDisplay.textContent = `${totalWaterGrams} g`;
  if (grindDisplay) grindDisplay.textContent = recipe.molienda.split(' ')[0];
  if (descText) descText.textContent = recipe.descripcion;
  if (titleText) titleText.textContent = recipe.nombre;

  const minutes = Math.floor(recipe.tiempoTotal / 60);
  const seconds = recipe.tiempoTotal % 60;
  if (targetTimeLabel) {
    targetTimeLabel.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  renderTimerPhases();
}

function renderTimerPhases() {
  const recipe = BREW_RECIPES[AppState.activeMethodKey];
  const list = document.getElementById('timer-phases-list');
  if (!list || !recipe) return;

  list.innerHTML = recipe.fases.map((fase, idx) => {
    const isPast = AppState.timerSeconds >= fase.tiempo;
    const isCurrent = idx === 0 
      ? AppState.timerSeconds < fase.tiempo 
      : (AppState.timerSeconds >= recipe.fases[idx - 1].tiempo && AppState.timerSeconds < fase.tiempo);

    return `
      <div class="p-3 rounded-2xl border ${isCurrent ? 'border-amberGold-500 bg-amberGold-500/10' : isPast ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-neutral-800 bg-roast-900/60'} text-xs transition-all flex items-start justify-between gap-3">
        <div>
          <div class="font-bold ${isCurrent ? 'text-amberGold-400' : isPast ? 'text-emerald-400' : 'text-neutral-300'} flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-amberGold-400 animate-ping' : isPast ? 'bg-emerald-400' : 'bg-neutral-600'}"></span>
            ${fase.nombre}
          </div>
          <div class="text-[11px] text-neutral-400 mt-0.5">${fase.instruccion}</div>
        </div>
        <span class="font-mono text-[11px] text-neutral-400 shrink-0">
          ${String(Math.floor(fase.tiempo / 60)).padStart(2, '0')}:${String(fase.tiempo % 60).padStart(2, '0')}
        </span>
      </div>
    `;
  }).join('');
}

function toggleTimer() {
  if (AppState.isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  AppState.isTimerRunning = true;
  const startBtn = document.getElementById('timer-start-btn');
  const startLabel = document.getElementById('timer-start-label');

  if (startBtn && startLabel) {
    startLabel.textContent = 'Pausar Extracción';
    startBtn.classList.remove('from-amberGold-500', 'to-amberGold-600');
    startBtn.classList.add('from-amber-600', 'to-volcano-500');
  }

  playChimeTone(440); // Tono de inicio

  AppState.timerInterval = setInterval(() => {
    AppState.timerSeconds++;
    updateTimerDisplay();

    const recipe = BREW_RECIPES[AppState.activeMethodKey];
    if (AppState.timerSeconds >= recipe.tiempoTotal) {
      pauseTimer();
      playChimeTone(880); // Tono de éxito final
      const phaseBadge = document.getElementById('timer-phase-text');
      if (phaseBadge) phaseBadge.textContent = '¡Extracción Completada! ☕';
    }
  }, 1000);
}

function pauseTimer() {
  AppState.isTimerRunning = false;
  clearInterval(AppState.timerInterval);

  const startBtn = document.getElementById('timer-start-btn');
  const startLabel = document.getElementById('timer-start-label');

  if (startBtn && startLabel) {
    startLabel.textContent = 'Reanudar Extracción';
    startBtn.classList.add('from-amberGold-500', 'to-amberGold-600');
    startBtn.classList.remove('from-amber-600', 'to-volcano-500');
  }
}

function resetTimer() {
  pauseTimer();
  AppState.timerSeconds = 0;
  updateTimerDisplay();

  const startLabel = document.getElementById('timer-start-label');
  const phaseText = document.getElementById('timer-phase-text');
  if (startLabel) startLabel.textContent = 'Iniciar Extracción';
  if (phaseText) phaseText.textContent = 'Listo para iniciar';
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  const fill = document.getElementById('timer-progress-fill');
  const phaseText = document.getElementById('timer-phase-text');

  const minutes = Math.floor(AppState.timerSeconds / 60);
  const seconds = AppState.timerSeconds % 60;

  if (display) {
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const recipe = BREW_RECIPES[AppState.activeMethodKey];
  const progressPercent = Math.min(100, (AppState.timerSeconds / recipe.tiempoTotal) * 100);

  if (fill) {
    fill.style.width = `${progressPercent}%`;
  }

  // Update current active phase name
  const currentFase = recipe.fases.find(f => AppState.timerSeconds < f.tiempo) || recipe.fases[recipe.fases.length - 1];
  if (phaseText && AppState.timerSeconds > 0) {
    phaseText.textContent = currentFase.nombre;
  }

  renderTimerPhases();
}

// ==========================================
// 8. SINTETIZADOR DE AMBIENTE CAFETERÍA (WEB AUDIO API)
// ==========================================
function initSoundAmbient() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (AppState.isSoundPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  });
}

function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AppState.audioCtx) {
      AppState.audioCtx = new AudioContext();
    }

    if (AppState.audioCtx.state === 'suspended') {
      AppState.audioCtx.resume();
    }

    const ctx = AppState.audioCtx;

    // 1. Ruido marrón suave que simula lluvia lejana o murmullo constante de cafetería
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // escala suave
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filtro paso bajo cálido
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(0);

    AppState.soundNodes = { whiteNoise, gainNode };
    AppState.isSoundPlaying = true;

    // Update UI
    document.getElementById('sound-bars-indicator')?.classList.add('sound-playing');
    const label = document.getElementById('sound-label');
    if (label) label.textContent = 'En reproducción';

  } catch (err) {
    console.error('AudioContext error:', err);
  }
}

function stopAmbientSound() {
  if (AppState.soundNodes && AppState.soundNodes.whiteNoise) {
    AppState.soundNodes.whiteNoise.stop();
    AppState.soundNodes.whiteNoise.disconnect();
  }
  AppState.isSoundPlaying = false;

  document.getElementById('sound-bars-indicator')?.classList.remove('sound-playing');
  const label = document.getElementById('sound-label');
  if (label) label.textContent = 'Café Chill';
}

function playChimeTone(freq = 520) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = AppState.audioCtx || new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    // Audio tone fallback
  }
}
