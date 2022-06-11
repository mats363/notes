import React from "react"

interface isAuth {
    isLoggedIn: boolean
}

const loginStatus = React.createContext<isAuth>({isLoggedIn: false})

export {loginStatus}