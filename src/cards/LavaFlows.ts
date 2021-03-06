
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { SpaceType } from "../SpaceType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SpaceName } from "../SpaceName";
import { TileType } from "../TileType";
import { Tags } from "./Tags";
import { ISpace } from "../ISpace";
import { SelectSpace } from "../inputs/SelectSpace";
import { BoardName } from '../BoardName';

export class LavaFlows implements IProjectCard {
    public cost: number = 18;
    public tags: Array<Tags> = [];
    public name: string = "Lava Flows";
    public hasRequirements = false;
    public cardType: CardType = CardType.EVENT;
    public static getVolcanicSpaces(player: Player, game: Game): Array<ISpace> {
        if (game.boardName === BoardName.ORIGINAL) {
        return game.board.getSpaces(SpaceType.LAND)
                .filter((space) => space.tile === undefined && (space.player === undefined || space.player === player))
                .filter((space) => space.id === SpaceName.THARSIS_THOLUS ||
                                   space.id === SpaceName.ASCRAEUS_MONS ||
                                   space.id === SpaceName.ARSIA_MONS ||
                                   space.id === SpaceName.PAVONIS_MONS);
        } else if (game.boardName === BoardName.ELYSIUM) {
            return game.board.getSpaces(SpaceType.LAND)
            .filter((space) => space.tile === undefined && (space.player === undefined || space.player === player))
            .filter((space) => space.id === SpaceName.HECATES_THOLUS ||
                               space.id === SpaceName.ELYSIUM_MONS ||
                               space.id === SpaceName.ARSIA_MONS_ELYSIUM ||
                               space.id === SpaceName.OLYMPUS_MONS);        
        } else {
            return game.board.getSpaces(SpaceType.LAND)
            .filter((space) => space.tile === undefined && (space.player === undefined || space.player === player));
        }    
    }
    public canPlay(player: Player, game: Game): boolean {
        return LavaFlows.getVolcanicSpaces(player, game).length > 0;
    }
    public play(player: Player, game: Game) {
        return new SelectSpace("Select either Tharsis Tholus, Ascraeus Mons, Pavonis Mons or Arsia Mons", LavaFlows.getVolcanicSpaces(player, game), (space: ISpace) => {
            game.addTile(player, SpaceType.LAND, space, { tileType: TileType.SPECIAL });
            return game.increaseTemperature(player, 2);
        });
    }
}

