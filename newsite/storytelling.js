(() => {
  document.querySelectorAll('[data-coffee-process]').forEach(process => {
    const local = selector => [...process.querySelectorAll(selector)]
      .filter(element => element.closest('[data-coffee-process]') === process);
    const messages = {
      name: 'Name becomes the name on the coffee card.',
      price: 'Price becomes the price on the coffee card.',
      quantity: 'Quantity becomes the number of coffees you can add.',
      add: 'Add to order becomes the action on the coffee card.'
    };
    const keys = Object.keys(messages);
    const buttons = local('button[data-model-field]')
      .filter(button => keys.includes(button.dataset.modelField));
    const ui = local('[data-ui-field]')
      .filter(element => keys.includes(element.dataset.uiField));
    const mappingStatus = local('[data-model-status]')[0];
    const orderStatus = local('[data-coffee-status]')[0];
    const form = local('form[data-coffee-form]')[0];
    const demoFields = form?.querySelector('fieldset[data-coffee-demo-fields]');
    const quantity = form?.querySelector('input[type="number"][name="coffee-quantity"]');
    const add = form?.querySelector('button[type="submit"][data-coffee-add]');
    const name = ui.find(element => element.dataset.uiField === 'name')?.textContent.trim();
    const unitPrice = form?.dataset.unitPrice;
    const defaultMessage = 'Explore a detail to see where it appears in the interface.';

    // Keep the complete static illustration and disabled controls if its contract is incomplete.
    if (!form || !demoFields || !quantity || !add || !mappingStatus || !orderStatus || !name ||
        !/^\d+$/.test(unitPrice || '') || !Number.isSafeInteger(Number(unitPrice)) || Number(unitPrice) <= 0 ||
        keys.some(key => !buttons.some(button => button.dataset.modelField === key) ||
          !ui.some(element => element.dataset.uiField === key))) return;

    const cleanups = [];
    const initialDisabled = buttons.map(button => button.disabled);
    const initialFieldsetDisabled = demoFields.disabled;
    const initialAddDisabled = add.disabled;
    let hovered = null;
    let focused = null;
    let pinned = null;
    let active = null;

    const listen = (element, event, handler) => {
      element.addEventListener(event, handler);
      cleanups.push(() => element.removeEventListener(event, handler));
    };
    const setInput = input => {
      process.dataset.input = input;
      // A resting mouse cannot override subsequent keyboard inspection.
      if (input === 'keyboard') hovered = null;
    };
    const render = () => {
      const next = hovered || focused || pinned;
      buttons.forEach(button => button.classList.toggle('is-linked', button.dataset.modelField === next));
      ui.forEach(element => element.classList.toggle('is-linked', element.dataset.uiField === next));
      if (active !== next) mappingStatus.textContent = next ? messages[next] : defaultMessage;
      active = next;
    };
    const modelButton = element => {
      const button = element?.closest?.('button[data-model-field]');
      return buttons.includes(button) ? button : null;
    };
    const fieldAt = element => {
      const button = modelButton(element);
      if (button) return button.dataset.modelField;
      const field = element?.closest?.('[data-ui-field]');
      return ui.includes(field) ? field.dataset.uiField : null;
    };
    const inspect = field => {
      if (pinned && pinned !== field) pinned = null;
    };
    const validQuantity = () => {
      const value = Number(quantity.value);
      return quantity.value.trim() !== '' && Number.isInteger(value) && value >= 1 && value <= 9;
    };

    try {
      if (!mappingStatus.id) {
        let id = 'coffee-mapping-status';
        let suffix = 1;
        while (document.getElementById(id)) id = `coffee-mapping-status-${suffix++}`;
        mappingStatus.id = id;
      }
      if (!mappingStatus.hasAttribute('aria-live')) mappingStatus.setAttribute('aria-live', 'polite');
      mappingStatus.setAttribute('aria-atomic', 'true');
      if (!orderStatus.hasAttribute('aria-live')) orderStatus.setAttribute('aria-live', 'polite');
      orderStatus.setAttribute('aria-atomic', 'true');
      if (!mappingStatus.textContent.trim()) mappingStatus.textContent = defaultMessage;
      buttons.forEach(button => {
        const matches = ui.filter(element => element.dataset.uiField === button.dataset.modelField);
        matches.forEach((element, index) => {
          if (element.id) return;
          const base = `coffee-${button.dataset.modelField}-field-${index + 1}`;
          let id = base;
          let suffix = 1;
          while (document.getElementById(id)) id = `${base}-${suffix++}`;
          element.id = id;
        });
        button.setAttribute('aria-controls', matches.map(element => element.id).join(' '));
        const descriptions = new Set((button.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
        descriptions.add(mappingStatus.id);
        button.setAttribute('aria-describedby', [...descriptions].join(' '));
      });

      listen(document, 'keydown', event => {
        if (event.key === 'Tab') {
          setInput('keyboard');
          render();
        }
      });
      listen(process, 'pointerdown', () => setInput('pointer'));
      listen(process, 'pointerover', event => {
        if (event.pointerType === 'touch') return;
        const button = modelButton(event.target);
        if (!button || button.contains(event.relatedTarget)) return;
        setInput('pointer');
        hovered = button.dataset.modelField;
        inspect(hovered);
        render();
      });
      listen(process, 'pointerout', event => {
        const button = modelButton(event.target);
        if (!button || button.contains(event.relatedTarget)) return;
        hovered = null;
        render();
      });
      listen(process, 'focusin', event => {
        focused = fieldAt(event.target);
        if (focused) inspect(focused);
        render();
      });
      listen(process, 'focusout', event => {
        focused = fieldAt(event.relatedTarget);
        if (focused) inspect(focused);
        render();
      });
      listen(process, 'click', event => {
        const button = modelButton(event.target);
        if (!button) return;
        event.preventDefault();
        if (event.detail === 0) setInput('keyboard');
        pinned = button.dataset.modelField;
        render();
      });
      listen(process, 'keydown', event => {
        setInput('keyboard');
        if (event.key === 'Escape') {
          hovered = null;
          focused = null;
          pinned = null;
        }
        render();
      });
      listen(quantity, 'input', () => quantity.setCustomValidity(''));
      listen(form, 'submit', event => {
        event.preventDefault();
        if (!validQuantity()) {
          quantity.setCustomValidity('Choose a whole number from 1 to 9.');
          quantity.reportValidity();
          return;
        }
        quantity.setCustomValidity('');
        if (!form.reportValidity()) return;
        orderStatus.textContent = `${Number(quantity.value)} × ${name} added to order.`;
      });

      setInput('keyboard');
      demoFields.disabled = false;
      buttons.forEach(button => { button.disabled = false; });
      add.disabled = false;
      process.classList.add('is-enhanced');
    } catch {
      cleanups.forEach(remove => remove());
      buttons.forEach((button, index) => {
        button.disabled = initialDisabled[index];
        button.classList.remove('is-linked');
      });
      ui.forEach(element => element.classList.remove('is-linked'));
      demoFields.disabled = initialFieldsetDisabled;
      add.disabled = initialAddDisabled;
      process.classList.remove('is-enhanced');
    }
  });
})();
