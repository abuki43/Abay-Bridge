export function getRelativeTimestamp(dateString) {
  const postDate = new Date(dateString);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - postDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  } else if (daysDifference <= 7) {
    return `${daysDifference} days ago`;
  } else {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return postDate.toLocaleDateString(undefined, options);
  }
}
