export default function FormatPrice(x) {
  return (
    "฿" +
    Number(x)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}
