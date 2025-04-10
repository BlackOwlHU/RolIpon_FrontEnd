# 📒 RolIpon Backend Dokumentáció

## 🗒️ Tartalomjegyzék
```markdown
- [Bevezetés](#bevezetés)
- [Szerkezet](#szerkezet)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [Dokumentáció](#dokumentáció)
```
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
- A felhasználó regisztrálása után saját fiókkal lehet az az online áruházat kinálatát elérni ahol kiválasztható márka, alkatresz vagy a könyebb es pontosabb keresés érdekébe e kettő együttes szűrés beállításával egyből elénk tárul a készleten lévő alkatrészek. 
Viszont ha a vásárló egy kifejezett tipust keres, a kereső mezőbe való beírásával egyből kiadja neki azt. A kosárb megtekintésekor a felhasználó látja végösszeget is és tujda módosítani az esetleges termékek darabszámát a kosáron belül is. Majd a rendelés leadására 
kattintva átdobja egy szállítási adatoka bekérő felületre ahol megadja a személyes adatait és a szállítás pontos utasításait és a fizetési módot és véglegesíthetzi a rendelését. A leadott rendelést a profil fülön belül a meg is tekintheti, mindezek mellett ott tudja
módsoítani a jelszavát illetve a szállítás és profil adatait is. 
### Jelenleg elérhető netlify-on
| 🚀 Netlify | Netlify Deployed Page | [Megtekintés](https://rolipon.netlify.app/) |
