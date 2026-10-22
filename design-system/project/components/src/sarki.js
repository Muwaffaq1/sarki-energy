/* Sarki Energy components — plain React 18 (no JSX, no build step).
 * Built into components/bundle.js by scripts/build_bundle.py, which prepends the
 * Phosphor icon paths as `ICONS`. Atomic layers: atoms → molecules → organisms. */

var h = React.createElement;
var useState = React.useState;

function cx() {
  var out = [];
  for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
  return out.join(' ');
}

function omit(obj, keys) {
  var out = {};
  for (var k in obj) if (keys.indexOf(k) < 0) out[k] = obj[k];
  return out;
}

// Controlled when `value` is passed, otherwise keeps its own state.
function useControllable(value, defaultValue, onChange) {
  var s = useState(defaultValue);
  var isControlled = value !== undefined;
  var current = isControlled ? value : s[0];
  function set(next) {
    if (!isControlled) s[1](next);
    if (onChange) onChange(next);
  }
  return [current, set];
}

var naira = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 2 });
function formatNaira(amount) {
  return '₦' + naira.format(amount);
}

/* ── Atoms ─────────────────────────────────────────────────────────────────── */

function Icon(props) {
  var size = props.size || 24;
  var paths = ICONS[props.name] || [];
  return h('svg', {
    className: cx('se-icon', props.className),
    width: size, height: size, viewBox: '0 0 256 256', fill: 'currentColor',
    role: props.label ? 'img' : undefined,
    'aria-label': props.label || undefined,
    'aria-hidden': props.label ? undefined : true,
    focusable: 'false'
  }, paths.map(function (d, i) { return h('path', { key: i, d: d }); }));
}

var ICON_SIZE = { sm: 16, md: 20, lg: 20 };

function Button(props) {
  var variant = props.variant || 'primary';
  var size = props.size || 'md';
  var rest = omit(props, ['variant', 'size', 'iconLeft', 'iconRight', 'loading', 'fullWidth', 'className', 'children']);
  return h('button', Object.assign({ type: 'button' }, rest, {
    className: cx('se-btn', 'se-btn--' + variant, 'se-btn--' + size, props.fullWidth && 'se-btn--full', props.loading && 'is-loading', props.className),
    disabled: props.disabled || props.loading,
    'aria-busy': props.loading || undefined
  }),
    props.loading ? h('span', { className: 'se-spinner', 'aria-hidden': true }) : null,
    !props.loading && props.iconLeft ? h(Icon, { name: props.iconLeft, size: ICON_SIZE[size] }) : null,
    h('span', { className: 'se-btn__label' }, props.children),
    !props.loading && props.iconRight ? h(Icon, { name: props.iconRight, size: ICON_SIZE[size] }) : null
  );
}

function IconButton(props) {
  var variant = props.variant || 'secondary';
  var size = props.size || 'md';
  var rest = omit(props, ['variant', 'size', 'icon', 'label', 'className']);
  return h('button', Object.assign({ type: 'button' }, rest, {
    className: cx('se-iconbtn', 'se-btn--' + variant, 'se-iconbtn--' + size, props.className),
    'aria-label': props.label,
    title: props.label
  }), h(Icon, { name: props.icon, size: size === 'sm' ? 16 : size === 'lg' ? 24 : 20 }));
}

function Input(props) {
  var size = props.size || 'md';
  var rest = omit(props, ['size', 'invalid', 'iconLeft', 'suffix', 'className']);
  return h('div', { className: cx('se-input', 'se-input--' + size, props.invalid && 'is-invalid', props.disabled && 'is-disabled', props.className) },
    props.iconLeft ? h(Icon, { name: props.iconLeft, size: 20, className: 'se-input__icon' }) : null,
    h('input', Object.assign({ type: 'text' }, rest, { 'aria-invalid': props.invalid || undefined })),
    props.suffix ? h('span', { className: 'se-input__suffix' }, props.suffix) : null
  );
}

function Checkbox(props) {
  var rest = omit(props, ['label', 'description', 'className']);
  return h('label', { className: cx('se-check', props.disabled && 'is-disabled', props.className) },
    h('input', Object.assign({ type: 'checkbox' }, rest)),
    h('span', { className: 'se-check__box', 'aria-hidden': true }, h(Icon, { name: 'check', size: 16 })),
    h('span', { className: 'se-check__text' },
      h('span', { className: 'se-check__label' }, props.label),
      props.description ? h('span', { className: 'se-check__desc' }, props.description) : null)
  );
}

function Switch(props) {
  var st = useControllable(props.checked, !!props.defaultChecked, props.onChange);
  return h('label', { className: cx('se-switch', props.disabled && 'is-disabled', props.className) },
    h('input', {
      type: 'checkbox', role: 'switch', checked: st[0], disabled: props.disabled, id: props.id,
      onChange: function (e) { st[1](e.target.checked); }
    }),
    h('span', { className: 'se-switch__track', 'aria-hidden': true }, h('span', { className: 'se-switch__thumb' })),
    props.label ? h('span', { className: 'se-switch__label' }, props.label) : null
  );
}

function Badge(props) {
  var tone = props.tone || 'neutral';
  return h('span', { className: cx('se-badge', 'se-badge--' + tone, props.className) },
    props.dot ? h('span', { className: 'se-badge__dot', 'aria-hidden': true }) : null,
    props.icon ? h(Icon, { name: props.icon, size: 16 }) : null,
    props.children);
}

