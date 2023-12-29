import { Login } from "./Login"
import { SearchBox } from "./SearchBox"
import { StreamConfig } from "./StreamConfig"

export async function Navbar() {
	return (
		<nav className="flex justify-center">
			<div className="grow flex justify-center">
				<SearchBox />
				<StreamConfig />
			</div>

			<Login />
		</nav>
	)
}
