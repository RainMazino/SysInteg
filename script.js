const cashierName = "Claude D.";
const STORAGE_KEYS = {
  inventory: "chescas-collection-inventory-v1",
  receipts: "chescas-collection-receipts-v1"
};

const palettePairs = [
  ["#f8ede8", "#e3baba"],
  ["#fdf5f2", "#eccfc6"],
  ["#f2f0e9", "#d4c8b2"],
  ["#edf1ec", "#bacab4"],
  ["#fcf0f4", "#e4b1c1"],
  ["#f5efeb", "#d2bdae"],
  ["#f0eff6", "#bcb6d4"],
  ["#eff4f3", "#a8c2bc"],
  ["#f9f2ec", "#e0bfa3"],
  ["#f9ecec", "#dfb3b3"]
];

const categoryConfigs = [
  {
    category: "Tops",
    size: "XS-L",
    basePrice: 720,
    names: [
      "Satin Blouse", "Ribbed Knit Top", "Square Neck Blouse", "Lace Sleeve Top", "Soft Linen Polo",
      "Ruched Crop Blouse", "Pearl Button Shirt", "Wrap Front Top", "Pleated Sleeve Tee", "Classic Cami",
      "Silk Collar Blouse", "Printed Peplum Top", "Basic Fitted Tee", "Off-Shoulder Knit", "Flounce Hem Blouse"
    ]
  },
  {
    category: "Bottoms",
    size: "S-L",
    basePrice: 980,
    names: [
      "Pleated Skirt", "Wide Leg Pants", "Tailored Shorts", "Denim Skort", "High Waist Trousers",
      "A-Line Midi Skirt", "Linen Culottes", "Belted Shorts", "Straight Cut Jeans", "Flare Slacks",
      "Button Front Skirt", "Soft Lounge Pants", "Cargo Skirt", "Paperbag Trousers", "Classic Pencil Skirt"
    ]
  },
  {
    category: "Dresses",
    size: "S-L",
    basePrice: 1480,
    names: [
      "Floral Midi Dress", "Linen Wrap Dress", "Tiered Maxi Dress", "Ruched Day Dress", "Corset Midi Dress",
      "Puff Sleeve Dress", "Satin Slip Dress", "Polka Tea Dress", "Square Neck Dress", "Pleated Occasion Dress",
      "Ruffle Hem Dress", "Soft Shirt Dress", "Garden Party Dress", "Minimal Shift Dress", "Ribbon Waist Dress"
    ]
  },
  {
    category: "Outerwear",
    size: "M-L",
    basePrice: 1240,
    names: [
      "Soft Blazer", "Knit Cardigan", "Cropped Jacket", "Longline Blazer", "Linen Cover Up",
      "Pocket Cardigan", "Utility Jacket", "Relaxed Trench", "Button Knit Coat", "Pastel Shrug",
      "Belted Blazer", "Denim Jacket", "Textured Cardigan", "Short Trench", "Classic Cover Coat"
    ]
  },
  {
    category: "Sets",
    size: "M-L",
    basePrice: 1880,
    names: [
      "Linen Co-ord Set", "Casual Lounge Set", "Pleated Day Set", "Tailored Vest Set", "Weekend Shorts Set",
      "Resort Skirt Set", "Soft Knit Set", "Minimal Trousers Set", "Satin Dinner Set", "Office Capsule Set",
      "Wrap Top Set", "Monochrome Set", "Relaxed Travel Set", "Floral Matching Set", "Premium Occasion Set"
    ]
  },
  {
    category: "Accessories",
    size: "One Size",
    basePrice: 420,
    names: [
      "Mini Handbag", "Pearl Necklace", "Silk Scarf", "Gold Belt", "Charm Bracelet",
      "Hair Claw", "Stud Earrings", "Statement Earrings", "Mini Wallet", "Chain Bag",
      "Bucket Hat", "Fashion Shades", "Crystal Brooch", "Ribbon Hairband", "Layered Necklace"
    ]
  },
  {
    category: "Footwear",
    size: "36-40",
    basePrice: 1180,
    names: [
      "Pearl Heels", "Slide Sandals", "Block Heel Pumps", "Wedge Sandals", "Classic Flats",
      "Strappy Heels", "Soft Mules", "Platform Sandals", "Loafer Heels", "Ribbon Flats",
      "Open Toe Heels", "Daily Sneakers", "Pointed Pumps", "Summer Espadrilles", "Comfort Sandals"
    ]
  }
];

