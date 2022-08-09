import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  constructor(protected player: Fighter, protected monsters: SimpleFighter[]) {
    super(player);
  }

  private playerXenvironment(survivers: SimpleFighter[]) {
    survivers.forEach((monster, index) => {
      if (monster.lifePoints > 0) {
        this.player.attack(monster);
      }
      if (monster.lifePoints <= 0) {
        survivers.splice(index, 1);
      }
    });
    return survivers;
  }

  fight(): number {
    let survivers = [...this.monsters];

    while (survivers.length > 0 && this.player.lifePoints > 0) {
      const result = this.playerXenvironment(survivers);
      survivers = result;

      survivers.forEach((monster) => monster.attack(this.player));
    }

    // Se retorna 1 o player1 venceu, se retorna -1 os monstros venceram
    return this.player.lifePoints > 0 ? 1 : -1;
  }
}