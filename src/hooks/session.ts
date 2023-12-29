import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

/**
 * This custom hook is a workaround for a bug in next-auth that causes the session to
 * return twice the same session object causing unnecessary re-renders on useEffect that relies on this object as dependency.
 * @author Jose Valdivia
 */
export function useOptimizedSession() {
	const { data: session, status } = useSession()
	console.log(session)

	const [lastSession, setLastSession] = useState<Session | undefined>()

	useEffect(() => {
		if (
			session &&
			session.accessToken !== undefined &&
			(!lastSession || session.accessToken !== lastSession.accessToken)
		) {
			setLastSession(session)
		}
	}, [session])

	console.log(lastSession)

	return { session: lastSession, status }
}
