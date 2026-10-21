const products = [
 {id:1,name:"Classic Fudge",desc:"Deep chocolate, soft and fudgy.",price:180,type:"classic",tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85"},
 {id:2,name:"Walnut Wonder",desc:"Crunchy walnuts in rich chocolate.",price:220,type:"nutty",tag:"CUSTOMER FAVOURITE",image:"https://images.unsplash.com/photo-1589375025852-7c5a7b8a2e3b?auto=format&fit=crop&w=800&q=85"},
 {id:3,name:"Triple Chocolate",desc:"A little extra chocolate in every bite.",price:240,type:"special",tag:"CHOCOLATE LOVERS",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85"},
 {id:4,name:"Caramel Swirl",desc:"Silky caramel ribbons and cocoa.",price:230,type:"special",tag:"SIGNATURE",image:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=85"},
 {id:5,name:"Hazelnut Crunch",desc:"Toasty hazelnuts with a chocolate finish.",price:250,type:"nutty",tag:"NUTTY & NICE",image:"https://images.unsplash.com/photo-1589375025852-7c5a7b8a2e3b?auto=format&fit=crop&w=800&q=85"},
 {id:6,name:"Double Cocoa",desc:"Bold cocoa flavour, tender centre.",price:200,type:"classic",tag:"CLASSIC",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85"},
 {id:7,name:"Birthday Brownie Box",desc:"A sweet box made for celebrations.",price:599,type:"special",tag:"GIFT PICK",image:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=85"},
 {id:8,name:"Mini Brownie Bites",desc:"Little bites, big brownie happiness.",price:349,type:"classic",tag:"SHAREABLE",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85"}
];
let cart = [];
const money = n => "₹" + n.toLocaleString("en-IN");
function productCard(p){return `<article class="product-card"><div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-meta"><span>${money(p.price)}</span><span>★★★★★</span></div></div></article>`}
const featured = document.getElementById("featuredProducts");
if(featured) featured.innerHTML = products.slice(0,4).map(productCard).join("");
const allProducts = document.getElementById("allProducts");
function renderProducts(type="all", query=""){
 if(!allProducts)return;
 const filtered=products.filter(p=>(type==="all"||p.type===type)&&`${p.name} ${p.desc}`.toLowerCase().includes(query.toLowerCase()));
 allProducts.innerHTML=filtered.length?filtered.map(productCard).join():'<p class="no-results">No brownies found. Try another search.</p>';
}
if(allProducts){
 const params=new URLSearchParams(location.search);const initial=params.get("type")||"all";
 renderProducts(initial);
 document.querySelectorAll("[data-filter]").forEach(btn=>{btn.classList.toggle("active",btn.dataset.filter===initial);btn.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProducts(btn.dataset.filter,document.getElementById("productSearch")?.value||"");});});
 document.getElementById("productSearch")?.addEventListener("input",e=>{const active=document.querySelector("[data-filter].active");renderProducts(active?.dataset.filter||"all",e.target.value);});
}
function updateCart(){
 const count=cart.reduce((sum,item)=>sum+item.qty,0);const countEl=document.getElementById("cartCount");if(countEl)countEl.textContent=count;
 const itemsEl=document.getElementById("cartItems");if(itemsEl){itemsEl.innerHTML=cart.length?cart.map(item=>`<div class="cart-item"><img src="${item.image}" alt=""><div><strong>${item.name}</strong><small>${money(item.price)} each</small><div class="quantity-controls"><button data-qty="${item.id}" data-change="-1" aria-label="Remove one">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-change="1" aria-label="Add one">+</button></div></div><strong>${money(item.price*item.qty)}</strong></div>`).join(""):'<p class="empty-cart">Your bag is waiting for something sweet.</p>';}
 const total=cart.reduce((sum,item)=>sum+item.price*item.qty,0);const subtotal=document.getElementById("cartSubtotal");if(subtotal)subtotal.textContent=money(total);
}
function addToCart(id){const product=products.find(p=>p.id===Number(id));if(!product)return;const existing=cart.find(item=>item.id===product.id);if(existing)existing.qty++;else cart.push({...product,qty:1});updateCart();openCart();}
function openCart(){document.getElementById("cartDrawer")?.classList.add("open");document.getElementById("overlay")?.classList.add("show");document.getElementById("cartDrawer")?.setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cartDrawer")?.classList.remove("open");document.getElementById("overlay")?.classList.remove("show");document.getElementById("cartDrawer")?.setAttribute("aria-hidden","true");}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add)addToCart(add.dataset.add);
 const qty=e.target.closest("[data-qty]");if(qty){const item=cart.find(i=>i.id===Number(qty.dataset.qty));if(item){item.qty+=Number(qty.dataset.change);if(item.qty<=0)cart=cart.filter(i=>i.id!==item.id);updateCart();}}
});
document.getElementById("cartButton")?.addEventListener("click",openCart);document.getElementById("closeCart")?.addEventListener("click",closeCart);document.getElementById("overlay")?.addEventListener("click",closeCart);
document.getElementById("checkoutButton")?.addEventListener("click",()=>alert(cart.length?"Thanks for trying Brownie Bliss! This is a demo checkout, so no order or payment has been made.":"Your bag is empty — add a brownie first!"));
document.querySelector(".menu-toggle")?.addEventListener("click",()=>{const nav=document.querySelector(".nav-links");const open=nav.classList.toggle("open");document.querySelector(".menu-toggle").setAttribute("aria-expanded",String(open));document.querySelector(".menu-toggle").textContent=open?"✕":"☰";});
document.getElementById("newsletterForm")?.addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thank you! This demo form does not save email addresses.";e.target.reset();});
document.getElementById("contactForm")?.addEventListener("submit",e=>{e.preventDefault();document.getElementById("contactMessage").textContent="Thanks for reaching out! This demo form is not connected to an inbox yet.";e.target.reset();});
const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
