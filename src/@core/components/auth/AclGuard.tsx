// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import type { ACLObj, AppAbility } from 'src/configs/acl'

// ** Store
import stores from '@/stores/index'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import NotFound from 'src/pages/404'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Util Import

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false } = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // ** Store
  const { role } = stores.useRole()

  const route = role.paths.find(p => p === router.route)
  if (!route && router.route !== '/login') {
    return <NotFound />
  }

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  // ** Vars
  let ability: AppAbility

  // useEffect(() => {
  //   if (auth.user && auth.user.role && !guestGuard && router.route === '/') {
  //     const homeRoute = getHomeRoute(auth.user.role)
  //     router.replace(homeRoute)
  //   }
  // }, [auth.user, guestGuard, router])

  // // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  // // If guest guard or no guard is true or any error page
  // if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
  //   // If user is logged in and his ability is built
  //   if (auth.user && ability) {
  //     return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  //   } else {
  //     // If user is not logged in (render pages like login, register etc..)
  //     return <>{children}</>
  //   }
  // }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
