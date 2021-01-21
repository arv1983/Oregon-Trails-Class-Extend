class Traveler {
    constructor(name) {
        this.name = name
        this.food = 1
        this.isHealth = true
    }
    hunt() {
        this.food += 2;
    }

    eat() {
        if (this.food > 0) {
            this.food -= 1
        } else {
            this.isHealth = false
        }
    }

}




//capacidade,passageiros array vazio
class Wagon {
    constructor(capacidade) {
        this.capacidade = capacidade;
        this.passageiros = [];
    }
    getAvailableSeatCount() {
        return this.capacidade - this.passageiros.length;
    }
    join(traveler) {

        if (this.capacidade - this.passageiros.length > 0) {
            this.passageiros.push(traveler)
        }


    }
    shouldQuarantine() {
        for (let i = 0; i < this.passageiros.length; i++) {
            return this.passageiros[i].isHealth;
        }
    }

    //Retorna o número total de comida de todos os ocupantes da carroça.
    totalFood() {
        for (let i = 0; i < this.passageiros.length; i++) {
            return this.passageiros[i].food;
        }
    }
}


//////////////////////// Extends....

class Doctor extends Traveler {
    constructor(name) {
        super(name);
    }
    heal(traveler) {
        traveler.isHealth = true
    }
}

class Hunter extends Traveler {
    constructor(name) {
        super(name);
        this.food = 2;
    }
    hunt() {
        this.food += 5;
    }
    eat() {
        if (this.food > 1) {
            this.food -= 2;
        } else {
            this.food = 0;
            this.isHealth = false;
        }
    }
    giveFood(traveler, numOfFoodUnits) {
        if (numOfFoodUnits == undefined || numOfFoodUnits > this.food) {
            numOfFoodUnits = 0;
        }
        this.food -= numOfFoodUnits;
        traveler.food += numOfFoodUnits;
    }

}




/* codigo CONSTANT abaixo HAHAHAHAHA */
// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);