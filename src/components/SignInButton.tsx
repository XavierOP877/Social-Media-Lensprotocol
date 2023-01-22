import React from "react";
import { useAddress, useNetworkMismatch, useNetwork, ConnectWallet, ChainId } from "@thirdweb-dev/react";
import useLensUser from "../lib/auth/useLensUser";
import useLogin from "../lib/auth/useLogin";




type Props = {};

export default function SignInButton({}: Props){
    // connect their wallet
    // switch to polygon network
    // sign in with lens
    // show profile on lens

    const address = useAddress();
    const isOnWrongNetwork = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
    const {isSignedInQuery, profileQuery} = useLensUser();
    const {mutate: requestLogin} = useLogin();

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

    if(isSignedInQuery.isLoading){
        return <div>Loading...</div>;
    }

    if(!isSignedInQuery.data){
        return <button onClick={() => requestLogin()}>Sign in with Lens</button>
    }

    if(profileQuery.isLoading){
        return <div>Loading...</div>;
    }

    if(!profileQuery.data?.defaultProfile){
        return <div>No Lens Profile.</div>;
    }

    if(profileQuery.data?.defaultProfile){
        return <div>Hello {profileQuery.data?.defaultProfile?.handle}!</div>;
    }

    return(
        <div>
            Something went wrong.
        </div>
    )

    

}