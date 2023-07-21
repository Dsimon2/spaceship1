// Function to generate a random number between min and max (inclusive)
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Created spaceship class to create spaceship objects
  class Spaceship {
    constructor(name, hull, firepower, accuracy) {
      this.name = name;
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }

    // Method to compare random number to accuracy
    isAttackSuccessful() {
        return Math.random() < this.accuracy;
      }
    
      // Method to attack another spaceship
      attack(target) {
        if (this.isAttackSuccessful()) {
          console.log(`${this.name} hits ${target.name} for ${this.firepower} damage!`);
          target.hull -= this.firepower;
          if (target.hull <= 0) {
            console.log(`${target.name} is destroyed!`);
            return true; // Target destroyed
          }
        } else {
          console.log(`${this.name} missed the attack!`);
        }
        return false; // Target survives
      }
    }
    
    // Create the USS Assembly spaceship
    const ussAssembly = new Spaceship('USS Assembly', 20, 5, 0.7);
    
    // Create alien spaceships
    const alienShips = [];
    const numAlienShips = 6;
    
    for (let i = 1; i <= numAlienShips; i++) {
      const hull = RandomNumber(3, 6);
      const firepower = RandomNumber(2, 4);
      const accuracy = RandomNumber(6, 8) / 10;
      const alienShip = new Spaceship(`Alien Ship ${i}`, hull, firepower, accuracy);
      alienShips.push(alienShip);
    }
    
    // Game logic
    let currentShipIndex = 0;
    let retreat = false;
    
    while (currentShipIndex < numAlienShips && !retreat) {
      const currentShip = alienShips[currentShipIndex];
      console.log(`*** ${currentShip.name} is attacking! ***`);
      if (currentShip.attack(ussAssembly)) {
        // If current alien ship is destroyed
        if (currentShipIndex === numAlienShips - 1) {
          console.log('Congratulations! You destroyed all the alien ships!');
        } else {
          const choice = prompt('Do you want to attack the next ship? (yes/no)');
          if (choice.toLowerCase() === 'yes') {
            currentShipIndex++;
          } else {
            retreat = true;
            console.log('Game over! You retreated from the battle.');
          }
        }
      } else {
        // If USS Assembly is still alive, counter-attack
        ussAssembly.attack(currentShip);
        if (ussAssembly.hull <= 0) {
          console.log('Game over! The USS Assembly was destroyed.');
          retreat = true;
        }
      }
    }