import { Colony, IColony } from './Colony';
import { Player } from '../Player';
import { ColonyName } from './ColonyName';
import { Game } from '../Game';
import { ResourceType } from '../ResourceType';

export class Enceladus extends Colony implements IColony {
    public name = ColonyName.ENCELADUS;
    public description: string = "Microbes";
    public isActive = false;
    public resourceType = ResourceType.MICROBE;
    public trade(player: Player, game: Game): void {
        this.beforeTrade(this, player);
        let microbes: number = 0;
        if (this.trackPosition > 4) {
            microbes = this.trackPosition - 1;
        } else {
            microbes = this.trackPosition;
        }
        game.addResourceInterrupt(player, ResourceType.MICROBE, microbes);
        this.afterTrade(this, player, game);
    }
    public onColonyPlaced(player: Player, game: Game): undefined {
        super.addColony(this, player, game);
        game.addResourceInterrupt(player, ResourceType.MICROBE, 3);
        return undefined;
    }
    public giveTradeBonus(player: Player, game: Game): void {
        game.addResourceInterrupt(player, ResourceType.MICROBE);
    }    
}