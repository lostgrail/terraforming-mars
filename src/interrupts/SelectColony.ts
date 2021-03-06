import { Game } from '../Game';
import { PlayerInput } from '../PlayerInput';
import { Player } from '../Player';
import { PlayerInterrupt } from './PlayerInterrupt';
import { OrOptions } from '../inputs/OrOptions';
import { IColony } from '../colonies/Colony';
import { SelectOption } from '../inputs/SelectOption';

export class SelectColony implements PlayerInterrupt {
    public playerInput: PlayerInput;
    constructor(
        public player: Player,
        public game: Game,
        public openColonies: Array<IColony>,
        public tile: string = "Select where to build a colony"
    ){
        let buildColony = new OrOptions();
        openColonies.forEach(colony => {
            const colonySelect =  new SelectOption(
              colony.name + " - (" + colony.description + ")", 
              () => {
                colony.onColonyPlaced(player, game);
                game.log(player.name + " built a colony on " + colony.name);
                return undefined;
              }
            );
            buildColony.options.push(colonySelect);
          });
        this.playerInput = buildColony;
        this.playerInput.onend = () => { 
            if (game.activePlayer !== player) {
                game.playerIsFinishedTakingActions();   
            } else {
                player.takeAction(game);
            }
        };
    };
}    