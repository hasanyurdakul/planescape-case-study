// ######################################################################
// API'dan gelen scheduleDateTime ve estimatedLandingTime olarak verilen iki tarih arasındaki farkı gün, saat, dakika ve saniye olarak hesaplar
// ######################################################################

export const dateTimeSubtractor = (scheduleDateTime, estimatedLandingTime) => {
  const scheduleDate = new Date(scheduleDateTime);
  const landingDate = new Date(estimatedLandingTime);

  let differenceInMilliseconds = scheduleDate - landingDate;

  // Negatif değeri pozitif yapıyoruz
  differenceInMilliseconds = Math.abs(differenceInMilliseconds);

  // Milisaniye cinsinden farkı gün, saat, dakika ve saniyeye çevirelim
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMilliseconds: differenceInMilliseconds,
  };
};
