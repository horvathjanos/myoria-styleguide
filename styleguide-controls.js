const STORAGE_KEYS = {
  theme: 'myoria-styleguide-theme',
  density: 'myoria-styleguide-density',
};

const VALID_THEMES = new Set(['light', 'dark']);
const VALID_DENSITIES = new Set(['comfortable', 'compact']);

function readStorageValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorageValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable for local files or strict browser settings.
  }
}

function readStoredValue(key, allowedValues, fallback) {
  const storedValue = readStorageValue(key);

  if (storedValue && allowedValues.has(storedValue)) {
    return storedValue;
  }

  return fallback;
}

function setRootMode(name, value) {
  document.documentElement.dataset[name] = value;
}

function updateActiveButtons(groupName, activeValue) {
  document
    .querySelectorAll(`[data-sg-control="${groupName}"]`)
    .forEach((button) => {
      button.classList.toggle(
        'is-active',
        button.dataset.value === activeValue,
      );
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.value === activeValue),
      );
    });
}

function applyTheme(theme) {
  setRootMode('theme', theme);
  writeStorageValue(STORAGE_KEYS.theme, theme);
  updateActiveButtons('theme', theme);
}

function applyDensity(density) {
  setRootMode('density', density);
  writeStorageValue(STORAGE_KEYS.density, density);
  updateActiveButtons('density', density);
}

function readPreviewModes() {
  const theme = readStoredValue(STORAGE_KEYS.theme, VALID_THEMES, 'light');
  const density = readStoredValue(
    STORAGE_KEYS.density,
    VALID_DENSITIES,
    'comfortable',
  );

  return { theme, density };
}

function applyStoredPreviewModes() {
  const { theme, density } = readPreviewModes();

  setRootMode('theme', theme);
  setRootMode('density', density);
}

function createGlobalControls() {
  const controls = document.createElement('section');

  controls.className = 'sg-global-controls';
  controls.setAttribute('aria-label', 'Global styleguide controls');
  controls.innerHTML = `
    <div class="sg-control-group">
      <span class="my-section-label">THEME</span>
      <div class="sg-control-options" aria-label="Theme">
        <button class="sg-control-option" type="button" data-sg-control="theme" data-value="light">LIGHT</button>
        <span class="sg-control-divider" aria-hidden="true">|</span>
        <button class="sg-control-option" type="button" data-sg-control="theme" data-value="dark">DARK</button>
      </div>
    </div>

    <div class="sg-control-group">
      <span class="my-section-label">DENSITY</span>
      <div class="sg-control-options" aria-label="Density">
        <button class="sg-control-option" type="button" data-sg-control="density" data-value="comfortable">COMFORTABLE</button>
        <span class="sg-control-divider" aria-hidden="true">|</span>
        <button class="sg-control-option" type="button" data-sg-control="density" data-value="compact">COMPACT</button>
      </div>
    </div>
  `;

  return controls;
}

function injectGlobalControls() {
  const nav = document.querySelector('.sg-nav');

  if (!nav || nav.querySelector('.sg-global-controls')) {
    return;
  }

  nav.append(createGlobalControls());
}

function initialiseStyleguideControls() {
  const { theme, density } = readPreviewModes();

  injectGlobalControls();
  updateActiveButtons('theme', theme);
  updateActiveButtons('density', density);

  document.querySelectorAll('[data-sg-control]').forEach((button) => {
    button.addEventListener('click', () => {
      if (
        button.dataset.sgControl === 'theme' &&
        VALID_THEMES.has(button.dataset.value)
      ) {
        applyTheme(button.dataset.value);
      }

      if (
        button.dataset.sgControl === 'density' &&
        VALID_DENSITIES.has(button.dataset.value)
      ) {
        applyDensity(button.dataset.value);
      }
    });
  });
}

function initialiseWhenReady() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseStyleguideControls);
    return;
  }

  initialiseStyleguideControls();
}

applyStoredPreviewModes();
initialiseWhenReady();