function Price(props) {
  var size = props.size || 'md';
  return h('span', { className: cx('se-price', 'se-price--' + size, props.className) },
    h('span', { className: 'se-price__now' }, formatNaira(props.amount)),
    props.compareAt ? h('s', { className: 'se-price__was' },
      h('span', { className: 'se-visually-hidden' }, 'Was '), formatNaira(props.compareAt)) : null,
    props.unit ? h('span', { className: 'se-price__unit' }, '/' + props.unit) : null);
}

/* ── Molecules ─────────────────────────────────────────────────────────────── */

var fieldSeq = 0;
function FormField(props) {
  var idRef = React.useRef(null);
  if (!idRef.current) idRef.current = props.id || 'se-field-' + (++fieldSeq);
  var id = idRef.current;
  var hintId = id + '-hint';
  var child = React.isValidElement(props.children)
    ? React.cloneElement(props.children, {
        id: id,
        invalid: props.error ? true : props.children.props.invalid,
        required: props.required,
        'aria-describedby': props.error || props.hint ? hintId : undefined
      })
    : props.children;
  return h('div', { className: cx('se-field', props.className) },
    h('label', { className: 'se-field__label', htmlFor: id }, props.label,
      props.required ? h('span', { className: 'se-field__req', 'aria-hidden': true }, ' *') : null,
      props.optional ? h('span', { className: 'se-field__opt' }, ' (optional)') : null),
    child,
    props.error
      ? h('p', { className: 'se-field__msg se-field__msg--error', id: hintId }, h(Icon, { name: 'warning', size: 16 }), props.error)
      : props.hint ? h('p', { className: 'se-field__msg', id: hintId }, props.hint) : null
  );
}

function QuantityStepper(props) {
  var min = props.min == null ? 1 : props.min;
  var max = props.max == null ? 99 : props.max;
  var st = useControllable(props.value, props.defaultValue == null ? min : props.defaultValue, props.onChange);
  var v = st[0];
  return h('div', { className: cx('se-stepper', 'se-stepper--' + (props.size || 'md'), props.className), role: 'group', 'aria-label': props.label || 'Quantity' },
    h('button', { type: 'button', 'aria-label': 'Decrease', disabled: v <= min, onClick: function () { st[1](Math.max(min, v - 1)); } }, h(Icon, { name: 'minus', size: 16 })),
    h('output', { 'aria-live': 'polite' }, v),
    h('button', { type: 'button', 'aria-label': 'Increase', disabled: v >= max, onClick: function () { st[1](Math.min(max, v + 1)); } }, h(Icon, { name: 'plus', size: 16 }))
  );
}

function SegmentedControl(props) {
  var options = (props.options || []).map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  var st = useControllable(props.value, props.defaultValue == null && options[0] ? options[0].value : props.defaultValue, props.onChange);
  function onKey(e, i) {
    var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    var next = options[(i + d + options.length) % options.length];
    st[1](next.value);
    var btns = e.currentTarget.parentNode.querySelectorAll('button');
    btns[(i + d + options.length) % options.length].focus();
  }
  return h('div', { className: cx('se-segmented', props.fullWidth && 'se-segmented--full', props.className), role: 'radiogroup', 'aria-label': props.label },
    options.map(function (o, i) {
      var on = o.value === st[0];
      return h('button', {
        key: o.value, type: 'button', role: 'radio', 'aria-checked': on, tabIndex: on ? 0 : -1,
        className: on ? 'is-on' : undefined,
        onClick: function () { st[1](o.value); },
        onKeyDown: function (e) { onKey(e, i); }
      }, o.label);
    }));
}

var TREND_ICON = { up: 'trend-up', down: 'trend-down' };
function StatTile(props) {
  var trend = props.trend || 'flat';
  var good = trend === 'flat' ? 'flat' : (trend === 'up') === (props.upIsGood !== false) ? 'good' : 'bad';
  return h('div', { className: cx('se-stat', props.className) },
    h('div', { className: 'se-stat__head' },
      props.icon ? h('span', { className: 'se-stat__icon' }, h(Icon, { name: props.icon, size: 20 })) : null,
      h('span', { className: 'se-stat__label' }, props.label)),
    h('div', { className: 'se-stat__value' },
      h('span', null, props.value),
      props.unit ? h('span', { className: 'se-stat__unit' }, props.unit) : null),
    props.delta || props.caption ? h('div', { className: 'se-stat__foot' },
      props.delta ? h('span', { className: 'se-stat__delta se-stat__delta--' + good },
        TREND_ICON[trend] ? h(Icon, { name: TREND_ICON[trend], size: 16 }) : null, props.delta) : null,
      props.caption ? h('span', { className: 'se-stat__caption' }, props.caption) : null) : null
  );
}

/* ── Organisms ─────────────────────────────────────────────────────────────── */

var STOCK = {
  in: { tone: 'success', label: 'In stock' },
  low: { tone: 'warning', label: 'Low stock' },
  out: { tone: 'danger', label: 'Out of stock' }
};

