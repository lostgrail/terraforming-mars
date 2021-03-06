
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Resources } from '../Resources';

export class SolarPower implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.ENERGY, Tags.STEEL];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = "Solar Power";

    public play(player: Player) {
        player.setProduction(Resources.ENERGY);
        return undefined;
    }
    public getVictoryPoints() {
        return 1;
    }
}
