import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "@/src/graphql/generated";

export default function useLensUser() {

    const address = useAddress();

    const localStorageQuery = useQuery(
        ["lens-user", address],
        () => {
            const token = readAccessToken();
            return token;
        }
    );

    const profileQuery = useDefaultProfileQuery({
        request:{
            ethereumAddress: address,
        }
    },
    
    )

    
}