console.clear();

const PUZZLE_INPUT = "L3, R1, L4, L1, L2, R4, L3, L3, R2, R3, L5, R1, R3, L4, L1, L2, R2, R1, L4, L4, R2, L5, R3, R2, R1, L1, L2, R2, R2, L1, L1, R2, R1, L3, L5, R4, L3, R3, R3, L5, L190, L4, R4, R51, L4, R5, R5, R2, L1, L3, R1, R4, L3, R1, R3, L5, L4, R2, R5, R2, L1, L5, L1, L1, R78, L3, R2, L3, R5, L2, R2, R4, L1, L4, R1, R185, R3, L4, L1, L1, L3, R4, L4, L1, R5, L5, L1, R5, L1, R2, L5, L2, R4, R3, L2, R3, R1, L3, L5, L4, R3, L2, L4, L5, L4, R1, L1, R5, L2, R4, R2, R3, L1, L1, L4, L3, R4, L3, L5, R2, L5, L1, L1, R2, R3, L5, L3, L2, L1, L4, R4, R4, L2, R3, R1, L2, R1, L2, L2, R3, R3, L1, R4, L5, L3, R4, R4, R1, L2, L5, L3, R1, R4, L2, R5, R4, R2, L5, L3, R4, R1, L1, R5, L3, R1, R5, L2, R1, L5, L2, R2, L2, L3, R3, R3, R1".split(', ');

enum Direction {
  n = 0,
  e = 90,
  s = 180,
  w = 270
}

class Step {
  private direction: string;
  private distance: number;
  
  constructor(instructions: string) {
    this.direction = instructions.substr(0, 1);
    this.distance = parseInt(instructions.substr(1, instructions.length - 1), 10);
  }
  
  public getDirection() {
    return this.direction;
  }
  
  public getDistance() {
    return this.distance;
  }
  
  toString() {
    return 'Direction = ' + this.getDirection() + ', Distance = ' + this.getDistance();
  }
}

class Person {
  private history: Array<string>;
  private steps: Array<Step>;
  private facing: Direction;
  private x: number;
  private y: number;
  private firstDouble: string;
  constructor(steps: Array<string>) {
    this.steps = steps.map((s, index) => new Step(s));
    this.facing = Direction.n;
    this.x = 0;
    this.y = 0;
    this.history = [];
  }
  
  private turn(nextStep: Step) {
    const map = {
      0: {
        R: 90,
        L: 270
      },
      90: {
        R: 180,
        L: 0
      },
      180: {
        R: 270,
        L: 90
      },
      270: {
        R: 0,
        L: 180
      }
    };
    this.facing = Math.abs(this.facing);
    this.facing = map[this.facing][nextStep.getDirection()];
    this.facing %= 360;
  }
  
  private move(nextStep) {
    let distanceToGo = nextStep.getDistance();
    while(distanceToGo > 0) {
      if(this.facing === 0) this.y += 1;
      if(this.facing === 90) this.x += 1;
      if(this.facing === 180) this.y -= 1;
      if(this.facing === 270) this.x -= 1;
      if(this.history.indexOf(`${this.x},${this.y}`) > -1 && !this.firstDup) {
        this.firstDup = `${this.x},${this.y}`;
      }
      this.updateHistory();
      distanceToGo--;
    }
  }
  
  private updateHistory() {
    this.history.push(`${this.x},${this.y}`);
  }
  
  public walk() {
    for(let i = 0; i < this.steps.length; i++) {
      const s = this.steps[i];
      this.turn(s);
      this.move(s);
      // console.log(this.history);
    }
  }
  
  public imThisFarWay() {
    console.log('x = %s, y = %s, total = %s', this.x, this.y, this.x + this.y);
    console.log('but my first dup was ', this.firstDup);
  }
}

const bob = new Person(PUZZLE_INPUT);
bob.walk();
bob.imThisFarWay();
