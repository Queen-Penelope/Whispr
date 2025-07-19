const animalEmojis = ["🐇", "🦋", "🐈", "🐶", "🐿️", "🐌", "🐢", "🐟", "🦝"];

const animalAnimations = [
  "custom-bounce",     // 🐇
  "custom-float",      // 🦋
  "custom-slide",      // 🐱
  "custom-wiggle",     // 🐶
  "custom-shake",      // 🐿️
  "custom-crawl",      // 🐌
  "custom-slowBounce", // 🐢
  "custom-swim",       // 🐟
  "custom-pop",        // 🦝
];

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {animalEmojis.map((emoji, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center text-4xl"
            >
              <span className={animalAnimations[i]}>{emoji}</span>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
