/**
 * VORTEX BET - MOTOR DE APUESTAS Y GESTIÓN DE EVENTOS
 * 100% Interactivo, sin imágenes externas.
 */

// ==========================================
// ESTADO DE LA APLICACIÓN
// ==========================================
const state = {
  balance: 1500.00,
  activeFilter: 'all', // 'all', 'live', 'today', 'weekend'
  activeSport: 'all',  // 'all', 'football', 'basketball', 'tennis', 'esports', 'mma'
  activeLeague: 'all', // 'all', 'ucl', 'laliga', 'premier', 'nba', 'atp'
  searchQuery: '',
  activeMarket: '1x2',
  slipMode: 'simple',  // 'simple' o 'parlay'
  slipSelections: [],  // Lista de selecciones actuales en el boleto
  myBets: []           // Historial de apuestas realizadas
};

// ==========================================
// BASE DE DATOS DE EVENTOS MOCK
// ==========================================
const mockEvents = [
  // --- EN VIVO ---
  {
    id: 'live-1',
    sport: 'football',
    league: 'ucl',
    leagueName: 'UEFA Champions League',
    isLive: true,
    time: "68'",
    homeTeam: 'Real Madrid',
    awayTeam: 'Bayern München',
    homeInitials: 'RMA',
    awayInitials: 'BAY',
    homeScore: 2,
    awayScore: 1,
    odds: {
      '1x2': [
        { label: '1', pick: 'Real Madrid', value: 1.45 },
        { label: 'X', pick: 'Empate', value: 4.10 },
        { label: '2', pick: 'Bayern München', value: 6.50 }
      ],
      'overunder': [
        { label: 'Más 3.5', pick: 'Más de 3.5 Goles', value: 1.75 },
        { label: 'Menos 3.5', pick: 'Menos de 3.5 Goles', value: 2.05 }
      ],
      'btts': [
        { label: 'Sí', pick: 'Ambos Anotan: Sí', value: 1.25 },
        { label: 'No', pick: 'Ambos Anotan: No', value: 3.60 }
      ]
    }
  },
  {
    id: 'live-2',
    sport: 'basketball',
    league: 'nba',
    leagueName: 'NBA - Conferencia Oeste',
    isLive: true,
    time: "Q3 04:12",
    homeTeam: 'Golden State Warriors',
    awayTeam: 'LA Lakers',
    homeInitials: 'GSW',
    awayInitials: 'LAL',
    homeScore: 84,
    awayScore: 81,
    odds: {
      '1x2': [
        { label: '1', pick: 'GS Warriors', value: 1.62 },
        { label: 'X', pick: 'Prórroga', value: 12.00 },
        { label: '2', pick: 'LA Lakers', value: 2.25 }
      ],
      'overunder': [
        { label: 'Más 218.5', pick: 'Puntos Más de 218.5', value: 1.88 },
        { label: 'Menos 218.5', pick: 'Puntos Menos de 218.5', value: 1.92 }
      ],
      'btts': [
        { label: 'GSW -3.5', pick: 'Handicap GSW -3.5', value: 1.90 },
        { label: 'LAL +3.5', pick: 'Handicap LAL +3.5', value: 1.90 }
      ]
    }
  },
  {
    id: 'live-3',
    sport: 'tennis',
    league: 'atp',
    leagueName: 'ATP Masters 1000',
    isLive: true,
    time: "Set 2 (4-3)",
    homeTeam: 'Carlos Alcaraz',
    awayTeam: 'Jannik Sinner',
    homeInitials: 'ALC',
    awayInitials: 'SIN',
    homeScore: 1,
    awayScore: 0,
    odds: {
      '1x2': [
        { label: '1', pick: 'Carlos Alcaraz', value: 1.35 },
        { label: '-', pick: '-', value: null },
        { label: '2', pick: 'Jannik Sinner', value: 3.10 }
      ],
      'overunder': [
        { label: 'Más 22.5 Games', pick: 'Games Más 22.5', value: 1.85 },
        { label: 'Menos 22.5 Games', pick: 'Games Menos 22.5', value: 1.95 }
      ],
      'btts': [
        { label: 'Alcaraz 2-0', pick: 'Marcador 2-0', value: 1.65 },
        { label: 'Alcaraz 2-1', pick: 'Marcador 2-1', value: 3.40 }
      ]
    }
  },

  // --- PRÓXIMOS ENCUENTROS ---
  {
    id: 'up-1',
    sport: 'football',
    league: 'premier',
    leagueName: 'Premier League',
    isLive: false,
    dateType: 'today',
    time: "Hoy 21:00",
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal FC',
    homeInitials: 'MCI',
    awayInitials: 'ARS',
    homeScore: null,
    awayScore: null,
    odds: {
      '1x2': [
        { label: '1', pick: 'Manchester City', value: 1.95 },
        { label: 'X', pick: 'Empate', value: 3.60 },
        { label: '2', pick: 'Arsenal FC', value: 3.80 }
      ],
      'overunder': [
        { label: 'Más 2.5', pick: 'Más de 2.5 Goles', value: 1.65 },
        { label: 'Menos 2.5', pick: 'Menos de 2.5 Goles', value: 2.20 }
      ],
      'btts': [
        { label: 'Sí', pick: 'Ambos Anotan: Sí', value: 1.55 },
        { label: 'No', pick: 'Ambos Anotan: No', value: 2.35 }
      ]
    }
  },
  {
    id: 'up-2',
    sport: 'football',
    league: 'laliga',
    leagueName: 'LaLiga EA Sports',
    isLive: false,
    dateType: 'today',
    time: "Hoy 19:30",
    homeTeam: 'FC Barcelona',
    awayTeam: 'Atlético de Madrid',
    homeInitials: 'BAR',
    awayInitials: 'ATM',
    homeScore: null,
    awayScore: null,
    odds: {
      '1x2': [
        { label: '1', pick: 'FC Barcelona', value: 1.82 },
        { label: 'X', pick: 'Empate', value: 3.75 },
        { label: '2', pick: 'Atlético Madrid', value: 4.20 }
      ],
      'overunder': [
        { label: 'Más 2.5', pick: 'Más de 2.5 Goles', value: 1.80 },
        { label: 'Menos 2.5', pick: 'Menos de 2.5 Goles', value: 2.00 }
      ],
      'btts': [
        { label: 'Sí', pick: 'Ambos Anotan: Sí', value: 1.68 },
        { label: 'No', pick: 'Ambos Anotan: No', value: 2.10 }
      ]
    }
  },
  {
    id: 'up-3',
    sport: 'basketball',
    league: 'nba',
    leagueName: 'NBA - Temporada Regular',
    isLive: false,
    dateType: 'today',
    time: "Hoy 23:30",
    homeTeam: 'Boston Celtics',
    awayTeam: 'Miami Heat',
    homeInitials: 'BOS',
    awayInitials: 'MIA',
    homeScore: null,
    awayScore: null,
    odds: {
      '1x2': [
        { label: '1', pick: 'Boston Celtics', value: 1.30 },
        { label: 'X', pick: 'Prórroga', value: 14.00 },
        { label: '2', pick: 'Miami Heat', value: 3.50 }
      ],
      'overunder': [
        { label: 'Más 212.5', pick: 'Puntos Más 212.5', value: 1.90 },
        { label: 'Menos 212.5', pick: 'Puntos Menos 212.5', value: 1.90 }
      ],
      'btts': [
        { label: 'BOS -7.5', pick: 'Handicap BOS -7.5', value: 1.88 },
        { label: 'MIA +7.5', pick: 'Handicap MIA +7.5', value: 1.92 }
      ]
    }
  },
  {
    id: 'up-4',
    sport: 'esports',
    league: 'all',
    leagueName: 'ESL Pro League - CS2',
    isLive: false,
    dateType: 'weekend',
    time: "Sábado 17:00",
    homeTeam: 'Natus Vincere (NaVi)',
    awayTeam: 'FaZe Clan',
    homeInitials: 'NAV',
    awayInitials: 'FAZ',
    homeScore: null,
    awayScore: null,
    odds: {
      '1x2': [
        { label: '1', pick: 'NaVi', value: 1.72 },
        { label: '-', pick: '-', value: null },
        { label: '2', pick: 'FaZe Clan', value: 2.05 }
      ],
      'overunder': [
        { label: 'Más 2.5 Mapas', pick: 'Mapas Más de 2.5', value: 2.10 },
        { label: 'Menos 2.5 Mapas', pick: 'Mapas Menos de 2.5', value: 1.68 }
      ],
      'btts': [
        { label: 'NaVi 2-0', pick: 'Marcador 2-0', value: 2.85 },
        { label: 'FaZe 2-0', pick: 'Marcador 0-2', value: 3.40 }
      ]
    }
  },
  {
    id: 'up-5',
    sport: 'mma',
    league: 'all',
    leagueName: 'UFC Main Card',
    isLive: false,
    dateType: 'weekend',
    time: "Domingo 04:00",
    homeTeam: 'Ilia Topuria',
    awayTeam: 'Alexander Volkanovski',
    homeInitials: 'TOP',
    awayInitials: 'VOL',
    homeScore: null,
    awayScore: null,
    odds: {
      '1x2': [
        { label: '1', pick: 'Ilia Topuria', value: 1.60 },
        { label: '-', pick: '-', value: null },
        { label: '2', pick: 'A. Volkanovski', value: 2.30 }
      ],
      'overunder': [
        { label: 'Más 2.5 Rondas', pick: 'Más 2.5 Rondas', value: 1.80 },
        { label: 'Menos 2.5 Rondas', pick: 'Menos 2.5 Rondas', value: 1.95 }
      ],
      'btts': [
        { label: 'KO/TKO', pick: 'Victoria por KO/TKO', value: 2.20 },
        { label: 'Decisión', pick: 'Por Decisión de Jueces', value: 3.10 }
      ]
    }
  }
];

