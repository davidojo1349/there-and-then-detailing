// ===== js/script.js =====
// Service data based on business requirements
const serviceData = [
  {
    id: 1,
    name: 'Lowkey',
    category: 'Lowkey',
    prices: { small: 25, medium: 30, large: 35 },
    features: [
      'Prewash',
      'Handwash',
      'Mats Vacuumed',
      'Dash and door wipe'
    ],
    badge: 'Essential'
  },
  {
    id: 2,
    name: 'Midrange',
    category: 'Midrange',
    prices: { small: 35, medium: 45, large: 55 },
    features: [
      'Prewash',
      'Snow Foam',
      'Handwash',
      'Wheel face cleaned',
      'Interior Vacuum',
      'Dash, door and center console cleaned'
    ],
    badge: 'Popular'
  },
  {
    id: 3,
    name: 'High Spec',
    category: 'High Spec',
    prices: { small: 55, medium: 75, large: 85 },
    features: [
      'Prewash',
      'Snow Foam',
      'Handwash',
      'Wax/Sealant Application',
      'Wheel + Arches Deep clean',
      'Interior deep clean',
      'Windows Cleaned',
      'Tar Spot removal'
    ],
    badge: 'Concours'
  }
];

// Reference to grid container
const servicesGrid = document.getElementById('servicesGrid');
const filterSelect = document.getElementById('serviceFilter');
const sortSelect = document.getElementById('sortBy');

// Store current filter and sort values
let currentFilter = 'all';
let currentSort = 'default';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  
  // Event listeners
  filterSelect.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderServices();
  });
  
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderServices();
  });
});

// Main render function
function renderServices() {
  // 1. Filter the data
  let filtered = filterServices(serviceData, currentFilter);
  
  // 2. Sort the filtered data
  filtered = sortServices(filtered, currentSort);
  
  // 3. Generate HTML
  if (filtered.length === 0) {
    servicesGrid.innerHTML = `<div class="no-results">No services match the selected filter.</div>`;
    return;
  }
  
  servicesGrid.innerHTML = filtered.map(service => createServiceCard(service)).join('');
}

// Filter by category
function filterServices(data, filter) {
  if (filter === 'all') return data;
  return data.filter(service => service.category === filter);
}

// Sort services
function sortServices(data, sortBy) {
  const sorted = [...data]; // copy to avoid mutation
  
  switch(sortBy) {
    case 'priceAsc':
      return sorted.sort((a, b) => (a.prices.small || 0) - (b.prices.small || 0));
    case 'priceDesc':
      return sorted.sort((a, b) => (b.prices.small || 0) - (a.prices.small || 0));
    case 'nameAsc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'default':
    default:
      // maintain original order: Lowkey → Midrange → High Spec
      return sorted.sort((a, b) => a.id - b.id);
  }
}

// Generate HTML for a single service card - UPDATED with contact page link
function createServiceCard(service) {
  const priceRows = Object.entries(service.prices).map(([size, price]) => `
    <div class="price-row">
      <span class="price-label">${size.charAt(0).toUpperCase() + size.slice(1)}</span>
      <span class="price-value">£${price}</span>
    </div>
  `).join('');
  
  const featuresList = service.features.map(feature => `
    <li><i class="fas fa-check"></i> ${feature}</li>
  `).join('');
  
  return `
    <div class="service-card" data-category="${service.category}" data-id="${service.id}">
      <div class="service-header">
        <h3 class="service-name">${service.name}</h3>
        <span class="service-badge">${service.badge}</span>
      </div>
      <div class="service-price">
        ${priceRows}
      </div>
      <ul class="service-features">
        ${featuresList}
      </ul>
      <a href="contact.html" class="btn">Enquire Now</a>
    </div>
  `;
}