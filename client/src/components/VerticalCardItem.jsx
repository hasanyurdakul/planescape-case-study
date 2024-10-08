// ######################################################################
// VerticalCardItem componenti, bir resim ve başlık alanı olan bir kart componentidir.
// Uygulama içinde sağda bulunan 3 adet kart componenti için kullanılır.
// ######################################################################

function VerticalCardItem({ src, icon, title }) {
  return (
    <div className="relative max-w-xl mx-auto mb-8 cursor-pointer">
      <img
        className="h-64 w-full object-cover rounded-md"
        src={src}
        alt="Random image"
      />
      <div className="absolute left-0 bottom-0 flex flex-col items-start p-4 justify-center">
        <div className="text-white text-6xl">{icon}</div>
        <h2 className="text-white text-2xl font-bold uppercase">{title}</h2>
      </div>
    </div>
  );
}

export default VerticalCardItem;