function storageAvailable() {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch (error) {
    return false;
  }
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function silhouetteByCategory(category) {
  switch (category) {
    case "Tops":
      return '<path d="M76 54c10-8 20-12 44-12s34 4 44 12l-12 22-16-6v48H104V70l-16 6-12-22z" fill="rgba(255,255,255,0.92)"/>';
    case "Bottoms":
      return '<path d="M94 42h52l10 80h-24l-6-34-6 34H96l-6-34-6 34H60l10-80h24z" fill="rgba(255,255,255,0.92)"/>';
    case "Dresses":
      return '<path d="M104 34h32l8 18-8 12 22 60H82l22-60-8-12 8-18z" fill="rgba(255,255,255,0.92)"/>';
    case "Outerwear":
      return '<path d="M88 34h64l20 28-14 14-14-8v58h-48V68l-14 8-14-14 20-28z" fill="rgba(255,255,255,0.92)"/>';
    case "Sets":
      return '<path d="M78 44c12-8 20-10 42-10s30 2 42 10l-10 18-18-8v34h-28V54l-18 8-10-18zm20 54h44l10 40H88l10-40z" fill="rgba(255,255,255,0.92)"/>';
    case "Accessories":
      return '<path d="M92 72c0-20 12-34 28-34s28 14 28 34v8h10v42H82V80h10v-8zm16 0h24c0-11-5-18-12-18s-12 7-12 18z" fill="rgba(255,255,255,0.92)"/>';
    case "Footwear":
      return '<path d="M64 96h38c8 0 16 4 22 10l12 12h40v14H52c0-17 5-28 12-36z" fill="rgba(255,255,255,0.92)"/><path d="M102 92h38c8 0 16 4 22 10l12 12h14v14h-98c0-12 4-24 12-36z" fill="rgba(255,255,255,0.78)"/>';
    default:
      return '<circle cx="120" cy="84" r="34" fill="rgba(255,255,255,0.9)"/>';
  }
}

function createProductImage(product) {
  const title = escapeXml(product.name);
  const category = escapeXml(product.category);
  const size = escapeXml(product.size);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${product.colorA}" />
          <stop offset="100%" stop-color="${product.colorB}" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" rx="22" fill="url(#g)" />
      <circle cx="192" cy="34" r="32" fill="rgba(255,255,255,0.18)" />
      <circle cx="48" cy="152" r="26" fill="rgba(255,255,255,0.12)" />
      ${silhouetteByCategory(product.category)}
      <rect x="14" y="136" width="212" height="30" rx="12" fill="rgba(255,255,255,0.82)" />
      <text x="24" y="152" font-family="Manrope, Arial, sans-serif" font-size="13" font-weight="700" fill="#1f2d3d">${title}</text>
      <text x="24" y="115" font-family="Manrope, Arial, sans-serif" font-size="11" font-weight="600" fill="rgba(31,45,61,0.68)">${category} | ${size}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function badgeFor(index, stock) {
  if (stock <= 3) {
    return "Low Stock";
  }
  const badges = ["Top Pick", "New", "Popular", "Premium", "Fast"];
  return badges[index % badges.length];
}

function generateProducts() {
  let id = 1;
  return categoryConfigs.flatMap((config, categoryIndex) =>
    config.names.map((name, itemIndex) => {
      const pair = palettePairs[(categoryIndex * 3 + itemIndex) % palettePairs.length];
      const stock = 3 + ((categoryIndex + itemIndex * 2) % 9);
      const sold = 1 + ((categoryIndex * 2 + itemIndex) % 8);
      const product = {
        id,
        name,
        category: config.category,
        size: config.size,
        price: config.basePrice + itemIndex * 55 + categoryIndex * 35,
        stock,
        sold,
        badge: badgeFor(itemIndex, stock),
        colorA: pair[0],
        colorB: pair[1]
      };
      product.image = createProductImage(product);
      id += 1;
      return product;
    })
  );
}

const products = generateProducts();

const paymentMethods = ["Cash", "Card", "GCash"];
const categories = ["All Items", ...categoryConfigs.map((config) => config.category)];

function hydrateInventory() {
  if (!storageAvailable()) {
    return;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.inventory);
    if (!raw) {
      return;
    }

    const snapshot = JSON.parse(raw);
    const byId = new Map(snapshot.map((item) => [item.id, item]));
    products.forEach((product) => {
      const stored = byId.get(product.id);
      if (stored) {
        product.stock = stored.stock;
        product.sold = stored.sold;
      }
    });
  } catch (error) {
    console.error("Failed to hydrate inventory", error);
  }
}

function loadReceipts() {
  if (!storageAvailable()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.receipts);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to load receipts", error);
    return [];
  }
}

hydrateInventory();

const state = {
  activeCategory: "All Items",
  activeView: "pos",
  searchTerm: "",
  inventorySearchTerm: "",
  paymentMethod: "Cash",
  cart: [{ productId: 16, quantity: 1 }, { productId: 35, quantity: 1 }],
  receipts: loadReceipts(),
  selectedReceiptId: null,
  toastTimer: null
};

state.selectedReceiptId = state.receipts[0] ? state.receipts[0].id : null;

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP"
});