function ProductCard(props) {
  var stock = STOCK[props.stock || 'in'];
  var out = props.stock === 'out';
  return h('article', { className: cx('se-product', props.className) },
    h('div', { className: 'se-product__media' },
      props.image
        ? h('img', { src: props.image, alt: props.imageAlt || '' })
        : h(Icon, { name: props.icon || 'lightning', size: 48 }),
      props.badge ? h(Badge, { tone: props.badge.tone || 'accent', className: 'se-product__badge' }, props.badge.label) : null),
    h('div', { className: 'se-product__body' },
      props.category ? h('span', { className: 'se-product__cat' }, props.category) : null,
      h('h3', { className: 'se-product__name' }, props.name),
      props.spec ? h('p', { className: 'se-product__spec' }, props.spec) : null,
      h('div', { className: 'se-product__meta' },
        h(Price, { amount: props.price, compareAt: props.compareAt }),
        h(Badge, { tone: stock.tone, dot: true }, stock.label))),
    out
      ? h(Button, { variant: 'secondary', fullWidth: true, iconLeft: 'envelope-simple', onClick: props.onNotify }, 'Notify me')
      : h(Button, { variant: 'primary', fullWidth: true, iconLeft: 'shopping-cart-simple', onClick: props.onAdd }, 'Add to cart')
  );
}

function ServiceCard(props) {
  var Tag = props.href ? 'a' : 'div';
  return h(Tag, { className: cx('se-service', props.className), href: props.href },
    h('span', { className: 'se-service__disc', 'aria-hidden': true }, h(Icon, { name: props.icon || 'lightning', size: 32 })),
    h('h3', { className: 'se-service__title' }, props.title),
    h('p', { className: 'se-service__desc' }, props.description),
    props.href ? h('span', { className: 'se-service__link' }, props.linkLabel || 'Learn more', h(Icon, { name: 'arrow-right', size: 16 })) : null
  );
}

function OrderSummary(props) {
  var items = props.items || [];
  var subtotal = items.reduce(function (s, it) { return s + it.amount * (it.qty || 1); }, 0);
  var discount = props.discount || 0;
  var delivery = props.delivery || 0;
  var vatRate = props.vatRate == null ? 0.075 : props.vatRate;
  var vat = Math.round((subtotal - discount) * vatRate);
  var total = subtotal - discount + delivery + vat;
  function row(label, value, cls) {
    return h('div', { className: cx('se-summary__row', cls) }, h('dt', null, label), h('dd', null, value));
  }
  return h('section', { className: cx('se-summary', props.className), 'aria-label': 'Order summary' },
    h('h2', { className: 'se-summary__title' }, props.title || 'Order summary'),
    h('ul', { className: 'se-summary__items' }, items.map(function (it, i) {
      return h('li', { key: i },
        h('span', { className: 'se-summary__qty' }, (it.qty || 1) + '×'),
        h('span', { className: 'se-summary__name' }, it.name),
        h('span', { className: 'se-summary__amt' }, formatNaira(it.amount * (it.qty || 1))));
    })),
    h('dl', { className: 'se-summary__totals' },
      row('Subtotal', formatNaira(subtotal)),
      discount ? row('Discount', '−' + formatNaira(discount), 'is-discount') : null,
      row('Delivery', delivery ? formatNaira(delivery) : 'Free'),
      row('VAT (' + (vatRate * 100) + '%)', formatNaira(vat)),
      row(props.totalLabel || 'Total', formatNaira(total), 'is-total')),
    h(Button, { variant: 'accent', size: 'lg', fullWidth: true, iconRight: 'arrow-right', onClick: props.onCheckout }, props.ctaLabel || 'Checkout'),
    h('p', { className: 'se-summary__note' }, h(Icon, { name: 'shield-check', size: 16 }), props.note || 'Secure checkout. Pay by card, bank transfer or USSD.')
  );
}

var STATION_STATUS = {
  open: { tone: 'success', label: 'Open' },
  busy: { tone: 'warning', label: 'Busy' },
  closed: { tone: 'neutral', label: 'Closed' },
  maintenance: { tone: 'danger', label: 'Under maintenance' }
};

function StationCard(props) {
  var status = STATION_STATUS[props.status || 'open'];
  var ev = props.kind === 'ev';
  return h('article', { className: cx('se-station', props.className) },
    h('header', { className: 'se-station__head' },
      h('span', { className: 'se-station__kind', 'aria-hidden': true }, h(Icon, { name: ev ? 'charging-station' : 'gas-pump', size: 24 })),
      h('div', { className: 'se-station__title' },
        h('h3', null, props.name),
        h('p', null, [props.distance, props.address].filter(Boolean).join(' · '))),
      h(Badge, { tone: status.tone, dot: true }, status.label)),
    ev && props.chargers ? h('div', { className: 'se-station__ev' },
      h('div', null, h('span', { className: 'se-station__big' }, props.chargers.available + '/' + props.chargers.total), h('span', null, 'chargers free')),
      h('div', null, h('span', { className: 'se-station__big' }, props.chargers.power), h('span', null, 'max power')),
      props.chargers.price ? h('div', null, h('span', { className: 'se-station__big' }, formatNaira(props.chargers.price)), h('span', null, 'per kWh')) : null) : null,
    !ev && props.products ? h('ul', { className: 'se-station__prices' }, props.products.map(function (p, i) {
      return h('li', { key: i }, h('span', null, p.label), h(Price, { amount: p.price, unit: p.unit || 'L', size: 'sm' }));
    })) : null,
    h('div', { className: 'se-station__actions' },
      h(Button, { variant: 'secondary', iconLeft: 'map-pin', onClick: props.onDirections }, 'Directions'),
      h(Button, { variant: 'primary', iconLeft: ev ? 'lightning' : 'gas-pump', disabled: props.status === 'closed' || props.status === 'maintenance', onClick: props.onPrimary }, ev ? 'Start charging' : 'Pay at pump'))
  );
}

