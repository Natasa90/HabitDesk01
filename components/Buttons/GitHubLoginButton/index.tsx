import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { AccountButton } from "../AccountButton";
import { UserInfoContext } from "@/context/UserInfoContext";
import { useTypedNavigation } from "@/lib/hooks";
import { CONFIG } from "@/lib/config";
import * as AuthSession from "expo-auth-session";

export const GithubLogin = () => {
    const navigation = useTypedNavigation();
    const { setUserInfo } = useContext(UserInfoContext);
    const [signinError, setSigninError] = useState<string | null>(null);

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

            setUserInfo({ email: primaryEmail || user.email });

            navigation.navigate("UserProfile");
        } catch (error) {
            console.error("GitHub OAuth error", error);
            setSigninError("Something went wrong during login.");
        }
    };

    return (
        <View className="items-center space-y-4">
            <AccountButton
                onPress={() => {
                    console.log("promptAsync triggered");
                    promptAsync();
                }}
                disabled={!request}>
                <TextWrapper className="text-white font-IBM_semibold">
                  Login with GitHub
                </TextWrapper>
            </AccountButton>
            {signinError && (
                <TextWrapper className="text-red-500">
                    {signinError}
                </TextWrapper>
            )}
        </View>
    );
};
