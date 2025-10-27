
// Simple cart logic shared across pages. Uses localStorage to persist demoCart.
// Images are loaded from source.unsplash.com (dynamic). For production host images locally.
window.demoCart = window.demoCart || (function(){
  const saved = localStorage.getItem('demoCart');
  const obj = saved ? JSON.parse(saved) : {items:{}};
  return {
    items: obj.items,
    save(){ localStorage.setItem('demoCart', JSON.stringify({items:this.items})); },
    add(id, qty=1){ this.items[id]=(this.items[id]||0)+qty; this.save(); renderCart(); },
    update(id, qty){ if(qty<=0) delete this.items[id]; else this.items[id]=qty; this.save(); renderCart(); },
    subtotal(){ const priceMap={gala:180,fuji:320,honeycrisp:450,granny:260}; return Object.entries(this.items).reduce((s,[id,q])=>s + (priceMap[id]||0)*q,0); }
  };
})();

function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }

function renderCart(){
  // update cart count badges
  const count = Object.values(window.demoCart.items || {}).reduce((s,v)=>s+v,0);
  document.querySelectorAll('#cart-count').forEach(el=>el.textContent = count);
  // products page preview
  const itemsRoot = document.getElementById('cart-items');
  if(itemsRoot){
    const entries = Object.entries(window.demoCart.items || {});
    if(entries.length===0){ itemsRoot.textContent='No items yet'; document.getElementById('cart-total').textContent = formatINR(0); return; }
    itemsRoot.innerHTML = '';
    entries.forEach(([id,q])=>{
      const p = document.createElement('div');
      p.textContent = q + '× ' + id;
      itemsRoot.appendChild(p);
    });
    document.getElementById('cart-total').textContent = formatINR(window.demoCart.subtotal());
  }
}

document.addEventListener('click', function(e){
  if(e.target.matches('.add-btn')){
    const id = e.target.dataset.product;
    window.demoCart.add(id,1);
    e.target.textContent = 'Added';
    setTimeout(()=> e.target.textContent='Add', 900);
  }
  if(e.target.matches('#view-cart-btn')){
    alert('Cart preview:\n' + (Object.keys(window.demoCart.items).length ? JSON.stringify(window.demoCart.items) : 'No items'));
  }
});

// initial render on load
document.addEventListener('DOMContentLoaded', renderCart);