function UsagePanel(props) {
  var data = props.data || [];
  var periods = props.periods || ['Day', 'Week', 'Month', 'Year'];
  var period = useControllable(props.period, props.defaultPeriod || periods[0], props.onPeriodChange);
  var max = Math.max.apply(null, data.map(function (d) { return d.value; }).concat([1]));
  // Round the axis top up to a clean step so every tick label is a value the chart reaches.
  var step = Math.pow(10, Math.floor(Math.log10(max)));
  var top = Math.ceil(max / step) * step;
  if (top / step < 3) { step = step / 2; }
  var ticks = [];
  for (var t = 0; t <= top + 1e-9; t += step) ticks.push(Math.round(t * 100) / 100);
  // Draw at the container's real pixel width so axis text stays 12px at any size.
  var boxRef = React.useRef(null);
  var wState = useState(560);
  React.useEffect(function () {
    var el = boxRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    var ro = new ResizeObserver(function (entries) { wState[1](Math.max(320, Math.round(entries[0].contentRect.width))); });
    ro.observe(el);
    return function () { ro.disconnect(); };
  }, []);
  var W = wState[0], H = 200, padL = 40, padB = 24, padT = 8;
  var plotW = W - padL, plotH = H - padB - padT;
  var bw = plotW / Math.max(data.length, 1);
  var highlight = props.highlight == null ? data.length - 1 : props.highlight;
  return h('section', { className: cx('se-usage', 'se-usage--' + (props.series || 'solar'), props.className) },
    h('header', { className: 'se-usage__head' },
      h('div', null,
        h('span', { className: 'se-usage__label' }, props.title),
        h('div', { className: 'se-usage__total' }, h('span', null, props.total), h('span', { className: 'se-usage__unit' }, props.unit))),
      h(SegmentedControl, { options: periods, value: period[0], onChange: period[1], label: 'Period' })),
    h('div', { className: 'se-usage__chart', ref: boxRef },
      h('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', 'aria-label': props.title + ' by ' + period[0].toLowerCase() },
        ticks.map(function (tv) {
          var y = padT + plotH - (tv / top) * plotH;
          return h('g', { key: 't' + tv },
            h('line', { x1: padL, x2: W, y1: y, y2: y, className: 'se-usage__grid' }),
            h('text', { x: padL - 8, y: y + 4, textAnchor: 'end', className: 'se-usage__axis' }, tv));
        }),
        data.map(function (d, i) {
          var bh = (d.value / top) * plotH;
          var x = padL + i * bw + bw * 0.2;
          return h('g', { key: i },
            h('rect', { x: x, y: padT + plotH - bh, width: bw * 0.6, height: Math.max(bh, 1), rx: Math.min(4, bw * 0.3), className: i === highlight ? 'se-usage__bar is-on' : 'se-usage__bar' },
              h('title', null, d.label + ': ' + d.value + ' ' + (props.unit || ''))),
            h('text', { x: x + bw * 0.3, y: H - 6, textAnchor: 'middle', className: 'se-usage__axis' }, d.label));
        })))
  );
}

var LOGO_PATH = 'M371.62 98.7939C372.726 99.843 373.651 100.967 374.466 102.148C383.488 118.2 390.36 135.622 394.689 154.025C395.233 157.296 395.336 160.748 396.072 163.807C397.167 168.347 397.825 171.699 398.268 176.352C398.429 178.045 398.836 179.797 399.162 181.578C399.326 183.368 399.465 185.165 399.581 186.969C399.587 187.718 399.517 188.494 399.71 189.158C399.902 192.748 400 196.363 400 200C400 206.122 399.724 212.179 399.186 218.161C399.155 218.441 399.129 218.683 399.103 218.874C398.675 221.981 398.152 222.522 397.545 225.063C397.548 223.148 397.845 220.751 398.093 218.819C393.863 219.026 388.943 218.814 384.638 218.794L360.965 218.78L338.245 218.792C335.303 218.796 330.293 218.994 327.58 218.835C327.883 220.057 328.175 221.292 328.513 222.504C335.825 248.849 366.465 257.993 390.513 251.848C390.908 251.748 391.3 251.634 391.689 251.512C393.139 248.455 393.545 245.888 394.247 242.606C394.596 245.291 393.796 249.471 392.821 253.286C387.642 272.069 379.793 289.744 369.706 305.877C367.414 309.473 365.023 312.913 362.545 316.132C361.565 317.412 360.552 318.67 359.51 319.897L358.683 319.77C360.25 317.267 362.96 313.75 364.747 311.13C367.76 306.647 370.68 302.1 373.505 297.497C350.64 297.112 327.815 290.952 309.91 276.397C302.558 270.42 295.577 263.332 290.627 255.22C288.152 262.222 285.435 268.385 280.598 274.122C244.068 317.437 169.354 300.699 131.11 269.382C133.298 266.724 136.51 261.725 138.624 258.737C144.093 251.01 149.354 243.055 155.054 235.482C158.399 238.002 161.54 240.314 165.063 242.588C178.657 251.448 194.2 256.87 210.354 258.39C219.613 259.325 234.335 259.485 239.91 250.607C241.665 247.858 242.243 244.518 241.515 241.338C238.647 229.227 216.053 223.004 205.728 219.498C200.211 217.625 194.978 216 189.446 213.865C181.408 210.718 173.69 206.805 166.401 202.181C155.388 195.295 147.423 186.129 144.581 173.132C141.59 159.456 143.628 143.806 151.218 131.917C165.712 109.214 193.751 99.8474 219.62 100.147C246.729 99.9657 267.165 108.934 289.532 123.121C287.4 126.162 285.592 129.781 283.692 132.978C278.732 141.333 274.148 151.091 269.035 159.238C268.34 158.705 267.577 158.21 266.837 157.727C252.43 148.313 235.718 141.811 218.31 142.014C213.976 142.011 209.88 142.428 205.651 143.339C197.804 145.03 192.311 150.476 194.591 158.961C195.245 161.406 196.667 163.576 198.647 165.15C205.791 170.84 223.31 175.769 232.388 178.792C239.125 181.035 246.129 183.139 252.83 185.742C260.947 188.895 268.23 193.224 275.768 197.523C275.443 182.243 278.802 167.108 285.564 153.402C297.8 128.735 323.64 110.057 350.5 104.619C355.25 103.658 360.08 103.267 364.877 102.838C366.337 102.707 372.195 102.302 373.005 102.029C372.98 101.053 372.128 99.7843 371.62 98.7939ZM392.524 151.209C386.464 147.487 375.232 145.812 368.18 146.604C356.955 147.585 344.502 153.087 337.292 161.868C332.43 167.788 330.302 173.416 328.992 180.796C338.61 181.056 349.448 180.765 359.188 180.767L382.877 180.947C387.354 180.948 393.73 180.723 398.085 181.002C397.442 175.109 394.957 155.86 392.524 151.209Z';