// ==========================================
// REFERENCIAS DOM
// ==========================================
const dom = {
  userBalance: document.getElementById('user-balance'),
  liveCount: document.getElementById('live-count'),
  liveEventsContainer: document.getElementById('live-events-container'),
  upcomingEventsContainer: document.getElementById('upcoming-events-container'),
  marketSelect: document.getElementById('market-select'),
  eventSearch: document.getElementById('event-search'),
  filterTabs: document.querySelectorAll('.filter-tab'),
  sportsFilterList: document.getElementById('sports-filter'),
  popularLeaguesList: document.getElementById('popular-leagues'),
  
  // Boleto
  tabBetslip: document.getElementById('tab-betslip'),
  tabMybets: document.getElementById('tab-mybets'),
  betslipView: document.getElementById('betslip-view'),
  mybetsView: document.getElementById('mybets-view'),
  slipCount: document.getElementById('slip-count'),
  mybetsCount: document.getElementById('mybets-count'),
  slipItems: document.getElementById('slip-items'),
  slipFooter: document.getElementById('slip-footer'),
  slipTotalOdds: document.getElementById('slip-total-odds'),
  stakeAmount: document.getElementById('stake-amount'),
  potentialPayout: document.getElementById('potential-payout'),
  btnPlaceBet: document.getElementById('btn-place-bet'),
  btnClearSlip: document.getElementById('btn-clear-slip'),
  btnModeSimple: document.getElementById('btn-mode-simple'),
  btnModeParlay: document.getElementById('btn-mode-parlay'),
  mybetsList: document.getElementById('mybets-list'),
  
  // Modal de Depósito
  btnDeposit: document.getElementById('btn-deposit'),
  depositModal: document.getElementById('deposit-modal'),
  modalClose: document.getElementById('modal-close'),
  btnDepositCancel: document.getElementById('btn-deposit-cancel'),
  btnDepositConfirm: document.getElementById('btn-deposit-confirm'),
  customDepositInput: document.getElementById('custom-deposit-input'),
  depositOptBtns: document.querySelectorAll('.deposit-opt-btn'),
  
  // Promociones
  claimPromoBtn: document.getElementById('claim-promo-btn'),
  
  // Toasts
  toastContainer: document.getElementById('toast-container')
};

