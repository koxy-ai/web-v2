export default function randomItem<T = any>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