// tone: 'default' (follows the theme), 'inverse' (on surface-inverse), 'on-photo' (always white disc, black letters).
function Logo(props) {
  var size = props.size || 32;
  return h('svg', { className: cx('se-logo', 'se-logo--' + (props.tone || 'default'), props.className), viewBox: '0 0 400 400', width: size, height: size,
    role: props.label ? 'img' : undefined, 'aria-label': props.label || undefined, 'aria-hidden': props.label ? undefined : true, focusable: 'false' },
    h('circle', { className: 'se-logo__mark', cx: 200, cy: 200, r: 200 }),
    h('path', { className: 'se-logo__letters', fillRule: 'evenodd', clipRule: 'evenodd', d: LOGO_PATH }));
}

function SiteHeader(props) {
  var links = props.links || [];
  return h('header', { className: cx('se-header', props.className) },
    h('a', { className: 'se-header__brand', href: props.homeHref || '#' },
      props.logoSrc ? h('img', { src: props.logoSrc, alt: '', width: 32, height: 32 }) : h(Logo, { size: 32 }),
      h('span', null, props.name || 'Sarki Energy')),
    h('nav', { className: 'se-header__nav', 'aria-label': 'Main' },
      links.map(function (l, i) {
        return h('a', { key: i, href: l.href || '#', 'aria-current': l.current ? 'page' : undefined }, l.label);
      })),
    h('div', { className: 'se-header__actions' },
      h('span', { className: 'se-header__cart' },
        h(IconButton, { icon: 'shopping-cart-simple', label: 'Cart, ' + (props.cartCount || 0) + ' items', variant: 'ghost' }),
        props.cartCount ? h('span', { className: 'se-header__count', 'aria-hidden': true }, props.cartCount) : null),
      h(Button, { variant: 'accent', size: 'sm', className: 'se-header__cta' }, props.ctaLabel || 'Start a project'),
      h(IconButton, { icon: 'list', label: 'Menu', variant: 'ghost', className: 'se-header__menu' }))
  );
}

/* ── More atoms ────────────────────────────────────────────────────────────── */

function TextLink(props) {
  var rest = omit(props, ['className', 'children', 'icon', 'tone']);
  return h('a', Object.assign({ href: '#' }, rest, { className: cx('se-link', props.tone === 'inverse' && 'se-link--inverse', props.className) }),
    h('span', null, props.children),
    props.icon === false ? null : h(Icon, { name: props.icon || 'arrow-right', size: 16 }));
}

function Chip(props) {
  var rest = omit(props, ['selected', 'icon', 'className', 'children', 'count']);
  return h('button', Object.assign({ type: 'button' }, rest, {
    className: cx('se-chip', props.selected && 'is-on', props.className), 'aria-pressed': !!props.selected
  }),
    props.icon ? h(Icon, { name: props.icon, size: 16 }) : null,
    h('span', null, props.children),
    props.count != null ? h('span', { className: 'se-chip__count' }, props.count) : null);
}

function Select(props) {
  var rest = omit(props, ['options', 'invalid', 'className', 'size', 'placeholder']);
  var options = (props.options || []).map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  return h('div', { className: cx('se-input', 'se-select', 'se-input--' + (props.size || 'md'), props.invalid && 'is-invalid', props.className) },
    h('select', Object.assign({}, rest, { 'aria-invalid': props.invalid || undefined }),
      props.placeholder ? h('option', { value: '' }, props.placeholder) : null,
      options.map(function (o) { return h('option', { key: o.value, value: o.value }, o.label); })),
    h(Icon, { name: 'caret-down', size: 16, className: 'se-select__caret' }));
}

function Textarea(props) {
  var rest = omit(props, ['invalid', 'className']);
  return h('textarea', Object.assign({ rows: 4 }, rest, { className: cx('se-textarea', props.invalid && 'is-invalid', props.className), 'aria-invalid': props.invalid || undefined }));
}

