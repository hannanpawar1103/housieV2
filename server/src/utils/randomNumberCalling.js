let randomNumberCalled = []

for (let i = 1; i <= 90; i++) {
  arr.push(i)
}

for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [arr[i], arr[j]] = [arr[j], arr[i]] 
}

// console.log(arr)
export default randomNumberCalled