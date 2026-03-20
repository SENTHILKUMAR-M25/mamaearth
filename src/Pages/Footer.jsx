import React from 'react';
import { ShieldCheck, Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

const FooterInfo = () => {
  const paymentLogos = [
    { name: "UPI", url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
    { name: "PhonePe", url: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" },
    { name: "Paytm", url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" },
    { name: "Visa", url: "data:image/png;base64,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" },
    { name: "Mastercard", url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { name: "Amex", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkbha3sknhA2sarPqwnmRwCiM64LlfEicQHtxOaJxX5o8aont3jFsnMQ&s" },
    { name: "RuPay", url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAA/FBMVEX///84Ko2AgICMjIx9fX3i4uLsawAdhUYeAITGxNrAvNiZlL81JowQAIEwIIoqGIgkDoYtHInu7fRDN5Lm5e7sZgD19PgAgDuvq82RjbmJg7YhCIX7+v1cUZ/OzOB+d7A/MZFPRJh1bqvrXwAAh0rX1eYAezFoYKNwaKj75tqloMbz9/VjWqIAAHfvhVDe3end6uFnpHurq6u9vb3Nzc3wkmZ+s5HL3tLsayT2v6L1t5a/2Mfyn3mhxq7tdzn+9fD4zbtCkl3ddyleiEgAcRSQdy7abQ4+g0LzrITqUQCedinMcBjGdSL52MW7diZ3fDN4h0jAvaDueSpUm2wCFwxPAAAIp0lEQVR4nO1caXfbNhalZqYSN3AnTVGUKMqRJTNKZDcTp7XTyt0ySWYyS/P//8sABN4DaFO1PW5qew7uhyiCBODyLfc9wOfI+PNTgvGnpwTN9stBs/1yMP7ylGA8tCjdCcZXTwmGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhobG08CT+ute9vVDM7gLXr2i/2Qz6ypmy+z2iyTXplvL8guQLb9mpCzfvA4yqGa327IsSM/0uol+d7avGKHcHPTADUht3WaRZBX2TPdI4PzefJlto8rvY0sREvsWa8wGbu9sl6zvEE63wVc0bre1t4ctpbG8eY18sm86Gd+L3DF/OZEjf6W26Q0EDr+4cc2sCPZOD5N7kN295q9nb5TBsvkNtuHqRmcm8/5AaKc792D76Ztv29fRqTKY7Q8EmiubG60zI50ZHerh4h5sz9ND9nJyNLqQgxHu5gYcvtzxFmwds0PUDdXpKymCZRYxZLdW4rfp4Tl9+e7g4PQ5DtrA1p2POSpp7XCtLN6/D345KHIGp5Kh4a2FRWZ24xQLiqpwcutW0Xz8Mh1+vzOMz6ORYtw1qKW/BlY57ufRrM4djnHOYziDAYcVAOkashXTG9Rfr2IDS2dRm+Yk8BmCiemtbLZSVsDCoJMZDDTUMJfD4TA9N05+GI0OztC4uDTJYUjRe4vGNd/GNytu3FkMA0xPpWtcSMhkA+b2HEa+9v1uIvqeQ7+bveDL+ARyMSdigDE5P6RsXx5fjBhQFlB/wDZ0O7C3W1M6YGivEWsOFC7GAkpLUEGkyHIT2ka0CK9nsRtQPhk8pwlsJ3wnfxUx/UqZcS/PDkaqcdEOUyyUFmQ2q2UOMheVAvTVjWfUcviwJta9ZY2BlEVrrB2uKy0c1lsjC9wu22oivscK/vGQIf3xp2fMtj9DiYAFgjF6ciEoeDE11NqHp+GfbzchDFBjLoGMO0DXYN8RrgwHAyWc13Ho4rulkc27bBMxzS/YRpeHnO4vbSQcfL7KltumzGYVGM+kDzkDQ/GMoQOwSVvnHHT6Glxjo+YSewkR6w0ce2Y7yNZfSqEXbKtQuszYvRVs3/1tpBoX2HqVw+SrqGIky1bJkY5IQmwLJsxhKwgkv9gm220SLZs5DLl+VhGvhe/xdg4NEW+NEpzE2YIVwra52A0F0l+eqcYFtoOwWxtck3lEdgE+93SGKUSY9zBE3XrKsKll/pM844PTaS0ydCxWC1eJUUKMtWxLMO289dHxIdAdjngsXHTZdhEQh+X4dopZyPfbQiCEG+b1OU5wuRVlJvl1ZGQArhcRJFowLik/la0l1hU6+v7wqnFPf4OtV/GCg11AILoxCwba3rfY1xoz9jNDQUkrb452Z0lSgtsY20hktlfzr6fp8IpxeUHr32putw6RDRrhgVeOIWxJwgSj79jAV3BFnJfRdmnlTrEeEILKNmVq6EwkW1swn3CZPP4gyaYfuXFbzd2zmblhcZpBJgwI168SEtmbGopgXEPoNu2Ere0sBiY9uKm90iCs2IdgCco2mnInmQUPmW9l2A6HQhZa4+4zTlBFUgPRQwkWoEYVjKswY4ttmzhTf+JffyJeFnPJVvzXgwr0UgmE4VAxrrAl4ZDbe/VM6QIm4tCCkWHST7Nx77HBI6RoBWQ59XsjxY3bsMoJsC1F9gVCOnbfqGSH73hBY7Ig5m+T5XI5sxa4vMskco1yJR4aC1mdqIJBnS0RN0nrz2UsubqhqYZtGyU22DYXPXII3fRlh2369zYUDkYngq1s8ivYwZ3PsM8AFZSdyITV6ZlsDRt5cQIrJVN0lOfG6zzBnPS4o+BAGIKUQWLSRlxl+49nz9r6cAJxK1sSB/WVptmW4BvOFmtFW6cbbAJi4zoaJBtu2quQJbginHXYDiBxofXfqWGbqmQ5W4L91xhLKc1bDFuv5r7DR2HpkGG36Pecv7D7oabkDs6hm5tzVtsrR/sA3PLpe8k2/WdL9uiUNwp8PuxRYuCGjSyUlA9rSPNYPgoTDFe2L9fZ2sAFDmcJ0IdCsw07ahFUMPVcIftxxMmKBledzywiCLnsWkmeIdzBulhhv8KT15KHnOt3SKWD3Q9PdOkJyNht94BswiI7JWw/tkqLZFu2BFPDiqENYBaROd+2Abi4GzNjYlnzesIW+2KRwdsY3rsTsEyssiUNTD3GsBU9wpE8l7H5IR5nUe9bAZ9eOaSgBLVJB73/YNJzyRFN0S/+xililC95sEnU5cMN3rNcYiH7F9fZ7+SybLkFsFWuiZi+X7k99GJYmkVOIgOh078IthtJJZwEnvS6CXdr6uWkG2Lo76D/enedLGOrnHbx/Ng6t3vpFKzGokFshTFH/fJ6rj6zqlvnJlOQ7hq+HS1k5QwKNK3Qr5STPeiQZWwDvEmUB8C2L4ik/2ifs0jG4u2cSRIqlL/ouyyzA7WNMRvoCtwavq2w9WLpnmNO9sd/t2RHHbIGLZU1Xp5Ysn7yxoOARBA/z7KN+Iz1XxkW2xeN0YOsIKjOZDoz7BfwfbgnlccQHloCbdgevvwPr7YX3VVt25aXtImN4IPWnJiTiUlcdpKILOWzTH61/w68bOaET67ZLY9cGsyYYS/vxsplE7tISH/dXRz1kL0RiZ3n9v94D0sfL8+tfZeqCV6hmbkc3dFjQ/qr8fzsYHTww5s9U/94ZM3V5rnFpw/D9PWO3X89FrIRjYdcnuk6Cvj6MH27M4yLI9HHPDwsdj2HCicbBIb08D0l+/zs59NHQtYo1O7L9dQ/xRx/YGSN5yPlivlhUXpqg2B2BPDt+/blzefHQlY2+W1tGXfu3D/xl4tHQ7ZT0IPqPn+l+iNQ++IaypuY48dONgtigbrYWzoeDcoE8ei5amhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaPy/46F/3PhOeGK/Mv3QP8p9JzyxX0d/aAJ3gmb75fDE2D60KN0J/wUtRuuESky34gAAAABJRU5ErkJggg==" },
  ];

  const linkSections = [
    {
      title: "USEFUL LINKS",
      links: ["Privacy Policy", "Returns", "Terms & Conditions", "Terms & Conditions- Cashback", "We're Safe", "Track Order", "Contact Us", "Sitemap", "About Us"]
    },
    {
      title: "CATEGORIES",
      links: ["Baby", "Beauty", "Hair", "Face", "Body", "Makeup", "Ingredient", "Gift Pack"]
    },
    {
      title: "MY ACCOUNT",
      links: ["Account", "Orders", "Addresses"]
    }
  ];

  return (
    <div className="w-full bg-white font-sans">
      
      {/* 1. TOP INFO BAR (Shipping/COD/Contact) */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch py-8 border-b border-gray-100">
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 border-r border-gray-100">
            <img src="https://images.mamaearth.in/wysiwyg/delivery2x.png" alt="Shipping" className="w-12 h-12 mb-3 object-contain" />
            <h4 className="font-bold text-gray-800 text-sm">Free Shipping</h4>
            <p className="text-gray-500 text-xs mt-1">On Orders Above ₹399</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 border-r border-gray-100">
            <img src="https://images.mamaearth.in/wysiwyg/Group_81512x.png" alt="COD" className="w-12 h-12 mb-3 object-contain" />
            <h4 className="font-bold text-gray-800 text-sm">COD Available</h4>
            <p className="text-gray-500 text-xs mt-1">@ ₹40 Per Order</p>
          </div>
          <div className="flex-[1.5] flex flex-col md: items-center justify-center gap-6 px-10">
            <p className="text-gray-700 font-semibold text-base">Have Queries or Concerns?</p>
            <button className="border-2 border-[#00B5EF] text-[#00B5EF] px-12 py-2 rounded-lg font-bold text-sm tracking-widest uppercase hover:bg-cyan-50 transition-colors">
              CONTACT US
            </button>
          </div>
        </div>
      </div>

      {/* 2. LINK COLUMNS & AWARD BADGE */}
      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {linkSections.map((section, idx) => (
          <div key={idx}>
            <h5 className="text-gray-800 font-bold text-sm mb-5 uppercase tracking-wide">{section.title}</h5>
            <ul className="space-y-3">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-500 text-sm hover:text-[#00B5EF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Economic Times Award Badge */}
        <div className="flex justify-start md:justify-end">
          <img 
            src="https://images.mamaearth.in/wysiwyg/Best-Brand500x5002x.png" 
            alt="Best Brands 2019" 
            className="h-48 object-contain"
          />
        </div>
      </div>

      {/* 3. SOCIALS & APP LINKS */}
      <div className="max-w-7xl mx-auto px-10 py-10 border-t border-gray-100 flex flex-col items-center gap-8">
        {/* Social Icons */}
        <div className="flex items-center gap-6 text-gray-400">
          <Facebook className="hover:text-blue-600 cursor-pointer" size={20} />
          <Twitter className="hover:text-blue-400 cursor-pointer" size={20} />
          <Instagram className="hover:text-pink-600 cursor-pointer" size={20} />
          <Youtube className="hover:text-red-600 cursor-pointer" size={20} />
          <Linkedin className="hover:text-blue-700 cursor-pointer" size={20} />
          <Mail className="hover:text-gray-600 cursor-pointer" size={20} />
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#">
            <img src="https://images.mamaearth.in/wysiwyg/PLAYSTORE18Apr.png" alt="Google Play" className="h-12" />
          </a>
          <a href="#">
            <img src="https://images.mamaearth.in/wysiwyg/APPSTORE18Apr.png" alt="App Store" className="h-12" />
          </a>
        </div>
      </div>

      {/* 4. PAYMENT PROTECTION (Bottom-most) */}
      <div className="max-w-7xl mx-auto px-10 pb-12">
        <div className="flex flex-col gap-4 border-t border-gray-100 pt-8">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PAYMENT</span>
          <div className="flex items-center gap-2 text-[#6BA31D] text-xs font-semibold">
            <ShieldCheck size={16} />
            <span>100% Payment Protection, Easy Return Policy</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {paymentLogos.map((logo, idx) => (
              <div key={idx} className="h-8 w-12 border border-gray-100 rounded flex items-center justify-center p-1 bg-white">
                <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default FooterInfo;