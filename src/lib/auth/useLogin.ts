// connected wallet
// generate challenge from lens API
// sign the challenge with the users wallet
// send the signed challenge to lens API
// receive access token from lens API if succeed
// store the access token inside local storage to use it

import { useAuthenticateMutation } from "@/src/graphql/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";
import { setAccessToken } from "./helpers";


export default function useLogin(){
    const address = useAddress();
    const sdk = useSDK();
    const {mutateAsync: sendSignedMessage} = useAuthenticateMutation();
    const client = useQueryClient();
    
    async function login(){
        if(!address) return;
        const {challenge} = await generateChallenge(address);


        const signature = await sdk?.wallet.sign(challenge.text);

        const {authenticate} = await sendSignedMessage(
            {
                request: {
                    address,
                    signature,
                },
            }
        );


        console.log("Authenticated:", authenticate);

        const {accessToken, refreshToken} = authenticate;
        setAccessToken(accessToken, refreshToken);

        client.invalidateQueries(["lens-user", address]);
    }

    return useMutation(login);
}