// ==========================================
// INICIALIZACIÓN
// ==========================================
function init() {
  updateBalanceDisplay();
  renderEvents();
  setupEventListeners();
  startOddsSimulation();
}

// ==========================================
// RENDERIZADO DE EVENTOS
// ==========================================
function filterEvents() {
  return mockEvents.filter(event => {
    // Filtro por Tab de Tiempo / En vivo
    if (state.activeFilter === 'live' && !event.isLive) return false;
    if (state.activeFilter === 'today' && !event.isLive && event.dateType !== 'today') return false;
    if (state.activeFilter === 'weekend' && !event.isLive && event.dateType !== 'weekend') return false;

    // Filtro por deporte
    if (state.activeSport !== 'all' && event.sport !== state.activeSport) return false;

    // Filtro por liga
    if (state.activeLeague !== 'all' && event.league !== state.activeLeague) return false;

    // Filtro por búsqueda
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchHome = event.homeTeam.toLowerCase().includes(q);
      const matchAway = event.awayTeam.toLowerCase().includes(q);
      const matchLeague = event.leagueName.toLowerCase().includes(q);
      if (!matchHome && !matchAway && !matchLeague) return false;
    }

    return true;
  });
}

function renderEvents() {
  const filtered = filterEvents();
  const liveEvents = filtered.filter(e => e.isLive);
  const upcomingEvents = filtered.filter(e => !e.isLive);

  // Actualizar contador del tab de directos
  const totalLive = mockEvents.filter(e => e.isLive).length;
  dom.liveCount.textContent = totalLive;

  // Renderizar En Vivo
  if (liveEvents.length === 0) {
    dom.liveEventsContainer.innerHTML = `
      <div style="background-color: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-md); text-align: center; color: var(--text-muted); font-size: 0.9rem;">
        No hay partidos en directo con los filtros seleccionados.
      </div>
    `;
  } else {
    dom.liveEventsContainer.innerHTML = liveEvents.map(e => createEventCardHTML(e)).join('');
  }

  // Renderizar Próximos
  if (upcomingEvents.length === 0) {
    dom.upcomingEventsContainer.innerHTML = `
      <div style="background-color: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-md); text-align: center; color: var(--text-muted); font-size: 0.9rem;">
        No hay próximos eventos disponibles con los filtros actuales.
      </div>
    `;
  } else {
    dom.upcomingEventsContainer.innerHTML = upcomingEvents.map(e => createEventCardHTML(e)).join('');
  }

  attachOddsEventListeners();
}

