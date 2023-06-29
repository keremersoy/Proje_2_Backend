# StackLink - Backend

Bu, [yazılım odaklı sosyal medya platformu](https://github.com/keremersoy/StackLink_App) için Node.js ortamında geliştirilen backend projesidir. Bu proje, API uç noktalarını sağlar ve uygulamanın sunucu tarafı mantığını yönetir.

## Kurulum

1. Depoyu yerel makinenize klonlayın.
2. Proje dizinine gidin.
3. Bağımlılıkları yüklemek için `npm install` komutunu çalıştırın.
4. Bir MongoDB veritabanı oluşturun ve `.env` dosyasındaki veritabanı ve jwt için yapılandırmalarını güncelleyin.
5. Sunucuyu başlatmak için `npm start` komutunu çalıştırın.

## Kullanım

1. Backend sunucusunun çalıştığından emin olun.
2. Sunucu, belirtilen portta (5000 portu üzerinde) dinlemeye başlayacaktır.
3. Ön uygulama, API uç noktaları aracılığıyla backend ile iletişim kuracaktır.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