// Image slot. Without `src` it shows a labelled placeholder that briefs the photographer.
function Media(props) {
  return h('figure', { className: cx('se-media', 'se-media--' + (props.ratio || '4x3'), props.tone === 'inverse' && 'se-media--inverse', props.className) },
    props.src
      ? h('img', { src: props.src, alt: props.alt || '' })
      : h('div', { className: 'se-media__ph' }, h(Icon, { name: props.icon || 'sun', size: 32 }), props.brief ? h('span', null, props.brief) : null));
}

function WhatsAppButton(props) {
  return h('a', { className: cx('se-wa', props.className), href: props.href || '#', 'aria-label': props.label || 'Chat with us on WhatsApp' },
    h(Icon, { name: 'whatsapp-logo', size: 24 }), props.showLabel ? h('span', null, props.label || 'Chat on WhatsApp') : null);
}

/* ── More molecules ────────────────────────────────────────────────────────── */

function SectionHeader(props) {
  return h('header', { className: cx('se-sechead', props.align === 'center' && 'se-sechead--center', props.className) },
    h('div', { className: 'se-sechead__text' },
      props.eyebrow ? h('p', { className: 'se-eyebrow' }, props.eyebrow) : null,
      h(props.level || 'h2', { className: 'se-sechead__title' }, props.title),
      props.lead ? h('p', { className: 'se-sechead__lead' }, props.lead) : null),
    props.action ? h('div', { className: 'se-sechead__action' }, props.action) : null);
}

function Breadcrumbs(props) {
  var items = props.items || [];
  return h('nav', { className: cx('se-crumbs', props.className), 'aria-label': 'Breadcrumb' },
    h('ol', null, items.map(function (it, i) {
      var last = i === items.length - 1;
      return h('li', { key: i },
        last ? h('span', { 'aria-current': 'page' }, it.label) : h('a', { href: it.href || '#' }, it.label),
        last ? null : h(Icon, { name: 'caret-right', size: 16 }));
    })));
}

function AccordionItem(props) {
  return h('details', { className: cx('se-acc', props.className), open: props.defaultOpen },
    h('summary', null, h('span', null, props.title), h(Icon, { name: 'plus', size: 20, className: 'se-acc__icon' })),
    h('div', { className: 'se-acc__body' }, props.children));
}

function ChoiceGroup(props) {
  var st = useControllable(props.value, props.defaultValue, props.onChange);
  var options = (props.options || []).map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  return h('div', { className: cx('se-choices', props.className), role: 'radiogroup', 'aria-label': props.label },
    options.map(function (o) {
      return h(Chip, { key: o.value, role: 'radio', 'aria-checked': o.value === st[0], selected: o.value === st[0], icon: o.icon, onClick: function () { st[1](o.value); } }, o.label);
    }));
}

function BenefitItem(props) {
  return h('div', { className: cx('se-benefit', props.className) },
    props.icon
      ? h('span', { className: 'se-benefit__icon', 'aria-hidden': true }, h(Icon, { name: props.icon, size: 24 }))
      : h('span', { className: 'se-benefit__num', 'aria-hidden': true }, props.number),
    h('h3', { className: 'se-benefit__title' }, props.title),
    h('p', { className: 'se-benefit__text' }, props.children));
}

function EmptyState(props) {
  return h('div', { className: cx('se-empty', props.className) },
    h('span', { className: 'se-empty__icon', 'aria-hidden': true }, h(Icon, { name: props.icon || 'package', size: 48 })),
    h('h2', { className: 'se-empty__title' }, props.title),
    props.text ? h('p', { className: 'se-empty__text' }, props.text) : null,
    props.action ? h('div', { className: 'se-empty__action' }, props.action) : null);
}

/* ── Section organisms ─────────────────────────────────────────────────────── */

function Hero(props) {
  var variant = props.variant || 'page';
  return h('section', { className: cx('se-hero', 'se-hero--' + variant, props.className) },
    h('div', { className: 'se-container se-hero__inner' },
      h('div', { className: 'se-hero__text' },
        props.breadcrumbs ? h(Breadcrumbs, { items: props.breadcrumbs }) : null,
        props.eyebrow ? h('p', { className: 'se-eyebrow' }, props.eyebrow) : null,
        h('h1', { className: 'se-hero__title' }, props.title),
        props.lead ? h('p', { className: 'se-hero__lead' }, props.lead) : null,
        props.actions ? h('div', { className: 'se-hero__actions' }, props.actions) : null,
        props.footnote ? h('p', { className: 'se-hero__note' }, props.footnote) : null),
      props.media ? h('div', { className: 'se-hero__media' }, props.media) : null));
}

function ProcessSteps(props) {
  var steps = props.steps || [];
  return h('ol', { className: cx('se-steps', props.direction === 'vertical' && 'se-steps--vertical', props.className) },
    steps.map(function (s, i) {
      return h('li', { key: i, className: 'se-step' },
        h('span', { className: 'se-step__num', 'aria-hidden': true }, String(i + 1).padStart(2, '0')),
        h('div', { className: 'se-step__body' },
          s.kicker ? h('p', { className: 'se-step__kicker' }, s.kicker) : null,
          h('h3', { className: 'se-step__title' }, s.title),
          s.text ? h('p', { className: 'se-step__text' }, s.text) : null));
    }));
}

