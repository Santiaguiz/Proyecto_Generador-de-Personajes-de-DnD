// Elementos del DOM
const elements = {
  racesContainer: document.getElementById('races-container'),
  classesContainer: document.getElementById('classes-container'),
  previewName: document.getElementById('preview-name'),
  previewRaceClass: document.getElementById('preview-race-class'),
  previewStats: document.querySelectorAll('[id^="preview-"]'),
  generateBtn: document.getElementById('generate-btn'),
  rollStatsBtn: document.getElementById('roll-stats'),
  characterIcon: document.getElementById('character-icon')
};

// Estado del personaje
let character = {
  race: null,
  class: null,
  stats: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  modifiers: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  }
};

// Íconos para cada clase
const classIcons = {
  'Guerrero': '',
  'Mago': '',
  'Clérigo': '',
  'Pícaro': '',
  'Bárbaro': '',
  'Druida': ''
};

// Cargar datos desde la API
async function loadData() {
  try {
    const [racesRes, classesRes] = await Promise.all([
      fetch('/api/races'),
      fetch('/api/classes')
    ]);
    
    const races = await racesRes.json();
    const classes = await classesRes.json();
    
    renderRaces(races);
    renderClasses(classes);
    
    // Efecto visual al cargar
    document.querySelectorAll('.race-card, .class-card').forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add('animated-card');
    });
    
  } catch (error) {
    console.error("Error loading data:", error);
    showError();
  }
}

// Renderizar razas
function renderRaces(races) {
  elements.racesContainer.innerHTML = races.map(race => `
    <div class="race-card rounded-lg p-4" data-id="${race.name}" onclick="selectRace('${race.name}')">
      <h3 class="text-xl font-bold text-amber-300 mb-2">${race.nombre}</h3>
      <p class="text-gray-300 mb-3">${race.description}</p>
      <div class="text-sm grid grid-cols-3 gap-2">
        ${Object.entries(race.modifiers)
          .filter(([_, value]) => value > 0)
          .map(([stat, value]) => `
            <span class="bg-amber-900 px-2 py-1 rounded">${stat.slice(0, 3).toUpperCase()} +${value}</span>
          `).join('')}
      </div>
    </div>
  `).join('');
}

// Renderizar clases
function renderClasses(classes) {
  elements.classesContainer.innerHTML = classes.map(cls => `
    <div class="class-card rounded-lg p-4" data-id="${cls.name}" onclick="selectClass('${cls.name}')">
      <h3 class="text-xl font-bold text-amber-300 mb-2">${cls.nombre}</h3>
      <p class="text-gray-300 mb-3">${cls.description}</p>
      <div class="flex items-center justify-between mt-4">
        <span class="bg-amber-900 px-3 py-1 rounded-full">d${cls.hit_die}</span>
        <div>
          ${cls.skills.slice(0, 3).map(skill => `
            <span class="bg-gray-700 text-xs px-2 py-1 rounded mr-1">${skill}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Seleccionar raza
function selectRace(raceName) {
  const race = races.find(r => r.nombre === raceName);
  character.race = race;
  
  // Actualizar UI
  document.querySelectorAll('.race-card').forEach(card => {
    card.classList.remove('ring-2', 'ring-amber-500');
    if (card.dataset.id === raceName) {
      card.classList.add('ring-2', 'ring-amber-500');
      card.classList.add('pulse-effect');
    } else {
      card.classList.remove('pulse-effect');
    }
  });
  
  updatePreview();
}

// Seleccionar clase
function selectClass(className) {
  const cls = classes.find(c => c.nombre === className);
  character.class = cls;
  
  // Actualizar UI
  document.querySelectorAll('.class-card').forEach(card => {
    card.classList.remove('ring-2', 'ring-amber-500');
    if (card.dataset.id === className) {
      card.classList.add('ring-2', 'ring-amber-500');
      card.classList.add('pulse-effect');
    } else {
      card.classList.remove('pulse-effect');
    }
  });
  
  // Actualizar ícono
  elements.characterIcon.textContent = classIcons[className] || '';
  updatePreview();
}

// Rodar atributos
function rollStats() {
  const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  
  stats.forEach(stat => {
    const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    const total = rolls.slice(1).reduce((sum, num) => sum + num, 0);
    
    character.stats[stat] = total;
    character.modifiers[stat] = Math.floor((total - 10) / 2);
    
    // Efecto visual
    const statElement = document.getElementById(`${stat}-value`);
    statElement.textContent = total;
    statElement.classList.add('dice-roll');
    setTimeout(() => {
      statElement.classList.remove('dice-roll');
    }, 1000);
  });
  
  updatePreview();
  elements.rollStatsBtn.classList.add('animate-pulse');
  setTimeout(() => {
    elements.rollStatsBtn.classList.remove('animate-pulse');
  }, 2000);
}

// Actualizar vista previa
function updatePreview() {
  if (character.race && character.class) {
    elements.previewRaceClass.textContent = `${character.race.nombre} • ${character.class.nombre}`;
  }
  
  Object.keys(character.stats).forEach(stat => {
    const modifier = character.modifiers[stat];
    const modifierText = modifier >= 0 ? `+${modifier}` : modifier;
    document.getElementById(`preview-${stat}`).textContent = 
      `${character.stats[stat]} (${modifierText})`;
  });
}

// Mostrar error
function showError() {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-4 right-4 bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg';
  errorDiv.textContent = 'Error al cargar los datos. Intenta recargar la página.';
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Cambiar pestañas
function changeTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
  });
  document.getElementById(`${tabName}-tab`).classList.remove('hidden');
  
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('bg-amber-800');
    button.classList.add('bg-gray-700');
  });
  document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.remove('bg-gray-700');
  document.querySelector(`.tab-button[data-tab="${tabName}"]`).classList.add('bg-amber-800');
}

// Event Listeners
elements.rollStatsBtn.addEventListener('click', rollStats);
elements.generateBtn.addEventListener('click', () => {
  if (!character.race || !character.class) {
    showError();
    return;
  }
  
  // Aquí iría la lógica para generar la ficha completa
  alert('Ficha generada. Implementa la lógica final aquí.');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  
  // Efecto de carga inicial
  document.body.classList.add('opacity-0');
  setTimeout(() => {
    document.body.classList.remove('opacity-0');
  }, 300);
});
