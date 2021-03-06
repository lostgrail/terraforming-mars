import { IProjectCard } from "../IProjectCard";
import { Tags } from "../Tags";
import { CardType } from '../CardType';
import { Player } from "../../Player";
import { CardName } from '../../CardName';
import { Resources } from "../../Resources";

export class LunarMining implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.EARTH];
    public name: string = CardName.LUNAR_MINING;
    public cardType: CardType = CardType.AUTOMATED;

    public play(player: Player) {
      player.setProduction(Resources.TITANIUM, Math.floor((player.getTagCount(Tags.EARTH)+1) / 2));  
      return undefined;
    }
}