function PlanCard(props) {
  return h('article', { className: cx('se-plan', props.featured && 'se-plan--featured', props.className) },
    props.tag ? h(Badge, { tone: props.featured ? 'accent' : 'neutral' }, props.tag) : null,
    h('h3', { className: 'se-plan__title' }, props.title),
    h('p', { className: 'se-plan__text' }, props.text),
    props.points ? h('ul', { className: 'se-plan__points' }, props.points.map(function (p, i) {
      return h('li', { key: i }, h(Icon, { name: 'check', size: 16 }), h('span', null, p));
    })) : null,
    props.action ? h('div', { className: 'se-plan__action' }, props.action) : null);
}

function CTABand(props) {
  return h('section', { className: cx('se-ctaband', props.className) },
    h('div', { className: 'se-container se-ctaband__inner' },
      h('div', null,
        h('h2', { className: 'se-ctaband__title' }, props.title),
        props.text ? h('p', { className: 'se-ctaband__text' }, props.text) : null),
      h('div', { className: 'se-ctaband__actions' },
        h(Button, { variant: 'accent', size: 'lg', iconRight: 'arrow-right' }, props.primaryLabel || 'Start a project'),
        props.secondaryLabel ? h(Button, { variant: 'secondary', size: 'lg', iconLeft: 'whatsapp-logo', className: 'se-btn--on-inverse' }, props.secondaryLabel) : null)));
}

function ProjectCard(props) {
  var live = props.status === 'Ongoing';
  return h('article', { className: cx('se-project', props.className) },
    h(Media, { ratio: '16x9', icon: props.icon || 'solar-panel', brief: props.brief, src: props.image }),
    h('div', { className: 'se-project__body' },
      h('div', { className: 'se-project__meta' },
        h(Badge, { tone: live ? 'warning' : 'success', dot: true }, props.status || 'Delivered'),
        props.location ? h('span', null, props.location) : null),
      h('h3', { className: 'se-project__title' }, props.title),
      h('p', { className: 'se-project__text' }, props.text),
      props.points ? h('ul', { className: 'se-project__points' }, props.points.map(function (p, i) { return h('li', { key: i }, p); })) : null,
      props.href ? h(TextLink, { href: props.href }, 'View project') : null));
}

function ArticleCard(props) {
  return h('article', { className: cx('se-article', props.featured && 'se-article--featured', props.className) },
    props.featured ? h(Media, { ratio: '16x9', icon: props.icon || 'lightbulb', brief: props.brief }) : null,
    h('div', { className: 'se-article__meta' }, h('span', null, props.category), h('span', { 'aria-hidden': true }, '·'), h('span', null, props.readTime)),
    h('h3', { className: 'se-article__title' }, h('a', { href: props.href || '#' }, props.title)),
    h('p', { className: 'se-article__excerpt' }, props.excerpt),
    h(TextLink, { href: props.href || '#', tabIndex: -1, 'aria-hidden': true }, 'Read'));
}

function SectorCard(props) {
  return h('a', { className: cx('se-sector', props.className), href: props.href || '#' },
    h('span', { className: 'se-sector__icon', 'aria-hidden': true }, h(Icon, { name: props.icon || 'buildings', size: 24 })),
    h('span', { className: 'se-sector__body' },
      h('span', { className: 'se-sector__title' }, props.title),
      props.text ? h('span', { className: 'se-sector__text' }, props.text) : null),
    h(Icon, { name: 'arrow-right', size: 20, className: 'se-sector__arrow' }));
}

function CapabilityRow(props) {
  return h('article', { className: cx('se-capability', props.className) },
    h('span', { className: 'se-capability__num' }, props.number),
    h('div', { className: 'se-capability__head' },
      h('h3', null, props.title),
      props.href ? h(TextLink, { href: props.href }, 'Explore') : null),
    h('ul', { className: 'se-capability__tags' }, (props.items || []).map(function (t, i) { return h('li', { key: i }, t); })));
}

function Testimonial(props) {
  return h('figure', { className: cx('se-quote', props.className) },
    h(Icon, { name: 'quotes', size: 32, className: 'se-quote__mark' }),
    h('blockquote', null, props.quote),
    h('figcaption', null, h('span', { className: 'se-quote__name' }, props.name), h('span', { className: 'se-quote__role' }, props.role)));
}

function FilterBar(props) {
  var cats = props.categories || [];
  var st = useControllable(props.value, cats[0] && (cats[0].value || cats[0]), props.onChange);
  return h('div', { className: cx('se-filterbar', props.className) },
    h('div', { className: 'se-filterbar__chips', role: 'toolbar', 'aria-label': 'Browse by' }, cats.map(function (c) {
      var o = typeof c === 'string' ? { value: c, label: c } : c;
      return h(Chip, { key: o.value, selected: st[0] === o.value, count: o.count, onClick: function () { st[1](o.value); } }, o.label);
    })),
    h(Input, { iconLeft: 'magnifying-glass', placeholder: props.searchPlaceholder || 'Search products', className: 'se-filterbar__search', 'aria-label': 'Search products' }));
}

function CartLine(props) {
  return h('div', { className: cx('se-cartline', props.className) },
    h(Media, { ratio: '1x1', icon: props.icon || 'package', className: 'se-cartline__media' }),
    h('div', { className: 'se-cartline__info' },
      props.category ? h('span', { className: 'se-cartline__cat' }, props.category) : null,
      h('h3', { className: 'se-cartline__name' }, props.name),
      props.spec ? h('p', { className: 'se-cartline__spec' }, props.spec) : null,
      h('button', { type: 'button', className: 'se-cartline__remove' }, 'Remove')),
    h(QuantityStepper, { defaultValue: props.qty || 1, size: 'sm' }),
    h(Price, { amount: props.price * (props.qty || 1) }));
}

