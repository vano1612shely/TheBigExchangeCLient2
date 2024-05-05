const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  const fullStar = "★";
  const emptyStar = "☆";

  // Перевірка на вірність введеного рейтингу
  if (isNaN(rating) || rating < 0 || rating > maxStars) {
    return <div>Недійсний рейтинг</div>;
  }

  // Заповнення зірками відповідно до рейтингу
  const stars = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < rating) {
      stars.push(fullStar);
    } else {
      stars.push(emptyStar);
    }
  }

  return <div className="text-[#ffb932] text-xl">{stars.join(" ")}</div>;
};

export default StarRating;
