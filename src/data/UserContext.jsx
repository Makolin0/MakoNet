import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
	userInfo: {},
	setInfo: () => {},
});

export default function UserContextProvider({ children }) {
	const [userInfo, setUserInfo] = useState(null);

	function setInfo(email, nickname, role) {
		setUserInfo({
			email: email,
			nickname: nickname,
			role: role,
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
