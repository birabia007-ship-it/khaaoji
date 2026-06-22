import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const KhaaoJi = () => {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('cities');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const cities = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad',
    'Peshawar', 'Quetta', 'Hyderabad', 'Sukkur', 'Gujranwala', 'Sialkot',
    'Sargodha', 'Bahawalpur', 'Dera Ghazi Khan', 'Mardan', 'Abbottabad',
    'Jhang', 'Kasur', 'Okara', 'Sahiwal', 'Hafizabad', 'Mandi Bahauddin',
    'Mirpur Khas', 'Nawabshah', 'Shikarpur', 'Jacobabad', 'Larkana',
    'Khuzdar', 'Loralai', 'Zhob', 'Kohat', 'Bannu', 'Karak', 'Charsadda',
    'Swabi', 'Buner', 'Chitral', 'Dir', 'Swat', 'Mingora'
  ];

  const shopsByCity = {
    'Lahore': [
      { id: 1, name: 'Campus Canteen LGU', type: 'Campus', rating: 4.8, time: '10 mins', items: ['Nihari', 'Biryani', 'Chai', 'Samosas'] },
      { id: 2, name: 'Authentic Dhaba', type: 'Dhaba', rating: 4.6, time: '15 mins', items: ['Haleem', 'Karahi', 'Roti', 'Lassi'] },
      { id: 3, name: 'Home Cooked Meals', type: 'Home Cook', rating: 4.9, time: '12 mins', items: ['Aloo Paratha', 'Daal', 'Raita'] },
    ],
    'Karachi': [
      { id: 4, name: 'Beach Biryani Hub', type: 'Restaurant', rating: 4.7, time: '13 mins', items: ['Sindhi Biryani', 'Seekh Kebab', 'Naan'] },
      { id: 5, name: 'Local Student Cafe', type: 'Campus', rating: 4.5, time: '11 mins', items: ['Chai', 'Pakora', 'Burger'] },
    ],
    'Islamabad': [
      { id: 6, name: 'Campus Eatery IIU', type: 'Campus', rating: 4.8, time: '10 mins', items: ['Malai Boti', 'Paaye', 'Roti'] },
      { id: 7, name: 'Auntie\'s Kitchen', type: 'Home Cook', rating: 4.9, time: '8 mins', items: ['Halwa Puri', 'Aloo Sabzi'] },
    ],
  };

  const menuItems = {
    1: [
      { id: 101, name: 'Nihari', price: 350, desc: 'Traditional beef nihari' },
      { id: 102, name: 'Biryani', price: 450, desc: 'Fragrant rice with meat' },
      { id: 103, name: 'Samosa', price: 50, desc: '2 pieces' },
    ],
    2: [
      { id: 201, name: 'Chicken Haleem', price: 400, desc: 'Slow-cooked goodness' },
      { id: 202, name: 'Karahi', price: 480, desc: 'Spicy karahi with naan' },
      { id: 203, name: 'Lassi', price: 100, desc: 'Sweet yogurt drink' },
    ],
    3: [
      { id: 301, name: 'Aloo Paratha', price: 120, desc: 'Stuffed flatbread' },
      { id: 302, name: 'Daal with Rice', price: 150, desc: 'Simple & healthy' },
      { id: 303, name: 'Raita', price: 50, desc: 'Yogurt side' },
    ],
    4: [
      { id: 401, name: 'Sindhi Biryani', price: 500, desc: 'Authentic sindhi style' },
      { id: 402, name: 'Seekh Kebab', price: 350, desc: '4 pieces with chutney' },
    ],
    5: [
      { id: 501, name: 'Chai', price: 40, desc: 'Hot chai cup' },
      { id: 502, name: 'Samosa Chaat', price: 150, desc: 'With yogurt & chutney' },
    ],
    6: [
      { id: 601, name: 'Malai Boti', price: 420, desc: 'Creamy chicken skewers' },
      { id: 602, name: 'Paaye', price: 380, desc: 'Traditional trotters' },
    ],
    7: [
      { id: 701, name: 'Halwa Puri', price: 200, desc: 'Breakfast special' },
      { id: 702, name: 'Aloo Sabzi', price: 180, desc: 'Potato curry' },
    ],
  };

  const translations = {
    en: {
      appName: 'KhaaoJi',
      tagline: 'Your City\'s Food, Your Speed',
      selectCity: 'Select Your City',
      search: 'Search',
      shops: 'Shops',
      campus: 'Campus',
      dhaba: 'Dhaba',
      homeCook: 'Home Cook',
      rating: 'Rating',
      delivery: 'Delivery',
      addToCart: 'Add to Cart',
      cart: 'Cart',
      checkout: 'Checkout',
      placeOrder: 'Place Order',
      orderConfirmed: 'Order Confirmed!',
      orderDetails: 'Your order has been confirmed',
      trackOrder: 'Track Order',
      continueOrdering: 'Continue Ordering',
      items: 'items',
      total: 'Total',
      emptyCart: 'Your cart is empty',
    },
    ur: {
      appName: 'کھاؤ جی',
      tagline: 'اپنے شہر کا کھانا، تیز ڈیلیوری',
      selectCity: 'اپنا شہر منتخب کریں',
      search: 'تلاش',
      shops: 'دکانیں',
      campus: 'کیمپس',
      dhaba: 'ڈھابہ',
      homeCook: 'گھر کا کھانا',
      rating: 'ریٹنگ',
      delivery: 'ڈیلیوری',
      addToCart: 'کارٹ میں شامل کریں',
      cart: 'کارٹ',
      checkout: 'چیک آؤٹ',
      placeOrder: 'آرڈر دیں',
      orderConfirmed: 'آرڈر تصدیق شدہ!',
      orderDetails: 'آپ کا آرڈر تصدیق ہو گیا',
      trackOrder: 'آرڈر ٹریک کریں',
      continueOrdering: 'آرڈر جاری رکھیں',
      items: 'اشیاء',
      total: 'کل',
      emptyCart: 'آپ کا کارٹ خالی ہے',
    },
  };

  const t = translations[language];

  const addToCart = (item, shopId) => {
    const newItem = { ...item, shopId, cartId: Math.random() };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    setOrderConfirmed(true);
  };

  const handleContinue = () => {
    setOrderConfirmed(false);
    setCart([]);
    setSelectedShop(null);
    setSelectedCity(null);
    setCurrentPage('cities');
  };

  return (
    <div style={{ fontFamily: 'var(--font-sans)', backgroundColor: 'var(--color-background-tertiary)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-background-primary)', borderBottom: '0.5px solid var(--color-border-tertiary)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 500, color: '#0F6E56' }}>{t.appName}</h1>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>{t.tagline}</p>
        </div>
        <button onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')} style={{ padding: '8px 12px', fontSize: '12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'transparent', cursor: 'pointer' }}>
          {language === 'en' ? 'اردو' : 'English'}
        </button>
      </div>

      {/* City Selection */}
      {currentPage === 'cities' && !selectedCity && (
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px', color: 'var(--color-text-primary)' }}>{t.selectCity}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => { setSelectedCity(city); setCurrentPage('shops'); }}
                style={{
                  padding: '12px',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  backgroundColor: 'var(--color-background-primary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text-primary)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-background-secondary)'; e.target.style.borderColor = 'var(--color-border-secondary)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--color-background-primary)'; e.target.style.borderColor = 'var(--color-border-tertiary)'; }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shops Listing */}
      {currentPage === 'shops' && selectedCity && !selectedShop && (
        <div style={{ padding: '24px' }}>
          <button onClick={() => { setSelectedCity(null); setCurrentPage('cities'); }} style={{ marginBottom: '16px', padding: '8px 12px', fontSize: '12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'transparent', cursor: 'pointer' }}>
            ← {t.selectCity}
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px', color: 'var(--color-text-primary)' }}>{t.shops} in {selectedCity}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(shopsByCity[selectedCity] || []).map((shop) => (
              <div
                key={shop.id}
                onClick={() => setSelectedShop(shop)}
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{shop.name}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    <span>{shop.type}</span>
                    <span>⭐ {shop.rating}</span>
                    <span>🕐 {shop.time}</span>
                  </div>
                </div>
                <div style={{ fontSize: '18px' }}>→</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items */}
      {currentPage === 'shops' && selectedShop && !orderConfirmed && (
        <div style={{ padding: '24px' }}>
          <button onClick={() => setSelectedShop(null)} style={{ marginBottom: '16px', padding: '8px 12px', fontSize: '12px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'transparent', cursor: 'pointer' }}>
            ← {selectedShop.name}
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px', color: 'var(--color-text-primary)' }}>{t.shops}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {(menuItems[selectedShop.id] || []).map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>₨{item.price}</span>
                  <button onClick={() => addToCart(item, selectedShop.id)} style={{ padding: '6px 10px', fontSize: '11px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', backgroundColor: '#0F6E56', color: 'white', cursor: 'pointer', fontWeight: '500' }}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div style={{ backgroundColor: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '16px', position: 'sticky', bottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{cart.length} {t.items}</span>
                <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--color-text-primary)' }}>₨{totalPrice}</span>
              </div>
              <button onClick={() => setCurrentPage('checkout')} style={{ width: '100%', padding: '12px', backgroundColor: '#0F6E56', color: 'white', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
                {t.checkout}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Checkout */}
      {currentPage === 'checkout' && !orderConfirmed && (
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px', color: 'var(--color-text-primary)' }}>{t.checkout}</h2>
          <div style={{ backgroundColor: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '16px', marginBottom: '24px' }}>
            {cart.map((item) => (
              <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{item.name}</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>₨{item.price}</span>
                  <button onClick={() => removeFromCart(item.cartId)} style={{ fontSize: '12px', color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none' }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: '500', fontSize: '15px', borderTop: '0.5px solid var(--color-border-secondary)', marginTop: '8px' }}>
              <span>{t.total}</span>
              <span>₨{totalPrice}</span>
            </div>
          </div>
          <button onClick={() => setCurrentPage('shops')} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '14px', marginBottom: '12px' }}>
            {t.search}
          </button>
          <button onClick={handlePlaceOrder} style={{ width: '100%', padding: '12px', backgroundColor: '#0F6E56', color: 'white', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
            {t.placeOrder}
          </button>
        </div>
      )}

      {/* Order Confirmation */}
      {orderConfirmed && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✓</div>
          <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '8px', color: 'var(--color-text-primary)' }}>{t.orderConfirmed}</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>{t.orderDetails}</p>
          <div style={{ backgroundColor: 'var(--color-background-secondary)', padding: '16px', borderRadius: 'var(--border-radius-lg)', marginBottom: '24px', width: '100%', maxWidth: '300px' }}>
            <p style={{ margin: '8px 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>{selectedShop.name}</p>
            <p style={{ margin: '8px 0', fontSize: '13px', color: 'var(--color-text-secondary)' }}>{selectedCity}</p>
            <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: '500', color: 'var(--color-text-primary)' }}>₨{totalPrice}</p>
          </div>
          <button onClick={() => { alert(language === 'en' ? 'Tracking feature coming soon!' : 'ٹریکنگ فیچر جلد آ رہا ہے!'); }} style={{ width: '100%', maxWidth: '300px', padding: '12px', backgroundColor: '#0F6E56', color: 'white', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '14px', marginBottom: '12px' }}>
            {t.trackOrder}
          </button>
          <button onClick={handleContinue} style={{ width: '100%', maxWidth: '300px', padding: '12px', backgroundColor: 'transparent', color: 'var(--color-text-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
            {t.continueOrdering}
          </button>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<KhaaoJi />);
