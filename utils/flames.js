// utils/flames.js

export function calculateFlames(name1, name2) {
  const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
  const flamesMeaning = {
    F: 'Friends',
    L: 'Love',
    A: 'Affection',
    M: 'Marriage',
    E: 'Enemies',
    S: 'Siblings',
  };

  name1 = name1.toLowerCase().replace(/\s/g, '');
  name2 = name2.toLowerCase().replace(/\s/g, '');

  let name1Arr = name1.split('');
  let name2Arr = name2.split('');

  // Remove common characters
  for (let i = 0; i < name1Arr.length; i++) {
    const index = name2Arr.indexOf(name1Arr[i]);
    if (index !== -1) {
      name1Arr.splice(i, 1);
      name2Arr.splice(index, 1);
      i--; // adjust index since we modified the array
    }
  }

  const totalCount = name1Arr.length + name2Arr.length;

  // Elimination process
  let flamesIndex = 0;
  while (flames.length > 1) {
    flamesIndex = (flamesIndex + totalCount - 1) % flames.length;
    flames.splice(flamesIndex, 1);
  }

  return flamesMeaning[flames[0]];
}