function createEventCardHTML(event) {
  const currentMarketOdds = event.odds[state.activeMarket] || event.odds['1x2'];

  const oddsButtonsHTML = currentMarketOdds.map(odd => {
    if (!odd || odd.value === null) {
      return `<div class="odd-btn" style="opacity: 0.3; cursor: not-allowed;"><span class="odd-label">-</span><span class="odd-value">-</span></div>`;
    }

    const isSelected = state.slipSelections.some(
      s => s.eventId === event.id && s.pick === odd.pick && s.market === state.activeMarket
    );

    return `
      <button class="odd-btn ${isSelected ? 'selected' : ''}" 
              data-event-id="${event.id}" 
              data-pick="${odd.pick}" 
              data-odd="${odd.value}" 
              data-market="${state.activeMarket}">
        <span class="odd-label">${odd.label}</span>
        <span class="odd-value">${odd.value.toFixed(2)}</span>
      </button>
    `;
  }).join('');

  return `
    <article class="event-card" id="card-${event.id}">
      <div class="event-meta">
        <span class="event-league">${event.leagueName}</span>
        <span class="event-time-badge ${event.isLive ? 'is-live' : ''}">
          ${event.isLive ? '<span class="live-dot"></span>' : ''} ${event.time}
        </span>
      </div>

      <div class="event-teams">
        <div class="team-row">
          <div class="team-name">
            <span class="team-flag-tag">${event.homeInitials}</span>
            <span>${event.homeTeam}</span>
          </div>
          ${event.homeScore !== null ? `<span class="team-score ${event.homeScore > (event.awayScore || 0) ? 'leading' : ''}">${event.homeScore}</span>` : ''}
        </div>
        <div class="team-row">
          <div class="team-name">
            <span class="team-flag-tag">${event.awayInitials}</span>
            <span>${event.awayTeam}</span>
          </div>
          ${event.awayScore !== null ? `<span class="team-score ${event.awayScore > (event.homeScore || 0) ? 'leading' : ''}">${event.awayScore}</span>` : ''}
        </div>
      </div>

      <div class="event-odds-group">
        ${oddsButtonsHTML}
      </div>
    </article>
  `;
}

