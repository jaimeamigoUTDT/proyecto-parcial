export function getCategory(expense) {
    if (expense >= 10 && expense <= 20) {
      return "10-20";
    } else if (expense >= 30 && expense <= 40) {
      return "30-40";
    } else if (expense >= 50 && expense <= 60) {
      return "50-60";
    } else {
      return "Other";
    }
  }