function ProductDetail(props) {
  var thumbs = props.thumbs || 4;
  return h('section', { className: cx('se-pdp', props.className) },
    h('div', { className: 'se-pdp__gallery' },
      h(Media, { ratio: '1x1', icon: props.icon || 'lightning', brief: 'Product on white, front three-quarter view' }),
      h('div', { className: 'se-pdp__thumbs' }, Array.from({ length: thumbs }).map(function (_, i) {
        return h('button', { key: i, type: 'button', className: cx('se-pdp__thumb', i === 0 && 'is-on'), 'aria-label': 'Image ' + (i + 1) }, h(Icon, { name: props.icon || 'lightning', size: 20 }));
      }))),
    h('div', { className: 'se-pdp__info' },
      h('p', { className: 'se-eyebrow' }, props.category),
      h('h1', { className: 'se-pdp__title' }, props.name),
      h('p', { className: 'se-pdp__lead' }, props.lead),
      h('div', { className: 'se-pdp__price' }, h(Price, { amount: props.price, compareAt: props.compareAt, size: 'lg' }), h(Badge, { tone: 'success', dot: true }, 'In stock')),
      props.note ? h('p', { className: 'se-pdp__note' }, h(Icon, { name: 'info', size: 16 }), props.note) : null,
      h('div', { className: 'se-pdp__buy' }, h(QuantityStepper, { defaultValue: 1 }), h(Button, { variant: 'primary', size: 'lg', iconLeft: 'shopping-cart-simple', fullWidth: true }, 'Add to cart')),
      h(Button, { variant: 'secondary', size: 'lg', iconLeft: 'whatsapp-logo', fullWidth: true }, 'Ask an engineer'),
      h('ul', { className: 'se-pdp__assure' },
        h('li', null, h(Icon, { name: 'truck', size: 20 }), 'Delivery date confirmed with your order request'),
        h('li', null, h(Icon, { name: 'shield-check', size: 20 }), 'Warranty terms confirmed with your quote'),
        h('li', null, h(Icon, { name: 'wrench', size: 20 }), 'Installation by Sarki engineers available'))));
}

function SiteFooter(props) {
  var cols = props.columns || [];
  return h('footer', { className: cx('se-footer', props.className) },
    h('div', { className: 'se-container se-footer__inner' },
      h('div', { className: 'se-footer__brand' },
        h('a', { className: 'se-header__brand se-footer__logo', href: '#' },
          props.logoSrc ? h('img', { src: props.logoSrc, alt: '', width: 32, height: 32 }) : h(Logo, { size: 32, tone: 'inverse' }), h('span', null, 'Sarki Energy')),
        h('p', null, props.tagline || 'Energy solutions, infrastructure and technologies for homes, businesses, industries and communities.'),
        h('div', { className: 'se-footer__contact' },
          h('span', null, h(Icon, { name: 'map-pin', size: 16 }), props.address || '9, Zaria Street, Abuja 900247'),
          h('span', null, h(Icon, { name: 'phone', size: 16 }), props.phone || '0814 736 3336'),
          h('span', null, h(Icon, { name: 'envelope-simple', size: 16 }), props.email || 'info@sarkienergy.com'))),
      cols.map(function (c, i) {
        return h('nav', { key: i, className: 'se-footer__col', 'aria-label': c.title },
          h('h2', null, c.title), h('ul', null, c.links.map(function (l, j) { return h('li', { key: j }, h('a', { href: '#' }, l)); })));
      })),
    h('div', { className: 'se-container se-footer__legal' },
      h('span', null, '© 2026 Sarki Energy Limited · RC 9603901'),
      h('span', null, 'Abuja, Nigeria')));
}

var Sarki = {
  Icon: Icon, Button: Button, IconButton: IconButton, Input: Input, Checkbox: Checkbox, Switch: Switch, Badge: Badge, Price: Price, Logo: Logo,
  TextLink: TextLink, Chip: Chip, Select: Select, Textarea: Textarea, Media: Media, WhatsAppButton: WhatsAppButton,
  FormField: FormField, QuantityStepper: QuantityStepper, SegmentedControl: SegmentedControl, StatTile: StatTile,
  SectionHeader: SectionHeader, Breadcrumbs: Breadcrumbs, AccordionItem: AccordionItem, ChoiceGroup: ChoiceGroup, BenefitItem: BenefitItem, EmptyState: EmptyState,
  ProductCard: ProductCard, ServiceCard: ServiceCard, OrderSummary: OrderSummary, StationCard: StationCard, UsagePanel: UsagePanel, SiteHeader: SiteHeader,
  Hero: Hero, ProcessSteps: ProcessSteps, PlanCard: PlanCard, CTABand: CTABand, ProjectCard: ProjectCard, ArticleCard: ArticleCard, SectorCard: SectorCard,
  CapabilityRow: CapabilityRow, Testimonial: Testimonial, FilterBar: FilterBar, CartLine: CartLine, ProductDetail: ProductDetail, SiteFooter: SiteFooter,
  formatNaira: formatNaira, icons: Object.keys(ICONS)
};
