# UYARI 
Uygulamada, Schipnol API taradından kaynaklanan bir CORS hatası alabilirsiniz. Lütfen çözümü için Kurulum başlığına göz atın.
  

#  Genel Bakış

  

Bu proje, Schiphol havalimanı API'sini kullanarak uçuş bilgilerini listeleyen ve kullanıcıların uçuş rezervasyonları yapmasına olanak tanıyan bir web uygulamasıdır. Uygulama, uçuş bilgilerini görüntülemek, uçuşları tarih ve yönüne göre filtrelemek ve kullanıcı rezervasyonlarını yönetmek için modern, temiz ve kullanıcı dostu bir arayüz sunmaktadır.

  

##  Özellikler

-  **Authentication**: Backend'in sağladığı işlevsellik ile JWT Token işlemleri.

-  **Responsive Tasarım**: Masaüstü ve mobil kullanım için hazır arayüzler.

-  **Anasayfa**: Schiphol API'sini kullanarak mevcut uçuşları listeleme.

-  **Uçuş Filtreleme**: Uçuşları tarih ve yönüne göre filtreleme.

-  **Rezervasyon**: Kullanıcıların uçuş rezervasyonu yapabilmesi ve rezervasyon bilgilerinin MongoDB veritabanına kaydedilmesi.

-  **Uçuşlarım Sayfası**: Kullanıcının rezervasyon yaptığı uçuşların listesinin gösterilmesi.

  

##  Kullanılan Teknolojiler

  

-  **Frontend**: React

-  **Backend**: Node (Express.js)

-  **Veritabanı**: MongoDB

  

##  Kurulum

```bash

git  clone  https://github.com/kullaniciadi/ucus-rezervasyon-uygulamasi.git

```

###  Frontend (client)

1. API adresine erişebilmek için Schiphol Hesabı oluşturun.

2. .env.example dosyasından, .env dosyası oluşturun ve Schiphol Hesabınızdan aldığınız "app_id" (VITE_AIR_APP_ID) ve "app_key" (VITE_AIR_APP_KEY) bilgilerini .env dosyasında bulunan ilgili yerlere yerleştirin. https://www.schiphol.nl/en/developer-center/

3.   
```bash

$ cd client

$ npm install

$ npm run dev

```

4. CORS hataları alıyorsanız şu adımları izleyin:

4.1. Windows kullanıyorsanız terminale aşağıdaki satırı yazın ve uygulamayı açılacak yeni Chrome penceresinde deneyin.

```bash

chrome.exe  --user-data-dir="C:/Chrome dev session"  --disable-web-security

```

4.2. Mac kullanıyorsanız terminale aşağıdaki satırı yazın ve uygulamayı açılacak yeni Chrome penceresinde deneyin.

```bash

open  -na  "Google Chrome"  --args  --disable-site-isolation-trials  --disable-web-security  X--user-data-dir="/tmp/chrome_dev"

```

5. CORS hatası, Schipnol API tarafından kaynaklandığı için client-side'da yapabileceğimiz bir çözüm bulunmamaktaydı. Detaylı bilgi için kendi dökümantasyonlarını inceleyebilirsiniz. https://developer.schiphol.nl/contact/frequently-asked-questions

  

###  Backend (server)

1. .env.example dosyasından, .env dosyası oluşturun ve içindeki MONGO_URI alanını, kendi connection stringiniz ile doldurun.

2.  
```bash

$ cd server

$ npm install

$ npm run dev

```
## Ekran Görüntüleri
### Masaüstü Versiyonu
**Login**

![enter image description here](https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/desktop/loginPageDesktop.png)

**Register**

![enter image description here](https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/desktop/registerPageDesktop.png)

**Anasayfa**

![enter image description here](https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/desktop/homePageDesktop.png)

**Uçuşlarım Sayfası**

![enter image description here](https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/desktop/myFlightsPageDesktop.png)

### Mobil Versiyonu

**Login**

<img src="https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/mobile/loginPageMobile.png" alt="drawing" width="400"/>

**Register**

<img src="https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/mobile/registerPageMobie.png" alt="drawing" width="400"/>

**Anasayfa** - 1

<img src="https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/mobile/homePageMobile1.png" alt="drawing" width="400"/>

**Anasayfa** - 2

<img src="https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/mobile/homePageMobile2.png" alt="drawing" width="400"/>

**Uçuşlarım Sayfası** - 1 

<img src="https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/mobile/myFlightsPageMobile1.png" alt="drawing" width="400"/>

**Uçuşlarım Sayfası** - 2

<img src="https://raw.githubusercontent.com/hasanyurdakul/planescape-case-study/main/screenshots/mobile/myFlightsPageMobile2.png" alt="drawing" width="400"/>
