import { SearchInput } from "./SearchInput"
import { SearchInputModal } from "./SearchInputModal"
import { SearchOptions } from "./SearchOptions"

export function SearchBox() {
	return (
		<div className="md:w-[40%]">
			<div className="hidden md:flex space-x-2">
				<SearchInput />
				<SearchOptions />
			</div>

			<div className="flex md:hidden">
				<SearchInputModal />
			</div>
		</div>
	)
}
