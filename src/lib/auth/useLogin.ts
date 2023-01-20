// connected wallet
// generate challenge from lens API
// sign the challenge with the users wallet
// send the signed challenge to lens API
// receive access token from lens API if succeed
// store the access token inside local storage to use it

import { useAuthenticateMutation } from "@/src/graphql/generated";
import { useMutation } from "@tanstack/react-query";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallenge from "./generateChallenge";


export default function useLogin(){
    const address = useAddress();
    const sdk = useSDK();
    const {mutateAsync: sendSignedMessage} = useAuthenticateMutation();
    
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
    }

    return useMutation(login);
}