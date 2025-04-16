# 📒 RolIpon Backend Dokumentáció

## 🗒️ Tartalomjegyzék
- [Bevezetés](#bevezetés)
- [Szerkezet](#szerkezet)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [Dokumentáció](#dokumentáció)

## 🏪 Bevezetés
- Egy olyan weboldal létrehozása volt a célunk amelyen számítógép alkatreszeket lehet vásárolni különböző szűrési lehetőségekkel ellátva annak érdekében, hogy mindenki megtalálja számára megfelelő ár-érték arányu alkatrészt minél gyorsabban és könyebben.

## 📁 Projekt szerkezet

```markdown
├── admin/
│   ├── admin.html
│   ├── adminBrand.html
│   ├── adminCategory.html
│   └── adminProduct.html
├── cart/
│   ├── cart.html
│   └── order.html
├── css/
│   ├── admin/
│   ├── homepage/
│   ├── profile/
│   └── relog/
├── homepage/
│   └── home.html
├── icons/
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── favicon.ico
├── js/
│   ├── adminBrands.js
│   ├── adminCategory.js
│   ├── adminOrders.js
│   ├── adminProducts.js
│   ├── cart.js
│   ├── home.js
│   ├── index.js
│   ├── login.js
│   ├── myorder.js
│   ├── order.js
│   ├── profile.js
│   ├── profileInfo.js
│   ├── profilePsw.js
│   └── register.js
├── profile/
│   ├── orders.html
│   ├── profile.html
│   ├── profileInfo.html
│   └── profilePsw.html
├── relog/
│   ├── login.html
│   └── register.html
└── index.html
```

## ⬇️ Telepítés

## 🛍️ Használat 
- A regisztrációt követően a felhasználók saját fiókkal rendelkeznek, amelyen keresztül elérhetik az online áruház kínálatát. A termékek közötti keresést márka és alkatrész típus szerinti szűrők segítik, amelyek együttes alkalmazásával gyorsabban és pontosabban listázhatók a készleten lévő termékek. Amennyiben a vásárló konkrét típust keres, azt a keresőmezőbe beírva közvetlenül megjelenik a keresett alkatrész.

- A kosár megtekintésekor a felhasználó átláthatja a rendelés végösszegét, valamint módosíthatja az egyes termékek mennyiségét. A „Rendelés leadása” gombra kattintva a rendszer egy űrlapra irányítja, ahol megadhatja a szállításhoz szükséges személyes adatokat, a pontos szállítási információkat, valamint kiválaszthatja a kívánt fizetési módot, majd véglegesítheti a rendelést.

- A leadott rendelések a felhasználói profil felületén bármikor megtekinthetők. Ugyanitt lehetőség van a jelszó, valamint a szállítási és profiladatok módosítására is. 
#### Jelenleg elérhető netlify-on
| 🚀 Netlify | Netlify Deployed Page | [Megtekintés](https://rolipon.netlify.app/) |

## Dokumentáció
| Figma | Dizájnt készítő alkalmazás |[Megtekintés](https://www.figma.com/design/yAqSQYQFJ5mlWpcfQFCVwd/Webshop-Project?node-id=0-1&m=dev&t=p1kzDR2C5x8H02Be-1) |
