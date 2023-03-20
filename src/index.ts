import { TSchema, Type } from "@sinclair/typebox";
import * as fs from "fs";

import { Services } from "./helpers";
import { accountEndpoints } from "./schema/account";
import { authEndpoints } from "./schema/auth";

const services: Services = {
    auth: authEndpoints,
    account: accountEndpoints
};

(async () => {
    const allSchemas: TSchema[] = [
        // userIds,
        // user,
        // privateUser
    ];

    for (const serviceKey in services) {
        const endpoint = services[serviceKey];
        for (const endpointKey in endpoint) {
            const requestResponse = endpoint[endpointKey];
            if ("request" in requestResponse) {
                const request = requestResponse.request;
                const id = `${serviceKey}/${endpointKey}/request`;
                request.$id = id;
                allSchemas.push(Type.Object({
                    cmd: Type.Literal(id),
                    data: Type.Object({
                        ...request.properties
                    })
                }, { $id: id }));
            }
            if ("response" in requestResponse) {
                const response = requestResponse.response;
                const id = `${serviceKey}/${endpointKey}/response`;
                response.id = id;
                allSchemas.push(Type.Object({
                    cmd: Type.Literal(id),
                    data: Type.Object({
                        ...response.properties
                    })
                }, { $id: id }));
            }
        }
    }

    await fs.promises.writeFile(`schema.json`, JSON.stringify(allSchemas, null, 4));
})();