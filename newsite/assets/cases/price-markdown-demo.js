(() => {
  const root = document.querySelector('#price-markdown-demo');
  if (!root) return;
  const $ = selector => root.querySelector(selector);
  const form = $('#markdown-editor'), value = $('#markdown-value'), quantity = $('#markdown-quantity');
  const type = $('#markdown-type'), reason = $('#markdown-reason'), status = $('.markdown-demo__status');
  const currency = cents => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(cents / 100);
  const items = [...root.querySelectorAll('[data-item]')].map(row => ({row, name:row.dataset.name, price:Number(row.dataset.price), input:row.querySelector('.markdown-demo__quantity input'), more:row.querySelector('.markdown-demo__more'), menu:row.querySelector('.markdown-demo__menu'), open:row.querySelector('.markdown-demo__open'), remove:row.querySelector('.markdown-demo__remove'), saved:null}));
  let active = items.find(item => item.row.dataset.item === 'bulb');
  const available = () => Number(active.input.value);
  const subtotal = () => items.reduce((sum,item) => sum + item.price * Number(item.input.value),0);
  const discount = () => items.reduce((sum,item) => sum + (item.saved?.total || 0),0);
  function closeMenus() {items.forEach(item => {item.menu.hidden = true; item.more.setAttribute('aria-expanded','false');});}
  function close() {form.hidden = true; root.classList.remove('is-editing'); active.more.focus();}
  function position() {
    const container = $('.markdown-demo__items');
    const desired = active.row.offsetTop + active.row.offsetHeight / 2 - form.offsetHeight / 2;
    const top = Math.max(12, Math.min(desired, container.clientHeight - form.offsetHeight - 12));
    form.style.top = `${top - active.row.offsetTop}px`;
    form.style.setProperty('--pointer-top', `${Math.max(24, Math.min(form.offsetHeight - 24, active.row.offsetTop + active.row.offsetHeight / 2 - top))}px`);
  }
  function render() {
    $('#markdown-summary-subtotal').textContent = currency(subtotal());
    $('#markdown-summary-discount').textContent = `(${currency(discount())})`;
    const pretax = subtotal() - discount(), tax = Math.round(pretax * .07);
    $('#markdown-summary-total').textContent = currency(pretax);
    $('#markdown-summary-tax').textContent = currency(tax);
    $('#markdown-order-total').textContent = currency(pretax + tax);
    items.forEach(item => {
      const saved = item.saved, price = item.row.querySelector('.markdown-demo__price'), line = item.row.querySelector('.markdown-demo__discount');
      price.replaceChildren();
      if (saved) {
        const original = document.createElement('s'); original.textContent = currency(item.price);
        const updated = document.createElement('strong'); updated.textContent = currency(item.price - saved.unit);
        price.append(original,' ',updated,' each');
        price.setAttribute('aria-label',`Original price ${currency(item.price)}; ${saved.qty} discounted units at ${currency(item.price - saved.unit)} each`);
      } else {price.textContent = `${currency(item.price)} each`; price.removeAttribute('aria-label');}
      line.hidden = !saved;
      line.textContent = saved ? `${saved.qty} of ${item.input.value} discounted · ${currency(saved.unit)} off each · ${saved.reason}` : '';
      item.open.textContent = saved ? 'Update markdown' : 'Apply markdown';
      item.remove.hidden = !saved;
      item.row.classList.toggle('has-markdown',Boolean(saved));
    });
  }
  function calculation() {
    const amount = Number(value.value), qty = Number(quantity.value);
    if (!value.value || !quantity.value || !Number.isFinite(amount) || !Number.isInteger(qty) || qty < 1 || qty > available() || amount <= 0) return {error:`Enter a positive amount and a quantity from 1 to ${available()}.`};
    if (amount > (type.value === 'percent' ? 100 : active.price / 100)) return {error:type.value === 'percent' ? 'Percentage cannot exceed 100%.' : `Amount cannot exceed the ${currency(active.price)} item price.`};
    const unit = Math.round(type.value === 'percent' ? active.price * amount / 100 : type.value === 'price' ? active.price - amount * 100 : amount * 100);
    if (unit <= 0) return {error:'Enter a markdown that reduces the price.'};
    return {amount,qty,unit,total:unit * qty,type:type.value,reason:reason.value};
  }
  function preview() {
    const result = calculation(), approval = !result.error && result.total > 5000;
    value.max = type.value === 'percent' ? 100 : active.price / 100;
    $('#markdown-value-label').textContent = type.value === 'percent' ? 'Amount (%)' : type.value === 'price' ? 'New price ($)' : 'Amount ($)';
    $('#markdown-preview').textContent = result.error ? '' : `${currency(result.unit)} off each × ${result.qty} = ${currency(result.total)} markdown`;
    $('#markdown-error').hidden = !result.error && !approval;
    $('#markdown-error').textContent = result.error || (approval ? 'Markdowns over $50 require manager approval.' : '');
    $('.markdown-demo__apply').disabled = Boolean(result.error || approval);
    if (!form.hidden) position();
    return result;
  }
  items.forEach(item => {
    item.more.addEventListener('click', () => {const opening = item.menu.hidden; closeMenus(); if (!form.hidden) close(); active = item; item.menu.hidden = !opening; item.more.setAttribute('aria-expanded',String(opening)); if (opening) item.open.focus();});
    item.menu.addEventListener('keydown', event => {if (event.key === 'Escape') {event.preventDefault(); closeMenus(); item.more.focus();}});
    item.open.addEventListener('click', () => {
      active = item; closeMenus(); item.row.append(form);
      const saved = item.saved;
      value.value = saved?.amount || 5; quantity.value = saved?.qty || Math.min(3,available());
      type.value = saved?.type || 'dollars'; reason.value = saved?.reason || 'Damaged';
      quantity.max = available(); quantity.previousElementSibling.textContent = `Qty (of ${available()})`;
      $('.markdown-demo__editor-item').textContent = `${item.name} · ${currency(item.price)} each · Qty ${available()}`;
      $('#markdown-editor-title').textContent = saved ? 'Update markdown' : 'Apply markdown';
      $('.markdown-demo__apply').textContent = saved ? 'Update' : 'Apply';
      form.hidden = false; root.classList.add('is-editing'); preview(); reason.focus();
    });
    item.remove.addEventListener('click', () => {item.saved = null; render(); closeMenus(); item.more.focus(); status.textContent = `Markdown removed. Pre-tax total: ${currency(subtotal() - discount())}.`;});
    const group = item.input.parentElement;
    function change() {
      item.input.value = Math.max(1,Math.min(99,Math.floor(Number(item.input.value) || 1)));
      if (item.saved && item.saved.qty > Number(item.input.value)) {item.saved.qty = Number(item.input.value); item.saved.total = item.saved.unit * item.saved.qty;}
      group.querySelector('[data-step="-1"]').disabled = Number(item.input.value) <= 1;
      group.querySelector('[data-step="1"]').disabled = Number(item.input.value) >= 99;
      render();
      if (active === item && !form.hidden) {quantity.max = available(); quantity.previousElementSibling.textContent = `Qty (of ${available()})`; preview();}
    }
    group.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {item.input.value = Number(item.input.value) + Number(button.dataset.step); change();}));
    item.input.addEventListener('change',change); change();
  });
  document.addEventListener('click', event => {if (!event.target.closest('.markdown-demo__item-actions')) closeMenus();});
  window.addEventListener('resize', () => {if (!form.hidden) position();});
  form.addEventListener('input',preview); form.addEventListener('change',preview);
  form.addEventListener('submit', event => {
    event.preventDefault(); const result = preview(); if (result.error || result.total > 5000) return;
    const updating = Boolean(active.saved); active.saved = result; render(); close();
    root.classList.add('is-updated'); window.setTimeout(() => root.classList.remove('is-updated'),700);
    status.textContent = `${updating ? 'Updated' : 'Applied'} ${currency(result.total)} markdown to ${result.qty} ${active.name}. Pre-tax total: ${currency(subtotal() - discount())}.`;
  });
  $('.markdown-demo__cancel').addEventListener('click',close);
  form.addEventListener('keydown',event => {if (event.key === 'Escape') {event.preventDefault(); close();}});
  function reset() {if (!form.hidden) close(); closeMenus(); items.forEach(item => {item.saved = null; item.input.value = item.input.dataset.initial; item.input.dispatchEvent(new Event('change'));}); render(); status.textContent = 'Demo reset. Open an item’s more menu to begin.';}
  $('.markdown-demo__reset').addEventListener('click',reset);
  $('.markdown-demo__place').addEventListener('click',() => {closeMenus(); if (!form.hidden) close(); status.textContent = `Demo order placed. Order total: ${$('#markdown-order-total').textContent}.`;});
  $('.markdown-demo__quote').addEventListener('click',() => {closeMenus(); if (!form.hidden) close(); status.textContent = `Demo quote saved. Order total: ${$('#markdown-order-total').textContent}.`;});
  $('.markdown-demo__cancel-order').addEventListener('click',() => {reset(); status.textContent = 'Demo order canceled. Cart restored to its starting state.';});
})();
