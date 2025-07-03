# Angular Udemy Eğitimi Bitirme Projesi - e-Ticaret Reposu

Repoya yıldız vermeyi unutmayın 🤗🤗

## Udemy Eğitimi

```dash
https://www.udemy.com/course/sfrdan-ileri-seviye-angular-egitimi/
```

**Kupon talepleri için bana sosyal medya hesaplarımdan veya mail üzerinden ulaşabilirsiniz**

İyi eğitimler 😊

## NX CLI Komutları

```dash
Proje oluşturma: npx create-nx-workspace@latest my-workspace

Application ekleme: nx g @nx/angular:application admin-panel

Library ekleme: nx g library my-library

Çalıştırma: nx serve my-app (my-app application adı)

Build etme: nx build my-app
```

## NX  Schematics Ayarı

```json
"@schematics/angular:component": {
      "changeDetection": "OnPush",
      "viewEncapsulation": "None",
      "style": "none",
      "skipTests": true,
      "skipSelector": true,
      "exportDefault": true
    },
    "@schematics/angular:service": {
      "skipTests": true
    },
    "@schematics/angular:pipe": {
      "skipTests": true
    },
    "@schematics/angular:directive": {
      "skipTests": true
    },
    "@nx/angular:library": {
      "linter": "eslint",
      "unitTestRunner": "none"
    },
    "@nx/angular:component": {
      "style": "css"
    }
```
