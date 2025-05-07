export function formatRatingStars(rating: number): string {
    const fullStar = '⭐';
    const halfStar = '✨';
  
    let stars = '';
  
    const fullStarsCount = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    for (let i = 0; i < fullStarsCount; i++) {
      stars += fullStar;
    }
  
    if (hasHalfStar) {
      stars += halfStar;
    }
  
    return stars;
  }