const filterRow = document.getElementById("filterRow");
const posView = document.getElementById("posView");
const inventoryView = document.getElementById("inventoryView");
const posViewButton = document.getElementById("posViewButton");
const inventoryViewButton = document.getElementById("inventoryViewButton");
const searchInput = document.getElementById("searchInput");
const inventorySearchInput = document.getElementById("inventorySearchInput");
const catalogGrid = document.getElementById("catalogGrid");
const cartList = document.getElementById("cartList");
const itemCountChip = document.getElementById("itemCountChip");
const subtotalValue = document.getElementById("subtotalValue");
const discountValue = document.getElementById("discountValue");
const taxValue = document.getElementById("taxValue");
const totalValue = document.getElementById("totalValue");
const paymentOptions = document.getElementById("paymentOptions");
const checkoutButton = document.getElementById("checkoutButton");
const clearCartButton = document.getElementById("clearCartButton");
const checkoutNote = document.getElementById("checkoutNote");
const inventoryList = document.getElementById("inventoryList");
const inventoryStats = document.getElementById("inventoryStats");
const restockAllButton = document.getElementById("restockAllButton");
const receiptHistory = document.getElementById("receiptHistory");
const historyCount = document.getElementById("historyCount");
const exportReceiptsButton = document.getElementById("exportReceiptsButton");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const receiptModal = document.getElementById("receiptModal");
const receiptModalBody = document.getElementById("receiptModalBody");
const closeReceiptButton = document.getElementById("closeReceiptButton");
const printReceiptButton = document.getElementById("printReceiptButton");
const newSaleButton = document.getElementById("newSaleButton");
const toast = document.getElementById("toast");
const searchButton = document.getElementById("searchButton");
const barcodeButton = document.getElementById("barcodeButton");
const clock = document.getElementById("clock");
const productCount = document.getElementById("productCount");

function formatCurrency(value) {
  return currency.format(value);
}

function persistInventory() {
  if (!storageAvailable()) {
    return;
  }

  const payload = products.map((product) => ({
    id: product.id,
    stock: product.stock,
    sold: product.sold
  }));

  window.localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify(payload));
}

function persistReceipts() {
  if (!storageAvailable()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEYS.receipts, JSON.stringify(state.receipts));
}

function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

function getCartLine(productId) {
  return state.cart.find((line) => line.productId === productId);
}

function cartQuantity(productId) {
  const line = getCartLine(productId);
  return line ? line.quantity : 0;
}

function availableToAdd(productId) {
  const product = getProduct(productId);
  return product.stock - cartQuantity(productId);
}

function selectedReceipt() {
  return state.receipts.find((receipt) => receipt.id === state.selectedReceiptId) || null;
}

