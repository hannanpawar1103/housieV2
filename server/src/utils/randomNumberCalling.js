let randomNumberCalled = []

for (let i = 1; i <= 90; i++) {
  randomNumberCalled.push(i)
}

for (let i = randomNumberCalled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [randomNumberCalled[i], randomNumberCalled[j]] = [randomNumberCalled[j], randomNumberCalled[i]] 
}

// console.log(randomNumberCalled)
export default randomNumberCalled