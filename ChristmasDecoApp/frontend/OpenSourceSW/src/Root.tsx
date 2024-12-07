import { extendTheme, ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Account from "./account/Account"
import { treeLoader } from "./backend/Tree"

import ErrorPage from "./ErrorPage"
import Fonts from "./Fonts"
import Landing from "./Landing"
import TestPage from "./tree/TestPage"
import Letter from "./tree/Letter"

const theme = extendTheme({
    colors: {
        brand: {
            christmasTree: "#027228",
            santaSock: "#D20001",
            fallingSnow: "#F9FAFF",
            nightSky: "#010317",
            dawnSky: "#1B1D31",
        }
    },
    textStyles: {
        logo: {
            fontFamily: `"Tenada", sans-serif`
        },
        landing: {
            fontFamily: `"LINESeedKR-Bd", sans-serif`
        },
        tree: {
            fontFamily: `"Hana_handwriting", serif`
        },
    },
})

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
        errorElement: <ErrorPage />
    },
    {
        path: "signin",
        element: <Account pageType="SignIn" />
    },
    {
        path: "signup",
        element: <Account pageType="SignUp" />
    },
    {
        path: "reset",
        element: <Account pageType="Reset" />
    },
    {
        path: "edit/:index",
        element: <Account pageType="Edit" />
    },
    {
        path: "tree/TestPage/:index",
        element: <TestPage />,
        loader: treeLoader,
        errorElement: <ErrorPage />
    },
    {
        path: "tree/Letter",
        element: <Letter />,
        errorElement: <ErrorPage />
    }

])

const Root = () => {
    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <RouterProvider router={router} />
        </ChakraProvider>
    )
}

export default Root