// ==========================================
// GESTIÓN DEL BOLETO DE APUESTAS (BETSLIP)
// ==========================================
function attachOddsEventListeners() {
  document.querySelectorAll('.odd-btn[data-event-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventId = btn.getAttribute('data-event-id');
      const pick = btn.getAttribute('data-pick');
      const odd = parseFloat(btn.getAttribute('data-odd'));
      const market = btn.getAttribute('data-market');
      
      toggleBetSelection(eventId, pick, odd, market);
    });
  });
}

function toggleBetSelection(eventId, pick, odd, market) {
  const event = mockEvents.find(e => e.id === eventId);
  if (!event) return;

  const existingIndex = state.slipSelections.findIndex(
    s => s.eventId === eventId && s.pick === pick && s.market === market
  );

  if (existingIndex > -1) {
    // Si ya existe, se elimina
    state.slipSelections.splice(existingIndex, 1);
    showToast(`Selección removida: ${pick}`, 'info');
  } else {
    // Si ya hay otra selección del mismo evento y mercado en apuestas simples, se reemplaza
    const sameEventMarketIndex = state.slipSelections.findIndex(
      s => s.eventId === eventId && s.market === market
    );
    if (sameEventMarketIndex > -1) {
      state.slipSelections.splice(sameEventMarketIndex, 1);
    }

    state.slipSelections.push({
      id: 'sel_' + Date.now() + Math.random().toString(36).substr(2, 4),
      eventId,
      eventName: `${event.homeTeam} vs ${event.awayTeam}`,
      pick,
      odd,
      market: market.toUpperCase()
    });

    showToast(`Añadido al boleto: ${pick} (${odd.toFixed(2)})`);
  }

  renderSlip();
  renderEvents(); // Actualizar clases visuales de los botones
}

function removeSlipItem(selectionId) {
  state.slipSelections = state.slipSelections.filter(s => s.id !== selectionId);
  renderSlip();
  renderEvents();
}

function clearSlip() {
  state.slipSelections = [];
  renderSlip();
  renderEvents();
  showToast('El boleto ha sido vaciado');
}

