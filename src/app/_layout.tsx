import "../styles/global.css"
import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { ActivityIndicator, View } from "react-native"

function ProtectedLayout() {
    const { isAuthenticated, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if(!loading) {
            const inAuthGroup = segments[0] === "login";

            if (!isAuthenticated && !inAuthGroup) {
                router.replace("/login");
            } else if ( isAuthenticated && inAuthGroup ){
                router.replace("/casospericiais");
            }
        }
    }, [isAuthenticated, loading]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large"/>
            </View>
        )
    }
    return <Slot />
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <ProtectedLayout/>
        </AuthProvider>
    )
}