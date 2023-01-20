import React from "react";
import { useAddress, useNetworkMismatch, useNetwork, ConnectWallet, ChainId } from "@thirdweb-dev/react";

type Props = {};

export default function SignInButton({}: Props){
    // connect their wallet
    // switch to polygon network
    // sign in with lens
    // show profile on lens

    const address = useAddress();
    const isOnWrongNetwork = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

    if(!address){
        return <ConnectWallet/>;
        
    }

    if(isOnWrongNetwork){
        return(
            <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
                Switch Network
            </button>
        );
    }

    

}