function filteredProducts() {
  return products.filter((product) => {
    const matchesCategory = state.activeCategory === "All Items" || product.category === state.activeCategory;
    const haystack = `${product.name} ${product.category} ${product.size}`.toLowerCase();
    const matchesSearch = haystack.includes(state.searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function filteredInventory() {
  return products.filter((product) => {
    const haystack = `${product.name} ${product.category}`.toLowerCase();
    return haystack.includes(state.inventorySearchTerm.toLowerCase());
  });
}

function cartDetails() {
  return state.cart.map((line) => {
    const product = getProduct(line.productId);
    return {
      ...line,
      product,
      lineTotal: product.price * line.quantity
    };
  });
}

function computeSummary() {
  const lines = cartDetails();
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const discount = itemCount >= 3 ? subtotal * 0.05 : 0;
  const taxable = subtotal - discount;
  const tax = taxable * 0.12;
  const total = taxable + tax;
  return { subtotal, discount, tax, total, itemCount };
}

function setFeedback(message) {
  checkoutNote.textContent = message;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function setActiveView(view) {
  state.activeView = view;
  const isInventory = view === "inventory";
  posView.classList.toggle("active", !isInventory);
  inventoryView.classList.toggle("active", isInventory);
  posViewButton.classList.toggle("active", !isInventory);
  inventoryViewButton.classList.toggle("active", isInventory);
  filterRow.classList.toggle("hidden", isInventory);
}

function openReceiptModal() {
  if (!selectedReceipt()) {
    showToast("No receipt selected.");
    return;
  }
  receiptModal.classList.remove("hidden");
  receiptModal.setAttribute("aria-hidden", "false");
}

function closeReceiptModal() {
  receiptModal.classList.add("hidden");
  receiptModal.setAttribute("aria-hidden", "true");
}

function renderFilters() {
  filterRow.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button ${state.activeCategory === category ? "active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      state.activeCategory = category;
      renderFilters();
      renderCatalog();
      showToast(`Viewing ${category}.`);
    });
    filterRow.appendChild(button);
  });
}

function stockBadgeClass(stock) {
  if (stock < 5) {
    return "stock-badge low";
  }
  return "stock-badge";
}

function renderCatalog() {
  const visibleProducts = filteredProducts();
  catalogGrid.innerHTML = "";

  if (!visibleProducts.length) {
    catalogGrid.innerHTML = '<div class="empty-state">No matching products found. Try a different category or keyword.</div>';
    return;
  }

  visibleProducts.forEach((product) => {
    const remaining = availableToAdd(product.id);
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-visual">
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-copy">
        <h4>${product.name}</h4>
        <span class="product-price">${formatCurrency(product.price)}</span>
        <div class="product-meta">
          <span>${product.category}</span>
          <span>${product.size}</span>
        </div>
        <div class="product-stock-row">
          <span class="${stockBadgeClass(product.stock)}">Stock ${product.stock}</span>
          <button class="add-button" type="button" ${remaining <= 0 ? "disabled" : ""}>${remaining <= 0 ? "Unavailable" : "Add Item"}</button>
        </div>
      </div>
    `;

    card.querySelector(".add-button").addEventListener("click", () => addToCart(product.id));
    catalogGrid.appendChild(card);
  });
}

function renderCart() {
  const lines = cartDetails();
  cartList.innerHTML = "";

  if (!lines.length) {
    cartList.innerHTML = '<div class="empty-state">No items in the sale yet. Tap a product card to add it.</div>';
    return;
  }

  lines.forEach((line) => {
    const canIncrease = availableToAdd(line.productId) > 0;
    const item = document.createElement("article");
    item.className = "cart-item";
    item.innerHTML = `
      <div class="cart-main">
        <div>
          <strong>${line.product.name}</strong>
          <p class="cart-meta">${line.product.category} | Size ${line.product.size}</p>
        </div>
        <span class="line-total">${formatCurrency(line.lineTotal)}</span>
      </div>
      <div class="cart-controls">
        <div class="quantity-stepper">
          <button class="quantity-button" data-action="decrease" type="button">-</button>
          <strong>${line.quantity}</strong>
          <button class="quantity-button" data-action="increase" type="button" ${canIncrease ? "" : "disabled"}>+</button>
        </div>
        <button class="secondary-action" data-action="remove" type="button">Remove</button>
      </div>
    `;

    item.querySelector('[data-action="decrease"]').addEventListener("click", () => updateCartQuantity(line.productId, -1));
    item.querySelector('[data-action="increase"]').addEventListener("click", () => updateCartQuantity(line.productId, 1));
    item.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(line.productId));
    cartList.appendChild(item);
  });
}

function renderSummary() {
  const summary = computeSummary();
  itemCountChip.textContent = `${summary.itemCount} item${summary.itemCount === 1 ? "" : "s"}`;
  subtotalValue.textContent = formatCurrency(summary.subtotal);
  discountValue.textContent = formatCurrency(summary.discount);
  taxValue.textContent = formatCurrency(summary.tax);
  totalValue.textContent = formatCurrency(summary.total);
}

function renderPayments() {
  paymentOptions.innerHTML = "";
  paymentMethods.forEach((method) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `payment-button ${state.paymentMethod === method ? "active" : ""}`;
    button.textContent = method;
    button.addEventListener("click", () => {
      state.paymentMethod = method;
      renderPayments();
      setFeedback(`Payment method changed to ${method}.`);
      showToast(`Payment set to ${method}.`);
    });
    paymentOptions.appendChild(button);
  });
}

function renderInventory() {
  const inventoryItems = filteredInventory();
  inventoryList.innerHTML = "";

  if (!inventoryItems.length) {
    inventoryList.innerHTML = '<div class="empty-state">No stock items match the current inventory search.</div>';
    return;
  }

  inventoryItems.forEach((product) => {
    const reserved = cartQuantity(product.id);
    const item = document.createElement("article");
    item.className = "inventory-item";
    item.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <div class="inventory-meta">
          <span>${product.category}</span>
          <span>Stock ${product.stock}</span>
          <span>Sold ${product.sold}</span>
          <span>Reserved ${reserved}</span>
        </div>
      </div>
      <div class="inventory-controls">
        <button class="inventory-button decrease-button" data-action="decrease" type="button" ${product.stock - 1 < reserved ? "disabled" : ""}>-1</button>
        <button class="inventory-button increase-button" data-action="increase" type="button">+1</button>
        <span class="inventory-count">${product.stock}</span>
        <div class="inventory-add-group">
          <input class="inventory-number" data-role="amount" type="number" min="1" step="1" value="1">
          <button class="secondary-action" data-action="add" type="button">Add</button>
        </div>
      </div>
    `;

    item.querySelector('[data-action="decrease"]').addEventListener("click", () => adjustStock(product.id, -1));
    item.querySelector('[data-action="increase"]').addEventListener("click", () => adjustStock(product.id, 1));
    item.querySelector('[data-action="add"]').addEventListener("click", () => {
      const input = item.querySelector('[data-role="amount"]');
      const amount = Number.parseInt(input.value, 10);
      if (!Number.isFinite(amount) || amount <= 0) {
        setFeedback(`Enter a valid stock amount for ${product.name}.`);
        showToast("Invalid stock amount.");
        input.focus();
        return;
      }
      adjustStock(product.id, amount);
      input.value = "1";
    });
    inventoryList.appendChild(item);
  });
}

function renderInventoryStats() {
  const totalUnits = products.reduce((sum, product) => sum + product.stock, 0);
  const lowItems = products.filter((product) => product.stock <= 3).length;
  const outOfStock = products.filter((product) => product.stock <= 0).length;

  inventoryStats.innerHTML = `
    <div class="inventory-stat-card">
      <span>Total SKUs</span>
      <strong>${products.length}</strong>
    </div>
    <div class="inventory-stat-card">
      <span>Units On Hand</span>
      <strong>${totalUnits}</strong>
    </div>
    <div class="inventory-stat-card">
      <span>Low Stock</span>
      <strong>${lowItems}</strong>
    </div>
    <div class="inventory-stat-card">
      <span>Out Of Stock</span>
      <strong>${outOfStock}</strong>
    </div>
    <div class="inventory-stat-card">
      <span>Saved Receipts</span>
      <strong>${state.receipts.length}</strong>
    </div>
  `;
}

function receiptMarkup(receipt) {
  if (!receipt) {
    return '<div class="receipt-empty">Receipts will appear here after checkout or by selecting one from history.</div>';
  }

  return `
    <div class="receipt-brand">
      <strong>Chesca&apos;s Collection</strong>
      <p>Fashion POS Prototype</p>
    </div>
    <div class="receipt-meta">
      <span>Transaction ${receipt.id}</span>
      <span>${receipt.date}</span>
      <span>Cashier ${receipt.cashier}</span>
      <span>${receipt.paymentMethod}</span>
    </div>
    <div class="receipt-items">
      ${receipt.items.map((item) => `
        <div class="receipt-line">
          <span>${item.quantity} x ${item.name}</span>
          <strong>${formatCurrency(item.total)}</strong>
        </div>
      `).join("")}
    </div>
    <div class="receipt-line">
      <span>Subtotal</span>
      <strong>${formatCurrency(receipt.summary.subtotal)}</strong>
    </div>
    <div class="receipt-line">
      <span>Discount</span>
      <strong>${formatCurrency(receipt.summary.discount)}</strong>
    </div>
    <div class="receipt-line">
      <span>VAT</span>
      <strong>${formatCurrency(receipt.summary.tax)}</strong>
    </div>
    <div class="receipt-total">
      <span>Total</span>
      <strong>${formatCurrency(receipt.summary.total)}</strong>
    </div>
  `;
}

function renderReceipt() {
  const receipt = selectedReceipt();
  receiptModalBody.innerHTML = receiptMarkup(receipt);
}

function renderReceiptHistory() {
  receiptHistory.innerHTML = "";
  historyCount.textContent = `${state.receipts.length} receipt${state.receipts.length === 1 ? "" : "s"}`;

  if (!state.receipts.length) {
    receiptHistory.innerHTML = '<div class="empty-state">No saved receipts yet. Complete a checkout to create one.</div>';
    return;
  }

  state.receipts.forEach((receipt) => {
    const item = document.createElement("article");
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-item-header">
        <div>
          <strong>${receipt.id}</strong>
          <p>${receipt.date}</p>
        </div>
        <div class="history-item-actions">
          <button class="history-button ${state.selectedReceiptId === receipt.id ? "active" : ""}" data-action="view" type="button">View</button>
        </div>
      </div>
      <div class="inventory-meta">
        <span>${receipt.items.length} line items</span>
        <span>${receipt.paymentMethod}</span>
        <span>${formatCurrency(receipt.summary.total)}</span>
      </div>
    `;

    const selectReceipt = () => {
      state.selectedReceiptId = receipt.id;
      renderReceiptHistory();
      renderReceipt();
      openReceiptModal();
      showToast(`Viewing receipt ${receipt.id}.`);
    };

    item.addEventListener("click", selectReceipt);
    item.querySelector('[data-action="view"]').addEventListener("click", (event) => {
      event.stopPropagation();
      selectReceipt();
    });
    receiptHistory.appendChild(item);
  });
}

function addToCart(productId) {
  const remaining = availableToAdd(productId);
  const product = getProduct(productId);

  if (remaining <= 0) {
    setFeedback(`${product.name} has no available stock left for this sale.`);
    showToast(`${product.name} is already at stock limit.`);
    return;
  }

  const line = getCartLine(productId);
  if (line) {
    line.quantity += 1;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }

  setFeedback(`${product.name} added to the order.`);
  showToast(`${product.name} added.`);
  renderAll();
}

function updateCartQuantity(productId, delta) {
  const line = getCartLine(productId);
  const product = getProduct(productId);
  if (!line) {
    return;
  }

  if (delta > 0 && availableToAdd(productId) <= 0) {
    setFeedback(`No more stock available for ${product.name}.`);
    showToast("Stock limit reached.");
    return;
  }

  line.quantity += delta;
  if (line.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.productId !== productId);
    setFeedback(`${product.name} removed from the order.`);
    showToast(`${product.name} removed.`);
  } else {
    setFeedback(`${product.name} quantity updated to ${line.quantity}.`);
    showToast("Order quantity updated.");
  }

  renderAll();
}

function removeFromCart(productId) {
  const product = getProduct(productId);
  state.cart = state.cart.filter((entry) => entry.productId !== productId);
  setFeedback(`${product.name} removed from the order.`);
  showToast(`${product.name} removed.`);
  renderAll();
}

function clearSale() {
  if (!state.cart.length) {
    setFeedback("Cart is already empty.");
    showToast("Nothing to clear.");
    return;
  }

  state.cart = [];
  setFeedback("Current sale cleared.");
  showToast("Sale cleared.");
  renderAll();
}

function adjustStock(productId, delta) {
  const product = getProduct(productId);
  const reserved = cartQuantity(productId);
  const nextStock = product.stock + delta;

  if (nextStock < reserved || nextStock < 0) {
    setFeedback(`Cannot reduce ${product.name} below reserved quantity.`);
    showToast("Stock change blocked.");
    return;
  }

  product.stock = nextStock;
  persistInventory();
  setFeedback(`${product.name} stock updated to ${product.stock}.`);
  showToast(`${product.name} stock updated.`);
  renderAll();
}

function restockLowItems() {
  const lowItems = products.filter((product) => product.stock <= 3);
  if (!lowItems.length) {
    setFeedback("No low stock items need restocking.");
    showToast("Inventory already healthy.");
    return;
  }

  lowItems.forEach((product) => {
    product.stock += 1;
  });

  persistInventory();
  setFeedback(`${lowItems.length} low stock item${lowItems.length === 1 ? "" : "s"} restocked by 1.`);
  showToast("Low stock items incremented by 1.");
  renderAll();
}

function completeCheckout() {
  const lines = cartDetails();
  const summary = computeSummary();

  if (!lines.length) {
    setFeedback("Add items first before proceeding to payment.");
    showToast("Cart is empty.");
    return;
  }

  lines.forEach((line) => {
    line.product.stock -= line.quantity;
    line.product.sold += line.quantity;
  });

  const timestamp = new Date();
  const receipt = {
    id: `CC-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    cashier: cashierName,
    paymentMethod: state.paymentMethod,
    date: new Intl.DateTimeFormat("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(timestamp),
    items: lines.map((line) => ({
      name: line.product.name,
      quantity: line.quantity,
      total: line.lineTotal
    })),
    summary
  };

  state.receipts.unshift(receipt);
  state.selectedReceiptId = receipt.id;
  state.cart = [];
  persistInventory();
  persistReceipts();
  setFeedback(`Transaction ${receipt.id} completed successfully.`);
  showToast("Checkout complete. Receipt saved locally.");
  renderAll();
  openReceiptModal();
}

function exportReceipts() {
  if (!state.receipts.length) {
    showToast("No receipts to export.");
    return;
  }

  const json = JSON.stringify(state.receipts, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "chescas-collection-receipts.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Receipt JSON exported.");
}

function clearReceiptHistory() {
  if (!state.receipts.length) {
    showToast("Receipt history is already empty.");
    return;
  }

  state.receipts = [];
  state.selectedReceiptId = null;
  persistReceipts();
  showToast("Receipt history cleared.");
  renderAll();
}

function updateClock() {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    hour: "numeric",
    minute: "2-digit"
  });
  clock.textContent = formatter.format(new Date());
}

function renderAll() {
  productCount.textContent = String(products.length);
  setActiveView(state.activeView);
  renderCatalog();
  renderCart();
  renderSummary();
  renderPayments();
  renderInventory();
  renderInventoryStats();
  renderReceiptHistory();
  renderReceipt();
}

searchInput.addEventListener("input", (event) => {
  state.searchTerm = event.target.value.trim();
  renderCatalog();
});

inventorySearchInput.addEventListener("input", (event) => {
  state.inventorySearchTerm = event.target.value.trim();
  renderInventory();
});

posViewButton.addEventListener("click", () => {
  setActiveView("pos");
  showToast("Switched to POS view.");
});

inventoryViewButton.addEventListener("click", () => {
  setActiveView("inventory");
  showToast("Switched to Inventory Management.");
});

searchButton.addEventListener("click", () => {
  searchInput.focus();
  setFeedback("Search input focused.");
  showToast("Type to filter products.");
});

barcodeButton.addEventListener("click", () => {
  setFeedback("Barcode scanner is not connected in this prototype.");
  showToast("Barcode feature is mocked.");
});

checkoutButton.addEventListener("click", completeCheckout);
clearCartButton.addEventListener("click", clearSale);
restockAllButton.addEventListener("click", restockLowItems);
closeReceiptButton.addEventListener("click", closeReceiptModal);
exportReceiptsButton.addEventListener("click", exportReceipts);
clearHistoryButton.addEventListener("click", clearReceiptHistory);
newSaleButton.addEventListener("click", () => {
  closeReceiptModal();
  setFeedback("Ready for a new sale.");
  showToast("New sale started.");
});
printReceiptButton.addEventListener("click", () => {
  if (!selectedReceipt()) {
    showToast("No receipt available.");
    return;
  }
  showToast(`Receipt ${selectedReceipt().id} prepared for printing.`);
  window.print();
});

receiptModal.addEventListener("click", (event) => {
  if (event.target === receiptModal) {
    closeReceiptModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeReceiptModal();
  }
});

renderFilters();
renderAll();
updateClock();
setInterval(updateClock, 30000);
