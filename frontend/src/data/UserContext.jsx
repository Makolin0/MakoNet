import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
	userInfo: {},
	setInfo: () => {},
});

export default function UserContextProvider({ children }) {
	const [userInfo, setUserInfo] = useState(null);

	function setInfo(username, email, roles) {
		setUserInfo({
			username: username,
			email: email,
			roles: roles,
		});
	}

	const contextValue = {
		userInfo: userInfo,
		setInfo: setInfo,
	};

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
}
