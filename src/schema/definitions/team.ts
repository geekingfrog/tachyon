import { Type } from "@sinclair/typebox";

import { bot } from "@/schema/definitions/bot";
import { player } from "@/schema/definitions/player";

export const team = Type.Object(
    {
        players: Type.Array(Type.Ref(player)),
        bots: Type.Array(Type.Ref(bot)),
        advantage: Type.Optional(Type.Number({ minimum: -1 })),
        incomeMultiplier: Type.Optional(Type.Number({ minimum: 0 })),
        faction: Type.String(),
        color: Type.Object({
            r: Type.Number({ minimum: 0, maximum: 1 }),
            g: Type.Number({ minimum: 0, maximum: 1 }),
            b: Type.Number({ minimum: 0, maximum: 1 }),
        }),
        startPos: Type.Optional(
            Type.Object({
                x: Type.Integer(),
                y: Type.Integer(),
            })
        ),
        options: Type.Optional(Type.Record(Type.String(), Type.String())),
    },
    { $id: "team" }
);