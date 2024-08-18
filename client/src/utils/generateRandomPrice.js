// ######################################################################
// API'da bir price property'si olmadığında dolayı, arayüz tasarımına uymak amacıyla fiyat gösterimi için random bir fiyat üretmekte kullanılan fonksiyon.
// ######################################################################

export function generateRandomPrice() {
  return Math.floor(Math.random() * (500 - 200 + 1)) + 200;
}