function renderSlip() {
  dom.slipCount.textContent = state.slipSelections.length;

  if (state.slipSelections.length === 0) {
    dom.slipItems.innerHTML = `
      <div class="empty-slip">
        <div class="empty-icon">[ &plus; ]</div>
        <p>Tu boleto está vacío</p>
        <span>Haz clic en cualquier cuota de un partido para añadirla al boleto</span>
      </div>
    `;
    dom.slipFooter.style.display = 'none';
    return;
  }

  dom.slipFooter.style.display = 'flex';

  dom.slipItems.innerHTML = state.slipSelections.map(item => `
    <div class="slip-item">
      <div class="slip-item-header">
        <span class="slip-item-pick">${item.pick}</span>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="slip-item-odd">${item.odd.toFixed(2)}</span>
          <button class="slip-item-remove" onclick="removeSlipItem('${item.id}')">&times;</button>
        </div>
      </div>
      <div class="slip-item-match">${item.eventName}</div>
      <span class="slip-item-market">Mercado: ${item.market}</span>
    </div>
  `).join('');

  updateSlipCalculations();
}

function updateSlipCalculations() {
  const count = state.slipSelections.length;
  if (count === 0) return;

  let totalOdds = 1.00;
  if (state.slipMode === 'parlay') {
    // Modo Combinada: Producto de todas las cuotas
    totalOdds = state.slipSelections.reduce((acc, item) => acc * item.odd, 1);
  } else {
    // Modo Simple: Promedio ponderado o cuota del primer elemento si hay 1
    totalOdds = state.slipSelections.reduce((acc, item) => acc * item.odd, 1);
  }

  dom.slipTotalOdds.textContent = totalOdds.toFixed(2);

  const stake = parseFloat(dom.stakeAmount.value) || 0;
  const potentialWin = (stake * totalOdds);
  dom.potentialPayout.textContent = `$${potentialWin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ==========================================
// REALIZAR APUESTA
// ==========================================
function placeBet() {
  const stake = parseFloat(dom.stakeAmount.value);

  if (state.slipSelections.length === 0) {
    showToast('Añade al menos una selección a tu boleto', 'error');
    return;
  }

  if (isNaN(stake) || stake <= 0) {
    showToast('Introduce un importe válido a apostar', 'error');
    return;
  }

  if (stake > state.balance) {
    showToast('Saldo insuficiente. Recarga en el botón Depositar', 'error');
    return;
  }

  // Deducir saldo
  state.balance -= stake;
  updateBalanceDisplay();

  const totalOdds = parseFloat(dom.slipTotalOdds.textContent);
  const potentialPayout = stake * totalOdds;

  // Registrar en historial de "Mis Apuestas"
  const newBet = {
    id: 'TKT-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: state.slipMode === 'parlay' ? `Combinada (${state.slipSelections.length})` : 'Simple',
    selections: [...state.slipSelections],
    stake: stake,
    totalOdds: totalOdds,
    potentialPayout: potentialPayout,
    status: 'open' // 'open', 'won', 'cashed_out'
  };

  state.myBets.unshift(newBet);
  dom.mybetsCount.textContent = state.myBets.length;
  renderMyBets();

  // Limpiar boleto
  state.slipSelections = [];
  renderSlip();
  renderEvents();

  showToast(`¡Apuesta realizada! Ticket #${newBet.id}`, 'info');

  // Cambiar pestaña a Mis Apuestas automáticamente
  switchToTab('mybets');
}

