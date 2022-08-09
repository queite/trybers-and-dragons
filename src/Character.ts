import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _dexterity: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _energy: Energy;

  constructor(private _name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(this.name, this.dexterity);
    this._archetype = new Mage(this.name);
    this._maxLifePoints = this.race.maxLifePoints / 2;
    this._lifePoints = this.maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this.archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get name():string { return this._name; }
  get dexterity(): number { return this._dexterity; }
  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get maxLifePoints(): number { return this._maxLifePoints; }
  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this.strength);
  }

  private levelUpMaxLifePoints(): number {
    const randomNumber = getRandomInt(1, 10);
    const newMaxLifePoint = this._maxLifePoints + randomNumber;
    if (newMaxLifePoint > this.race.maxLifePoints) {
      return this.race.maxLifePoints;
    }
    return newMaxLifePoint;
  }

  levelUp(): void {
    this._maxLifePoints = this.levelUpMaxLifePoints();
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    this._lifePoints = this.maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this.defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    }
    if (this._lifePoints < 0) {
      this._lifePoints = -1;
    }
    return this.lifePoints;
  }
}