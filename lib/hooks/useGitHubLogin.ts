import { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfoContext } from "@/context/UserInfoContext";
import * as AuthSession from "expo-auth-session";
import { CONFIG } from "@/lib/config";
import { useTypedNavigation } from "@/lib/hooks";
import { GithubLoginError } from "@/types/AuthTypes";

export const useGithubLogin = (): [boolean, GithubLoginError, boolean, () => void] => {
    const { setUserInfo } = useContext(UserInfoContext);
    const navigation = useTypedNavigation();
    const [signinError, setSigninError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: "habitdesk",
        path: "redirect",
    });

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CONFIG.github.clientId,
            redirectUri,
            scopes: ["read:user", "user:email"],
        },
        {
            authorizationEndpoint: "https://github.com/login/oauth/authorize",
            tokenEndpoint: "https://github.com/login/oauth/access_token",
        }
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { code } = response.params;
            exchangeCodeForToken(code);
        }
    }, [response]);

    const exchangeCodeForToken = async (code: string) => {
        setLoading(true);
        try {
            const tokenRes = await fetch(
                "https://github.com/login/oauth/access_token",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        client_id: CONFIG.github.clientId,
                        client_secret: CONFIG.github.clientSecret,
                        code,
                        redirect_uri: redirectUri,
                    }),
                }
            );

            const tokenData = await tokenRes.json();
            const accessToken = tokenData.access_token;

            if (!accessToken) {
                throw new Error("No access token received from GitHub");
            }

            const userRes = await fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const user = await userRes.json();

            const emailRes = await fetch("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const emails = await emailRes.json();
            const primaryEmail = emails.find(
                (email: any) => email.primary && email.verified
            )?.email;

						await AsyncStorage.setItem('userToken', accessToken);
						await AsyncStorage.setItem('userEmail', primaryEmail || user.email);
						
            setUserInfo({ email: primaryEmail || user.email });

            navigation.navigate("UserProfile");
        } catch (error) {
            console.error("GitHub OAuth error", error);
            setSigninError("Something went wrong during login.");
        } finally {
            setLoading(false); 
        }
    };

    return [!!request, { error: signinError }, loading, promptAsync]; 
};