function renderMyBets() {
  if (state.myBets.length === 0) {
    dom.mybetsList.innerHTML = `
      <div class="empty-slip">
        <p>No tienes apuestas registradas todavía.</p>
      </div>
    `;
    return;
  }

  dom.mybetsList.innerHTML = state.myBets.map(bet => {
    const isWon = bet.status === 'won';
    const isCashed = bet.status === 'cashed_out';

    let statusBadge = '<span class="receipt-status-badge status-open">EN JUEGO</span>';
    if (isWon) statusBadge = '<span class="receipt-status-badge status-won">GANADA</span>';
    if (isCashed) statusBadge = '<span class="receipt-status-badge" style="background: #2563eb; color: #fff;">COBRADA</span>';

    const cashoutValue = (bet.stake * (bet.totalOdds * 0.75)).toFixed(2);

    return `
      <div class="bet-receipt-card ${bet.status}">
        <div class="receipt-header">
          <span>#${bet.id} &bull; ${bet.date}</span>
          ${statusBadge}
        </div>
        <div class="receipt-picks-count">${bet.type} @ ${bet.totalOdds.toFixed(2)}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary);">
          ${bet.selections.map(s => `&bull; ${s.pick} (${s.eventName})`).join('<br>')}
        </div>
        <div class="receipt-details">
          <span>Importe: <strong>$${bet.stake.toFixed(2)}</strong></span>
          <span>Retorno: <strong style="color: var(--brand-accent);">$${bet.potentialPayout.toFixed(2)}</strong></span>
        </div>
        ${bet.status === 'open' ? `
          <button class="cashout-btn" onclick="cashOutBet('${bet.id}', ${cashoutValue})">
            Cerrar Apuesta (Cashout $${cashoutValue})
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

window.cashOutBet = function(betId, amount) {
  const bet = state.myBets.find(b => b.id === betId);
  if (!bet || bet.status !== 'open') return;

  bet.status = 'cashed_out';
  state.balance += parseFloat(amount);
  updateBalanceDisplay();
  renderMyBets();
  showToast(`¡Cierre de apuesta exitoso! +$${amount} devueltos al saldo`, 'info');
};

window.removeSlipItem = removeSlipItem;

// ==========================================
// GESTIÓN DE SALDO Y MODALES
// ==========================================
function updateBalanceDisplay() {
  dom.userBalance.textContent = state.balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function openDepositModal() {
  dom.depositModal.classList.add('active');
}

function closeDepositModal() {
  dom.depositModal.classList.remove('active');
}

function handleDeposit() {
  const amount = parseFloat(dom.customDepositInput.value);
  if (isNaN(amount) || amount <= 0) {
    showToast('Introduce un importe de depósito válido', 'error');
    return;
  }

  state.balance += amount;
  updateBalanceDisplay();
  closeDepositModal();
  showToast(`¡Depósito completado! Se añadieron $${amount.toFixed(2)} a tu cuenta.`);
}

// ==========================================
// SIMULACIÓN DE FLUCTUACIÓN DE CUOTAS
// ==========================================
function startOddsSimulation() {
  // Cada 9 segundos, una cuota de un evento en vivo sube o baja levemente
  setInterval(() => {
    const liveEvents = mockEvents.filter(e => e.isLive);
    if (liveEvents.length === 0) return;

    const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
    const oddsGroup = randomEvent.odds['1x2'];
    const validOdds = oddsGroup.filter(o => o.value !== null);
    if (validOdds.length === 0) return;

    const randomOdd = validOdds[Math.floor(Math.random() * validOdds.length)];
    const change = (Math.random() * 0.14 - 0.07); // entre -0.07 y +0.07
    const oldVal = randomOdd.value;
    const newVal = Math.max(1.05, parseFloat((oldVal + change).toFixed(2)));

    randomOdd.value = newVal;

    // Buscar botón en el DOM y aplicar animación de pulso
    const cardEl = document.getElementById(`card-${randomEvent.id}`);
    if (cardEl) {
      const oddBtns = cardEl.querySelectorAll('.odd-btn');
      oddBtns.forEach(btn => {
        if (btn.getAttribute('data-pick') === randomOdd.pick) {
          const valEl = btn.querySelector('.odd-value');
          if (valEl) valEl.textContent = newVal.toFixed(2);
          btn.setAttribute('data-odd', newVal.toString());

          const flashClass = newVal > oldVal ? 'flash-up' : 'flash-down';
          btn.classList.add(flashClass);
          setTimeout(() => btn.classList.remove(flashClass), 1000);
        }
      });
    }

    // Si la cuota cambiada está en el boleto activo, actualizarla
    const inSlip = state.slipSelections.find(s => s.eventId === randomEvent.id && s.pick === randomOdd.pick);
    if (inSlip) {
      inSlip.odd = newVal;
      renderSlip();
    }
  }, 9000);
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '&#10003;';
  if (type === 'error') icon = '&#9888;';
  if (type === 'info') icon = '&#8505;';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// PESTAÑAS Y MODOS
// ==========================================
function switchToTab(tabName) {
  if (tabName === 'betslip') {
    dom.tabBetslip.classList.add('active');
    dom.tabMybets.classList.remove('active');
    dom.betslipView.style.display = 'flex';
    dom.mybetsView.style.display = 'none';
  } else {
    dom.tabBetslip.classList.remove('active');
    dom.tabMybets.classList.add('active');
    dom.betslipView.style.display = 'none';
    dom.mybetsView.style.display = 'flex';
  }
}

// ==========================================
// LISTENERS DE EVENTOS
// ==========================================
function setupEventListeners() {
  // Tabs de Boleto vs Mis Apuestas
  dom.tabBetslip.addEventListener('click', () => switchToTab('betslip'));
  dom.tabMybets.addEventListener('click', () => switchToTab('mybets'));

  // Modo Simple vs Combinada
  dom.btnModeSimple.addEventListener('click', () => {
    state.slipMode = 'simple';
    dom.btnModeSimple.classList.add('active');
    dom.btnModeParlay.classList.remove('active');
    updateSlipCalculations();
  });

  dom.btnModeParlay.addEventListener('click', () => {
    state.slipMode = 'parlay';
    dom.btnModeParlay.classList.add('active');
    dom.btnModeSimple.classList.remove('active');
    updateSlipCalculations();
  });

  // Stake input
  dom.stakeAmount.addEventListener('input', updateSlipCalculations);

  // Quick Chips de Stake
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const add = btn.getAttribute('data-add');
      const current = parseFloat(dom.stakeAmount.value) || 0;
      if (add === 'max') {
        dom.stakeAmount.value = Math.floor(state.balance);
      } else {
        dom.stakeAmount.value = current + parseInt(add, 10);
      }
      updateSlipCalculations();
    });
  });

  // Botón Realizar Apuesta y Vaciar
  dom.btnPlaceBet.addEventListener('click', placeBet);
  dom.btnClearSlip.addEventListener('click', clearSlip);

  // Filtros de fecha / en vivo
  dom.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dom.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeFilter = tab.getAttribute('data-filter');
      renderEvents();
    });
  });

  // Filtro de Deporte (Sidebar)
  dom.sportsFilterList.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      dom.sportsFilterList.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.activeSport = item.getAttribute('data-sport');
      renderEvents();
    });
  });

  // Filtro de Ligas (Sidebar)
  dom.popularLeaguesList.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      dom.popularLeaguesList.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      state.activeLeague = item.getAttribute('data-league');
      renderEvents();
    });
  });

  // Selector de Mercado
  dom.marketSelect.addEventListener('change', (e) => {
    state.activeMarket = e.target.value;
    renderEvents();
  });

  // Búsqueda
  dom.eventSearch.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderEvents();
  });

  // Modal de Depósito
  dom.btnDeposit.addEventListener('click', openDepositModal);
  dom.modalClose.addEventListener('click', closeDepositModal);
  dom.btnDepositCancel.addEventListener('click', closeDepositModal);
  dom.btnDepositConfirm.addEventListener('click', handleDeposit);

  dom.depositOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.depositOptBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      dom.customDepositInput.value = btn.getAttribute('data-amount');
    });
  });

  // Reclamar Promoción
  dom.claimPromoBtn.addEventListener('click', () => {
    state.balance += 200.00;
    updateBalanceDisplay();
    showToast('¡Bono de $200 activado exitosamente!');
    dom.claimPromoBtn.textContent = 'Bono Activo';
    dom.claimPromoBtn.disabled = true;
    dom.claimPromoBtn.style.opacity = '0.6';
  });

  // Click fuera del modal para cerrarlo
  dom.depositModal.addEventListener('click', (e) => {
    if (e.target === dom.depositModal) closeDepositModal();
  });
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', init);
